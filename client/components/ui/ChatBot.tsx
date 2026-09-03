"use client";

import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";

type Message = {
  role: "user" | "bot";
  content: string;
};

async function sendMessage(message: string): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`;
  console.log("Chat request URL:", url);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.message ?? data.reply ?? data.answer ?? "";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi! 👋 Welcome to our institute. How can I help you today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const message = input.trim();

    if (!message || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const answer = await sendMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: answer || "Sorry, I didn't quite get that. Could you rephrase?",
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Sorry, I couldn't connect to the server. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-[380px] origin-bottom-right transition-all duration-200 sm:right-6 ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex h-[550px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">
                💬
              </div>

              <div>
                <h2 className="font-semibold">
                  Chat with us
                </h2>

                <div className="flex items-center gap-1.5 text-xs text-blue-100">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Online
                </div>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-xl transition hover:bg-white/10"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-2xl rounded-br-md bg-blue-600 text-white"
                      : "rounded-2xl rounded-bl-md bg-white text-gray-800 shadow-sm border border-gray-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t bg-white p-3"
          >
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={loading}
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                ↑
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-gray-400">
              Powered by AI
            </p>
          </form>
        </div>
      </div>

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl sm:right-6"
      >
        <span className="text-xl">
          {open ? "×" : "💬"}
        </span>

        <span>
          {open ? "Close" : "Chat with us"}
        </span>
      </button>
    </>
  );
}