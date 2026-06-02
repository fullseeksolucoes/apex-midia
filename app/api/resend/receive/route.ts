import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { resend } from "@/lib/resend";

import { db } from "@/lib/db";

export const POST = async (request: NextRequest) => {
  const body = await request.text();
  const secret = process.env.RESEND_WEBHOOK_SECRET;

  if (secret && resend) {
    try {
      resend.webhooks.verify({
        payload: body,
        headers: {
          id: request.headers.get("svix-id") ?? "",
          timestamp: request.headers.get("svix-timestamp") ?? "",
          signature: request.headers.get("svix-signature") ?? "",
        },
        webhookSecret: secret,
      });
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  const event = JSON.parse(body);

  if (event.type !== "email.received") {
    return NextResponse.json({ ok: true });
  }

  const { email_id } = event.data;

  try {
    const existing = await db.receivedEmail.findUnique({
      where: { emailId: email_id },
    });
    if (existing) {
      return NextResponse.json({ ok: true });
    }

    if (!resend) {
      return NextResponse.json({ error: "Resend not configured" }, { status: 500 });
    }

    const { data: email } = await resend.emails.receiving.get(email_id);

    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    await db.receivedEmail.create({
      data: {
        emailId: email_id,
        from: email.from,
        to: email.to,
        cc: email.cc ?? [],
        bcc: email.bcc ?? [],
        subject: email.subject,
        textBody: email.text,
        htmlBody: email.html,
      },
    });
  } catch (error) {
    console.error("Failed to process received email:", error);
  }

  return NextResponse.json({ ok: true });
};
