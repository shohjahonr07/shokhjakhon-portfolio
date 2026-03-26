import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getSupabaseAdminClient } from "@/lib/SupabaseClient";

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
  try {
    const update = (await req.json().catch(() => ({}))) as TelegramUpdate;

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      throw new Error(
        "Supabase admin client not configured. Ensure `process.env.SUPABASE_SERVICE_ROLE_KEY` is set.",
      );
    }

    const myChatId = env("TELEGRAM_MY_CHAT_ID");
    if (!myChatId) {
      throw new Error("TELEGRAM_MY_CHAT_ID not configured.");
    }

    const msg = update.message ?? update.edited_message;
    const chatId = msg?.chat?.id;
    if (chatId == null) {
      return NextResponse.json({ ok: true });
    }

    // Handle the Telegram JSON: only save if it matches TELEGRAM_MY_CHAT_ID.
    if (String(chatId) !== String(myChatId)) {
      return NextResponse.json({ ok: true });
    }

    const text =
      (typeof msg?.text === "string" ? msg.text : "") ||
      (typeof msg?.caption === "string" ? msg.caption : "");

    const trimmed = text.trim();
    if (!trimmed) {
      return NextResponse.json({ ok: true });
    }

    // Ignore bot-originated messages; only phone replies should be persisted as admin.
    if (msg?.from?.is_bot) {
      return NextResponse.json({ ok: true });
    }

    // Ensure we insert into `content` and set `is_from_admin: true`.
    const { error: insertError } = await supabase
      .from("messages")
      .insert({ content: trimmed, is_from_admin: true });

    // Ensure 200 only after DB write is confirmed.
    if (insertError) throw insertError;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("WEBHOOK_CRASH:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

