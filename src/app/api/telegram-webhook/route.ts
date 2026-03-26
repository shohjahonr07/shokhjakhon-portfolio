import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabase/server";

type TelegramUpdate = {
  message?: {
    message_id?: number;
    date?: number;
    chat?: { id?: number | string };
    from?: { id?: number | string; is_bot?: boolean };
    text?: string;
    caption?: string;
  };
  edited_message?: {
    message_id?: number;
    chat?: { id?: number | string };
    from?: { id?: number | string; is_bot?: boolean };
    text?: string;
    caption?: string;
  };
};

export async function POST(req: Request) {
  const update = (await req.json().catch(() => ({}))) as TelegramUpdate;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase admin client not configured." },
      { status: 500 },
    );
  }

  const myChatId = env("TELEGRAM_MY_CHAT_ID");
  if (!myChatId) {
    return NextResponse.json(
      { error: "TELEGRAM_MY_CHAT_ID not configured." },
      { status: 500 },
    );
  }

  const msg = update.message ?? update.edited_message;
  const chatId = msg?.chat?.id;

  if (chatId == null) {
    return NextResponse.json({ ok: true });
  }

  // Verify this webhook is for the configured chat.
  if (String(chatId) !== String(myChatId)) {
    return NextResponse.json({ ok: true });
  }

  const text =
    (typeof msg?.text === "string" ? msg.text : "") ||
    (typeof msg?.caption === "string" ? msg.caption : "");

  if (!text.trim()) {
    return NextResponse.json({ ok: true });
  }

  // Ignore messages sent by the bot itself; we only want your phone replies.
  if (msg?.from?.is_bot) {
    return NextResponse.json({ ok: true });
  }

  const { error: insertError } = await supabase.from("messages").insert({
    content: text.trim(),
    is_from_admin: true,
  });

  if (insertError) {
    return NextResponse.json(
      { error: insertError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

