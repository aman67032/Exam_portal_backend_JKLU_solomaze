import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const {
  SMTP_HOST,
  SMTP_PORT = 587,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE = 'false',
  FROM_EMAIL
} = process.env;

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  const secure = String(SMTP_SECURE).toLowerCase() === 'true';
  transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.resend.com',
    port: Number(SMTP_PORT) || 587,
    secure,
    auth: (SMTP_USER || SMTP_PASS) ? {
      user: SMTP_USER || 'resend',
      pass: SMTP_PASS
    } : undefined
  });
  return transporter;
}

app.get('/health', async (req, res) => {
  try {
    await getTransporter().verify();
    res.json({ status: 'ok' });
  } catch (e) {
    res.status(500).json({ status: 'error', error: String(e) });
  }
});

app.post('/send-email', async (req, res) => {
  try {
    const { to, from, subject, html, text } = req.body || {};
    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, (html or text)' });
    }
    const mailFrom = from || FROM_EMAIL || 'Paper Portal <no-reply@example.com>';

    const info = await getTransporter().sendMail({
      from: mailFrom,
      to,
      subject,
      html,
      text
    });
    res.json({ success: true, id: info.messageId });
  } catch (e) {
    console.error('Mailer error:', e);
    res.status(500).json({ error: String(e) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Email service listening on http://localhost:${port}`);
});


