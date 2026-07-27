import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatWidget from '@/components/ChatWidget';

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

async function openChat() {
  fireEvent.click(screen.getByRole('button', { name: /open legal guidance chat/i }));
}

describe('ChatWidget', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders a floating chat button, closed by default', () => {
    render(<ChatWidget />);
    expect(screen.getByRole('button', { name: /open legal guidance chat/i })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the panel with the disclaimer and greeting visible', async () => {
    render(<ChatWidget />);
    await openChat();

    expect(screen.getByRole('dialog', { name: /legal guidance chat/i })).toBeInTheDocument();
    expect(screen.getByText(/AI-generated guidance only/i)).toBeInTheDocument();
    expect(screen.getByText(/Ask me about our agreement types/i)).toBeInTheDocument();
  });

  it('closes the panel when the close button is clicked', async () => {
    render(<ChatWidget />);
    await openChat();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('streams a response from /api/chat and displays it', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(streamResponse(['Hello ', 'there!'])));
    render(<ChatWidget />);
    await openChat();

    fireEvent.change(screen.getByPlaceholderText(/ask a legal question/i), { target: { value: 'hi' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(screen.getByText('hi')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Hello there!')).toBeInTheDocument());
  });

  it('disables input while streaming and re-enables it once done', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(streamResponse(['ok'])));
    render(<ChatWidget />);
    await openChat();

    const input = screen.getByPlaceholderText(/ask a legal question/i);
    fireEvent.change(input, { target: { value: 'hi' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(input).toBeDisabled();
    await waitFor(() => expect(input).not.toBeDisabled());
  });

  it('falls back to a rule-based reply when the chat API call fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    render(<ChatWidget />);
    await openChat();

    fireEvent.change(screen.getByPlaceholderText(/ask a legal question/i), { target: { value: 'what is an nda' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(screen.getByText(/What is an NDA/i)).toBeInTheDocument());
  });
});
