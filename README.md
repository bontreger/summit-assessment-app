# TDP Assessments — Summit Assessment App

A web application for assessing customer automation maturity across four domains: **Product Usage**, **Performance**, **Proficiency**, and **Perception**.

## Features

- **10-question self-assessment** on a 1–10 scale with level descriptors at key maturity stages
- **Radar chart** visualization of domain scores
- **Email report** with scores, grading rubric, and personalized advancement guidance
- **PatternFly UI** with side navigation, designed to host multiple assessments over time
- **OpenShift-ready** with a multi-stage Dockerfile

## Quick Start

```bash
npm install
npm run dev
```

This starts the Vite dev server (http://localhost:5173) and Express API (http://localhost:3001) concurrently.

## Production Build

```bash
npm run build
npm start
```

The built app serves on port 3001 (configurable via `PORT` env var).

## Container Build

```bash
podman build -t summit-assessment-app .
podman run -p 8080:8080 summit-assessment-app
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` (dev) / `8080` (container) | Server listen port |
| `EMAIL_PROVIDER` | `stub` | `stub` (logs to console) or `smtp` |
| `SMTP_HOST` | `localhost` | SMTP server hostname |
| `SMTP_PORT` | `587` | SMTP server port |
| `SMTP_SECURE` | `false` | Use TLS for SMTP |
| `SMTP_USER` | — | SMTP auth username |
| `SMTP_PASS` | — | SMTP auth password |
| `EMAIL_FROM` | `noreply@tdp-assessments.example.com` | Sender address |

## Adding a New Assessment

1. Create a data file in `src/data/` following the structure in `automation-maturity.ts`
2. Register it in `src/data/assessment-registry.ts`
3. It automatically appears in the side navigation

## Tech Stack

- **Frontend:** React 18, TypeScript, PatternFly, Chart.js
- **Backend:** Node.js, Express
- **Build:** Vite
- **Email:** Nodemailer (pluggable provider)
