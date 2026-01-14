/**
 * Role-based Use Case Mapping Logic
 * 3-layer architecture: Role → Cluster → Category → Use Cases
 */

// Types
export type Role =
  | 'Team member / Individual contributor'
  | 'Manager'
  | 'Director'
  | 'Executive (e.g. VP or C-suite)'
  | 'Business owner'
  | 'Freelancer'
  | 'Teacher'
  | 'Student'
  | 'Other';

export type RoleCluster =
  | 'individual'
  | 'managerial'
  | 'leadership'
  | 'education'
  | 'universal';

export type UseCaseCategory =
  | 'self_management'
  | 'team_execution'
  | 'organization_strategy'
  | 'learning_education'
  | 'work_project'
  | 'thinking_decision';

// Layer 1 → Layer 2: Role to Cluster mapping
const roleToCluster: Record<string, RoleCluster[]> = {
  'Team member / Individual contributor': ['individual'],
  'Manager': ['managerial'],
  'Director': ['managerial', 'leadership'],
  'Executive (e.g. VP or C-suite)': ['leadership'],
  'Business owner': ['leadership'],
  'Freelancer': ['individual'],
  'Teacher': ['education'],
  'Student': ['individual', 'education'],
  'Other': ['universal'],
};

// Layer 2 → Layer 3: Cluster to Category mapping
const clusterToCategory: Record<RoleCluster, UseCaseCategory[]> = {
  individual: ['self_management', 'work_project', 'thinking_decision'],
  managerial: ['team_execution', 'work_project', 'thinking_decision'],
  leadership: ['organization_strategy', 'thinking_decision'],
  education: ['learning_education', 'self_management'],
  universal: ['thinking_decision'],
};

// Category priority order for each cluster (role-specific categories first)
const categoryPriority: Record<RoleCluster, UseCaseCategory[]> = {
  individual: ['self_management', 'work_project', 'thinking_decision'],
  managerial: ['team_execution', 'work_project', 'thinking_decision'],
  leadership: ['organization_strategy', 'thinking_decision'],
  education: ['learning_education', 'self_management', 'thinking_decision'],
  universal: ['thinking_decision'],
};

// Layer 3: Category to Use Cases mapping
const categoryToUseCases: Record<UseCaseCategory, string[]> = {
  self_management: [
    'Personal productivity',
    'Self-management & reflection',
    'Goal & habit building',
    'Life planning',
  ],
  team_execution: [
    'Team performance & health',
    'Team alignment & priorities',
    'Workload management',
    'Cross-team collaboration',
  ],
  organization_strategy: [
    'Executive overview',
    'Strategy execution',
    'Organization-wide visibility',
    'Decision tracking',
  ],
  learning_education: [
    'Study planning & execution',
    'Progress tracking for learning',
    'Exam & project preparation',
    'Student progress management',
    'Curriculum & lesson planning',
  ],
  work_project: [
    'Project management',
    'Status reporting',
    'Annual planning',
    'Portfolio management',
    'Resource planning',
    'Employee onboarding',
  ],
  thinking_decision: [
    'Problem solving & decision making',
    'Thinking & note structuring',
  ],
};

// Helper Functions

/**
 * Convert roles to role clusters
 */
export function getRoleClusters(roles: string[]): RoleCluster[] {
  const clusters = new Set<RoleCluster>();

  roles.forEach(role => {
    const roleClusters = roleToCluster[role] || ['universal'];
    roleClusters.forEach(cluster => clusters.add(cluster));
  });

  return Array.from(clusters);
}

/**
 * Get categories for given clusters
 */
export function getCategoriesForClusters(
  clusters: RoleCluster[]
): UseCaseCategory[] {
  const categories = new Set<UseCaseCategory>();

  clusters.forEach(cluster => {
    const clusterCategories = clusterToCategory[cluster] || [];
    clusterCategories.forEach(category => categories.add(category));
  });

  return Array.from(categories);
}

/**
 * Get use cases for given categories (in priority order)
 */
export function getUseCasesForCategories(
  categories: UseCaseCategory[],
  clusters?: RoleCluster[]
): string[] {
  // If clusters provided, sort categories by priority
  let sortedCategories = categories;
  if (clusters && clusters.length > 0) {
    // Create a priority map from all clusters
    const priorityMap = new Map<UseCaseCategory, number>();
    let maxPriority = 0;

    clusters.forEach(cluster => {
      const priorities = categoryPriority[cluster] || [];
      priorities.forEach((category, index) => {
        // Lower index = higher priority
        const currentPriority = priorityMap.get(category);
        if (currentPriority === undefined || index < currentPriority) {
          priorityMap.set(category, index);
        }
        maxPriority = Math.max(maxPriority, index);
      });
    });

    // Sort categories by priority (lower number = higher priority)
    // Categories not in priority map go to the end
    sortedCategories = [...categories].sort((a, b) => {
      const priorityA = priorityMap.get(a) ?? maxPriority + 1;
      const priorityB = priorityMap.get(b) ?? maxPriority + 1;
      return priorityA - priorityB;
    });
  }

  // Build use cases in sorted category order
  const useCases: string[] = [];
  sortedCategories.forEach(category => {
    const categoryUseCases = categoryToUseCases[category] || [];
    useCases.push(...categoryUseCases);
  });

  return useCases;
}

/**
 * Get all use cases (for fallback or "show all" section)
 */
export function getAllUseCases(): string[] {
  const allUseCases = new Set<string>();

  Object.values(categoryToUseCases).forEach(useCases => {
    useCases.forEach(useCase => allUseCases.add(useCase));
  });

  return Array.from(allUseCases);
}

/**
 * Main function: Get recommended use cases based on selected roles
 * Returns both recommended (role-based) and all available use cases
 * Categories are sorted by priority (role-specific categories first)
 */
export function getRecommendedUseCases(
  roles: string[]
): { recommended: string[]; all: string[] } {
  // If no roles selected, return all use cases as recommended
  if (!roles || roles.length === 0) {
    const all = getAllUseCases();
    return { recommended: all, all };
  }

  // Get role-based recommendations with priority sorting
  const clusters = getRoleClusters(roles);
  const categories = getCategoriesForClusters(clusters);
  const recommended = getUseCasesForCategories(categories, clusters);
  const all = getAllUseCases();

  return { recommended, all };
}

/**
 * Get category name for display
 */
export function getCategoryDisplayName(category: UseCaseCategory): string {
  const names: Record<UseCaseCategory, string> = {
    self_management: 'Self & Personal Management',
    team_execution: 'Team Execution & Health',
    organization_strategy: 'Organization & Strategy',
    learning_education: 'Learning & Education',
    work_project: 'Work & Project Management',
    thinking_decision: 'Thinking & Decision Support',
  };

  return names[category];
}
