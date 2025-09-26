import { useTheme } from '../contexts/ThemeContext';
import { SYSTEM_CATEGORY_IDS, SystemCategoryId, isSystemCategory, getCustomCategoryLabel } from '../data/categories';

interface Task {
  id: string;
  countdown: string;
  deadline?: string;
  title: string;
  description: string;
  folderColor: string;
  type: '一次性' | '循环';
  duration?: string;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
  status: SystemCategoryId;
}

type FilterType = 'all' | SystemCategoryId | string;

interface FilterChipsProps {
  tasks: Task[];
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterChips({ tasks, selectedFilter, onFilterChange }: FilterChipsProps) {
  const { theme, t, currentLanguage } = useTheme();
  
  const getTaskCount = (filter: FilterType) => {
    if (filter === 'all') return tasks.length;
    if (isSystemCategory(filter)) {
      return tasks.filter(task => task.status === filter).length;
    }
    return tasks.filter(task => task.category === filter).length;
  };

  // 动态获取所有存在的分类
  const getAllCategories = () => {
    const customCategoryIds = Array.from(
      new Set(tasks.map(task => task.category).filter(Boolean))
    ) as string[];

    const filters: { id: FilterType; label: string; count: number }[] = [
      { id: 'all', label: t.filterTypes.all, count: getTaskCount('all') }
    ];

    SYSTEM_CATEGORY_IDS.forEach((categoryId) => {
      const count = getTaskCount(categoryId);
      if (count > 0) {
        filters.push({
          id: categoryId,
          label: t.filterTypes[categoryId],
          count
        });
      }
    });

    customCategoryIds.forEach((categoryId) => {
      const count = getTaskCount(categoryId);
      if (count > 0) {
        filters.push({
          id: categoryId,
          label: getCustomCategoryLabel(categoryId, currentLanguage) || categoryId,
          count
        });
      }
    });

    return filters;
  };

  const filterOptions = getAllCategories();
  
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {filterOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className={`
            flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all duration-300
            ${selectedFilter === option.id ? 'border-2' : 'border'}
          `}
          style={{
            backgroundColor: selectedFilter === option.id ? theme.colors.primary + '20' : theme.colors.card,
            borderColor: selectedFilter === option.id ? theme.colors.primary : theme.colors.cardBorder,
            color: selectedFilter === option.id ? theme.colors.primary : theme.colors.mutedForeground,
          }}
        >
          <span>{option.label}</span>
          <span 
            className="px-2 py-0.5 rounded-lg text-xs"
            style={{
              backgroundColor: selectedFilter === option.id ? theme.colors.primary + '30' : theme.colors.cardBorder,
              color: selectedFilter === option.id ? theme.colors.primary : theme.colors.mutedForeground,
            }}
          >
            {option.count}
          </span>
        </button>
      ))}
    </div>
  );
}