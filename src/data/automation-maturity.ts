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
        'Describe your organization\'s approach to automation governance today, including access controls, organizational structure, policies, and how decisions about automation strategy are made.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Teams manage automation independently, with governance practices emerging organically.' },
        { score: 2, label: 'Developing', description: 'Role-based access controls are configured and a basic organizational structure for automation is in place.' },
        { score: 3, label: 'Operational', description: 'A Community of Practice or Center of Excellence coordinates governance; automation strategy is developing and being communicated across teams.' },  
        { score: 4, label: 'Optimizing', description: 'Governance policies proactively adapt to organizational needs, with defined feedback loops for continuous improvement.' },
        { score: 5, label: 'Innovator', description: 'AI-informed governance policies continuously optimize organizational alignment and compliance.' },
      ],
    },
    {
      id: 'gov-release',
      domain: 'governance',
      title: 'Release Management',
      prompt:
        'Describe how automation content moves from development to production, including version control, promotion steps, approvals, and release frequency.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Changes are applied directly as needed; a formal release process is on the roadmap.' },
        { score: 2, label: 'Developing', description: 'Version control and a defined promotion path are in place for automation content. The release process is beginning to develop quality gates and compliance checks.' },
        { score: 3, label: 'Operational', description: 'Multi-team release pipelines follow a consistent cadence with peer review. The release process is being iterated on and improved.' },
        { score: 4, label: 'Optimizing', description: 'Release pipelines include automated quality gates and compliance checks driven by policy. Testing and validation is being optimized within the release process.' },
        { score: 5, label: 'Innovator', description: 'Releases are fully automated with AI-driven validation, rollback capabilities, and continuous delivery.' },
      ],
    },

    // ── Platform (2 questions) ──
    {
      id: 'plat-architecture',
      domain: 'platform',
      title: 'Platform Architecture',
      prompt:
        'Describe your Ansible Automation Platform infrastructure set up, considering environment layout, sizing, availability, and how the platform is managed.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Automation runs on a single shared instance.  All features may not be enabled yet, and the platform is not yet optimized for production workloads.' },
        { score: 2, label: 'Developing', description: 'Development and production environments are separated; platform sizing and high availability are being planned.' },
        { score: 3, label: 'Operational', description: 'The platform is sized for production workloads with offsite resiliency and advanced features are in active use.' },
        { score: 4, label: 'Optimizing', description: 'A tested DR or multisite deployment ensures consistency and resilience across all environments.' },
        { score: 5, label: 'Innovator', description: 'AIOps manages the platform with automated policy enforcement, scaling, and self-optimization.' },
      ],
    },
    {
      id: 'plat-lifecycle',
      domain: 'platform',
      title: 'Platform Lifecycle and Resilience',
      prompt:
        'Describe how your automation platform is maintained over time, including upgrades, patching, backup and recovery, and how configuration changes are handled.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Upgrades and patching happen as needed; backups are ad-hoc.' },
        { score: 2, label: 'Developing', description: 'Lifecycle processes are in place with planned upgrades; scheduled backups and disaster recovery plans are being developed.' },
        { score: 3, label: 'Operational', description: 'Scheduled upgrades, backup strategies, and documented recovery procedures are part of regular operations.' },
        { score: 4, label: 'Optimizing', description: 'Disaster recovery is tested regularly; configuration consistency across sites is enforced with automated drift detection.' },
        { score: 5, label: 'Innovator', description: 'Platform lifecycle is fully automated with AI-driven maintenance windows, predictive failure analysis, and self-healing.' },
      ],
    },

    // ── DevEx, OpsEx and Skills (2 questions) ──
    {
      id: 'devops-experience',
      domain: 'devopsSkills',
      title: 'Developer and Operator Experience',
      prompt:
        'Describe the day-to-day experience for people who write and run automation, including development environments, tooling, and workflow support.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Developers set up their own environments and tooling to work with automation content.' },
        { score: 2, label: 'Developing', description: 'Repository templates and basic quality gate pipelines are available to support developers and operators.' },
        { score: 3, label: 'Operational', description: 'Centralized developer environments are available, with test automation integrated into pipelines and onboarding programs in place.' },
        { score: 4, label: 'Optimizing', description: 'Configuration is managed as code; AI-assisted coding tools and platform management are part of the workflow.' },
        { score: 5, label: 'Innovator', description: 'AI-driven tooling manages the automation content lifecycle, testing, and deployment autonomously.' },
      ],
    },
    {
      id: 'devops-onboarding',
      domain: 'devopsSkills',
      title: 'Skills and Team Onboarding',
      prompt:
        'Describe how people in your organization build automation skills, including how new team members get started, ongoing training, and knowledge sharing.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Team members learn automation practices through hands-on experience and informal peer support.' },
        { score: 2, label: 'Developing', description: 'Foundational training resources and onboarding materials are available for new team members.' },
        { score: 3, label: 'Operational', description: 'Structured onboarding programs, enablement sessions, and sandbox environments are in place to support team growth.' },
        { score: 4, label: 'Optimizing', description: 'Certification paths and AI-assisted learning are in place to accelerate skills development and code review quality.' },
        { score: 5, label: 'Innovator', description: 'AI-driven personalized learning and continuous skills development make expertise self-sustaining across teams.' },
      ],
    },

    // ── Use Cases (2 questions) ──
    {
      id: 'uc-scope',
      domain: 'useCases',
      title: 'Automation Scope',
      prompt:
        'Describe the range of automation use cases your organization has put into practice, including which areas are covered, how they connect to enterprise systems, and their alignment to business goals.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Automation focuses on individual tasks and scripts that address specific needs of one or a few teams.' },
        { score: 2, label: 'Developing', description: 'Use cases are established within a specific domain or team, automating targeted workflows.' },
        { score: 3, label: 'Operational', description: 'Automation spans the enterprise, connecting to ITSM, service catalogs, and other enterprise products.  Simple procedures for cross-domain automation are in place.' },
        { score: 4, label: 'Optimizing', description: 'Event-Driven Ansible powers automated operations, with automation tied to measurable business outcomes.' },
        { score: 5, label: 'Innovator', description: 'AI-driven use cases enable self-managed and self-healing infrastructure.  Automation drives quantifiable business outcomes.' },
      ],
    },
    {
      id: 'uc-intelligence',
      domain: 'useCases',
      title: 'Automation Intelligence',
      prompt:
        'Describe how your automation is triggered and orchestrated, including event-driven patterns, self-service capabilities, cross-system integration, and any use of AI.',
      levelDescriptors: [
        { score: 1, label: 'Initial', description: 'Automation runs on demand, triggered manually for specific tasks.' },
        { score: 2, label: 'Developing', description: 'Some automation is triggered by events or schedules within a single domain.  Exploring integration with ITSM and service catalogs.' },
        { score: 3, label: 'Operational', description: 'Automation integrates across domains with self-service portals, responding to enterprise events and service requests.' },
        { score: 4, label: 'Optimizing', description: 'Event-Driven Ansible responds to infrastructure and application events, driving measurable business outcomes.' },
        { score: 5, label: 'Innovator', description: 'AI-driven autonomous operations provide predictive remediation and self-healing infrastructure patterns.' },
      ],
    },
  ],

  maturityModel: {
    governance: [
      'Team-Level Governance',
      'Basic Governance',
      'Proactive Governance',
      'Advanced Governance',
      'Fully Automated Governance',
    ],
    platform: [
      'Basic Platform Implementation',
      'Separated Environments',
      'Production Grade Platform',
      'Mission Critical Platform',
      'Automated Platform Management',
    ],
    devopsSkills: [
      'Self-Managed Environments',
      'Basic Dev Lifecycle',
      'Platform and Dev Onboarding',
      'SDLC for Automation Content',
      'Optimized Developer Experience',
    ],
    useCases: [
      'Automation Building Blocks',
      'Isolated Use Cases',
      'Enterprise-Wide Automation',
      'Event-Driven Operations',
      'Next-Gen Automation',
    ],
  },

  scoringMatrix: {
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
  },

  advancement: [
    {
      domain: 'governance',
      guidance: [
        { levelRange: [1, 1.5], label: 'Initial \u2192 Developing', actions: ['Establish RBAC configuration for automation platform', 'Define basic automation organizational structure', 'Document initial release management process'] },
        { levelRange: [1.6, 2.5], label: 'Developing \u2192 Operational', actions: ['Stand up a Community of Practice or Center of Excellence', 'Implement multi-team release pipelines', 'Streamline automation hub usage across teams'] },
        { levelRange: [2.6, 3.5], label: 'Operational \u2192 Optimizing', actions: ['Develop responsive automation governance policies', 'Integrate governance with organizational change management', 'Automate policy compliance checks in release pipelines'] },
        { levelRange: [3.6, 4.5], label: 'Optimizing \u2192 Innovator', actions: ['Implement AI-based governance policy recommendations', 'Automate release validation and deployment', 'Establish continuous governance optimization'] },
        { levelRange: [4.6, 5], label: 'Sustaining Excellence', actions: ['Continuously refine AI governance models', 'Share governance best practices across the industry', 'Drive innovation in automated policy management'] },
      ],
    },
    {
      domain: 'platform',
      guidance: [
        { levelRange: [1, 1.5], label: 'Initial \u2192 Developing', actions: ['Separate dev and prod environments', 'Plan for initial platform sizing', 'Establish basic backup procedures'] },
        { levelRange: [1.6, 2.5], label: 'Developing \u2192 Operational', actions: ['Optimize production sizing and HA configuration', 'Implement offsite resiliency', 'Enable advanced platform features'] },
        { levelRange: [2.6, 3.5], label: 'Operational \u2192 Optimizing', actions: ['Implement and test DR/multisite deployment', 'Enforce configuration consistency across environments', 'Establish automated drift detection'] },
        { levelRange: [3.6, 4.5], label: 'Optimizing \u2192 Innovator', actions: ['Deploy AIOps for platform management', 'Implement automated policy enforcement', 'Enable predictive failure analysis'] },
        { levelRange: [4.6, 5], label: 'Sustaining Excellence', actions: ['Continuously optimize AIOps models', 'Drive self-healing platform capabilities', 'Pioneer automated platform lifecycle management'] },
      ],
    },
    {
      domain: 'devopsSkills',
      guidance: [
        { levelRange: [1, 1.5], label: 'Initial \u2192 Developing', actions: ['Create repository templates for automation content', 'Establish basic quality gate pipelines', 'Develop initial onboarding materials'] },
        { levelRange: [1.6, 2.5], label: 'Developing \u2192 Operational', actions: ['Expand pipelines with test automation', 'Stand up centralized developer environments', 'Launch structured team onboarding programs'] },
        { levelRange: [2.6, 3.5], label: 'Operational \u2192 Optimizing', actions: ['Implement OpsEx configuration as code', 'Integrate AI code assistance into developer tooling', 'Formalize certification paths for automation engineers'] },
        { levelRange: [3.6, 4.5], label: 'Optimizing \u2192 Innovator', actions: ['Deploy AI-driven DevEx and OpsEx management', 'Automate content lifecycle testing and deployment', 'Establish self-sustaining expertise programs'] },
        { levelRange: [4.6, 5], label: 'Sustaining Excellence', actions: ['Continuously refine AI-driven developer experience', 'Contribute to industry automation practices', 'Drive innovation in automated skills development'] },
      ],
    },
    {
      domain: 'useCases',
      guidance: [
        { levelRange: [1, 1.5], label: 'Initial \u2192 Developing', actions: ['Identify automation use cases within a single domain', 'Implement foundational automation for a specific area', 'Document use case patterns for reuse'] },
        { levelRange: [1.6, 2.5], label: 'Developing \u2192 Operational', actions: ['Connect automation use cases to ITSM and service catalogs', 'Expand automation across multiple enterprise domains', 'Implement self-service automation portals'] },
        { levelRange: [2.6, 3.5], label: 'Operational \u2192 Optimizing', actions: ['Deploy Event-Driven Ansible for automated operations', 'Connect automation to measurable business outcomes', 'Implement cross-domain event response patterns'] },
        { levelRange: [3.6, 4.5], label: 'Optimizing \u2192 Innovator', actions: ['Implement AI-driven use cases for self-managed infrastructure', 'Deploy self-healing automation patterns', 'Establish predictive remediation workflows'] },
        { levelRange: [4.6, 5], label: 'Sustaining Excellence', actions: ['Continuously expand AI-driven autonomous operations', 'Pioneer next-generation automation patterns', 'Drive industry standards for intelligent automation'] },
      ],
    },
  ],

  advancementDetail: {
    governance: [
      {
        foundation: 'Automation platform is accessible to relevant teams with individual accounts',
        actions: ['Integrate external identity providers for centralized access management', 'Define initial RBAC policies and team-level permissions', 'Set up a version control repository for automation content'],
        goals: 'A cross-team Community of Practice coordinates automation strategy and standardized release pipelines',
      },
      {
        foundation: 'RBAC is configured with centralized identity; automation content is in version control',
        actions: ['Establish a Community of Practice or Center of Excellence for automation', 'Implement multi-team release pipelines with peer review gates', 'Standardize automation hub usage and content sharing across teams'],
        goals: 'Adaptive governance policies with automated compliance integrated into release pipelines',
      },
      {
        foundation: 'A CoP or CoE actively coordinates governance; release pipelines serve multiple teams consistently',
        actions: ['Develop governance policies that proactively adapt to organizational changes', 'Integrate governance processes with organizational change management', 'Add automated policy compliance checks to release pipelines'],
        goals: 'AI-informed governance that continuously optimizes alignment and compliance',
      },
      {
        foundation: 'Governance policies are proactive and adaptive; automated quality gates enforce compliance',
        actions: ['Pilot AI-based governance policy recommendations', 'Fully automate release validation and deployment workflows', 'Establish metrics for continuous governance optimization'],
        goals: 'Autonomous governance with AI-driven policy management across the enterprise',
      },
      {
        foundation: 'AI-informed governance continuously optimizes organizational alignment and compliance',
        actions: ['Refine AI governance models through feedback loops and outcome analysis', 'Contribute governance best practices to the broader industry', 'Explore next-generation policy automation capabilities'],
        goals: 'Industry-leading governance that sets the standard for automation maturity',
      },
    ],
    platform: [
      {
        foundation: 'An Ansible Automation Platform instance is deployed and operational',
        actions: ['Separate development and production environments', 'Plan initial platform sizing based on workload projections', 'Establish basic backup and recovery procedures'],
        goals: 'A production-grade platform with offsite resiliency and advanced features in active use',
      },
      {
        foundation: 'Development and production environments are separated; basic backups are in place',
        actions: ['Optimize platform sizing for production workloads and enable high availability', 'Implement offsite resiliency for disaster scenarios', 'Enable and adopt advanced platform features'],
        goals: 'A mission-critical platform with tested DR and automated configuration consistency',
      },
      {
        foundation: 'Platform is production-grade with offsite resiliency; advanced features are actively used',
        actions: ['Implement and test DR or multisite deployment', 'Enforce configuration consistency across all environments', 'Deploy automated drift detection and remediation'],
        goals: 'AIOps-managed platform with automated scaling and self-optimization',
      },
      {
        foundation: 'DR is tested and validated; configuration consistency is enforced across all sites',
        actions: ['Deploy AIOps capabilities for platform management', 'Implement automated policy enforcement for platform operations', 'Enable predictive failure analysis and proactive remediation'],
        goals: 'Fully autonomous platform management with self-healing infrastructure',
      },
      {
        foundation: 'AIOps manages the platform with automated policy enforcement and scaling',
        actions: ['Continuously optimize AIOps models with operational feedback', 'Expand self-healing capabilities across all platform components', 'Pioneer automated platform lifecycle management practices'],
        goals: 'Industry-leading platform operations setting new standards for automation infrastructure',
      },
    ],
    devopsSkills: [
      {
        foundation: 'Team members have access to automation tooling and can create automation content',
        actions: ['Create standardized repository templates for automation projects', 'Establish basic quality gate pipelines for content validation', 'Develop initial onboarding documentation for new automation developers'],
        goals: 'Centralized developer environments with structured onboarding and test automation in pipelines',
      },
      {
        foundation: 'Repository templates and basic quality gate pipelines are available for teams',
        actions: ['Expand CI/CD pipelines with automated testing for automation content', 'Stand up centralized or standardized developer environments', 'Launch structured team onboarding programs with enablement sessions'],
        goals: 'Configuration as code with AI-assisted development and formal certification paths',
      },
      {
        foundation: 'Centralized developer environments are available; test automation is integrated into pipelines',
        actions: ['Implement operational configuration as code practices', 'Integrate AI code assistance into developer tooling', 'Formalize certification paths for automation engineers'],
        goals: 'AI-driven DevEx and OpsEx that autonomously manages content lifecycle',
      },
      {
        foundation: 'Configuration is managed as code; AI-assisted tooling supports development workflows',
        actions: ['Deploy AI-driven DevEx and OpsEx management capabilities', 'Automate content lifecycle testing and deployment end-to-end', 'Establish self-sustaining expertise and knowledge sharing programs'],
        goals: 'Fully autonomous developer experience with self-sustaining expertise across all teams',
      },
      {
        foundation: 'AI-driven tooling manages automation content lifecycle, testing, and deployment',
        actions: ['Continuously refine AI-driven developer experience based on team feedback', 'Contribute to industry automation development practices', 'Explore next-generation skills development automation'],
        goals: 'Industry-leading developer experience that attracts and retains top automation talent',
      },
    ],
    useCases: [
      {
        foundation: 'Teams are writing and running automation for individual tasks and specific needs',
        actions: ['Identify automation use cases within a single domain for broader adoption', 'Implement foundational automation patterns for a targeted area', 'Document use case patterns and templates for reuse across teams'],
        goals: 'Enterprise-wide automation connected to ITSM and service catalogs',
      },
      {
        foundation: 'Automation use cases are established within specific domains or teams',
        actions: ['Connect automation to ITSM and service catalog platforms', 'Expand automation coverage across multiple enterprise domains', 'Implement self-service automation portals for common workflows'],
        goals: 'Event-driven automation with measurable business outcomes across the enterprise',
      },
      {
        foundation: 'Automation spans the enterprise, connected to ITSM and self-service portals',
        actions: ['Deploy Event-Driven Ansible for automated operations', 'Connect automation outcomes to measurable business metrics', 'Implement cross-domain event response and orchestration patterns'],
        goals: 'AI-driven use cases with self-managed and self-healing infrastructure',
      },
      {
        foundation: 'Event-Driven Ansible responds to events; automation drives measurable business outcomes',
        actions: ['Implement AI-driven use cases for self-managed infrastructure', 'Deploy self-healing automation patterns for critical systems', 'Establish predictive remediation workflows based on historical data'],
        goals: 'Autonomous operations with predictive remediation across all infrastructure',
      },
      {
        foundation: 'AI-driven use cases enable self-managed and self-healing infrastructure',
        actions: ['Continuously expand AI-driven autonomous operations coverage', 'Pioneer next-generation automation patterns and architectures', 'Drive industry standards for intelligent automation'],
        goals: 'Industry-defining automation that pushes the boundaries of autonomous operations',
      },
    ],
  },
};
