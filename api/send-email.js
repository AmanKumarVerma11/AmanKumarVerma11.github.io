import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const LIMITS = { name: 120, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE = { windowMs: 60 * 60 * 1000, max: 5 };

// Per-instance rate limit. Vercel can run several warm instances concurrently
// and cold starts reset this map, so it raises the cost of casual abuse rather
// than enforcing a global cap. Move to Vercel KV / Upstash for a hard limit.
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const cutoff = now - RATE.windowMs;

  const recent = (hits.get(ip) ?? []).filter(t => t > cutoff);
  if (recent.length >= RATE.max) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Bound the map so a spray of unique IPs cannot grow it without limit.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some(t => t > cutoff)) hits.delete(key);
    }
  }
  return false;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// CR/LF out of anything that lands in a mail header.
function headerSafe(str) {
  return String(str).replace(/[\r\n]+/g, ' ').trim();
}

function nowIST() {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  }) + ' IST';
}

function buildNotificationEmail({ name, email, message, ip, userAgent, timestamp }) {
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: Your message to Aman`)}`;

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
            <p style="margin:4px 0 0;font-size:12px;color:#8892B0;">${escapeHtml(timestamp)}</p>
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
                <td style="padding:12px 18px;color:#F0F4FF;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding:12px 18px;color:#8892B0;font-size:12px;font-weight:600;background:rgba(255,255,255,0.02);">Email</td>
                <td style="padding:12px 18px;font-size:13px;">
                  <a href="mailto:${encodeURIComponent(email)}" style="color:#818CF8;text-decoration:none;">${escapeHtml(email)}</a>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#8892B0;text-transform:uppercase;">Message</p>
            <div style="border-left:3px solid #6366F1;padding:14px 18px;background:rgba(99,102,241,0.06);border-radius:0 8px 8px 0;margin-bottom:24px;">
              <p style="margin:0;font-size:14px;color:#C8D0E0;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
            </div>

            <!-- Reply CTA -->
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="border-radius:8px;background:#6366F1;">
                  <a href="${replyHref}"
                    style="display:inline-block;padding:11px 22px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;">
                    Reply to ${escapeHtml(name)} →
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

  const body = typeof req.body === 'string'
    ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })()
    : req.body ?? {};

  // Honeypot: real users never see this field. Report success so bots that fill
  // it in do not learn they were dropped.
  if (body.website) {
    return res.status(200).json({ success: true });
  }

  const name    = typeof body.name    === 'string' ? body.name.trim()    : '';
  const email   = typeof body.email   === 'string' ? body.email.trim()   : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'Unknown';

  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  }

  const userAgent = req.headers['user-agent'] || 'Unknown';

  try {
    await resend.emails.send({
      from:    'Portfolio Contact <noreply@intrafy.in>',
      to:      'akverma11aug2002@gmail.com',
      replyTo: email,
      subject: `New portfolio contact from ${headerSafe(name)}`,
      html:    buildNotificationEmail({
        name, email, message,
        ip, userAgent, timestamp: nowIST(),
      }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
