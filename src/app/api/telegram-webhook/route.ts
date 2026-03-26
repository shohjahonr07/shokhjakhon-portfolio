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

    console.log("telegram-webhook: received update", {
      hasMessage: Boolean(update.message),
      hasEditedMessage: Boolean(update.edited_message),
    });

    const hasServiceRoleKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
    if (!hasServiceRoleKey) {
      console.error(
        "telegram-webhook: missing SUPABASE_SERVICE_ROLE_KEY (service role required to bypass RLS)"
      );
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      console.error(
        "telegram-webhook: Supabase admin client not configured (missing SUPABASE_SERVICE_ROLE_KEY).",
      );
      return NextResponse.json(
        {
          error:
            "Supabase admin client not configured. Ensure `process.env.SUPABASE_SERVICE_ROLE_KEY` is set.",
        },
        { status: 500 },
      );
    }

    const myChatId = env("TELEGRAM_MY_CHAT_ID");
    if (!myChatId) {
      console.error("telegram-webhook: TELEGRAM_MY_CHAT_ID not configured.");
      return NextResponse.json(
        { error: "TELEGRAM_MY_CHAT_ID not configured." },
        { status: 500 },
      );
    }

    const msg = update.message ?? update.edited_message;
    const chatId = msg?.chat?.id;
    const messageId = msg?.message_id;

    if (chatId == null) {
      console.log("telegram-webhook: missing chat id; ignoring update.");
      return NextResponse.json({ ok: true });
    }

    // Verify this webhook is for the configured chat.
    if (String(chatId) !== String(myChatId)) {
      console.log("telegram-webhook: chat_id mismatch; ignoring.", {
        received: chatId,
        expected: myChatId,
      });
      return NextResponse.json({ ok: true });
    }

    const text =
      (typeof msg?.text === "string" ? msg.text : "") ||
      (typeof msg?.caption === "string" ? msg.caption : "");

    if (!text.trim()) {
      console.log("telegram-webhook: empty text/caption; ignoring.");
      return NextResponse.json({ ok: true });
    }

    // Ignore messages sent by the bot itself; we only want your phone replies.
    if (msg?.from?.is_bot) {
      console.log("telegram-webhook: bot message ignored.", {
        messageId,
        chatId,
      });
      return NextResponse.json({ ok: true });
    }

    try {
      // Column names: `content` (not `text`)
      // Admin flag: `is_from_admin: true`
      const trimmed = text.trim();
      const { error: insertError } = await supabase
        .from("messages")
        .insert({ content: trimmed, is_from_admin: true });

      if (insertError) {
        console.error("telegram-webhook: supabase insert error", {
          insertError,
          chatId,
          messageId,
          contentPreview: trimmed.slice(0, 80),
        });
        return NextResponse.json(
          { error: "Database insert failed." },
          { status: 500 },
        );
      }
    } catch (error) {
      console.error("telegram-webhook: database insert threw", {
        error,
        chatId,
        messageId,
        textPreview: text.trim().slice(0, 80),
      });
      return NextResponse.json(
        { error: "Database insert failed." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("telegram-webhook: unhandled error", error);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}

