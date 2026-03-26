import { MessageSquareText } from "lucide-react";
import { TelegramChatWidget } from "@/components/chat/TelegramChatWidget";

export function ContactSection() {
  return (
    <section id="contact" className="pt-16 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr,0.9fr] lg:items-start">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/5 px-4 py-2 text-sm text-foreground/80">
              <MessageSquareText className="h-4 w-4 text-glow" />
              Live Telegram Bridge
            </div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Reply from your phone. Messages stream instantly.
            </h2>
            <p className="text-sm leading-7 text-foreground/75 sm:text-base">
              Use the chat bubble to send a message. Your reply will be
              verified against your configured Telegram chat id and stored in
              Supabase for real-time display.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <TelegramChatWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

