import { describe, it, expect, vi, afterEach } from 'vitest';
import { streamChat } from '@/lib/chatClient';

function streamResponse(chunks: string[], status = 200) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      chunks.forEach(c => controller.enqueue(encoder.encode(c)));
      controller.close();
    },
  });
  return new Response(stream, { status });
}

async function drain(gen: AsyncGenerator<string>): Promise<string[]> {
  const out: string[] = [];
  for await (const chunk of gen) out.push(chunk);
  return out;
}

describe('streamChat', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('yields decoded chunks from the response stream', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(streamResponse(['Hello, ', 'world!'])));

    const chunks = await drain(streamChat([{ role: 'user', content: 'hi' }]));

    expect(chunks.join('')).toBe('Hello, world!');
  });

  it('posts the message history as JSON to /api/chat', async () => {
    const fetchMock = vi.fn().mockResolvedValue(streamResponse(['ok']));
    vi.stubGlobal('fetch', fetchMock);
    const messages = [{ role: 'user' as const, content: 'hi' }];

    await drain(streamChat(messages));

    expect(fetchMock).toHaveBeenCalledWith('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
  });

  it('throws when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 500 })));

    await expect(drain(streamChat([{ role: 'user', content: 'hi' }]))).rejects.toThrow();
  });

  it('throws when the response has no body', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 200 })));

    await expect(drain(streamChat([{ role: 'user', content: 'hi' }]))).rejects.toThrow();
  });
});
