import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getSupabaseAdminClient } from "@/lib/SupabaseClient";

type Body = {
  content?: unknown;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;
  const content = typeof body.content === "string" ? body.content.trim() : "";

  if (!content) {
    return NextResponse.json(
      { error: "Missing `content`." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase admin client not configured." },
      { status: 500 },
    );
  }

  const telegramToken = env("TELEGRAM_BOT_TOKEN");
  const myChatId = env("TELEGRAM_MY_CHAT_ID");
  if (!telegramToken || !myChatId) {
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
    return NextResponse.json(
      { error: insertError.message },
      { status: 500 },
    );
  }

  // 2) Send to Telegram.
  const tgRes = await fetch(
    `https://api.telegram.org/bot${telegramToken}/sendMessage`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: myChatId, text: content }),
    },
  );

  if (!tgRes.ok) {
    const text = await tgRes.text().catch(() => "");
    return NextResponse.json(
      { error: `Telegram send failed. ${text}`.trim() },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

