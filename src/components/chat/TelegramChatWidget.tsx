"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { supabaseClient } from "@/lib/SupabaseClient";
import type { TelegramMessageRow } from "@/lib/telegram/messages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function normalizeRow(row: TelegramMessageRow): TelegramMessageRow {
  return {
    id: row.id,
    content: String(row.content ?? ""),
    is_from_admin: Boolean(row.is_from_admin),
    created_at: row.created_at,
  };
}

function messageKey(m: TelegramMessageRow, idx: number) {
  if (m.id != null) return String(m.id);
  const t = m.created_at ? String(m.created_at) : "na";
  const c = (m.content ?? "").slice(0, 40);
  return `${m.is_from_admin ? "admin" : "user"}-${t}-${c}-${idx}`;
}

export function TelegramChatWidget() {
  const [open, setOpen] = React.useState(false);
  const openRef = React.useRef(open);
  const [draft, setDraft] = React.useState("");
  const [messages, setMessages] = React.useState<TelegramMessageRow[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isSending, setIsSending] = React.useState(false);
  const [supabaseReady, setSupabaseReady] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const storageKey = "tg_bridge_messages_v1";
  const messagesRef = React.useRef<TelegramMessageRow[]>(messages);

  React.useEffect(() => {
    openRef.current = open;
  }, [open]);

  React.useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  React.useEffect(() => {
    // Refresh logic: clear chat ONLY on a full page refresh.
    // Requirement: use window.onload to reset localStorage.
    const clearStorage = () => {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore (private mode / blocked storage)
      }
    };

    if (typeof window === "undefined") return;

    // If "load" already fired (fast hydration), clear immediately.
    if (document.readyState === "complete") {
      clearStorage();
      return;
    }

    window.addEventListener("load", clearStorage, { once: true });
    return () => {
      window.removeEventListener("load", clearStorage);
    };
  }, []);

  React.useEffect(() => {
    if (!supabaseClient) {
      setError(
        "Supabase is not configured. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`."
      );
    }
  }, []);

  React.useEffect(() => {
    const client = supabaseClient;
    if (!client) return;

    setSupabaseReady(true);

    // Realtime: only INSERTs for new messages.
    const channel = client
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newRow = payload.new as TelegramMessageRow;
          const normalized = normalizeRow(newRow);

          setMessages((prev) => {
            const alreadyExists =
              normalized.id != null
                ? prev.some(
                    (p) => p.id != null && String(p.id) === String(normalized.id),
                  )
                : prev.some((p) => {
                    const timeA = p.created_at ? String(p.created_at) : "na";
                    const timeB = normalized.created_at ? String(normalized.created_at) : "na";
                    return (
                      timeA === timeB &&
                      p.is_from_admin === normalized.is_from_admin &&
                      p.content === normalized.content
                    );
                  });

            if (alreadyExists) return prev;

            // Append only (no sorting) so keys + animations stay stable.
            return [...prev, normalized];
          });

          // Keep user at the bottom for "cinematic chat" feel.
          if (openRef.current) {
            setTimeout(() => {
              scrollRef.current?.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
              });
            }, 0);
          }
        },
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, []);

  // Persistence: keep messages on close; restore from localStorage on re-open if needed.
  React.useEffect(() => {
    if (!open) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messagesRef.current));
      } catch {
        // ignore
      }
      return;
    }

    if (open && messagesRef.current.length === 0) {
      try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return;
        const parsed = JSON.parse(raw) as TelegramMessageRow[];
        if (Array.isArray(parsed)) setMessages(parsed.map(normalizeRow));
      } catch {
        // ignore
      }
    }
  }, [open]);

  async function onSend() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (!supabaseClient) {
      setError("Supabase is not configured.");
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      const res = await fetch("/api/send-to-tg", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content: trimmed }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text || `Request failed (${res.status})`);
        return;
      }

      setDraft("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send message.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="relative">
      {/* Floating button (v0-style) */}
      <AnimatePresence initial={false}>
        {!open ? (
          <motion.button
            key="btn"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open Telegram chat"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={cn(
              "group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-foreground/15 bg-white/5 px-4 py-3 shadow-glow",
              "backdrop-blur-xl transition-all hover:bg-white/10",
            )}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-glow/12 shadow-glow">
              <MessageCircle className="h-5 w-5 text-glow" />
            </span>
            <span className="text-sm font-medium text-foreground/90">Chat</span>
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Card className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-[420px] overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-foreground/10 bg-black/10 px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    Telegram Bridge
                  </div>
                  <div className="text-xs text-foreground/70">
                    {supabaseReady
                      ? "Realtime: ON"
                      : "Connecting to Supabase…"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-foreground/15 bg-white/5 px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-white/10"
                  aria-label="Close chat"
                >
                  Close
                </button>
              </div>

              <div
                ref={scrollRef}
                className="max-h-[340px] overflow-y-auto px-4 py-4"
              >
                {error ? (
                  <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-3 text-xs text-red-100">
                    {error}
                  </div>
                ) : null}

                {messages.length === 0 && !error ? (
                  <div className="mt-2 text-sm text-foreground/70">
                    No messages yet. Send one from this page, or reply from
                    your phone.
                  </div>
                ) : null}

                <AnimatePresence initial={false}>
                  <div className="space-y-3">
                    {messages.map((m, idx) => {
                      const key = messageKey(m, idx);
                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className={cn(
                            "flex",
                            m.is_from_admin ? "justify-start" : "justify-end",
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[78%] rounded-2xl border px-3 py-2 text-sm leading-5 shadow-sm",
                              m.is_from_admin
                                ? "border-glow/25 bg-glow/10 text-foreground/90"
                                : "border-foreground/15 bg-white/5 text-foreground/90",
                            )}
                          >
                            {m.content}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </AnimatePresence>
              </div>

              <div className="border-t border-foreground/10 bg-black/10 p-3">
                <div className="flex items-end gap-2">
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Write a message…"
                    className="h-11"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSend();
                      }
                    }}
                  />
                  <Button
                    variant="primary"
                    size="icon"
                    onClick={onSend}
                    disabled={isSending || !draft.trim()}
                    aria-label="Send message"
                    className="h-11 w-11 shadow-[0_0_50px_rgba(16,185,129,0.22)]"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-[11px] text-foreground/60">
                  Replies from Telegram are stored as admin messages.
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

