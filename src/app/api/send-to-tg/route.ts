import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getSupabaseAdminClient } from "@/lib/SupabaseClient";

type Body = {
  content?: unknown;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body;
    const content = typeof body.content === "string" ? body.content.trim() : "";

    if (!content) {
      return NextResponse.json({ error: "Missing `content`." }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      console.error("send-to-tg: Supabase admin client not configured");
      return NextResponse.json(
        {
          error:
            "Supabase admin client not configured (SUPABASE_SERVICE_ROLE_KEY missing).",
        },
        { status: 500 },
      );
    }

    const telegramToken = env("TELEGRAM_BOT_TOKEN");
    const myChatId = env("TELEGRAM_MY_CHAT_ID");
    if (!telegramToken || !myChatId) {
      console.error("send-to-tg: Telegram env vars not configured", {
        hasToken: Boolean(telegramToken),
        hasChatId: Boolean(myChatId),
      });
      return NextResponse.json(
        { error: "Telegram env vars not configured." },
        { status: 500 },
      );
    }

    // 1) Save to Supabase (user message).
    const { error: insertError } = await supabase.from("messages").insert({
      content,
      is_from_admin: false,
    });

    if (insertError) {
      console.error("send-to-tg: supabase insert failed", {
        error: insertError,
      });
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // 2) Send to Telegram.
    const parsedChatId = Number(myChatId);
    const chatId = Number.isFinite(parsedChatId) ? parsedChatId : myChatId;

    const tgRes = await fetch(
      `https://api.telegram.org/bot${telegramToken}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: content }),
      },
    );

    if (!tgRes.ok) {
      const text = await tgRes.text().catch(() => "");
      console.error("send-to-tg: telegram send failed", {
        status: tgRes.status,
        body: text,
      });
      return NextResponse.json(
        { error: `Telegram send failed. ${text}`.trim() },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("send-to-tg: unhandled error", error);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}

