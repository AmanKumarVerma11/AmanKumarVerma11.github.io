import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function nowIST() {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  }) + ' IST';
}

function buildNotificationEmail({ name, email, message, ip, userAgent, timestamp }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>New portfolio contact — Aman Kumar Verma</title>
</head>
<body style="margin:0;padding:0;background:#0F1012;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="max-width:580px;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#060610;padding:20px 28px;border-bottom:2px solid #6366F1;">
            <p style="margin:0;font-size:16px;font-weight:800;color:#F0F4FF;letter-spacing:-0.3px;">
              ✉️ New Portfolio Contact
            </p>
            <p style="margin:4px 0 0;font-size:12px;color:#8892B0;">${timestamp}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#0B0B1A;padding:28px;">
            <!-- Details -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="border:1px solid rgba(255,255,255,0.07);border-radius:10px;overflow:hidden;margin-bottom:22px;">
              <tr>
                <td style="padding:12px 18px;color:#8892B0;font-size:12px;font-weight:600;width:80px;background:rgba(255,255,255,0.02);border-bottom:1px solid rgba(255,255,255,0.05);">Name</td>
                <td style="padding:12px 18px;color:#F0F4FF;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 18px;color:#8892B0;font-size:12px;font-weight:600;background:rgba(255,255,255,0.02);">Email</td>
                <td style="padding:12px 18px;font-size:13px;">
                  <a href="mailto:${email}" style="color:#818CF8;text-decoration:none;">${email}</a>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#8892B0;text-transform:uppercase;">Message</p>
            <div style="border-left:3px solid #6366F1;padding:14px 18px;background:rgba(99,102,241,0.06);border-radius:0 8px 8px 0;margin-bottom:24px;">
              <p style="margin:0;font-size:14px;color:#C8D0E0;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>

            <!-- Reply CTA -->
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="border-radius:8px;background:#6366F1;">
                  <a href="mailto:${email}?subject=Re%3A%20Your%20message%20to%20Aman"
                    style="display:inline-block;padding:11px 22px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;">
                    Reply to ${name} →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Meta footer -->
        <tr>
          <td style="background:#060610;padding:12px 28px;border-top:1px solid rgba(255,255,255,0.05);">
            <p style="margin:0;font-size:11px;color:#8892B0;line-height:1.6;">
              <strong>IP:</strong> ${escapeHtml(ip)} &nbsp;·&nbsp;
              <strong>UA:</strong> ${escapeHtml(userAgent.substring(0, 80))}${userAgent.length > 80 ? '…' : ''}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  const ip        = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'Unknown';
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const timestamp = nowIST();

  const safeName    = escapeHtml(name);
  const safeEmail   = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  try {
    await resend.emails.send({
      from:    'Portfolio Contact <noreply@intrafy.in>',
      to:      'akverma11aug2002@gmail.com',
      replyTo: email,
      subject: `New portfolio contact from ${safeName}`,
      html:    buildNotificationEmail({
        name: safeName, email: safeEmail, message: safeMessage,
        ip, userAgent, timestamp,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
