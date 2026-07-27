'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getResponse } from '@/lib/chatResponses';
import { streamChat } from '@/lib/chatClient';
import { ChatMessage } from '@/types/chat';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
}

const DISCLAIMER = 'AI-generated guidance only — not legal advice. Consult a qualified attorney for your specific situation.';

const INITIAL_MESSAGE: Message = {
  id: 0,
  role: 'bot',
  text: "Hi! I'm LegalHelp's guidance assistant. Ask me about our agreement types, what legal clauses mean, or how the builder works.",
};

function renderText(text: string) {
  const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    const link = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (link) return <Link key={i} href={link[2]} className="chat-link">{link[1]}</Link>;
    const bold = part.match(/^\*\*(.*?)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    return <span key={i}>{part}</span>;
  });
}

function BotMessage({ text }: { text: string }) {
  return (
    <div className="chat-msg chat-msg--bot">
      <div className="chat-msg__avatar">LH</div>
      <div className="chat-msg__bubble">
        {text.split('\n').map((line, i) => (
          <p key={i} className={line.startsWith('•') ? 'chat-bullet' : ''}>
            {renderText(line)}
          </p>
        ))}
      </div>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="chat-msg chat-msg--user">
      <div className="chat-msg__bubble">{text}</div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="chat-msg chat-msg--bot">
      <div className="chat-msg__avatar">LH</div>
      <div className="chat-msg__bubble chat-typing" aria-label="LegalHelp is typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg: Message = { id: idRef.current++, role: 'user', text };
    const botId = idRef.current++;
    const history: ChatMessage[] = [...messages, userMsg]
      .filter(m => m.id !== INITIAL_MESSAGE.id)
      .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }));

    setMessages(prev => [...prev, userMsg, { id: botId, role: 'bot', text: '' }]);
    setInput('');
    setIsStreaming(true);

    try {
      let received = '';
      for await (const chunk of streamChat(history)) {
        received += chunk;
        setMessages(prev => prev.map(m => (m.id === botId ? { ...m, text: received } : m)));
      }
      if (!received) throw new Error('Empty response from chat API');
    } catch {
      const fallback = getResponse(text);
      setMessages(prev => prev.map(m => (m.id === botId ? { ...m, text: fallback } : m)));
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
  };

  return (
    <>
      {/* Floating button */}
      <button
        className={`chat-fab${open ? ' chat-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open legal guidance chat'}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
        {!open && <span className="chat-fab__label">Legal Help</span>}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Legal guidance chat">
          <div className="chat-panel__header">
            <div className="chat-panel__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/></svg>
              Legal Guidance
            </div>
            <button className="chat-panel__close" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </button>
          </div>

          <div className="chat-disclaimer">{DISCLAIMER}</div>

          <div className="chat-messages">
            {messages.map(m => {
              if (m.role === 'user') return <UserMessage key={m.id} text={m.text} />;
              return m.text
                ? <BotMessage key={m.id} text={m.text} />
                : <TypingIndicator key={m.id} />;
            })}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              placeholder="Ask a legal question…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              maxLength={300}
              disabled={isStreaming}
            />
            <button
              className="chat-send"
              onClick={send}
              disabled={!input.trim() || isStreaming}
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
