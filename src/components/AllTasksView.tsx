import { useState, useEffect } from 'react';
import { ArrowLeft, GraduationCap, Home, Dumbbell, Briefcase, BookOpen, Heart, Filter, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { FilterChips } from './FilterChips';
import { StatsCards } from './StatsCards';
import { TaskSection } from './TaskSection';
import { FloatingActionButton } from './FloatingActionButton';
import { CloudDecoration } from './CloudDecoration';
import { EventBookFilterChips } from './EventBookFilterChips';
import { formatCountdown, formatEventBookName, formatEventBookDescription } from '../utils/dateUtils';
import { safeAreaInset, safeAreaPadding } from '../utils/safeArea';
import { useTasks, useEventBooks } from '../hooks';
import { CountdownService } from '../services';
import type { Task as TaskType } from '../types';

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
  eventBookId: string;
}

interface EventBook {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  taskCount: number;
  completedCount: number;
  createdAt: string;
}

type FilterType = 'all' | 'completed' | 'pending' | 'overdue' | 'csc3';

interface AllTasksViewProps {
  onBack: () => void;
  onTaskClick: (task: Task) => void;
  onAddTask: () => void;
  onImportICS: () => void;
  onSettingsClick: () => void;
  onEventBookClick: (eventBookId: string) => void;
}

