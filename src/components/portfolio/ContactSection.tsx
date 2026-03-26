import { MessageSquareText } from "lucide-react";
import { TelegramChatWidget } from "@/components/chat/TelegramChatWidget";

export function ContactSection() {
  return (
    <section id="contact" className="pt-16 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-foreground/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-black/10 px-4 py-2 text-sm text-foreground/80">
                <MessageSquareText className="h-4 w-4 text-glow" />
                Telegram Chat
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Reply from your phone. Watch it slide in instantly.
              </h2>
              <p className="text-sm leading-7 text-foreground/75 sm:text-base">
                Send a message from the floating bubble. Your Telegram reply is
                verified by chat id, stored in Supabase as{" "}
                <span className="text-foreground font-semibold">content</span>,
                then streamed back in realtime.
              </p>

              <div className="rounded-2xl border border-foreground/10 bg-black/10 p-4">
                <div className="text-xs font-medium text-foreground/70">
                  Session behavior
                </div>
                <div className="mt-1 text-sm leading-6 text-foreground/85">
                  Close/re-open persists chat in `localStorage`.
                  Refresh resets chat on `window.onload` for clean testing.
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              {/* Floating widget lives fixed; this card provides context */}
              <TelegramChatWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

