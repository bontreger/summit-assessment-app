# TDP Assessments — Summit Assessment App

A web application for assessing customer automation maturity across four domains: **Product Usage**, **Performance**, **Proficiency**, and **Perception**.

## Features

- **8-question self-assessment** on a 1–5 scale with anchor descriptions at levels 1, 3, and 5
- **Weighted multi-domain scoring** — each question contributes to one or more domains with configurable weights
- **Radar chart** visualization of domain scores
- **Email report** (developer preview available client-side) with scores, key indicators matrix, and personalized advancement guidance
- **Settings page** with Developer Mode toggle for email preview without a mail server
- **PatternFly UI** with side navigation, designed to host multiple assessments over time
- **GitHub Pages deployment** via GitHub Actions, or full-stack on OpenShift with the Express backend

## GitHub Pages (Static)

The app is deployed to GitHub Pages as a static site. Push to `main` triggers the deploy workflow automatically.

Live URL: `https://bontreger.github.io/summit-assessment-app/`

To build locally for static hosting:

```bash
npm install
npm run build:pages
```

The output in `dist/` can be served by any static file server.

## Local Development

```bash
npm install
npm run dev
```

This starts the Vite dev server (http://localhost:5173) and Express API (http://localhost:3001) concurrently. The Express backend is only needed for the email sending feature.

## Production Build (Full-Stack)

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

These apply when running with the Express backend (not needed for GitHub Pages).

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

## Scoring Model

Each of the 8 questions is answered on a 1–5 scale. Questions contribute to multiple domains with different weights:

| Question | Product Usage | Performance | Proficiency | Perception |
|---|---|---|---|---|
| Q1 Execution Model | 100% | | | 25% |
| Q2 Standardization & Content Sharing | 75% | | 50% | |
| Q3 Code to Production | 25% | 100% | | |
| Q4 Developer Experience | 25% | | 100% | 50% |
| Q5 Measurement & Business Impact | | 100% | | 25% |
| Q6 Compliance & SLA Alignment | 25% | 50% | | 25% |
| Q7 Skills & Enablement | | | 100% | 25% |
| Q8 Org Value & Sponsorship | | 50% | | 100% |

Domain scores are computed as `sum(answer × weight) / sum(weights)` for all contributing questions.

## Adding a New Assessment

1. Create a data file in `src/data/` following the structure in `automation-maturity.ts`
2. Define the `domainWeights` map for cross-domain scoring
3. Register it in `src/data/assessment-registry.ts`
4. It automatically appears in the side navigation

## Tech Stack

- **Frontend:** React 19, TypeScript, PatternFly 6, Chart.js
- **Backend:** Node.js, Express (optional — only for email sending)
- **Build:** Vite
- **Deployment:** GitHub Pages (static) or OpenShift (full-stack)
- **Email:** Nodemailer (pluggable provider), client-side preview via Developer Mode