// 所有任务数据汇总
const getAllTasks = (language: 'zh' | 'en'): { tasks: Task[], eventBooks: EventBook[] } => {
  const eventBooks: EventBook[] = [
    { 
      id: 'university', 
      name: formatEventBookName('university', language), 
      description: formatEventBookDescription('university', language), 
      icon: 'graduation-cap', 
      color: '#3B82F6', 
      taskCount: 8, 
      completedCount: 3, 
      createdAt: '2024-01-15' 
    },
    { 
      id: 'life', 
      name: formatEventBookName('life', language), 
      description: formatEventBookDescription('life', language), 
      icon: 'home', 
      color: '#10B981', 
      taskCount: 5, 
      completedCount: 2, 
      createdAt: '2024-01-10' 
    },
    { 
      id: 'fitness', 
      name: formatEventBookName('fitness', language), 
      description: formatEventBookDescription('fitness', language), 
      icon: 'dumbbell', 
      color: '#F59E0B', 
      taskCount: 3, 
      completedCount: 1, 
      createdAt: '2024-01-20' 
    },
    { 
      id: 'work', 
      name: formatEventBookName('work', language), 
      description: formatEventBookDescription('work', language), 
      icon: 'briefcase', 
      color: '#8B5CF6', 
      taskCount: 12, 
      completedCount: 7, 
      createdAt: '2024-01-08' 
    }
  ];

  const getTaskTitle = (id: string, language: 'zh' | 'en') => {
    const titles = {
      zh: {
        '1': 'CSC347 期末项目',
        '2': 'CSC301 团队作业',
        '3': 'MAT237 期末考试',
        '4': 'CSC236 作业3',
        '5': 'CSC347 Lab',
        '6': '房租缴费',
        '7': '医生预约',
        '8': '家庭大扫除',
        '9': '健身房月卡续费',
        '10': '力量训练',
        '11': '项目里程碑交付',
        '12': '季度绩效评估',
        '13': '团队周会',
        '14': 'STA247 作业2',
        '15': '水电费缴费',
        '16': '体检预约',
        '17': '月度报告'
      },
      en: {
        '1': 'CSC347 Final Project',
        '2': 'CSC301 Team Assignment',
        '3': 'MAT237 Final Exam',
        '4': 'CSC236 Assignment 3',
        '5': 'CSC347 Lab',
        '6': 'Rent Payment',
        '7': 'Doctor Appointment',
        '8': 'House Cleaning',
        '9': 'Gym Membership Renewal',
        '10': 'Strength Training',
        '11': 'Project Milestone Delivery',
        '12': 'Quarterly Performance Review',
        '13': 'Team Meeting',
        '14': 'STA247 Assignment 2',
        '15': 'Utility Bill Payment',
        '16': 'Health Checkup',
        '17': 'Monthly Report'
      }
    };
    return titles[language][id as keyof typeof titles.zh] || '';
  };

  const getTaskDescription = (id: string, language: 'zh' | 'en') => {
    const descriptions = {
      zh: {
        '1': '完成数据库系统设计项目，包括ER图和SQL实现。',
        '2': '软件工程团队项目第三阶段提交。',
        '3': '多元微积分期末考试复习和准备。',
        '4': '算法分析作业已完成并提交。',
        '5': '数据库系统实验课程。',
        '6': '10月份房租缴费截止日期。',
        '7': '年度体检预约时间。',
        '8': '每周定期清洁整理家务。',
        '9': '健身房会员卡到期续费。',
        '10': '每周三次力量训练计划。',
        '11': '第二阶段开发任务完成和交付。',
        '12': '准备Q3季度工作总结和自评。',
        '13': '项目进度同步和问题讨论。',
        '14': '统计学作业已经逾期，需要尽快提交。',
        '15': '9月份水电费已缴费完成。',
        '16': '年度体检预约已逾期，需要重新预约。',
        '17': '8月份工作月度报告已提交。'
      },
      en: {
        '1': 'Complete database system design project including ER diagram and SQL implementation.',
        '2': 'Software engineering team project phase 3 submission.',
        '3': 'Multivariable calculus final exam review and preparation.',
        '4': 'Algorithm analysis assignment completed and submitted.',
        '5': 'Database systems laboratory course.',
        '6': 'October rent payment deadline.',
        '7': 'Annual health checkup appointment.',
        '8': 'Weekly regular cleaning and organizing.',
        '9': 'Gym membership card renewal due.',
        '10': 'Three times a week strength training plan.',
        '11': 'Phase 2 development task completion and delivery.',
        '12': 'Prepare Q3 quarterly work summary and self-evaluation.',
        '13': 'Project progress sync and issue discussion.',
        '14': 'Statistics assignment is overdue, need to submit ASAP.',
        '15': 'September utility bill payment completed.',
        '16': 'Annual health checkup appointment is overdue, need to reschedule.',
        '17': 'August monthly work report submitted.'
      }
    };
    return descriptions[language][id as keyof typeof descriptions.zh] || '';
  };

  const tasks: Task[] = [
    // University tasks
    { id: '1', countdown: '55天 15小时', deadline: '2025-11-13', title: getTaskTitle('1', language), description: getTaskDescription('1', language), folderColor: '#3B82F6', type: '一次性', priority: 'high', category: 'pending', eventBookId: 'university' },
    { id: '2', countdown: '2天 14小时', deadline: '2024-09-21', title: getTaskTitle('2', language), description: getTaskDescription('2', language), folderColor: '#F59E0B', type: '一次性', priority: 'high', category: 'pending', eventBookId: 'university' },
    { id: '3', countdown: '71天 15小时', deadline: '2025-11-29', title: getTaskTitle('3', language), description: getTaskDescription('3', language), folderColor: '#EF4444', type: '一次性', priority: 'medium', category: 'pending', eventBookId: 'university' },
    { id: '4', countdown: '已完成', deadline: '2025-09-15', title: getTaskTitle('4', language), description: getTaskDescription('4', language), folderColor: '#10B981', type: '一次性', priority: 'medium', category: 'completed', eventBookId: 'university' },
    { id: '5', countdown: language === 'zh' ? '每周二 14:00' : 'Tuesdays 2:00 PM', title: getTaskTitle('5', language), description: getTaskDescription('5', language), folderColor: '#3B82F6', type: '循环', duration: language === 'zh' ? '2小时' : '2 hours', priority: 'medium', category: 'pending', eventBookId: 'university' },
    { id: '14', countdown: '已逾期 3天', deadline: '2024-09-16', title: getTaskTitle('14', language), description: getTaskDescription('14', language), folderColor: '#EF4444', type: '一次性', priority: 'high', category: 'overdue', eventBookId: 'university' },
    
    // Life tasks
    { id: '6', countdown: '1天 12小时', deadline: '2024-09-20', title: getTaskTitle('6', language), description: getTaskDescription('6', language), folderColor: '#F59E0B', type: '一次性', priority: 'high', category: 'pending', eventBookId: 'life' },
    { id: '7', countdown: '15天 8小时', deadline: '2025-10-04', title: getTaskTitle('7', language), description: getTaskDescription('7', language), folderColor: '#10B981', type: '一次性', priority: 'medium', category: 'pending', eventBookId: 'life' },
    { id: '8', countdown: language === 'zh' ? '每周日 10:00' : 'Sundays 10:00 AM', title: getTaskTitle('8', language), description: getTaskDescription('8', language), folderColor: '#8B5CF6', type: '循环', duration: language === 'zh' ? '2小时' : '2 hours', priority: 'low', category: 'pending', eventBookId: 'life' },
    { id: '15', countdown: '已完成', deadline: '2024-09-10', title: getTaskTitle('15', language), description: getTaskDescription('15', language), folderColor: '#10B981', type: '一次性', priority: 'medium', category: 'completed', eventBookId: 'life' },
    
    // Fitness tasks
    { id: '9', countdown: '3天 6小时', deadline: '2024-09-22', title: getTaskTitle('9', language), description: getTaskDescription('9', language), folderColor: '#F59E0B', type: '一次性', priority: 'medium', category: 'pending', eventBookId: 'fitness' },
    { id: '10', countdown: language === 'zh' ? '每周一、三、五 19:00' : 'Mon, Wed, Fri 7:00 PM', title: getTaskTitle('10', language), description: getTaskDescription('10', language), folderColor: '#EF4444', type: '循环', duration: language === 'zh' ? '1.5小时' : '1.5 hours', priority: 'high', category: 'pending', eventBookId: 'fitness' },
    { id: '16', countdown: '已逾期 1天', deadline: '2024-09-18', title: getTaskTitle('16', language), description: getTaskDescription('16', language), folderColor: '#EF4444', type: '一次性', priority: 'high', category: 'overdue', eventBookId: 'fitness' },
    
    // Work tasks
    { id: '11', countdown: '12天 16小时', deadline: '2025-10-01', title: getTaskTitle('11', language), description: getTaskDescription('11', language), folderColor: '#8B5CF6', type: '一次性', priority: 'high', category: 'pending', eventBookId: 'work' },
    { id: '12', countdown: '25天 10小时', deadline: '2025-10-14', title: getTaskTitle('12', language), description: getTaskDescription('12', language), folderColor: '#3B82F6', type: '一次性', priority: 'medium', category: 'pending', eventBookId: 'work' },
    { id: '13', countdown: language === 'zh' ? '每周一 09:00' : 'Mondays 9:00 AM', title: getTaskTitle('13', language), description: getTaskDescription('13', language), folderColor: '#10B981', type: '循环', duration: language === 'zh' ? '1小时' : '1 hour', priority: 'medium', category: 'pending', eventBookId: 'work' },
    { id: '17', countdown: '已完成', deadline: '2024-09-15', title: getTaskTitle('17', language), description: getTaskDescription('17', language), folderColor: '#10B981', type: '一次性', priority: 'medium', category: 'completed', eventBookId: 'work' }
  ];

  return { tasks, eventBooks };
};

