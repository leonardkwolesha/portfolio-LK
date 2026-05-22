const nodemailer = require('nodemailer');

/**
 * Build a fresh transporter each time so env vars are always read
 * after dotenv has loaded. Also strips spaces from the App Password
 * (Google shows it as "xxxx xxxx xxxx xxxx" but SMTP needs no spaces).
 */
const createTransporter = () =>
  nodemailer.createTransport({
    host:   'smtp.gmail.com',
    port:   587,
    secure: false, // STARTTLS — more reliable than port-465 SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: (process.env.EMAIL_PASS || '').replace(/\s+/g, ''),
    },
    tls: {
      rejectUnauthorized: false, // avoids cert issues in some environments
    },
  });

/**
 * Called once at server startup. Logs ✅/❌ so you know immediately
 * whether Gmail auth is working before the first real submission.
 */
const verifyMailer = async () => {
  try {
    const t = createTransporter();
    await t.verify();
    console.log('✅ Mailer ready — Gmail SMTP connected');
  } catch (err) {
    console.error('❌ Mailer verify failed:', err.code, '|', err.message);
    console.error('   → Check EMAIL_USER / EMAIL_PASS in backend/.env');
  }
};

/**
 * Sends a formatted notification email to Leonard when someone
 * submits the portfolio contact form.
 *
 * @param {{ name: string, email: string, message: string }} data
 */
const sendContactNotification = async ({ name, email, message }) => {
  const escapedMessage = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f0f0f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:#0f0f14;padding:32px 40px;">
              <p style="margin:0 0 6px;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:#e8523a;font-weight:600;">Portfolio Contact</p>
              <h1 style="margin:0;font-size:1.5rem;color:#ffffff;font-weight:700;">New Message Received</h1>
              <p style="margin:8px 0 0;font-size:0.82rem;color:#9a9aaa;">Someone reached out via your portfolio</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- From -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="background:#f8f8fc;border-radius:10px;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:0.68rem;text-transform:uppercase;letter-spacing:0.15em;color:#9a9aaa;font-weight:600;">From</p>
                    <p style="margin:0;font-size:1rem;color:#1a1a2e;font-weight:600;">${name}</p>
                  </td>
                </tr>
              </table>

              <!-- Reply-to email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="background:#f8f8fc;border-radius:10px;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:0.68rem;text-transform:uppercase;letter-spacing:0.15em;color:#9a9aaa;font-weight:600;">Email</p>
                    <a href="mailto:${email}" style="margin:0;font-size:0.95rem;color:#e8523a;font-weight:500;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#f8f8fc;border-left:3px solid #e8523a;border-radius:0 10px 10px 0;padding:20px 24px;">
                    <p style="margin:0 0 10px;font-size:0.68rem;text-transform:uppercase;letter-spacing:0.15em;color:#9a9aaa;font-weight:600;">Message</p>
                    <p style="margin:0;font-size:0.93rem;color:#2a2a3e;line-height:1.75;">${escapedMessage}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <a href="mailto:${email}?subject=Re: Your message to Leonard Kwolesha"
                 style="display:inline-block;background:#e8523a;color:#ffffff;text-decoration:none;padding:13px 32px;border-radius:7px;font-size:0.88rem;font-weight:600;letter-spacing:0.02em;">
                Reply to ${name}
              </a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f8f8;padding:20px 40px;border-top:1px solid #eeeeee;">
              <p style="margin:0;font-size:0.73rem;color:#aaaaaa;">
                Sent automatically from your portfolio contact form &mdash;
                <a href="https://github.com/leonardkwolesha/portfolio-LK" style="color:#e8523a;text-decoration:none;">portfolio-LK</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const transporter = createTransporter();

  await transporter.sendMail({
    from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to:      process.env.EMAIL_USER,
    replyTo: email,
    subject: `New message from ${name} — Portfolio`,
    html,
  });
};

module.exports = { sendContactNotification, verifyMailer };
