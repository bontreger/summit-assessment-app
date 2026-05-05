interface DomainResult {
  domain: string;
  label: string;
  score: number;
  maturityLevel: string;
}

const ADVANCEMENT: Record<string, Record<string, string[]>> = {
  governance: {
    Initial: ['Establish RBAC configuration for automation platform', 'Define basic automation organizational structure', 'Document initial release management process'],
    Developing: ['Stand up a Community of Practice or Center of Excellence', 'Implement multi-team release pipelines', 'Streamline automation hub usage across teams'],
    Operational: ['Develop responsive automation governance policies', 'Integrate governance with organizational change management', 'Automate policy compliance checks in release pipelines'],
    Optimizing: ['Implement AI-based governance policy recommendations', 'Automate release validation and deployment', 'Establish continuous governance optimization'],
    Innovator: ['Continuously refine AI governance models', 'Share governance best practices across the industry', 'Drive innovation in automated policy management'],
  },
  platform: {
    Initial: ['Separate dev and prod environments', 'Plan for initial platform sizing', 'Establish basic backup procedures'],
    Developing: ['Optimize production sizing and HA configuration', 'Implement offsite resiliency', 'Enable advanced platform features'],
    Operational: ['Implement and test DR/multisite deployment', 'Enforce configuration consistency across environments', 'Establish automated drift detection'],
    Optimizing: ['Deploy AIOps for platform management', 'Implement automated policy enforcement', 'Enable predictive failure analysis'],
    Innovator: ['Continuously optimize AIOps models', 'Drive self-healing platform capabilities', 'Pioneer automated platform lifecycle management'],
  },
  devopsSkills: {
    Initial: ['Create repository templates for automation content', 'Establish basic quality gate pipelines', 'Develop initial onboarding materials'],
    Developing: ['Expand pipelines with test automation', 'Stand up centralized developer environments', 'Launch structured team onboarding programs'],
    Operational: ['Implement OpsEx configuration as code', 'Integrate AI code assistance into developer tooling', 'Formalize certification paths for automation engineers'],
    Optimizing: ['Deploy AI-driven DevEx and OpsEx management', 'Automate content lifecycle testing and deployment', 'Establish self-sustaining expertise programs'],
    Innovator: ['Continuously refine AI-driven developer experience', 'Contribute to industry automation practices', 'Drive innovation in automated skills development'],
  },
  useCases: {
    Initial: ['Identify automation use cases within a single domain', 'Implement foundational automation for a specific area', 'Document use case patterns for reuse'],
    Developing: ['Connect automation use cases to ITSM and service catalogs', 'Expand automation across multiple enterprise domains', 'Implement self-service automation portals'],
    Operational: ['Deploy Event-Driven Ansible for automated operations', 'Connect automation to measurable business outcomes', 'Implement cross-domain event response patterns'],
    Optimizing: ['Implement AI-driven use cases for self-managed infrastructure', 'Deploy self-healing automation patterns', 'Establish predictive remediation workflows'],
    Innovator: ['Continuously expand AI-driven autonomous operations', 'Pioneer next-generation automation patterns', 'Drive industry standards for intelligent automation'],
  },
};

const LEVEL_COLORS: Record<string, string> = {
  Initial: '#c9190b',
  Developing: '#f0ab00',
  Operational: '#06c',
  Optimizing: '#5752d1',
  Innovator: '#3e8635',
};

const LEVEL_LABELS = ['Initial', 'Developing', 'Operational', 'Optimizing', 'Innovator'];

const MATURITY_MODEL: Record<string, { label: string; levels: string[] }> = {
  governance: {
    label: 'Governance',
    levels: ['Team-Level Governance', 'Basic Governance', 'Proactive Governance', 'Advanced Governance', 'Fully Automated Governance'],
  },
  platform: {
    label: 'Platform',
    levels: ['Basic Platform Implementation', 'Separated Environments', 'Production Grade Platform', 'Mission Critical Platform', 'Automated Platform Management'],
  },
  devopsSkills: {
    label: 'Dev Exp',
    levels: ['Self-Managed Environments', 'Basic Dev Lifecycle', 'Platform and Dev Onboarding', 'SDLC for Automation Content', 'Optimized Developer Experience'],
  },
  useCases: {
    label: 'Use Cases',
    levels: ['Automation Building Blocks', 'Isolated Use Cases', 'Enterprise-Wide Automation', 'Event-Driven Operations', 'Next-Gen Automation'],
  },
};