export function AllTasksView({ 
  onBack, 
  onTaskClick, 
  onAddTask, 
  onImportICS, 
  onSettingsClick,
  onEventBookClick 
}: AllTasksViewProps) {
  const { theme, t, currentLanguage } = useTheme();
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [selectedEventBookFilter, setSelectedEventBookFilter] = useState<string>('all');

  // Load data from database
  const { tasks: dbTasks, loading: tasksLoading, refresh: refreshTasks } = useTasks();
  const { eventBooks, loading: ebLoading, refresh: refreshEventBooks } = useEventBooks();

  // Reset scroll position to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    refreshTasks();
    refreshEventBooks();
  }, []);

  // Convert database tasks to component format with real countdowns
  const convertToTask = (task: TaskType): Task => {
    const eventBook = eventBooks.find(eb => eb.id === task.eventBookId);
    const countdown = task.completed 
      ? (currentLanguage === 'zh' ? '已完成' : 'Completed')
      : CountdownService.calculateCountdown(task.deadline, currentLanguage);
    
    return {
      id: task.id,
      countdown,
      deadline: task.deadline,
      title: task.title,
      description: task.description,
      folderColor: eventBook?.color || '#3B82F6',
      type: task.type,
      duration: (task as any).duration,
      priority: task.priority,
      category: task.completed ? 'completed' : (CountdownService.isOverdue(task.deadline) ? 'overdue' : 'pending'),
      eventBookId: task.eventBookId
    };
  };

  const tasks = dbTasks.map(convertToTask);

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      'graduation-cap': GraduationCap,
      'home': Home,
      'dumbbell': Dumbbell,
      'briefcase': Briefcase,
      'book-open': BookOpen,
      'heart': Heart
    };
    return iconMap[iconName as keyof typeof iconMap] || BookOpen;
  };

  // Filter tasks based on current filters
  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];

    // Filter by status
    if (currentFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.category === currentFilter);
    }

    // Filter by event book
    if (selectedEventBookFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.eventBookId === selectedEventBookFilter);
    }

    return filteredTasks;
  };

  const filteredTasks = getFilteredTasks();
  const oneTimeTasks = filteredTasks.filter(task => task.type === '一次性');
  const recurringTasks = filteredTasks.filter(task => task.type === '循环');

  // Enhanced TaskCard component that shows event book info
  const TaskCardWithEventBook = ({ task }: { task: Task }) => {
    const eventBook = eventBooks.find(eb => eb.id === task.eventBookId);
    if (!eventBook) return null;
    
    const IconComponent = getIconComponent(eventBook.icon);
    const isCompleted = task.category === 'completed';
    const isOverdue = task.category === 'overdue';
    
    // Format countdown text based on current language
    const formattedCountdown = formatCountdown(task.countdown, currentLanguage);
    
    // Determine if task is urgent (within 3 days) or due soon (within 2 days)
    const isUrgent = () => {
      if (task.type === '循环' || isCompleted) return false;
      if (!task.deadline) return false;
      
      const deadlineDate = new Date(task.deadline);
      const now = new Date();
      const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && diffDays >= 0;
    };
    
    const isDueSoon = () => {
      if (task.type === '循环' || isCompleted || isOverdue) return false;
      if (!task.deadline) return false;
      
      const deadlineDate = new Date(task.deadline);
      const now = new Date();
      const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 2 && diffDays >= 0;
    };

    // Get appropriate status colors and styling
    const getTaskStyling = () => {
      if (isCompleted) {
        return {
          containerClass: 'task-completed',
          borderColor: theme.colors.success + '40',
          backgroundColor: theme.colors.card,
          statusIcon: <CheckCircle2 className="w-4 h-4" style={{ color: theme.colors.success }} />,
          statusColor: theme.colors.success
        };
      }
      
      if (isOverdue) {
        return {
          containerClass: 'task-overdue animate-pulse-warning',
          borderColor: '#ef4444',
          backgroundColor: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.03) 100%)',
          statusIcon: <AlertTriangle className="w-4 h-4" style={{ color: '#ef4444' }} />,
          statusColor: '#ef4444'
        };
      }
      
      if (isDueSoon()) {
        return {
          containerClass: 'task-due-soon animate-pulse-warning-yellow',
          borderColor: '#f59e0b',
          backgroundColor: 'linear-gradient(135deg, rgba(245, 158, 11, 0.20) 0%, rgba(245, 158, 11, 0.12) 100%)',
          statusIcon: <Clock className="w-4 h-4" style={{ color: '#f59e0b' }} />,
          statusColor: '#f59e0b'
        };
      }
      
      if (isUrgent()) {
        return {
          containerClass: 'task-urgent',
          borderColor: theme.colors.warning,
          backgroundColor: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.08) 100%)',
          statusIcon: <Clock className="w-4 h-4" style={{ color: theme.colors.warning }} />,
          statusColor: theme.colors.warning
        };
      }
      
      return {
        containerClass: '',
        borderColor: theme.colors.cardBorder,
        backgroundColor: theme.colors.card,
        statusIcon: null,
        statusColor: theme.colors.foreground
      };
    };

    const styling = getTaskStyling();
    
    return (
      <div
        onClick={() => onTaskClick(task)}
        className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${theme.styles.cardStyle} ${styling.containerClass}`}
        style={{
          backgroundColor: styling.backgroundColor,
          borderColor: styling.borderColor,
          boxShadow: theme.styles.shadowStyle,
        }}
      >
        {/* Event Book Tag */}
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: eventBook.color + '15' }}
          >
            <IconComponent 
              className="w-3 h-3" 
              style={{ color: eventBook.color }} 
            />
          </div>
          <span 
            className="text-xs px-2 py-1 rounded-md"
            style={{ 
              backgroundColor: eventBook.color + '15',
              color: eventBook.color 
            }}
          >
            {eventBook.name}
          </span>
        </div>

        {/* Task Content */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 
                className={`text-base ${isCompleted ? 'line-through' : ''}`} 
                style={{ 
                  color: isCompleted ? theme.colors.mutedForeground : theme.colors.foreground 
                }}
              >
                {task.title}
              </h3>
              <div className="flex items-center gap-2">
                {styling.statusIcon}
                {/* Priority indicator - only show for urgent tasks, not overdue or due soon */}
                {(isUrgent() && !isOverdue && !isDueSoon()) && (
                  <div
                    className="flex-shrink-0 w-2 h-2 rounded-full animate-pulse"
                    style={{ 
                      background: theme.colors.warning
                    }}
                  />
                )}
                <div 
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ 
                    backgroundColor: task.folderColor,
                    opacity: isCompleted ? 0.5 : 1
                  }}
                />
              </div>
            </div>
            <p 
              className={`text-sm leading-relaxed ${isCompleted ? 'line-through' : ''}`} 
              style={{ 
                color: isCompleted ? theme.colors.mutedForeground + '80' : theme.colors.mutedForeground 
              }}
            >
              {task.description}
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span 
              className="text-xs px-2 py-1 rounded-md"
              style={{ 
                backgroundColor: task.type === '一次性' ? theme.colors.primary + '15' : theme.colors.success + '15',
                color: task.type === '一次性' ? theme.colors.primary : theme.colors.success
              }}
            >
              {t.taskTypes[task.type]}
            </span>
            {task.duration && (
              <span className="text-xs" style={{ color: theme.colors.mutedForeground }}>
                {task.duration}
              </span>
            )}
            {/* Status badge */}
            {(isCompleted || isOverdue || isDueSoon() || isUrgent()) && (
              <span 
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md"
                style={{ 
                  backgroundColor: styling.statusColor + '15',
                  color: styling.statusColor
                }}
              >
                {styling.statusIcon}
                {isCompleted && t.filterTypes.completed}
                {isOverdue && t.filterTypes.overdue}
                {isDueSoon() && !isOverdue && !isCompleted && t.common.dueSoon}
                {isUrgent() && !isOverdue && !isCompleted && !isDueSoon() && t.common.dueSoon}
              </span>
            )}
          </div>
          <div className="text-right">
            <span 
              className={`text-sm ${isCompleted ? 'line-through' : ''}`} 
              style={{ 
                color: isCompleted ? theme.colors.success : 
                      isOverdue ? '#ef4444' : 
                      isUrgent() ? theme.colors.warning : 
                      theme.colors.foreground 
              }}
            >
              {formattedCountdown}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="full-screen-bg relative"
      style={{
        background: theme.styles.backgroundImage,
        ...safeAreaPadding({ bottom: 96 })
      }}
    >
      <CloudDecoration />

      {/* Header */}
      <div
        className="relative z-10 pb-2"
        style={safeAreaPadding({ top: 12, left: 16, right: 16 })}
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 transition-colors"
            style={{ color: theme.colors.mutedForeground }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.allTasks.back}</span>
          </button>
          
          <button
            onClick={onSettingsClick}
            className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: theme.colors.card,
              border: `1px solid ${theme.colors.cardBorder}`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.mutedForeground }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.mutedForeground }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.mutedForeground }} />
          </button>
        </div>

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: theme.colors.primary + '15' }}
          >
            <Filter 
              className="w-8 h-8" 
              style={{ color: theme.colors.primary }} 
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl mb-1" style={{ color: theme.colors.foreground }}>
              {t.allTasks.title}
            </h1>
            <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
              {t.allTasks.subtitle}
            </p>
          </div>
        </div>
      </div>
      
      <div
        className="relative z-10 space-y-6"
        style={{
          ...safeAreaPadding({ left: 16, right: 16 }),
          paddingBottom: safeAreaInset('bottom', 96)
        }}
      >
        {/* Filter Controls */}
        <div className="space-y-4">
          {/* Event Book Filter - Now first row */}
          <EventBookFilterChips
            items={[
              { id: 'all', name: t.eventBooks.all, count: tasks.length },
              ...eventBooks.map(eventBook => ({
                id: eventBook.id,
                name: eventBook.name,
                count: tasks.filter(t => t.eventBookId === eventBook.id).length,
                icon: (() => {
                  const IconComponent = getIconComponent(eventBook.icon);
                  return <IconComponent className="w-4 h-4" />;
                })(),
                color: eventBook.color
              }))
            ]}
            selectedId={selectedEventBookFilter}
            onSelect={setSelectedEventBookFilter}
          />
          
          {/* Status Filter - Now second row */}
          <FilterChips 
            tasks={tasks}
            selectedFilter={currentFilter}
            onFilterChange={setCurrentFilter}
          />
        </div>

        <StatsCards tasks={dbTasks} />
        
        {oneTimeTasks.length > 0 || recurringTasks.length > 0 ? (
          <div className="space-y-8">
            {oneTimeTasks.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg" style={{ color: theme.colors.foreground }}>
                    {t.allTasks.oneTimeTasks} ({oneTimeTasks.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {oneTimeTasks.map(task => (
                    <TaskCardWithEventBook key={task.id} task={task} />
                  ))}
                </div>
              </div>
            )}
            {recurringTasks.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg" style={{ color: theme.colors.foreground }}>
                    {t.allTasks.recurringTasks} ({recurringTasks.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {recurringTasks.map(task => (
                    <TaskCardWithEventBook key={task.id} task={task} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div 
            className={`p-8 rounded-2xl border text-center ${theme.styles.cardStyle}`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
            }}
          >
            <p style={{ color: theme.colors.mutedForeground }}>
              {t.allTasks.noTasks}
            </p>
          </div>
        )}
      </div>
      
      <FloatingActionButton onAddTask={onAddTask} onImportICS={onImportICS} />
    </div>
  );
}