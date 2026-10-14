import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many messages were sent from this connection. Please try again later.' }
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, phone = '', subject = '', message } = req.body ?? {};
  const clean = value => typeof value === 'string' ? value.trim() : '';
  const fields = { name: clean(name), email: clean(email), phone: clean(phone), subject: clean(subject), message: clean(message) };

  if (fields.name.length < 2 || fields.name.length > 100) {
    return res.status(400).json({ message: 'Please enter a name between 2 and 100 characters.' });
  }
  if (fields.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }
  if (fields.phone.length > 30 || fields.subject.length > 120) {
    return res.status(400).json({ message: 'Please check the phone number or subject length.' });
  }
  if (fields.message.length < 10 || fields.message.length > 3000) {
    return res.status(400).json({ message: 'Please enter a message between 10 and 3000 characters.' });
  }

  const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER &&
    process.env.SMTP_PASS && process.env.CONTACT_EMAIL;

  if (!smtpConfigured) {
    console.warn('Contact form accepted in demo mode; SMTP is not configured.');
    return res.status(503).json({
      message: 'The form is running, but email delivery is not configured yet. Please set SMTP values in server/.env or contact the business directly.'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: fields.email,
      subject: `Website enquiry${fields.subject ? `: ${fields.subject}` : ''}`,
      text: [
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        `Phone: ${fields.phone || 'Not provided'}`,
        `Subject: ${fields.subject || 'General enquiry'}`,
        '',
        'Message:',
        fields.message
      ].join('\n')
    });
    return res.json({ message: 'Thanks for reaching out. Your message has been sent successfully.' });
  } catch (error) {
    console.error('Contact email delivery failed:', error?.message || error);
    return res.status(502).json({ message: 'We could not deliver your message right now. Please try again or contact us directly.' });
  }
});

app.listen(port, () => console.log(`Business landing page API listening on http://localhost:${port}`));
