import Anthropic from '@anthropic-ai/sdk';
import { ChatMessage } from '@/types/chat';

const MODEL = 'claude-sonnet-5';
const MAX_TOKENS = 1024;
const MAX_MESSAGES = 20;

const SYSTEM_PROMPT = `You are LegalHelp's legal guidance assistant, embedded as a chat widget on the LegalHelp website.

LegalHelp is a free, no-account, browser-based tool that generates 4 types of agreements: Mutual NDA, Employment Contract, Freelance Agreement, and Lease Agreement, with state-specific provisions for all 50 US states.

You can help with:
- Explaining legal clauses (confidentiality, IP, termination, governing law, etc.) in plain English
- Helping the user decide which of the 4 agreement types fits their situation
- Explaining what fields in the document builder mean and why they matter
- General questions about how the LegalHelp builder and dashboard work

Rules:
- You are not a lawyer and must never give legal advice. Always frame answers as general guidance, not advice for the user's specific situation.
- For anything involving disputes, litigation, or high-stakes/complex agreements, recommend consulting a qualified attorney.
- Keep answers concise and conversational — this is a small chat widget, not a document.
- If asked something unrelated to legal agreements or the LegalHelp site, politely redirect to what you can help with.`;

function isValidMessages(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.length > 0 &&
        m.content.length <= 4000,
    )
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response('Chat is not configured', { status: 500 });
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  if (!isValidMessages(body.messages)) {
    return new Response('messages must be a non-empty array of {role, content}', { status: 400 });
  }
  const messages = body.messages.slice(-MAX_MESSAGES);

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();
  let anthropicStream: ReturnType<typeof client.messages.stream> | undefined;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        anthropicStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: SYSTEM_PROMPT,
          messages,
        });
        for await (const event of anthropicStream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error('Chat stream error:', err);
        controller.error(err);
      }
    },
    cancel() {
      anthropicStream?.abort();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