function buildMaturityModelHtml(domainScores: DomainResult[]): string {
  const cellBase = 'padding:10px 6px;text-align:center;font-size:12px;line-height:1.3;border-radius:4px;font-weight:500';
  const defaultCell = `${cellBase};background:#f0f0f0;color:#6a6e73`;
  const currentCell = `${cellBase};background:#06c;color:#fff;font-weight:600`;
  const nextCell = `${cellBase};background:#f0ab00;color:#151515;font-weight:600`;

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
      <td style="padding:8px 12px;font-weight:600;font-size:13px;white-space:nowrap;vertical-align:middle">
        ${model.label}<br><span style="font-weight:400;font-size:11px;color:#6a6e73">${ds.score} / 5</span>
      </td>
      ${cells}
    </tr>`;
  }).join('');

  const levelHeaderCells = LEVEL_LABELS.map((label, i) =>
    `<th style="padding:6px 4px;text-align:center;font-size:11px;color:#6a6e73;font-weight:400;border-top:1px solid #ddd">
      <strong style="font-size:13px;color:#333">${i + 1}</strong><br>${label}
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
  <p style="font-size:12px;color:#555;text-align:center;margin-top:8px">
    <span style="display:inline-block;width:12px;height:12px;background:#06c;border-radius:2px;vertical-align:middle;margin-right:4px"></span> Current State
    &nbsp;&nbsp;&nbsp;
    <span style="display:inline-block;width:12px;height:12px;background:#f0ab00;border-radius:2px;vertical-align:middle;margin-right:4px"></span> Next Focus
  </p>`;
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
  const scoreRows = domainScores
    .map((ds) => {
      const color = LEVEL_COLORS[ds.maturityLevel] || '#6a6e73';
      return `
      <tr>
        <td style="padding:10px 12px;border:1px solid #ddd;font-weight:600">${ds.label}</td>
        <td style="padding:10px 12px;border:1px solid #ddd;text-align:center">
          <span style="display:inline-block;background:${color};color:#fff;padding:4px 12px;border-radius:4px;font-weight:600">${ds.score} / 5</span>
        </td>
        <td style="padding:10px 12px;border:1px solid #ddd">${ds.maturityLevel}</td>
      </tr>`;
    })
    .join('');

  const advancementRows = domainScores
    .map((ds) => {
      const levelIdx = Math.max(0, Math.floor(ds.score) - 1);
      const detail = ADVANCEMENT_DETAIL[ds.domain]?.[levelIdx];
      if (!detail) return '';
      const actionList = `<ul style="margin:4px 0 0 16px;padding:0">${detail.actions.map((a) => `<li style="font-size:13px">${a}</li>`).join('')}</ul>`;
      return `
      <tr>
        <td style="padding:12px;border:1px solid #ddd;font-weight:600;white-space:nowrap;vertical-align:top">${ds.label}</td>
        <td style="padding:12px;border:1px solid #ddd;vertical-align:top;font-size:13px">${detail.foundation}</td>
        <td style="padding:12px;border:1px solid #ddd;vertical-align:top">${actionList}</td>
        <td style="padding:12px;border:1px solid #ddd;vertical-align:top;font-style:italic;color:#555;font-size:13px">${detail.goals}</td>
      </tr>`;
    })
    .join('');

  const maturityModelHtml = buildMaturityModelHtml(domainScores);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333;max-width:720px;margin:0 auto;padding:20px">
  <p style="font-size:15px;line-height:1.6;color:#333;margin-bottom:24px">
    Thank you for connecting with us at <strong>Red Hat Summit</strong>! If you have questions about your results
    or are interested in improving your automation adoption maturity, our consulting team would love to help.
    <a href="https://www.redhat.com/en/services/consulting" style="color:#06c;text-decoration:none;font-weight:600">Contact Red Hat Consulting &rarr;</a>
  </p>

  <h1 style="color:#151515;border-bottom:3px solid #06c;padding-bottom:12px">${title}</h1>

  <h2 style="margin-top:24px">Automation Maturity Model</h2>
  ${maturityModelHtml}

  <h2 style="margin-top:32px">Domain Scores</h2>
  <table style="width:100%;border-collapse:collapse;margin:12px 0">
    <thead>
      <tr style="background:#f0f0f0">
        <th style="padding:10px;border:1px solid #ddd;text-align:left">Domain</th>
        <th style="padding:10px;border:1px solid #ddd;text-align:center">Score</th>
        <th style="padding:10px;border:1px solid #ddd;text-align:left">Level</th>
      </tr>
    </thead>
    <tbody>${scoreRows}</tbody>
  </table>

  <h2 style="margin-top:32px">Advancement Roadmap</h2>
  <table style="width:100%;border-collapse:collapse;margin:12px 0">
    <thead>
      <tr style="background:#f0f0f0">
        <th style="padding:10px;border:1px solid #ddd;text-align:left">Domain</th>
        <th style="padding:10px;border:1px solid #ddd;text-align:left">Verify Your Foundation</th>
        <th style="padding:10px;border:1px solid #ddd;text-align:left">Advancement Actions</th>
        <th style="padding:10px;border:1px solid #ddd;text-align:left">Future Goals</th>
      </tr>
    </thead>
    <tbody>${advancementRows}</tbody>
  </table>

  <hr style="margin:32px 0;border:none;border-top:1px solid #ddd">
  <p style="font-size:12px;color:#888">
    This report was generated by the Services Assessments application.
    For questions or to schedule a deeper assessment, contact your Red Hat account team.
  </p>
</body>
</html>`;
}
