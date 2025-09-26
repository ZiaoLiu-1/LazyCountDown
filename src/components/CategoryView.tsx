import { ArrowLeft, Clock, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { safeAreaPadding } from '../utils/safeArea';
import { TaskCard } from './TaskCard';
import { SystemCategoryId, isSystemCategory, getCustomCategoryLabel, getCustomCategoryMetadata } from '../data/categories';

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

interface CategoryViewProps {
  category: FilterType;
  tasks: Task[];
  onBack: () => void;
  onTaskClick: (task: Task) => void;
}

const categoryConfig = {
  all: {
    name: '全部任务',
    description: '查看所有任务和倒计时',
    icon: <Clock className="w-8 h-8" />,
    color: '#3B82F6'
  },
  completed: {
    name: '已完成',
    description: '已经完成的任务记录',
    icon: <CheckCircle className="w-8 h-8" />,
    color: '#10B981'
  },
  pending: {
    name: '未完成',
    description: '正在进行中的任务',
    icon: <Clock className="w-8 h-8" />,
    color: '#F59E0B'
  },
  overdue: {
    name: '逾期',
    description: '已经超过截止时间的任务',
    icon: <AlertCircle className="w-8 h-8" />,
    color: '#EF4444'
  }
} as const;

export function CategoryView({ category, tasks, onBack, onTaskClick }: CategoryViewProps) {
  const { theme, currentLanguage } = useTheme();
  const baseConfig = category === 'all' || isSystemCategory(category)
    ? categoryConfig[category as keyof typeof categoryConfig]
    : undefined;
  const customMetadata = !baseConfig && category !== 'all'
    ? getCustomCategoryMetadata(category)
    : undefined;
  const config = baseConfig || {
    name: getCustomCategoryLabel(category, currentLanguage) || category,
    description: currentLanguage === 'zh'
      ? '查看此自定义分类下的所有任务'
      : 'Review every task saved in this custom folder',
    icon: <BookOpen className="w-8 h-8" />,
    color: customMetadata?.color || theme.colors.primary
  };

  // Filter tasks based on category
  const filteredTasks = category === 'all'
    ? tasks
    : tasks.filter(task =>
        isSystemCategory(category)
          ? task.status === category
          : task.category === category
      );

  const oneTimeTasks = filteredTasks.filter(task => task.type === '一次性');
  const recurringTasks = filteredTasks.filter(task => task.type === '循环');

  return (
    <div
      className="full-screen-bg"
      style={{
        background: theme.styles.backgroundImage,
        ...safeAreaPadding({ bottom: 96 })
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between mb-6"
        style={{
          ...safeAreaPadding({ top: 24, left: 16, right: 16 }),
          paddingBottom: 16
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-colors"
          style={{ color: theme.colors.mutedForeground }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </button>
        
        <div className="flex-1" />
      </div>

      <div
        className="space-y-6"
        style={safeAreaPadding({ left: 16, right: 16 })}
      >
        {/* Category Header */}
        <div 
          className={`p-6 rounded-3xl border ${theme.styles.cardStyle}`}
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.cardBorder,
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
              style={{ backgroundColor: config.color }}
            >
              {config.icon}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl mb-2" style={{ color: theme.colors.foreground }}>
                {config.name}
              </h1>
              <p className="mb-3" style={{ color: theme.colors.mutedForeground }}>
                {config.description}
              </p>
              
              {/* Task Count */}
              <div className="flex items-center gap-4 text-sm">
                <span style={{ color: theme.colors.mutedForeground }}>
                  {filteredTasks.length} 个任务
                </span>
                {oneTimeTasks.length > 0 && (
                  <span style={{ color: theme.colors.mutedForeground }}>
                    <Clock className="w-4 h-4 inline mr-1" />
                    {oneTimeTasks.length} 个一次性
                  </span>
                )}
                {recurringTasks.length > 0 && (
                  <span style={{ color: theme.colors.mutedForeground }}>
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    {recurringTasks.length} 个循环
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div 
            className={`p-8 rounded-2xl border text-center ${theme.styles.cardStyle}`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
            }}
          >
            <div className="w-12 h-12 mx-auto mb-4 opacity-40 flex items-center justify-center">
              {config.icon}
            </div>
            <p style={{ color: theme.colors.mutedForeground }}>
              这个分类还没有任务
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* One-time Tasks */}
            {oneTimeTasks.length > 0 && (
              <div className="space-y-4">
                <h3 style={{ color: theme.colors.foreground }}>
                  一次性任务 ({oneTimeTasks.length})
                </h3>
                <div className="space-y-3">
                  {oneTimeTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      countdown={task.countdown}
                      deadline={task.deadline}
                      title={task.title}
                      description={task.description}
                      folderColor={task.folderColor}
                      type={task.type}
                      duration={task.duration}
                      category={task.category}
                      status={task.status}
                      priority={task.priority}
                      onClick={() => onTaskClick(task)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Recurring Tasks */}
            {recurringTasks.length > 0 && (
              <div className="space-y-4">
                <h3 style={{ color: theme.colors.foreground }}>
                  循环任务 ({recurringTasks.length})
                </h3>
                <div className="space-y-3">
                  {recurringTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      countdown={task.countdown}
                      deadline={task.deadline}
                      title={task.title}
                      description={task.description}
                      folderColor={task.folderColor}
                      type={task.type}
                      duration={task.duration}
                      category={task.category}
                      status={task.status}
                      priority={task.priority}
                      onClick={() => onTaskClick(task)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}