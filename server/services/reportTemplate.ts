interface DomainResult {
  domain: string;
  label: string;
  score: number;
  maturityLevel: string;
}

const LOGO_URL = 'https://bontreger.github.io/summit-assessment-app/Logo-Red_Hat-Services-A-Standard-RGB.svg';
const LOGO_REVERSE_URL = 'https://bontreger.github.io/summit-assessment-app/Logo-Red_Hat-Services-A-Reverse-RGB.svg';

const RH = {
  red50: '#ee0000',
  gray10: '#f2f2f2',
  gray20: '#e0e0e0',
  gray30: '#c7c7c7',
  gray50: '#707070',
  gray60: '#4d4d4d',
  gray95: '#151515',
  white: '#ffffff',
  blue: '#0066cc',
  blueLight: '#73bcf7',
  orange40: '#f5921b',
  purple50: '#5e40be',
  teal60: '#147878',
};

const FONT_DISPLAY = "'Red Hat Display', Arial, Helvetica, sans-serif";
const FONT_TEXT = "'Red Hat Text', Arial, Helvetica, sans-serif";

const LEVEL_COLORS: Record<string, string> = {
  Initial: '#c9190b',
  Developing: '#f0ab00',
  Operational: RH.blue,
  Optimizing: RH.purple50,
  Innovator: '#3e8635',
};

const LEVEL_LABELS = ['Initial', 'Developing', 'Operational', 'Optimizing', 'Innovator'];

const MATURITY_MODEL: Record<string, { label: string; levels: string[] }> = {
  governance: {
    label: 'Governance & Strategy',
    levels: ['Team-Level Governance', 'Basic Governance', 'Proactive Governance', 'Advanced Governance', 'Fully Automated Governance'],
  },
  platform: {
    label: 'Platform',
    levels: ['Basic Platform Implementation', 'Separated Environments', 'Production Grade Platform', 'Mission Critical Platform', 'Automated Platform Management'],
  },
  devopsSkills: {
    label: 'DevEx, OpsEx & Skills',
    levels: ['Self-Managed Environments', 'Basic Dev Lifecycle', 'Platform and Dev Onboarding', 'SDLC for Automation Content', 'Optimized Developer Experience'],
  },
  useCases: {
    label: 'Use Cases',
    levels: ['Automation Building Blocks', 'Isolated Use Cases', 'Enterprise-Wide Automation', 'Event-Driven Operations', 'Next-Gen Automation'],
  },
};

