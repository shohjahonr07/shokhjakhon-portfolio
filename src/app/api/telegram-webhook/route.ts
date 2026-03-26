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

    // Mandatory: service role bypass for RLS.
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
      throw new Error("Missing `process.env.SUPABASE_SERVICE_ROLE_KEY`.");
    }

    const supabaseAdmin = getSupabaseAdminClient();
    if (!supabaseAdmin) {
      throw new Error("Supabase admin client not configured.");
    }

    const telegramMyChatId = process.env.TELEGRAM_MY_CHAT_ID;
    const telegramMyChatIdStr = telegramMyChatId ? String(telegramMyChatId) : "";
    if (!telegramMyChatIdStr) {
      throw new Error("Missing `process.env.TELEGRAM_MY_CHAT_ID`.");
    }

    const msg = update.message ?? update.edited_message;
    const chatId = msg?.chat?.id;
    const text =
      (typeof msg?.text === "string" ? msg.text : "") ||
      (typeof msg?.caption === "string" ? msg.caption : "");

    const trimmed = text.trim();

    // Validation: only process messages if chat.id matches configured chat id.
    if (
      chatId != null &&
      String(chatId) === telegramMyChatIdStr &&
      trimmed.length > 0 &&
      !msg?.from?.is_bot
    ) {
      // Data mapping: insert into `content`, set `is_from_admin: true`.
      const { error: insertError } = await supabaseAdmin
        .from("messages")
        .insert({ content: trimmed, is_from_admin: true });

      // Ensure DB write confirmed before returning 200.
      if (insertError) throw insertError;
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("WEBHOOK_FAILED_CRITICAL:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}

