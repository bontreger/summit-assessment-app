import { Router, Request, Response } from 'express';
import { sendReport } from '../services/emailService';
import { buildReportHtml } from '../services/reportTemplate';

export const emailRouter = Router();

interface SendReportBody {
  email: string;
  assessmentId: string;
  assessmentTitle: string;
  answers: Record<string, number>;
  domainScores: Array<{
    domain: string;
    label: string;
    score: number;
    maturityLevel: string;
  }>;
}

emailRouter.post('/preview-report', (req: Request, res: Response) => {
  const body = req.body as SendReportBody;

  if (!body.domainScores) {
    res.status(400).json({ error: 'domainScores is required' });
    return;
  }

  const html = buildReportHtml(body.assessmentTitle, body.domainScores);
  res.json({ html });
});

emailRouter.post('/send-report', async (req: Request, res: Response) => {
  const body = req.body as SendReportBody;

  if (!body.email || !body.domainScores) {
    res.status(400).json({ error: 'email and domainScores are required' });
    return;
  }

  try {
    const html = buildReportHtml(body.assessmentTitle, body.domainScores);
    await sendReport(body.email, `${body.assessmentTitle} — Your Results`, html);
    res.json({ success: true });
  } catch (err: unknown) {
    console.error('Failed to send report:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});
