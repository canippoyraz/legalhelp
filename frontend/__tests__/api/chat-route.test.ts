import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockStream = vi.fn();

vi.mock('@anthropic-ai/sdk', () => ({
  default: class {
    messages = { stream: mockStream };
  },
}));

import { POST } from '@/app/api/chat/route';

function postRequest(body: unknown) {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

async function readAll(response: Response): Promise<string> {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let out = '';
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  return out;
}

describe('POST /api/chat', () => {
  const originalKey = process.env.ANTHROPIC_API_KEY;

  beforeEach(() => {
    mockStream.mockReset();
  });

  afterEach(() => {
    process.env.ANTHROPIC_API_KEY = originalKey;
  });

  it('returns 500 without calling the Anthropic SDK when the API key is missing', async () => {
    delete process.env.ANTHROPIC_API_KEY;

    const res = await POST(postRequest({ messages: [{ role: 'user', content: 'hi' }] }));

    expect(res.status).toBe(500);
    expect(mockStream).not.toHaveBeenCalled();
  });

  it('returns 400 for an empty messages array', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';

    const res = await POST(postRequest({ messages: [] }));

    expect(res.status).toBe(400);
  });

  it('returns 400 for a malformed message shape', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';

    const res = await POST(postRequest({ messages: [{ role: 'system', content: 'hi' }] }));

    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid JSON', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';

    const res = await POST(new Request('http://localhost/api/chat', { method: 'POST', body: '{not json' }));

    expect(res.status).toBe(400);
  });

  it('streams text deltas from the Anthropic SDK as plain text', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';
    mockStream.mockReturnValue({
      [Symbol.asyncIterator]: async function* () {
        yield { type: 'content_block_delta', delta: { type: 'text_delta', text: 'Hello ' } };
        yield { type: 'content_block_delta', delta: { type: 'text_delta', text: 'world' } };
        yield { type: 'message_stop' };
      },
    });

    const res = await POST(postRequest({ messages: [{ role: 'user', content: 'hi' }] }));

    expect(res.status).toBe(200);
    expect(await readAll(res)).toBe('Hello world');
  });

  it('caps message history sent to the SDK to the most recent messages', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';
    mockStream.mockReturnValue({ [Symbol.asyncIterator]: async function* () {} });
    const longHistory = Array.from({ length: 30 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: `message ${i}`,
    }));

    await POST(postRequest({ messages: longHistory }));

    const callArgs = mockStream.mock.calls[0][0];
    expect(callArgs.messages.length).toBe(20);
    expect(callArgs.messages[callArgs.messages.length - 1].content).toBe('message 29');
  });
});
