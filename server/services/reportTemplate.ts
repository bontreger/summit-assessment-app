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

const LEVEL_HEADERS = ['1', '2', '3', '4', '5'];

interface MatrixThread {
  name: string;
  cells: (string | null)[];
}

interface MatrixDomain {
  domainLabel: string;
  threads: MatrixThread[];
}

const SCORING_MATRIX: Record<string, MatrixDomain> = {
  governance: {
    domainLabel: 'Governance and Strategy',
    threads: [
      { name: 'Organizational Alignment', cells: ['Team-level, organic', 'RBAC and structure in place', 'CoP/CoE driving governance', 'Proactive, adaptive policies', 'AI-informed governance'] },
      { name: 'Release Management', cells: ['Direct changes as needed', 'Version control, defined path', 'Multi-team pipelines', 'Policy-driven quality gates', 'Fully automated releases'] },
    ],
  },
  platform: {
    domainLabel: 'Platform',
    threads: [
      { name: 'Architecture', cells: ['Single shared instance', 'Dev/prod separated', 'Production grade, optimized', 'DR/multisite tested', 'AIOps-managed platform'] },
      { name: 'Resilience', cells: ['Single environment', 'Separation in place', 'Offsite resiliency', 'Tested DR, drift enforcement', 'Self-healing, predictive'] },
    ],
  },
  devopsSkills: {
    domainLabel: 'DevEx, OpsEx and Skills',
    threads: [
      { name: 'Developer Experience', cells: ['Self-managed environments', 'Repo templates, basic pipelines', 'Centralized dev environments', 'AI code assistance, config as code', 'AI-managed DevEx/OpsEx'] },
      { name: 'Team Onboarding', cells: ['Peer-based learning', 'Basic training resources', 'Structured onboarding programs', 'Certification paths, AI learning', 'Self-sustaining expertise'] },
    ],
  },
  useCases: {
    domainLabel: 'Use Cases',
    threads: [
      { name: 'Scope', cells: ['Individual tasks and scripts', 'Single-domain automation', 'Enterprise-wide, ITSM connected', 'Event-driven, business outcomes', 'AI-driven self-healing'] },
      { name: 'Intelligence', cells: ['On-demand, manual trigger', 'Event/schedule triggers', 'Cross-domain, self-service', 'EDA, measurable outcomes', 'Autonomous, predictive'] },
    ],
  },
};

function getHighlightedColumns(score: number): Set<number> {
  return new Set([Math.max(0, Math.floor(score) - 1)]);
}

function buildScoringMatrixHtml(domainScores: DomainResult[]): string {
  const highlightStyle = 'background:#e6f0ff;border:2px solid #4d9aff';
  const emptyStyle = 'color:#999;font-style:italic';

  return domainScores.map((ds) => {
    const matrix = SCORING_MATRIX[ds.domain];
    if (!matrix) return '';

    const highlighted = getHighlightedColumns(ds.score);
    const hasThreadNames = matrix.threads.some((t) => t.name);

    const headerCells = LEVEL_HEADERS.map((h, i) =>
      `<th style="padding:8px;border:1px solid #ddd;text-align:left;font-weight:600;background:#f0f0f0;${highlighted.has(i) ? highlightStyle : ''}">${h}</th>`
    ).join('');

    const threadNameHeader = hasThreadNames ? '<th style="padding:8px;border:1px solid #ddd;background:#f0f0f0"></th>' : '';

    const bodyRows = matrix.threads.map((thread) => {
      const nameCell = hasThreadNames
        ? `<td style="padding:8px;border:1px solid #ddd;font-weight:600;white-space:nowrap">${thread.name}</td>`
        : '';
      const dataCells = thread.cells.map((cell, ci) => {
        const hl = highlighted.has(ci) ? highlightStyle : '';
        if (cell == null) {
          return `<td style="padding:8px;border:1px solid #ddd;${emptyStyle};${hl}">&mdash;</td>`;
        }
        return `<td style="padding:8px;border:1px solid #ddd;${hl}">${cell}</td>`;
      }).join('');
      return `<tr>${nameCell}${dataCells}</tr>`;
    }).join('');

    return `
    <h3 style="margin:20px 0 8px">${matrix.domainLabel} &mdash; ${ds.score} / 5</h3>
    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:16px">
      <thead><tr>${threadNameHeader}${headerCells}</tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>`;
  }).join('');
}

export function buildReportHtml(
  title: string,
  domainScores: DomainResult[],
): string {
  const scoreRows = domainScores
    .map((ds) => {
      const color = LEVEL_COLORS[ds.maturityLevel] || '#6a6e73';
      const actions = ADVANCEMENT[ds.domain]?.[ds.maturityLevel] ?? [];
      const actionList = actions.length
        ? `<ul style="margin:4px 0 0 16px;padding:0">${actions.map((a) => `<li style="font-size:13px">${a}</li>`).join('')}</ul>`
        : '';

      return `
      <tr>
        <td style="padding:12px;border:1px solid #ddd;font-weight:600">${ds.label}</td>
        <td style="padding:12px;border:1px solid #ddd;text-align:center">
          <span style="display:inline-block;background:${color};color:#fff;padding:4px 12px;border-radius:4px;font-weight:600">
            ${ds.score} / 5
          </span>
        </td>
        <td style="padding:12px;border:1px solid #ddd">${ds.maturityLevel}</td>
        <td style="padding:12px;border:1px solid #ddd">
          <strong>Next steps:</strong>
          ${actionList}
        </td>
      </tr>`;
    })
    .join('');

  const matrixHtml = buildScoringMatrixHtml(domainScores);

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

  <h2 style="margin-top:24px">Your Domain Scores</h2>
  <table style="width:100%;border-collapse:collapse;margin:12px 0">
    <thead>
      <tr style="background:#f0f0f0">
        <th style="padding:10px;border:1px solid #ddd;text-align:left">Domain</th>
        <th style="padding:10px;border:1px solid #ddd;text-align:center">Score</th>
        <th style="padding:10px;border:1px solid #ddd;text-align:left">Level</th>
        <th style="padding:10px;border:1px solid #ddd;text-align:left">Advancement Guidance</th>
      </tr>
    </thead>
    <tbody>${scoreRows}</tbody>
  </table>

  <h2 style="margin-top:32px">Key Indicators by Maturity Level</h2>
  <p style="font-size:14px;color:#555">
    The highlighted column(s) indicate where your organization currently stands for each domain.
  </p>
  ${matrixHtml}

  <hr style="margin:32px 0;border:none;border-top:1px solid #ddd">
  <p style="font-size:12px;color:#888">
    This report was generated by the Services Assessments application.
    For questions or to schedule a deeper assessment, contact your Red Hat account team.
  </p>
</body>
</html>`;
}
