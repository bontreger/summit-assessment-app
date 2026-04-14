import type { Assessment } from '../types';

export const automationMaturity: Assessment = {
  id: 'automation-maturity',
  title: 'Automation Adoption Maturity Assessment',
  shortTitle: 'Automation Maturity',
  description:
    'Evaluate your organization\'s automation maturity across four key domains. Rate each question on a scale of 1 to 5 based on where your organization stands today.',
  domains: [
    { key: 'productUsage', label: 'Product Usage', pptDimension: 'Technology' },
    { key: 'performance', label: 'Performance', pptDimension: 'Process + Technology' },
    { key: 'proficiency', label: 'Proficiency', pptDimension: 'People + Process' },
    { key: 'perception', label: 'Perception', pptDimension: 'People' },
  ],
  questions: [
    // Q1 -- Execution Model
    {
      id: 'execution-model',
      title: 'Execution Model',
      prompt:
        'How are automation tasks executed in your organization today? Think about whether work flows through a centralized platform, ad hoc scripts, ticket-driven handoffs, or a mix.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Teams rely on ad hoc scripts or ungoverned tools with no standard execution path.' },
        { score: 2, label: 'Developing', description: 'A shared automation approach is emerging with basic governance; multiple teams are actively participating.' },
        { score: 3, label: 'Operational', description: 'Automation use cases are deployed in production; teams share a common platform with self-service capabilities.' },
        { score: 4, label: 'Optimizing', description: 'Automation spans multiple domains with cross-domain governance and event-driven triggers at scale.' },
        { score: 5, label: 'Innovator', description: 'Fully self-service, AI-optimized, enterprise-wide standardized platform with continuous autonomous improvement.' },
      ],
    },
    // Q2 -- Standardization & Content Sharing
    {
      id: 'standardization',
      title: 'Standardization & Content Sharing',
      prompt:
        'Is automation content (roles, collections, pipelines, golden patterns) shared and reused across teams? Is expertise distributed or concentrated in a few people?',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'No shared content or knowledge base; each team builds from scratch and expertise is held by one or two individuals.' },
        { score: 2, label: 'Developing', description: 'A central repository is emerging and some knowledge sharing has started, but adoption and documentation are inconsistent.' },
        { score: 3, label: 'Operational', description: 'Cross-team content libraries are active with searchable repositories; a community of practice supports peer learning.' },
        { score: 4, label: 'Optimizing', description: 'Standardized collections are governed across domains with automated quality gates; a formal CoE manages the knowledge base.' },
        { score: 5, label: 'Innovator', description: 'Enterprise-wide content governance with curated catalogs; expertise is fully distributed and self-sustaining across all teams.' },
      ],
    },
    // Q3 -- Code to Production
    {
      id: 'code-to-prod',
      title: 'Code to Production',
      prompt:
        'What does the process look like for getting automation code into production? Consider version control, peer review, CI/CD pipelines, automated testing, and promotion gates.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Changes are manual and ad hoc with no version control, review process, or automated testing.' },
        { score: 2, label: 'Developing', description: 'Version control is standard with some peer review; a basic CI pipeline runs linting or syntax checks.' },
        { score: 3, label: 'Operational', description: 'CI/CD pipelines promote content through dev, staging, and production; automated testing and branch protection are enforced.' },
        { score: 4, label: 'Optimizing', description: 'Policy-driven promotion with automated compliance checks; pipeline analytics track change velocity and failure rates.' },
        { score: 5, label: 'Innovator', description: 'Full GitOps lifecycle with drift detection, self-healing, and AI-assisted review across multi-cluster environments.' },
      ],
    },
    // Q4 -- Developer Experience
    {
      id: 'dev-experience',
      title: 'Developer Experience',
      prompt:
        'What does the automation development environment look like? Think about how developers write, test, and iterate on automation content day-to-day.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Unstandardized, individually created workspaces; developers work around the security posture of their workstation.' },
        { score: 2, label: 'Developing', description: 'Some teams use standardized tooling or images, but adoption is inconsistent and environments vary across teams.' },
        { score: 3, label: 'Operational', description: 'Standardized development spaces (e.g., DevSpaces, standard images) are available and broadly adopted.' },
        { score: 4, label: 'Optimizing', description: 'Integrated developer tooling with shared CI/CD hooks, linting, and testing built into the development environment.' },
        { score: 5, label: 'Innovator', description: 'Ephemeral per-user test environments provisioned through a development workspace with full parity to production.' },
      ],
    },
    // Q5 -- Measurement & Business Impact
    {
      id: 'measurement',
      title: 'Measurement & Business Impact',
      prompt:
        'What metrics do you track for automation success? Can you quantify time savings, cost avoidance, or incident reduction -- and who sees those numbers?',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'No KPIs defined and no quantified impact; success stories are anecdotal at best.' },
        { score: 2, label: 'Developing', description: 'Basic KPIs exist such as percentage of tasks automated; some teams track informal time savings.' },
        { score: 3, label: 'Operational', description: 'KPIs are actively tracked across teams; cost savings are documented and shared with management.' },
        { score: 4, label: 'Optimizing', description: 'Business-aligned KPIs are integrated with executive dashboards; automation ROI is factored into budgeting decisions.' },
        { score: 5, label: 'Innovator', description: 'Continuous data-driven optimization with predictive impact modeling driving enterprise-wide investment decisions.' },
      ],
    },
    // Q6 -- Compliance & SLA Alignment
    {
      id: 'compliance',
      title: 'Compliance & SLA Alignment',
      prompt:
        'Are there SLAs, audit requirements, or compliance controls that automation is expected to satisfy or provide evidence for?',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'No compliance tracking related to automation; audits are entirely manual.' },
        { score: 2, label: 'Developing', description: 'Compliance requirements are documented; a few automation outputs are mapped to audit controls.' },
        { score: 3, label: 'Operational', description: 'Compliance requirements are mapped to automation outputs with regular automated reporting.' },
        { score: 4, label: 'Optimizing', description: 'SLA-driven governance with compliance embedded in the automation pipeline; policy violations are blocked before deployment.' },
        { score: 5, label: 'Innovator', description: 'Policy-as-Code enforcement with real-time audit trails and self-remediating compliance across all environments.' },
      ],
    },
    // Q7 -- Skills & Enablement
    {
      id: 'skills',
      title: 'Skills & Enablement',
      prompt:
        'How do new team members learn your automation practices? Is there formal training, certification paths, onboarding materials, or mostly trial by fire?',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Limited skills with no formal training; the organization relies on a few experts for all automation work.' },
        { score: 2, label: 'Developing', description: 'A training curriculum exists with structured onboarding; teams are encouraged to complete foundational courses.' },
        { score: 3, label: 'Operational', description: 'Internal automation champions are established; hands-on labs and sandbox environments are available.' },
        { score: 4, label: 'Optimizing', description: 'A Center of Excellence or Community of Practice is active; certification paths are formalized and skills gaps are tracked.' },
        { score: 5, label: 'Innovator', description: 'Comprehensive expertise is a core organizational capability; the team contributes to external best practices.' },
      ],
    },
    // Q8 -- Organizational Value & Sponsorship
    {
      id: 'org-value',
      title: 'Organizational Value & Sponsorship',
      prompt:
        'How does leadership view automation -- as strategic infrastructure, a cost line, or an experiment? Is there executive sponsorship, or is adoption purely grassroots?',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Automation is seen as experimental with no executive sponsorship; adoption happens bottom-up without visibility.' },
        { score: 2, label: 'Developing', description: 'Early wins are driving buy-in; a sponsor at director level or above is engaged and funding specific projects.' },
        { score: 3, label: 'Operational', description: 'Automation is broadly accepted as core infrastructure with an active executive sponsor and a place in the strategic roadmap.' },
        { score: 4, label: 'Optimizing', description: 'C-level sponsorship drives cross-organizational adoption; automation is aligned with strategic business goals.' },
        { score: 5, label: 'Innovator', description: 'Automation is a core part of the organization\'s identity; it contributes to open-source and shapes industry standards.' },
      ],
    },
  ],

  domainWeights: {
    'execution-model':  { productUsage: 1.0, perception: 0.25 },
    'standardization':  { productUsage: 0.75, proficiency: 0.5 },
    'code-to-prod':     { productUsage: 0.25, performance: 1.0 },
    'dev-experience':   { productUsage: 0.25, proficiency: 1.0, perception: 0.5 },
    'measurement':      { performance: 1.0, perception: 0.25 },
    'compliance':       { productUsage: 0.25, performance: 0.5, perception: 0.25 },
    'skills':           { proficiency: 1.0, perception: 0.25 },
    'org-value':        { performance: 0.5, perception: 1.0 },
  },

  scoringMatrix: {
    productUsage: {
      domainLabel: 'Product Usage',
      threads: [
        {
          name: 'Team Adoption',
          cells: [
            'Siloed, ad hoc per team',
            'Adoption within individual teams',
            'Cross-team adoption, self-service',
            'Cross-domain adoption',
            null,
          ],
        },
        {
          name: 'Governance & Standardization',
          cells: [
            null,
            'Initial standardization, early reuse',
            'Shared platform with CI/CD',
            'Policy-driven, governed across domains',
            'Enterprise-wide standardization',
          ],
        },
        {
          name: 'Differentiator',
          cells: [
            'Ungoverned scripts',
            'Shared content emerging',
            'Integrated CI/CD pipelines',
            'AI-driven triggers',
            'AI-assisted decision-making',
          ],
        },
      ],
    },
    performance: {
      domainLabel: 'Performance',
      threads: [
        {
          name: 'KPIs',
          cells: [
            'No KPIs defined',
            'Basic KPIs (% automated, speed)',
            'KPIs tracked, cost savings',
            'SLA-driven, business KPIs',
            'Continuous optimization, data-driven',
          ],
        },
        {
          name: 'Differentiator',
          cells: [
            'No measurement',
            'Informal time savings',
            'Documented evidence',
            'Compliance tracking',
            'Predictive impact modeling',
          ],
        },
      ],
    },
    proficiency: {
      domainLabel: 'Proficiency',
      threads: [
        {
          name: 'Knowledge Sharing',
          cells: [
            'Reliance on few experts',
            'Internal knowledge sharing starting',
            'Champions established, peer support',
            'CoE / CoP formalized',
            'Distributed expertise, self-sustaining',
          ],
        },
        {
          name: 'Team Onboarding',
          cells: [
            'No formal training',
            'Structured onboarding, foundational skills',
            'Internal enablement programs',
            'Governed adoption model',
            'Certified across all domains',
          ],
        },
      ],
    },
    perception: {
      domainLabel: 'Perception',
      threads: [
        {
          name: '',
          cells: [
            'Experimental, complexity concerns',
            'Early wins, tactical buy-in',
            'Critical, strong advocacy',
            'Executive sponsorship, business alignment',
            'Strategic enabler, industry best practice',
          ],
        },
      ],
    },
  },

  advancement: [
    {
      domain: 'productUsage',
      guidance: [
        { levelRange: [1, 1.4], label: 'Initial \u2192 Developing', actions: ['Conduct a Getting Started with AAP workshop', 'Identify initial automation use cases', 'Inventory existing ad hoc scripts and tools'] },
        { levelRange: [1.5, 2.4], label: 'Developing \u2192 Operational', actions: ['Expand standardization of automation tools', 'Enable shared content repositories', 'Develop internal automation champions'] },
        { levelRange: [2.5, 3.4], label: 'Operational \u2192 Optimizing', actions: ['Integrate self-service automation portals', 'Expand cross-team adoption', 'Implement integration accelerators across domains'] },
        { levelRange: [3.5, 4.4], label: 'Optimizing \u2192 Innovator', actions: ['Adopt Event-Driven Automation (EDA)', 'Leverage SaaS-based automation services for scalability', 'Expand cross-domain governance'] },
        { levelRange: [4.5, 5], label: 'Sustaining Innovation', actions: ['Implement AI-driven workflows and predictive automation', 'Manage multi-cluster environments', 'Continuously refine enterprise-wide governance'] },
      ],
    },
    {
      domain: 'performance',
      guidance: [
        { levelRange: [1, 1.4], label: 'Initial \u2192 Developing', actions: ['Define basic KPIs for automation tasks', 'Run a Quick Win program to demonstrate measurable value', 'Establish baseline metrics'] },
        { levelRange: [1.5, 2.4], label: 'Developing \u2192 Operational', actions: ['Track KPIs systematically', 'Establish performance baselines', 'Implement telemetry and monitoring'] },
        { levelRange: [2.5, 3.4], label: 'Operational \u2192 Optimizing', actions: ['Improve cost savings analysis', 'Introduce business-aligned KPIs', 'Build executive-facing dashboards'] },
        { levelRange: [3.5, 4.4], label: 'Optimizing \u2192 Innovator', actions: ['Implement Policy-as-Code (PaC) for compliance', 'Deploy SLA-driven automation governance', 'Integrate compliance tracking end-to-end'] },
        { levelRange: [4.5, 5], label: 'Sustaining Innovation', actions: ['Optimize with AI-driven insights', 'Implement continuous performance benchmarking', 'Drive data-driven decision-making across systems'] },
      ],
    },
    {
      domain: 'proficiency',
      guidance: [
        { levelRange: [1, 1.4], label: 'Initial \u2192 Developing', actions: ['Complete Ansible Basics Training', 'Create onboarding materials for automation', 'Identify initial champions within teams'] },
        { levelRange: [1.5, 2.4], label: 'Developing \u2192 Operational', actions: ['Expand use cases with Ansible Interactive Labs', 'Enable a cross-functional automation committee', 'Document tribal knowledge'] },
        { levelRange: [2.5, 3.4], label: 'Operational \u2192 Optimizing', actions: ['Develop internal champions into a formal network', 'Encourage peer-led enablement sessions', 'Conduct scaling assessments'] },
        { levelRange: [3.5, 4.4], label: 'Optimizing \u2192 Innovator', actions: ['Expand developer tooling (IDE, DevSandbox, Backstage)', 'Support automation engineers with advanced toolchains', 'Formalize certification paths'] },
        { levelRange: [4.5, 5], label: 'Sustaining Innovation', actions: ['Maintain comprehensive expertise across all domains', 'Contribute to industry best practices', 'Support advanced training and mentorship programs'] },
      ],
    },
    {
      domain: 'perception',
      guidance: [
        { levelRange: [1, 1.4], label: 'Initial \u2192 Developing', actions: ['Conduct awareness sessions for leadership', 'Communicate early wins broadly', 'Address complexity concerns with demos and proof of value'] },
        { levelRange: [1.5, 2.4], label: 'Developing \u2192 Operational', actions: ['Foster internal advocacy across teams', 'Demonstrate quantified value to executives', 'Secure executive sponsorship'] },
        { levelRange: [2.5, 3.4], label: 'Operational \u2192 Optimizing', actions: ['Position automation as a critical business enabler', 'Run adoption hackathons or innovation days', 'Integrate automation goals into team OKRs'] },
        { levelRange: [3.5, 4.4], label: 'Optimizing \u2192 Innovator', actions: ['Align automation strategy with business goals', 'Showcase customer references and case studies', 'Build an internal automation brand'] },
        { levelRange: [4.5, 5], label: 'Sustaining Innovation', actions: ['Contribute to open-source community', 'Advocate externally through conferences and publications', 'Shape industry best practices'] },
      ],
    },
  ],
};
