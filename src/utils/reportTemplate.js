"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildReportHtml = buildReportHtml;
const ADVANCEMENT = {
    productUsage: {
        Initial: ['Conduct a Getting Started with AAP workshop', 'Identify initial automation use cases', 'Inventory existing ad hoc scripts and tools'],
        Developing: ['Expand standardization of automation tools', 'Enable shared content repositories', 'Develop internal automation champions'],
        Operational: ['Integrate self-service automation portals', 'Expand cross-team adoption', 'Implement integration accelerators across domains'],
        Optimizing: ['Adopt Event-Driven Automation (EDA)', 'Leverage SaaS-based automation services for scalability', 'Expand cross-domain governance'],
        Innovator: ['Implement AI-driven workflows and predictive automation', 'Manage multi-cluster environments', 'Continuously refine enterprise-wide governance'],
    },
    performance: {
        Initial: ['Define basic KPIs for automation tasks', 'Run a Quick Win program to demonstrate value', 'Establish baseline metrics'],
        Developing: ['Track KPIs systematically', 'Establish performance baselines', 'Implement telemetry and monitoring'],
        Operational: ['Improve cost savings analysis', 'Introduce business-aligned KPIs', 'Build executive-facing dashboards'],
        Optimizing: ['Implement Policy-as-Code (PaC) for compliance', 'Deploy SLA-driven automation governance', 'Integrate compliance tracking end-to-end'],
        Innovator: ['Optimize with AI-driven insights', 'Implement continuous performance benchmarking', 'Drive data-driven decision-making across systems'],
    },
    proficiency: {
        Initial: ['Complete Ansible Basics Training', 'Create onboarding materials for automation', 'Identify initial champions within teams'],
        Developing: ['Expand use cases with Ansible Interactive Labs', 'Enable a cross-functional automation committee', 'Document tribal knowledge'],
        Operational: ['Develop internal champions into a formal network', 'Encourage peer-led enablement sessions', 'Conduct scaling assessments'],
        Optimizing: ['Expand developer tooling (IDE, DevSandbox, Backstage)', 'Support automation engineers with advanced toolchains', 'Formalize certification paths'],
        Innovator: ['Maintain comprehensive expertise across all domains', 'Contribute to industry best practices', 'Support advanced training and mentorship programs'],
    },
    perception: {
        Initial: ['Conduct awareness sessions for leadership', 'Communicate early wins broadly', 'Address complexity concerns with demos'],
        Developing: ['Foster internal advocacy across teams', 'Demonstrate quantified value to executives', 'Secure executive sponsorship'],
        Operational: ['Position automation as a critical business enabler', 'Run adoption hackathons or innovation days', 'Integrate automation goals into team OKRs'],
        Optimizing: ['Align automation strategy with business goals', 'Showcase customer references and case studies', 'Build an internal automation brand'],
        Innovator: ['Contribute to open-source community', 'Advocate externally through conferences and publications', 'Shape industry best practices'],
    },
};
const MATURITY_COLORS = {
    Initial: '#c9190b',
    Developing: '#f0ab00',
    Operational: '#06c',
    Optimizing: '#5752d1',
    Innovator: '#3e8635',
};
const LEVEL_HEADERS = ['1 \u2014 Initial', '2 \u2014 Developing', '3 \u2014 Operational', '4 \u2014 Optimizing', '5 \u2014 Innovator'];
const SCORING_MATRIX = {
    productUsage: {
        domainLabel: 'Product Usage',
        threads: [
            { name: 'Team Adoption', cells: ['Siloed, ad hoc per team', 'Adoption within individual teams', 'Cross-team adoption, self-service', 'Cross-domain adoption', null] },
            { name: 'Governance & Standardization', cells: [null, 'Initial standardization, early reuse', 'Shared platform with CI/CD', 'Policy-driven, governed across domains', 'Enterprise-wide standardization'] },
            { name: 'Differentiator', cells: ['Ungoverned scripts', 'Shared content emerging', 'Integrated CI/CD pipelines', 'AI-driven triggers', 'AI-assisted decision-making'] },
        ],
    },
    performance: {
        domainLabel: 'Performance',
        threads: [
            { name: 'KPIs', cells: ['No KPIs defined', 'Basic KPIs (% automated, speed)', 'KPIs tracked, cost savings', 'SLA-driven, business KPIs', 'Continuous optimization, data-driven'] },
            { name: 'Differentiator', cells: ['No measurement', 'Informal time savings', 'Documented evidence', 'Compliance tracking', 'Predictive impact modeling'] },
        ],
    },
    proficiency: {
        domainLabel: 'Proficiency',
        threads: [
            { name: 'Knowledge Sharing', cells: ['Reliance on few experts', 'Internal knowledge sharing starting', 'Champions established, peer support', 'CoE / CoP formalized', 'Distributed expertise, self-sustaining'] },
            { name: 'Team Onboarding', cells: ['No formal training', 'Structured onboarding, foundational skills', 'Internal enablement programs', 'Governed adoption model', 'Certified across all domains'] },
        ],
    },
    perception: {
        domainLabel: 'Perception',
        threads: [
            { name: '', cells: ['Experimental, complexity concerns', 'Early wins, tactical buy-in', 'Critical, strong advocacy', 'Executive sponsorship, business alignment', 'Strategic enabler, industry best practice'] },
        ],
    },
};
function getHighlightedColumns(score) {
    const floor = Math.floor(score);
    const ceil = Math.ceil(score);
    const frac = score - floor;
    if (floor === ceil || frac < 0.3) {
        return new Set([Math.max(0, Math.round(score) - 1)]);
    }
    if (frac > 0.7) {
        return new Set([Math.max(0, ceil - 1)]);
    }
    return new Set([Math.max(0, floor - 1), Math.min(4, ceil - 1)]);
}
function buildScoringMatrixHtml(domainScores) {
    const highlightStyle = 'background:#e6f0ff;border:2px solid #4d9aff';
    const emptyStyle = 'color:#999;font-style:italic';
    return domainScores.map((ds) => {
        const matrix = SCORING_MATRIX[ds.domain];
        if (!matrix)
            return '';
        const highlighted = getHighlightedColumns(ds.score);
        const hasThreadNames = matrix.threads.some((t) => t.name);
        const headerCells = LEVEL_HEADERS.map((h, i) => `<th style="padding:8px;border:1px solid #ddd;text-align:left;font-weight:600;background:#f0f0f0;${highlighted.has(i) ? highlightStyle : ''}">${h}</th>`).join('');
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
function buildReportHtml(title, domainScores) {
    const scoreRows = domainScores
        .map((ds) => {
        const color = MATURITY_COLORS[ds.maturityLevel] || '#6a6e73';
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
    This report was generated by the TDP Assessments application.
    For questions or to schedule a deeper assessment, contact your Red Hat account team.
  </p>
</body>
</html>`;
}
