import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      name,
      email,
      company,
      role,
      phone,
      timeline,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    } = data ?? {};

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    // 1) Отправка в Telegram через Bot API (самый надёжный канал в РФ)
    // Создай бота @BotFather и добавь переменные окружения в Vercel:
    // TG_BOT_TOKEN, TG_CHAT_ID
    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;

    if (token && chatId) {
      const text =
        `🧾 Заявка с сайта kovtun-cio.ru\n\n` +
        `Имя: ${name}\n` +
        `Email: ${email}\n` +
        `Компания: ${company || "-"}\n` +
        `Роль: ${role || "-"}\n` +
        `Телефон: ${phone || "-"}\n` +
        `Сроки: ${timeline || "-"}\n\n` +
        `Сообщение:\n${message}\n\n` +
        `UTM:\n` +
        `source=${utm_source || "-"}\n` +
        `medium=${utm_medium || "-"}\n` +
        `campaign=${utm_campaign || "-"}\n` +
        `content=${utm_content || "-"}\n` +
        `term=${utm_term || "-"}`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
