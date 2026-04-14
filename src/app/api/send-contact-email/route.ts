import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'sales@ladexgroup.com';
const FROM_EMAIL = 'website@ladexgroup.com';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { full_name, email, phone, service, subject, message } = await req.json();

    await resend.emails.send({
      from: `Ladex Group Website <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Enquiry: ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:620px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden">
          <div style="background:#0f0f0f;padding:28px 32px">
            <h1 style="color:#c9a227;margin:0;font-size:1.4rem;font-weight:900;letter-spacing:0.05em">LADEX GROUP</h1>
            <p style="color:rgba(255,255,255,.5);margin:4px 0 0;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em">New Enquiry from Website</p>
          </div>

          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
              <tr>
                <td style="padding:10px 0;color:#888;font-size:0.85rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;width:120px;vertical-align:top;border-bottom:1px solid #f0f0f0">Name</td>
                <td style="padding:10px 0;font-weight:700;color:#111;border-bottom:1px solid #f0f0f0">${full_name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888;font-size:0.85rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;border-bottom:1px solid #f0f0f0">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="mailto:${email}" style="color:#c9a227;font-weight:700">${email}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding:10px 0;color:#888;font-size:0.85rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;border-bottom:1px solid #f0f0f0">Phone</td>
                <td style="padding:10px 0;font-weight:600;color:#111;border-bottom:1px solid #f0f0f0">${phone}</td>
              </tr>` : ''}
              <tr>
                <td style="padding:10px 0;color:#888;font-size:0.85rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;border-bottom:1px solid #f0f0f0">Service</td>
                <td style="padding:10px 0;font-weight:600;color:#111;border-bottom:1px solid #f0f0f0">${service}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888;font-size:0.85rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top">Subject</td>
                <td style="padding:10px 0;font-weight:600;color:#111">${subject}</td>
              </tr>
            </table>

            <div style="background:#f9f9f9;border-left:3px solid #c9a227;padding:20px 24px;border-radius:0 4px 4px 0">
              <p style="margin:0 0 8px;font-size:0.8rem;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#888">Message</p>
              <p style="margin:0;color:#333;line-height:1.75;white-space:pre-wrap">${message}</p>
            </div>
          </div>

          <div style="background:#f5f5f5;padding:20px 32px;text-align:center;font-size:0.8rem;color:#999;border-top:1px solid #e5e5e5">
            Ladex Group · sales@ladexgroup.com · Germany +49 1521 816 2816<br/>
            <span style="font-size:0.75rem">Reply directly to this email to respond to ${full_name}</span>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact email error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