function buildSectionHeader(text: string): string {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:32px 0 16px">
    <tr>
      <td style="padding-bottom:8px;border-bottom:2px solid ${RH.red50}">
        <span style="font-family:${FONT_DISPLAY};font-size:18px;font-weight:700;color:${RH.gray95}">
          ${text}
        </span>
      </td>
    </tr>
  </table>`;
}

function buildMaturityModelHtml(domainScores: DomainResult[]): string {
  const cellBase = `font-family:${FONT_TEXT};padding:10px 6px;text-align:center;font-size:12px;line-height:1.3;font-weight:500`;
  const defaultCell = `${cellBase};background:${RH.gray10};color:${RH.gray50}`;
  const currentCell = `${cellBase};background:${RH.blue};color:${RH.white};font-weight:700`;
  const nextCell = `${cellBase};background:${RH.orange40};color:${RH.white};font-weight:700`;

  const rows = domainScores.map((ds) => {
    const model = MATURITY_MODEL[ds.domain];
    if (!model) return '';

    const currentLevel = Math.max(1, Math.floor(ds.score));
    const nextLevel = currentLevel < 5 ? currentLevel + 1 : null;

    const cells = model.levels.map((cellLabel, i) => {
      const level = i + 1;
      let style = defaultCell;
      if (level === currentLevel) style = currentCell;
      else if (level === nextLevel) style = nextCell;
      return `<td style="${style}">${cellLabel}</td>`;
    }).join('');

    return `<tr>
      <td style="padding:8px 12px;font-weight:700;font-size:13px;white-space:nowrap;vertical-align:middle;font-family:${FONT_TEXT}">
        ${model.label}<br><span style="font-weight:400;font-size:11px;color:${RH.gray50}">${ds.score} / 5</span>
      </td>
      ${cells}
    </tr>`;
  }).join('');

  const levelHeaderCells = LEVEL_LABELS.map((label, i) =>
    `<th style="padding:6px 4px;text-align:center;font-size:11px;color:${RH.gray50};font-weight:400;border-top:1px solid ${RH.gray20};font-family:${FONT_TEXT}">
      <strong style="font-size:13px;color:${RH.gray60}">${i + 1}</strong><br>${label}
    </th>`
  ).join('');

  return `
  <table style="width:100%;border-collapse:separate;border-spacing:4px;margin:12px 0">
    <tbody>
      ${rows}
      <tr>
        <td></td>
        ${levelHeaderCells}
      </tr>
    </tbody>
  </table>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:8px">
    <tr>
      <td align="center" style="font-family:${FONT_TEXT};font-size:12px;color:${RH.gray50}">
        <span style="display:inline-block;width:12px;height:12px;background:${RH.blue};border-radius:2px;vertical-align:middle;margin-right:4px"></span> Current State
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span style="display:inline-block;width:12px;height:12px;background:${RH.orange40};border-radius:2px;vertical-align:middle;margin-right:4px"></span> Next Focus
      </td>
    </tr>
  </table>`;
}

const ADVANCEMENT_DETAIL: Record<string, { foundation: string; actions: string[]; goals: string }[]> = {
  governance: [
    { foundation: 'Automation platform is accessible to relevant teams with individual accounts', actions: ['Integrate external identity providers for centralized access management', 'Define initial RBAC policies and team-level permissions', 'Set up a version control repository for automation content'], goals: 'A cross-team Community of Practice coordinates automation strategy and standardized release pipelines' },
    { foundation: 'RBAC is configured with centralized identity; automation content is in version control', actions: ['Establish a Community of Practice or Center of Excellence for automation', 'Implement multi-team release pipelines with peer review gates', 'Standardize automation hub usage and content sharing across teams'], goals: 'Adaptive governance policies with automated compliance integrated into release pipelines' },
    { foundation: 'A CoP or CoE actively coordinates governance; release pipelines serve multiple teams consistently', actions: ['Develop governance policies that proactively adapt to organizational changes', 'Integrate governance processes with organizational change management', 'Add automated policy compliance checks to release pipelines'], goals: 'AI-informed governance that continuously optimizes alignment and compliance' },
    { foundation: 'Governance policies are proactive and adaptive; automated quality gates enforce compliance', actions: ['Pilot AI-based governance policy recommendations', 'Fully automate release validation and deployment workflows', 'Establish metrics for continuous governance optimization'], goals: 'Autonomous governance with AI-driven policy management across the enterprise' },
    { foundation: 'AI-informed governance continuously optimizes organizational alignment and compliance', actions: ['Refine AI governance models through feedback loops and outcome analysis', 'Contribute governance best practices to the broader industry', 'Explore next-generation policy automation capabilities'], goals: 'Industry-leading governance that sets the standard for automation maturity' },
  ],
  platform: [
    { foundation: 'An Ansible Automation Platform instance is deployed and operational', actions: ['Separate development and production environments', 'Plan initial platform sizing based on workload projections', 'Establish basic backup and recovery procedures'], goals: 'A production-grade platform with offsite resiliency and advanced features in active use' },
    { foundation: 'Development and production environments are separated; basic backups are in place', actions: ['Optimize platform sizing for production workloads and enable high availability', 'Implement offsite resiliency for disaster scenarios', 'Enable and adopt advanced platform features'], goals: 'A mission-critical platform with tested DR and automated configuration consistency' },
    { foundation: 'Platform is production-grade with offsite resiliency; advanced features are actively used', actions: ['Implement and test DR or multisite deployment', 'Enforce configuration consistency across all environments', 'Deploy automated drift detection and remediation'], goals: 'AIOps-managed platform with automated scaling and self-optimization' },
    { foundation: 'DR is tested and validated; configuration consistency is enforced across all sites', actions: ['Deploy AIOps capabilities for platform management', 'Implement automated policy enforcement for platform operations', 'Enable predictive failure analysis and proactive remediation'], goals: 'Fully autonomous platform management with self-healing infrastructure' },
    { foundation: 'AIOps manages the platform with automated policy enforcement and scaling', actions: ['Continuously optimize AIOps models with operational feedback', 'Expand self-healing capabilities across all platform components', 'Pioneer automated platform lifecycle management practices'], goals: 'Industry-leading platform operations setting new standards for automation infrastructure' },
  ],
  devopsSkills: [
    { foundation: 'Team members have access to automation tooling and can create automation content', actions: ['Create standardized repository templates for automation projects', 'Establish basic quality gate pipelines for content validation', 'Develop initial onboarding documentation for new automation developers'], goals: 'Centralized developer environments with structured onboarding and test automation in pipelines' },
    { foundation: 'Repository templates and basic quality gate pipelines are available for teams', actions: ['Expand CI/CD pipelines with automated testing for automation content', 'Stand up centralized or standardized developer environments', 'Launch structured team onboarding programs with enablement sessions'], goals: 'Configuration as code with AI-assisted development and formal certification paths' },
    { foundation: 'Centralized developer environments are available; test automation is integrated into pipelines', actions: ['Implement operational configuration as code practices', 'Integrate AI code assistance into developer tooling', 'Formalize certification paths for automation engineers'], goals: 'AI-driven DevEx and OpsEx that autonomously manages content lifecycle' },
    { foundation: 'Configuration is managed as code; AI-assisted tooling supports development workflows', actions: ['Deploy AI-driven DevEx and OpsEx management capabilities', 'Automate content lifecycle testing and deployment end-to-end', 'Establish self-sustaining expertise and knowledge sharing programs'], goals: 'Fully autonomous developer experience with self-sustaining expertise across all teams' },
    { foundation: 'AI-driven tooling manages automation content lifecycle, testing, and deployment', actions: ['Continuously refine AI-driven developer experience based on team feedback', 'Contribute to industry automation development practices', 'Explore next-generation skills development automation'], goals: 'Industry-leading developer experience that attracts and retains top automation talent' },
  ],
  useCases: [
    { foundation: 'Teams are writing and running automation for individual tasks and specific needs', actions: ['Identify automation use cases within a single domain for broader adoption', 'Implement foundational automation patterns for a targeted area', 'Document use case patterns and templates for reuse across teams'], goals: 'Enterprise-wide automation connected to ITSM and service catalogs' },
    { foundation: 'Automation use cases are established within specific domains or teams', actions: ['Connect automation to ITSM and service catalog platforms', 'Expand automation coverage across multiple enterprise domains', 'Implement self-service automation portals for common workflows'], goals: 'Event-driven automation with measurable business outcomes across the enterprise' },
    { foundation: 'Automation spans the enterprise, connected to ITSM and self-service portals', actions: ['Deploy Event-Driven Ansible for automated operations', 'Connect automation outcomes to measurable business metrics', 'Implement cross-domain event response and orchestration patterns'], goals: 'AI-driven use cases with self-managed and self-healing infrastructure' },
    { foundation: 'Event-Driven Ansible responds to events; automation drives measurable business outcomes', actions: ['Implement AI-driven use cases for self-managed infrastructure', 'Deploy self-healing automation patterns for critical systems', 'Establish predictive remediation workflows based on historical data'], goals: 'Autonomous operations with predictive remediation across all infrastructure' },
    { foundation: 'AI-driven use cases enable self-managed and self-healing infrastructure', actions: ['Continuously expand AI-driven autonomous operations coverage', 'Pioneer next-generation automation patterns and architectures', 'Drive industry standards for intelligent automation'], goals: 'Industry-defining automation that pushes the boundaries of autonomous operations' },
  ],
};

export function buildReportHtml(
  title: string,
  domainScores: DomainResult[],
): string {
  const thStyle = `padding:10px 14px;font-family:${FONT_TEXT};font-size:13px;font-weight:700;color:${RH.gray95};border-bottom:2px solid ${RH.gray20};text-align:left`;
  const tdStyle = `padding:10px 14px;font-family:${FONT_TEXT};font-size:13px;border-bottom:1px solid ${RH.gray10};color:${RH.gray95}`;

  const scoreRows = domainScores
    .map((ds) => {
      const color = LEVEL_COLORS[ds.maturityLevel] || RH.gray50;
      return `
      <tr>
        <td style="${tdStyle};font-weight:600">${ds.label}</td>
        <td style="${tdStyle};text-align:center">
          <span style="display:inline-block;background:${color};color:${RH.white};padding:3px 12px;border-radius:3px;font-weight:700;font-size:13px">${ds.score} / 5</span>
        </td>
        <td style="${tdStyle}">${ds.maturityLevel}</td>
      </tr>`;
    })
    .join('');

  const advancementRows = domainScores
    .map((ds) => {
      const levelIdx = Math.max(0, Math.floor(ds.score) - 1);
      const detail = ADVANCEMENT_DETAIL[ds.domain]?.[levelIdx];
      if (!detail) return '';
      const actionList = `<ul style="margin:4px 0 0 16px;padding:0">${detail.actions.map((a) => `<li style="font-family:${FONT_TEXT};font-size:13px;color:${RH.gray95};padding:2px 0">${a}</li>`).join('')}</ul>`;
      return `
      <tr>
        <td style="${tdStyle};font-weight:600;white-space:nowrap;vertical-align:top">${ds.label}</td>
        <td style="${tdStyle};vertical-align:top;font-size:13px">${detail.foundation}</td>
        <td style="${tdStyle};vertical-align:top">${actionList}</td>
        <td style="${tdStyle};vertical-align:top;font-style:italic;color:${RH.gray50};font-size:13px">${detail.goals}</td>
      </tr>`;
    })
    .join('');

  const maturityModelHtml = buildMaturityModelHtml(domainScores);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700&family=Red+Hat+Text:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:${RH.gray10};-webkit-text-size-adjust:100%">

  <!--[if mso]><table width="680" cellpadding="0" cellspacing="0" align="center" role="presentation"><tr><td><![endif]-->

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${RH.gray10}">
    <tr><td align="center" style="padding:32px 16px">

      <table width="680" cellpadding="0" cellspacing="0" role="presentation" style="background:${RH.white};max-width:680px;width:100%;border-radius:3px;overflow:hidden;box-shadow:0 2px 4px rgba(21,21,21,0.12)">

        <!-- ====== RED ACCENT BAR ====== -->
        <tr><td style="height:4px;background:${RH.red50};font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- ====== HEADER BANNER ====== -->
        <tr><td style="padding:28px 32px;background:${RH.white};border-bottom:1px solid ${RH.gray20}">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="vertical-align:middle;width:220px">
                <img src="${LOGO_URL}" alt="Red Hat Services" style="height:36px;width:auto;display:block">
              </td>
              <td style="text-align:right;vertical-align:middle">
                <span style="font-family:${FONT_DISPLAY};font-size:20px;font-weight:700;color:${RH.gray95};line-height:1.2">
                  Red Hat Summit
                </span><br>
                <span style="font-family:${FONT_DISPLAY};font-size:16px;font-weight:500;color:${RH.gray60};line-height:1.4">
                  Automation Assessment Report
                </span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- ====== BODY CONTENT ====== -->
        <tr><td style="padding:32px;font-family:${FONT_TEXT};font-size:14px;line-height:1.6;color:${RH.gray95}">

          <!-- Intro -->
          <p style="margin:0 0 28px;font-size:15px;color:${RH.gray60};line-height:1.7">
            Thank you for connecting with us at <strong style="color:${RH.gray95}">Red Hat Summit</strong>!
            If you have questions about your results or are interested in improving your automation adoption maturity,
            our consulting team would love to help.<br><br>
            <a href="https://www.redhat.com/en/services/consulting" style="color:${RH.blue};text-decoration:none;font-weight:700">Contact Red Hat Consulting &rarr;</a>
          </p>

          <!-- Section: Maturity Model -->
          ${buildSectionHeader('Automation Maturity Model')}
          ${maturityModelHtml}

          <!-- Section: Domain Scores -->
          ${buildSectionHeader('Domain Scores')}
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:12px 0">
            <thead>
              <tr>
                <th style="${thStyle}">Domain</th>
                <th style="${thStyle};text-align:center">Score</th>
                <th style="${thStyle}">Level</th>
              </tr>
            </thead>
            <tbody>${scoreRows}</tbody>
          </table>

          <!-- Section: Advancement Roadmap -->
          ${buildSectionHeader('Advancement Roadmap')}
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:12px 0">
            <thead>
              <tr>
                <th style="${thStyle}">Domain</th>
                <th style="${thStyle}">Verify Your Foundation</th>
                <th style="${thStyle}">Advancement Actions</th>
                <th style="${thStyle}">Future Goals</th>
              </tr>
            </thead>
            <tbody>${advancementRows}</tbody>
          </table>

        </td></tr>

        <!-- ====== FOOTER ====== -->
        <tr><td style="padding:24px 32px;background:${RH.gray95}">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="vertical-align:middle">
                <img src="${LOGO_REVERSE_URL}" alt="Red Hat" style="height:28px;width:auto;display:block">
              </td>
              <td style="text-align:right;vertical-align:middle;font-family:${FONT_TEXT};font-size:12px;color:${RH.gray30};line-height:1.5">
                Generated by Red Hat Services Assessments<br>
                <a href="https://www.redhat.com/en/services/consulting" style="color:${RH.blueLight};text-decoration:none">Schedule a deeper assessment &rarr;</a>
              </td>
            </tr>
          </table>
        </td></tr>

      </table>

    </td></tr>
  </table>

  <!--[if mso]></td></tr></table><![endif]-->

</body>
</html>`;
}
