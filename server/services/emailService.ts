import nodemailer from 'nodemailer';

type Provider = 'smtp' | 'stub';

function getProvider(): Provider {
  const env = (process.env.EMAIL_PROVIDER || 'stub').toLowerCase();
  if (env === 'smtp') return 'smtp';
  return 'stub';
}

function createSmtpTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth:
      process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || '' }
        : undefined,
  });
}

export async function sendReport(
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  const provider = getProvider();
  const from = process.env.EMAIL_FROM || 'noreply@tdp-assessments.example.com';

  if (provider === 'stub') {
    console.log('─── EMAIL STUB ───');
    console.log(`To:      ${to}`);
    console.log(`From:    ${from}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML length: ${html.length} chars`);
    console.log('──────────────────');
    return;
  }

  const transporter = createSmtpTransport();
  await transporter.sendMail({ from, to, subject, html });
}
