import { NextRequest, NextResponse } from "next/server";

/**
 * Lead intake. For production, wire an email service here, e.g. Resend:
 *
 *   import { Resend } from "resend";
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "site@veny.gr",
 *     to: process.env.VENY_EMAIL!,
 *     subject: `Νέο αίτημα από ${data.name}`,
 *     text: `${data.name} · ${data.email} · ${data.phone}\n\n${data.message}\n\nΙστορικό:\n${transcript}`,
 *   });
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data?.name || !data?.email) {
      return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
    }
    // TODO: send notification email to Veny + store the lead.
    console.log("[veny lead]", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: data.source,
      messages: Array.isArray(data.transcript) ? data.transcript.length : 0,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
