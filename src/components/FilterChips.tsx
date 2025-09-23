import { useTheme } from '../contexts/ThemeContext';

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
}

type FilterType = 'all' | 'completed' | 'pending' | 'overdue' | 'csc3';

interface FilterChipsProps {
  tasks: Task[];
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterChips({ tasks, selectedFilter, onFilterChange }: FilterChipsProps) {
  const { theme, t } = useTheme();
  
  const getTaskCount = (filter: FilterType) => {
    if (filter === 'all') return tasks.length;
    return tasks.filter(task => task.category === filter).length;
  };

  // 动态获取所有存在的分类
  const getAllCategories = () => {
    const categoriesInTasks = new Set(tasks.map(task => task.category).filter(Boolean));
    
    // 基础分类（始终显示）
    const baseFilters = [
      { id: 'all' as FilterType, label: t.filterTypes.all, count: getTaskCount('all') }
    ];

    // 系统分类（只在有任务时显示）
    const systemCategories = [
      { id: 'completed' as FilterType, label: t.filterTypes.completed },
      { id: 'pending' as FilterType, label: t.filterTypes.pending },
      { id: 'overdue' as FilterType, label: t.filterTypes.overdue }
    ];

    // 自定义分类（CSC3等）
    const customCategories = [
      { id: 'csc3' as FilterType, label: t.filterTypes.csc3 }
    ];

    // 收集所有有任务的分类
    const availableFilters = baseFilters;

    // 添加系统分类（如果有对应任务）
    systemCategories.forEach(category => {
      if (categoriesInTasks.has(category.id)) {
        availableFilters.push({
          ...category,
          count: getTaskCount(category.id)
        });
      }
    });

    // 添加自定义分类（如果有对应任务）
    customCategories.forEach(category => {
      if (categoriesInTasks.has(category.id)) {
        availableFilters.push({
          ...category,
          count: getTaskCount(category.id)
        });
      }
    });

    return availableFilters;
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