import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name, email, phone, company, message, items } = await req.json();

        const SMTP_HOST = process.env.SMTP_HOST || '';
        const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
        const SMTP_USER = process.env.SMTP_USER || '';
        const SMTP_PASS = process.env.SMTP_PASS || '';
        const TO_EMAIL = 'sales@ladexgroup.com';

        if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
            // SMTP not configured — skip silently (quote is already saved to Strapi)
            return NextResponse.json({ ok: true, note: 'SMTP not configured' });
        }

        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST, port: SMTP_PORT, secure: SMTP_PORT === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        const itemsHtml = (items as Array<{ productName: string; quantity: number }>)
            .map(i => `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i.productName}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td></tr>`)
            .join('');

        await transporter.sendMail({
            from: `"Ladex Group Website" <${SMTP_USER}>`,
            to: TO_EMAIL,
            replyTo: email,
            subject: `New Quote Request from ${name}`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
                    <div style="background:#0f0f0f;padding:24px;text-align:center">
                        <h1 style="color:#c9a227;margin:0;font-size:1.5rem">LADEX GROUP</h1>
                        <p style="color:rgba(255,255,255,.6);margin:4px 0 0;font-size:0.85rem">New Quote Request</p>
                    </div>
                    <div style="padding:24px;background:#fff">
                        <h2 style="font-size:1.1rem;margin-bottom:16px">Customer Details</h2>
                        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
                            <tr><td style="padding:8px;color:#666;width:140px">Name</td><td style="padding:8px;font-weight:600">${name}</td></tr>
                            <tr><td style="padding:8px;color:#666">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
                            ${phone ? `<tr><td style="padding:8px;color:#666">Phone</td><td style="padding:8px">${phone}</td></tr>` : ''}
                            ${company ? `<tr><td style="padding:8px;color:#666">Company</td><td style="padding:8px">${company}</td></tr>` : ''}
                        </table>
                        <h2 style="font-size:1.1rem;margin-bottom:16px">Products Requested</h2>
                        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
                            <thead><tr style="background:#f5f5f5"><th style="padding:8px;text-align:left">Product</th><th style="padding:8px;text-align:center">Qty</th></tr></thead>
                            <tbody>${itemsHtml}</tbody>
                        </table>
                        ${message ? `<h2 style="font-size:1.1rem;margin-bottom:8px">Message</h2><p style="color:#444;line-height:1.7">${message}</p>` : ''}
                    </div>
                    <div style="background:#f9f9f9;padding:16px;text-align:center;font-size:0.8rem;color:#999">
                        Ladex Group · sales@ladexgroup.com · Germany +49 1521 816 2816
                    </div>
                </div>`,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Quote email error:', err);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
