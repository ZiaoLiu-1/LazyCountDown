import { LanguageType } from '../contexts/ThemeContext';

export const SYSTEM_CATEGORY_IDS = ['pending', 'completed', 'overdue'] as const;
export type SystemCategoryId = typeof SYSTEM_CATEGORY_IDS[number];
export type CategoryId = string;

export interface CategoryMetadata {
  id: CategoryId;
  names: Record<LanguageType, string>;
  color: string;
  eventBookId: string;
  isSystem: boolean;
}

const SYSTEM_CATEGORY_COLORS: Record<SystemCategoryId, string> = {
  pending: '#60A5FA',
  completed: '#10B981',
  overdue: '#F87171',
};

const systemCategories: CategoryMetadata[] = SYSTEM_CATEGORY_IDS.map((id) => ({
  id,
  names: {
    zh:
      id === 'pending'
        ? '进行中'
        : id === 'completed'
        ? '已完成'
        : '逾期',
    en:
      id === 'pending'
        ? 'In Progress'
        : id === 'completed'
        ? 'Completed'
        : 'Overdue',
  },
  color: SYSTEM_CATEGORY_COLORS[id],
  eventBookId: 'system',
  isSystem: true,
}));

const customCategories: CategoryMetadata[] = [
  {
    id: 'csc3',
    names: {
      zh: 'CSC3',
      en: 'CSC3',
    },
    color: '#9B69FB',
    eventBookId: 'university',
    isSystem: false,
  },
  {
    id: 'math',
    names: {
      zh: '数学课程',
      en: 'Math Courses',
    },
    color: '#8B5CF6',
    eventBookId: 'university',
    isSystem: false,
  },
  {
    id: 'projects',
    names: {
      zh: '项目作业',
      en: 'Project Assignments',
    },
    color: '#06B6D4',
    eventBookId: 'university',
    isSystem: false,
  },
  {
    id: 'wellness',
    names: {
      zh: '健康计划',
      en: 'Wellness Plan',
    },
    color: '#F472B6',
    eventBookId: 'life',
    isSystem: false,
  },
  {
    id: 'family',
    names: {
      zh: '家庭',
      en: 'Family',
    },
    color: '#F97316',
    eventBookId: 'life',
    isSystem: false,
  },
  {
    id: 'strength',
    names: {
      zh: '力量训练',
      en: 'Strength Training',
    },
    color: '#6366F1',
    eventBookId: 'fitness',
    isSystem: false,
  },
  {
    id: 'cardio',
    names: {
      zh: '有氧计划',
      en: 'Cardio Plan',
    },
    color: '#22D3EE',
    eventBookId: 'fitness',
    isSystem: false,
  },
  {
    id: 'product',
    names: {
      zh: '产品迭代',
      en: 'Product Iteration',
    },
    color: '#FBBF24',
    eventBookId: 'work',
    isSystem: false,
  },
  {
    id: 'meetings',
    names: {
      zh: '会议',
      en: 'Meetings',
    },
    color: '#34D399',
    eventBookId: 'work',
    isSystem: false,
  },
];

export function isSystemCategory(categoryId: string | undefined): categoryId is SystemCategoryId {
  return categoryId !== undefined && SYSTEM_CATEGORY_IDS.includes(categoryId as SystemCategoryId);
}

export function getSystemCategoryColor(categoryId: SystemCategoryId): string {
  return SYSTEM_CATEGORY_COLORS[categoryId];
}

export function getCustomCategories(eventBookId: string, language: LanguageType) {
  return customCategories
    .filter((category) => category.eventBookId === eventBookId)
    .map((category) => ({
      id: category.id,
      label: category.names[language],
      color: category.color,
    }));
}

export function getAllCustomCategories(language: LanguageType) {
  return customCategories.map((category) => ({
    id: category.id,
    label: category.names[language],
    color: category.color,
    eventBookId: category.eventBookId,
  }));
}

export function getCustomCategoryMetadata(categoryId: string | undefined) {
  if (!categoryId) return undefined;
  return customCategories.find((category) => category.id === categoryId);
}

export function getCustomCategoryLabel(categoryId: string | undefined, language: LanguageType) {
  const metadata = getCustomCategoryMetadata(categoryId);
  return metadata ? metadata.names[language] : undefined;
}

export function getSystemCategories(language: LanguageType) {
  return systemCategories.map((category) => ({
    id: category.id,
    label: category.names[language],
    color: category.color,
  }));
}

export function getSystemCategoryMetadata(categoryId: string | undefined) {
  if (!categoryId) return undefined;
  return systemCategories.find((category) => category.id === categoryId);
}

export function getCategoriesForEventBook(eventBookId: string, language: LanguageType) {
  return [
    ...getSystemCategories(language),
    ...getCustomCategories(eventBookId, language),
  ];
}
