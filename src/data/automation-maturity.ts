import type { Assessment } from '../types';

export const automationMaturity: Assessment = {
  id: 'automation-maturity',
  title: 'Automation Adoption Maturity Assessment',
  shortTitle: 'Automation Maturity',
  description:
    'Evaluate your organization\'s automation maturity across four key domains. Rate each question on a scale of 1 to 5 based on where your organization stands today.',
  domains: [
    { key: 'governance', label: 'Governance and Strategy' },
    { key: 'platform', label: 'Platform' },
    { key: 'devopsSkills', label: 'DevEx, OpsEx and Skills' },
    { key: 'useCases', label: 'Use Cases' },
  ],
  questions: [
    // ── Governance and Strategy (2 questions) ──
    {
      id: 'gov-structure',
      domain: 'governance',
      title: 'Governance Structure',
      prompt:
        'How is automation governed in your organization? Consider RBAC, organizational structure, policies, and decision-making around automation strategy.',
      levelDescriptors: [
        { score: 1, label: 'No Considered Governance', description: 'No consideration of organizational governance for automation; teams operate independently without coordination.' },
        { score: 2, label: 'Basic Governance', description: 'RBAC is configured; basic automation structure and organizational alignment are in place.' },
        { score: 3, label: 'Scaled Governance', description: 'A Community of Practice or Center of Excellence drives governance; streamlined hub usage across multiple teams.' },
        { score: 4, label: 'Advanced Governance', description: 'Responsive automation governance policies adapt to organizational needs; governance is proactive rather than reactive.' },
        { score: 5, label: 'Fully Automated Governance', description: 'AI-based automation governance policies continuously optimize organizational alignment and compliance.' },
      ],
    },
    {
      id: 'gov-release',
      domain: 'governance',
      title: 'Release Management',
      prompt:
        'How are automation content releases managed? Think about version control, promotion pipelines, approval workflows, and release cadence.',
      levelDescriptors: [
        { score: 1, label: 'No Considered Governance', description: 'No release management process; changes are ad hoc with no version control or approval workflow.' },
        { score: 2, label: 'Basic Governance', description: 'Basic release management is in place with version control and a defined promotion path.' },
        { score: 3, label: 'Scaled Governance', description: 'Multi-team release pipelines are established; releases follow a consistent cadence with peer review.' },
        { score: 4, label: 'Advanced Governance', description: 'Release pipelines are policy-driven with automated quality gates and compliance checks.' },
        { score: 5, label: 'Fully Automated Governance', description: 'Fully automated releases with AI-driven validation, rollback, and continuous delivery.' },
      ],
    },

    // ── Platform (2 questions) ──
    {
      id: 'plat-architecture',
      domain: 'platform',
      title: 'Platform Architecture',
      prompt:
        'How is your Ansible Automation Platform deployed? Consider environment separation, sizing, high availability, and management approach.',
      levelDescriptors: [
        { score: 1, label: 'Single Instance', description: 'Single instance with no dev/prod separation; automation runs in a single shared environment.' },
        { score: 2, label: 'Basic Productive AAP', description: 'Dev and prod environments are separated, but the platform is not sized for production load or configured for HA.' },
        { score: 3, label: 'Production Grade', description: 'Production sizing is optimized with offsite resiliency; advanced platform features are enabled and actively used.' },
        { score: 4, label: 'Mission Critical', description: 'Tested DR/multisite implementation with configuration consistency enforcement across all environments.' },
        { score: 5, label: 'Automated Platform Management', description: 'AIOps and AAP manage the platform with automated policy enforcement, scaling, and self-optimization.' },
      ],
    },
    {
      id: 'plat-lifecycle',
      domain: 'platform',
      title: 'Platform Lifecycle and Resilience',
      prompt:
        'How do you manage the lifecycle of your automation platform? Think about upgrades, patching, disaster recovery, and configuration drift.',
      levelDescriptors: [
        { score: 1, label: 'Single Instance', description: 'No lifecycle management; upgrades and patching are reactive and unplanned.' },
        { score: 2, label: 'Basic Productive AAP', description: 'Basic lifecycle processes exist; upgrades are planned but DR is not tested.' },
        { score: 3, label: 'Production Grade', description: 'Lifecycle management includes scheduled upgrades, backup strategies, and documented recovery procedures.' },
        { score: 4, label: 'Mission Critical', description: 'DR is tested regularly; configuration consistency is enforced across sites with automated drift detection.' },
        { score: 5, label: 'Automated Platform Management', description: 'Platform lifecycle is fully automated with AI-driven maintenance windows, predictive failure analysis, and self-healing.' },
      ],
    },

    // ── DevEx, OpsEx and Skills (2 questions) ──
    {
      id: 'devops-experience',
      domain: 'devopsSkills',
      title: 'Developer and Operator Experience',
      prompt:
        'What does the automation developer and operator experience look like? Consider development environments, tooling, AI assistance, and day-to-day workflows.',
      levelDescriptors: [
        { score: 1, label: 'Not Considered', description: 'DevEx and OpsEx are not considered; developers work in unstandardized, individually created environments.' },
        { score: 2, label: 'Basic DevOps Lifecycle', description: 'Repository templates and basic quality gate pipelines are available for developers and operators.' },
        { score: 3, label: 'Platform and Dev Onboarding', description: 'Pipelines expanded with test automation; centralized developer environments and team onboarding programs are in place.' },
        { score: 4, label: 'SDLC for Automation Content', description: 'OpsEx configuration as code; AAP platform management with AI; developer experience includes AI code assistance.' },
        { score: 5, label: 'Automated DevOps Experience', description: 'AI-driven DevEx and OpsEx manages automation content lifecycle, testing, and deployment autonomously.' },
      ],
    },
    {
      id: 'devops-onboarding',
      domain: 'devopsSkills',
      title: 'Skills and Team Onboarding',
      prompt:
        'How do new team members learn your automation practices? Is there structured onboarding, training programs, or certification paths?',
      levelDescriptors: [
        { score: 1, label: 'Not Considered', description: 'No formal onboarding or skills development; new team members learn through trial and error.' },
        { score: 2, label: 'Basic DevOps Lifecycle', description: 'Basic onboarding materials exist; teams have access to foundational training resources.' },
        { score: 3, label: 'Platform and Dev Onboarding', description: 'Structured team onboarding programs are established; enablement sessions and sandbox environments are available.' },
        { score: 4, label: 'SDLC for Automation Content', description: 'Comprehensive skills development with certification paths; AI-assisted learning and code review accelerate onboarding.' },
        { score: 5, label: 'Automated DevOps Experience', description: 'AI-driven personalized onboarding and continuous skills development; expertise is self-sustaining across all teams.' },
      ],
    },

    // ── Use Cases (2 questions) ──
    {
      id: 'uc-scope',
      domain: 'useCases',
      title: 'Automation Scope',
      prompt:
        'What types of automation use cases has your organization implemented? Consider breadth across domains, integration with enterprise systems, and business alignment.',
      levelDescriptors: [
        { score: 1, label: 'Individual Tasks', description: 'Individual task creation; automation is limited to isolated, one-off scripts and tasks.' },
        { score: 2, label: 'Stream-Aligned', description: 'Automation of single-area use cases or implementations within a specific domain or team.' },
        { score: 3, label: 'Enterprise-Wide', description: 'Enterprise-wide automation use cases connected to other enterprise products like ITSM and service catalogs.' },
        { score: 4, label: 'Responsive / Advanced', description: 'Automated operations using Event-Driven Ansible; automation is connected to support business outcomes.' },
        { score: 5, label: 'Next-Gen', description: 'AI-driven use cases including self-managed and self-healing infrastructure.' },
      ],
    },
    {
      id: 'uc-intelligence',
      domain: 'useCases',
      title: 'Automation Intelligence',
      prompt:
        'How advanced are your automation patterns? Think about event-driven automation, self-service, integration depth, and AI-assisted operations.',
      levelDescriptors: [
        { score: 1, label: 'Individual Tasks', description: 'Automation is purely manual-trigger, task-level execution with no event integration.' },
        { score: 2, label: 'Stream-Aligned', description: 'Some automation is triggered by basic events or schedules within a single domain.' },
        { score: 3, label: 'Enterprise-Wide', description: 'Cross-domain integration with self-service portals; automation responds to enterprise events and service requests.' },
        { score: 4, label: 'Responsive / Advanced', description: 'Event-Driven Ansible responds to infrastructure and application events; automation drives measurable business outcomes.' },
        { score: 5, label: 'Next-Gen', description: 'AI-driven autonomous operations with predictive remediation and self-healing infrastructure patterns.' },
      ],
    },
  ],

  scoringMatrix: {
    governance: {
      domainLabel: 'Governance and Strategy',
      threads: [
        { name: 'Organizational Alignment', cells: ['No governance consideration', 'RBAC and structure setup', 'CoP/CoE driving governance', 'Responsive governance policies', 'AI-based governance'] },
        { name: 'Release Management', cells: ['No release process', 'Basic release management', 'Multi-team release pipelines', 'Policy-driven releases', 'Fully automated releases'] },
      ],
    },
    platform: {
      domainLabel: 'Platform',
      threads: [
        { name: 'Architecture', cells: ['Single instance, no separation', 'Dev/prod separated', 'Production grade, optimized', 'Mission critical DR/multisite', 'AIOps-managed platform'] },
        { name: 'Resilience', cells: ['No HA or DR', 'Basic separation only', 'Offsite resiliency', 'Tested DR, drift enforcement', 'Self-healing, predictive'] },
      ],
    },
    devopsSkills: {
      domainLabel: 'DevEx, OpsEx and Skills',
      threads: [
        { name: 'Developer Experience', cells: ['Not considered', 'Repo templates, basic pipelines', 'Centralized dev environments', 'AI code assistance, config as code', 'AI-managed DevEx/OpsEx'] },
        { name: 'Team Onboarding', cells: ['No formal onboarding', 'Basic training resources', 'Structured onboarding programs', 'Certification paths, AI learning', 'Self-sustaining expertise'] },
      ],
    },
    useCases: {
      domainLabel: 'Use Cases',
      threads: [
        { name: 'Scope', cells: ['Individual tasks', 'Single-area automation', 'Enterprise-wide, ITSM connected', 'Event-driven, business outcomes', 'AI-driven self-healing'] },
        { name: 'Intelligence', cells: ['Manual trigger only', 'Basic event/schedule triggers', 'Cross-domain, self-service', 'EDA, measurable outcomes', 'Autonomous, predictive'] },
      ],
    },
  },

  advancement: [
    {
      domain: 'governance',
      guidance: [
        { levelRange: [1, 1.4], label: 'No Governance \u2192 Basic', actions: ['Establish RBAC configuration for automation platform', 'Define basic automation organizational structure', 'Document initial release management process'] },
        { levelRange: [1.5, 2.4], label: 'Basic \u2192 Scaled', actions: ['Stand up a Community of Practice or Center of Excellence', 'Implement multi-team release pipelines', 'Streamline automation hub usage across teams'] },
        { levelRange: [2.5, 3.4], label: 'Scaled \u2192 Advanced', actions: ['Develop responsive automation governance policies', 'Integrate governance with organizational change management', 'Automate policy compliance checks in release pipelines'] },
        { levelRange: [3.5, 4.4], label: 'Advanced \u2192 Fully Automated', actions: ['Implement AI-based governance policy recommendations', 'Automate release validation and deployment', 'Establish continuous governance optimization'] },
        { levelRange: [4.5, 5], label: 'Sustaining Excellence', actions: ['Continuously refine AI governance models', 'Share governance best practices across the industry', 'Drive innovation in automated policy management'] },
      ],
    },
    {
      domain: 'platform',
      guidance: [
        { levelRange: [1, 1.4], label: 'Single Instance \u2192 Basic', actions: ['Separate dev and prod environments', 'Plan for initial platform sizing', 'Establish basic backup procedures'] },
        { levelRange: [1.5, 2.4], label: 'Basic \u2192 Production Grade', actions: ['Optimize production sizing and HA configuration', 'Implement offsite resiliency', 'Enable advanced platform features'] },
        { levelRange: [2.5, 3.4], label: 'Production Grade \u2192 Mission Critical', actions: ['Implement and test DR/multisite deployment', 'Enforce configuration consistency across environments', 'Establish automated drift detection'] },
        { levelRange: [3.5, 4.4], label: 'Mission Critical \u2192 Automated', actions: ['Deploy AIOps for platform management', 'Implement automated policy enforcement', 'Enable predictive failure analysis'] },
        { levelRange: [4.5, 5], label: 'Sustaining Excellence', actions: ['Continuously optimize AIOps models', 'Drive self-healing platform capabilities', 'Pioneer automated platform lifecycle management'] },
      ],
    },
    {
      domain: 'devopsSkills',
      guidance: [
        { levelRange: [1, 1.4], label: 'Not Considered \u2192 Basic', actions: ['Create repository templates for automation content', 'Establish basic quality gate pipelines', 'Develop initial onboarding materials'] },
        { levelRange: [1.5, 2.4], label: 'Basic \u2192 Onboarding', actions: ['Expand pipelines with test automation', 'Stand up centralized developer environments', 'Launch structured team onboarding programs'] },
        { levelRange: [2.5, 3.4], label: 'Onboarding \u2192 SDLC', actions: ['Implement OpsEx configuration as code', 'Integrate AI code assistance into developer tooling', 'Formalize certification paths for automation engineers'] },
        { levelRange: [3.5, 4.4], label: 'SDLC \u2192 Automated', actions: ['Deploy AI-driven DevEx and OpsEx management', 'Automate content lifecycle testing and deployment', 'Establish self-sustaining expertise programs'] },
        { levelRange: [4.5, 5], label: 'Sustaining Excellence', actions: ['Continuously refine AI-driven developer experience', 'Contribute to industry automation practices', 'Drive innovation in automated skills development'] },
      ],
    },
    {
      domain: 'useCases',
      guidance: [
        { levelRange: [1, 1.4], label: 'Individual Tasks \u2192 Stream-Aligned', actions: ['Identify automation use cases within a single domain', 'Implement foundational automation for a specific area', 'Document use case patterns for reuse'] },
        { levelRange: [1.5, 2.4], label: 'Stream-Aligned \u2192 Enterprise', actions: ['Connect automation use cases to ITSM and service catalogs', 'Expand automation across multiple enterprise domains', 'Implement self-service automation portals'] },
        { levelRange: [2.5, 3.4], label: 'Enterprise \u2192 Responsive', actions: ['Deploy Event-Driven Ansible for automated operations', 'Connect automation to measurable business outcomes', 'Implement cross-domain event response patterns'] },
        { levelRange: [3.5, 4.4], label: 'Responsive \u2192 Next-Gen', actions: ['Implement AI-driven use cases for self-managed infrastructure', 'Deploy self-healing automation patterns', 'Establish predictive remediation workflows'] },
        { levelRange: [4.5, 5], label: 'Sustaining Excellence', actions: ['Continuously expand AI-driven autonomous operations', 'Pioneer next-generation automation patterns', 'Drive industry standards for intelligent automation'] },
      ],
    },
  ],
};
