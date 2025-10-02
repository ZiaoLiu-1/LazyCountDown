import { useState, useEffect } from 'react';
import { ArrowLeft, GraduationCap, Home, Dumbbell, Briefcase, BookOpen, Heart, FolderOpen, Tag } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { FilterChips } from './FilterChips';
import { StatsCards } from './StatsCards';
import { TaskSection } from './TaskSection';
import { FloatingActionButton } from './FloatingActionButton';
import { CloudDecoration } from './CloudDecoration';
import { safeAreaPadding } from '../utils/safeArea';
import { EventBook } from './EventBooksList';
import { formatCountdown, formatEventBookName, formatEventBookDescription } from '../utils/dateUtils';

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

type FilterType = 'all' | 'completed' | 'pending' | 'overdue' | 'csc3';

interface EventBookDetailProps {
  eventBook: EventBook;
  onBack: () => void;
  onTaskClick: (task: Task) => void;
  onAddTask: () => void;
  onImportICS: () => void;
  onSettingsClick: () => void;
  onFileStorage: () => void;
  onCategoryManagement: () => void; // Add this new prop
}

// Dynamic task data generation based on language
const getTasksForEventBook = (eventBookId: string, language: 'zh' | 'en'): { oneTime: Task[], recurring: Task[] } => {
  const getTaskTitle = (id: string, eventBookId: string, language: 'zh' | 'en') => {
    const titles = {
      zh: {
        university: {
          '1': 'CSC347 期末项目',
          '2': 'CSC301 团队作业', 
          '3': 'MAT237 期末考试',
          '4': 'CSC236 作业3',
          '5': 'CSC347 Lab',
          '14': 'STA247 作业2'
        },
        life: {
          '6': '房租缴费',
          '7': '医生预约',
          '8': '家庭大扫除',
          '15': '水电费缴费'
        },
        fitness: {
          '9': '健身房月卡续费',
          '10': '力量训练',
          '16': '体检预约'
        },
        work: {
          '11': '项目里程碑交付',
          '12': '季度绩效评估', 
          '13': '团队周会',
          '17': '月度报告'
        }
      },
      en: {
        university: {
          '1': 'CSC347 Final Project',
          '2': 'CSC301 Team Assignment',
          '3': 'MAT237 Final Exam', 
          '4': 'CSC236 Assignment 3',
          '5': 'CSC347 Lab',
          '14': 'STA247 Assignment 2'
        },
        life: {
          '6': 'Rent Payment',
          '7': 'Doctor Appointment',
          '8': 'House Cleaning',
          '15': 'Utility Bill Payment'
        },
        fitness: {
          '9': 'Gym Membership Renewal',
          '10': 'Strength Training',
          '16': 'Health Checkup'
        },
        work: {
          '11': 'Project Milestone Delivery',
          '12': 'Quarterly Performance Review',
          '13': 'Team Meeting',
          '17': 'Monthly Report'
        }
      }
    };
    return titles[language][eventBookId as keyof typeof titles.zh]?.[id as keyof typeof titles.zh.university] || '';
  };

  const getTaskDescription = (id: string, eventBookId: string, language: 'zh' | 'en') => {
    const descriptions = {
      zh: {
        university: {
          '1': '完成数据库系统设计项目，包括ER图和SQL实现。',
          '2': '软件工程团队项目第三阶段提交。',
          '3': '多元微积分期末考试复习和准备。', 
          '4': '算法分析作业已完成并提交。',
          '5': '数据库系统实验课程。',
          '14': '统计学作业已经逾期，需要尽快提交。'
        },
        life: {
          '6': '10月份房租缴费截止日期。',
          '7': '年度体检预约时间。',
          '8': '每周定期清洁整理家务。',
          '15': '9月份水电费已缴费完成。'
        },
        fitness: {
          '9': '健身房会员卡到期续费。',
          '10': '每周三次力量训练计划。',
          '16': '年度体检预约已逾期，需要重新预约。'
        },
        work: {
          '11': '第二阶段开发任务完成和交付。',
          '12': '准备Q3季度工作总结和自评。',
          '13': '项目进度同步和问题讨论。',
          '17': '8月份工作月度报告已提交。'
        }
      },
      en: {
        university: {
          '1': 'Complete database system design project including ER diagram and SQL implementation.',
          '2': 'Software engineering team project phase 3 submission.',
          '3': 'Multivariable calculus final exam review and preparation.',
          '4': 'Algorithm analysis assignment completed and submitted.',
          '5': 'Database systems laboratory course.',
          '14': 'Statistics assignment is overdue, need to submit ASAP.'
        },
        life: {
          '6': 'October rent payment deadline.',
          '7': 'Annual health checkup appointment.',
          '8': 'Weekly regular cleaning and organizing.',
          '15': 'September utility bill payment completed.'
        },
        fitness: {
          '9': 'Gym membership card renewal due.',
          '10': 'Three times a week strength training plan.',
          '16': 'Annual health checkup appointment is overdue, need to reschedule.'
        },
        work: {
          '11': 'Phase 2 development task completion and delivery.',
          '12': 'Prepare Q3 quarterly work summary and self-evaluation.',
          '13': 'Project progress sync and issue discussion.',
          '17': 'August monthly work report submitted.'
        }
      }
    };
    return descriptions[language][eventBookId as keyof typeof descriptions.zh]?.[id as keyof typeof descriptions.zh.university] || '';
  };

  const allTasks = {
    university: {
      oneTime: [
        {
          id: '1',
          countdown: '55天 15小时',
          deadline: '2025-11-13',
          title: getTaskTitle('1', eventBookId, language),
          description: getTaskDescription('1', eventBookId, language),
          folderColor: '#3B82F6',
          type: '一次性' as const,
          priority: 'high' as const,
          category: 'csc3', // 将这个任务改为CSC3分类
          eventBookId: 'university'
        },
        {
          id: '2',
          countdown: '2天 14小时',
          deadline: '2024-09-21',
          title: getTaskTitle('2', eventBookId, language),
          description: getTaskDescription('2', eventBookId, language),
          folderColor: '#F59E0B',
          type: '一次性' as const,
          priority: 'high' as const,
          category: 'csc3',
          eventBookId: 'university'
        },
        {
          id: '3',
          countdown: '71天 15小时',
          deadline: '2025-11-29',
          title: getTaskTitle('3', eventBookId, language),
          description: getTaskDescription('3', eventBookId, language),
          folderColor: '#EF4444',
          type: '一次性' as const,
          priority: 'medium' as const,
          category: 'math',
          eventBookId: 'university'
        },
        {
          id: '4',
          countdown: '已完成',
          deadline: '2025-09-15',
          title: getTaskTitle('4', eventBookId, language),
          description: getTaskDescription('4', eventBookId, language),
          folderColor: '#10B981',
          type: '一次性' as const,
          priority: 'medium' as const,
          category: 'completed',
          eventBookId: 'university'
        },
        {
          id: '14',
          countdown: '已逾期 3天',
          deadline: '2024-09-16',
          title: getTaskTitle('14', eventBookId, language),
          description: getTaskDescription('14', eventBookId, language),
          folderColor: '#EF4444',
          type: '一次性' as const,
          priority: 'high' as const,
          category: 'overdue',
          eventBookId: 'university'
        }
      ],
      recurring: [
        {
          id: '5',
          countdown: language === 'zh' ? '每周二 14:00' : 'Tuesdays 2:00 PM',
          title: getTaskTitle('5', eventBookId, language),
          description: getTaskDescription('5', eventBookId, language),
          folderColor: '#3B82F6',
          type: '循环' as const,
          duration: language === 'zh' ? '2小时' : '2 hours',
          priority: 'medium' as const,
          category: 'projects',
          eventBookId: 'university'
        }
      ]
    },
    life: {
      oneTime: [
        {
          id: '6',
          countdown: '1天 12小时',
          deadline: '2024-09-20',
          title: getTaskTitle('6', eventBookId, language),
          description: getTaskDescription('6', eventBookId, language),
          folderColor: '#F59E0B',
          type: '一次性' as const,
          priority: 'high' as const,
          category: 'pending',
          eventBookId: 'life'
        },
        {
          id: '7',
          countdown: '15天 8小时',
          deadline: '2025-10-04',
          title: getTaskTitle('7', eventBookId, language),
          description: getTaskDescription('7', eventBookId, language),
          folderColor: '#10B981',
          type: '一次性' as const,
          priority: 'medium' as const,
          category: 'pending',
          eventBookId: 'life'
        },
        {
          id: '15',
          countdown: '已完成',
          deadline: '2024-09-10',
          title: getTaskTitle('15', eventBookId, language),
          description: getTaskDescription('15', eventBookId, language),
          folderColor: '#10B981',
          type: '一次性' as const,
          priority: 'medium' as const,
          category: 'completed',
          eventBookId: 'life'
        }
      ],
      recurring: [
        {
          id: '8',
          countdown: language === 'zh' ? '每周日 10:00' : 'Sundays 10:00 AM',
          title: getTaskTitle('8', eventBookId, language),
          description: getTaskDescription('8', eventBookId, language),
          folderColor: '#8B5CF6',
          type: '循环' as const,
          duration: language === 'zh' ? '2小时' : '2 hours',
          priority: 'low' as const,
          category: 'pending',
          eventBookId: 'life'
        }
      ]
    },
    fitness: {
      oneTime: [
        {
          id: '9',
          countdown: '3天 6小时',
          deadline: '2024-09-22',
          title: getTaskTitle('9', eventBookId, language),
          description: getTaskDescription('9', eventBookId, language),
          folderColor: '#F59E0B',
          type: '一次性' as const,
          priority: 'medium' as const,
          category: 'pending',
          eventBookId: 'fitness'
        },
        {
          id: '16',
          countdown: '已逾期 1天',
          deadline: '2024-09-18',
          title: getTaskTitle('16', eventBookId, language),
          description: getTaskDescription('16', eventBookId, language),
          folderColor: '#EF4444',
          type: '一次性' as const,
          priority: 'high' as const,
          category: 'overdue',
          eventBookId: 'fitness'
        }
      ],
      recurring: [
        {
          id: '10',
          countdown: language === 'zh' ? '每周一、三、五 19:00' : 'Mon, Wed, Fri 7:00 PM',
          title: getTaskTitle('10', eventBookId, language),
          description: getTaskDescription('10', eventBookId, language),
          folderColor: '#EF4444',
          type: '循环' as const,
          duration: language === 'zh' ? '1.5小时' : '1.5 hours',
          priority: 'high' as const,
          category: 'pending',
          eventBookId: 'fitness'
        }
      ]
    },
    work: {
      oneTime: [
        {
          id: '11',
          countdown: '12天 16小时',
          deadline: '2025-10-01',
          title: getTaskTitle('11', eventBookId, language),
          description: getTaskDescription('11', eventBookId, language),
          folderColor: '#8B5CF6',
          type: '一次性' as const,
          priority: 'high' as const,
          category: 'pending',
          eventBookId: 'work'
        },
        {
          id: '12',
          countdown: '25天 10小时',
          deadline: '2025-10-14',
          title: getTaskTitle('12', eventBookId, language),
          description: getTaskDescription('12', eventBookId, language),
          folderColor: '#3B82F6',
          type: '一次性' as const,
          priority: 'medium' as const,
          category: 'pending',
          eventBookId: 'work'
        },
        {
          id: '17',
          countdown: '已完成',
          deadline: '2024-09-15',
          title: getTaskTitle('17', eventBookId, language),
          description: getTaskDescription('17', eventBookId, language),
          folderColor: '#10B981',
          type: '一次性' as const,
          priority: 'medium' as const,
          category: 'completed',
          eventBookId: 'work'
        }
      ],
      recurring: [
        {
          id: '13',
          countdown: language === 'zh' ? '每周一 09:00' : 'Mondays 9:00 AM',
          title: getTaskTitle('13', eventBookId, language),
          description: getTaskDescription('13', eventBookId, language),
          folderColor: '#10B981',
          type: '循环' as const,
          duration: language === 'zh' ? '1小时' : '1 hour',
          priority: 'medium' as const,
          category: 'pending',
          eventBookId: 'work'
        }
      ]
    }
  };

  return allTasks[eventBookId as keyof typeof allTasks] || { oneTime: [], recurring: [] };
};

export function EventBookDetail({ 
  eventBook, 
  onBack, 
  onTaskClick, 
  onAddTask, 
  onImportICS, 
  onSettingsClick, 
  onFileStorage, 
  onCategoryManagement 
}: EventBookDetailProps) {
  const { theme, t, currentLanguage } = useTheme();
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  // Reset scroll position to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { oneTime: oneTimeTasks, recurring: recurringTasks } = getTasksForEventBook(eventBook.id, currentLanguage);
  const allTasks = [...oneTimeTasks, ...recurringTasks];

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      'graduation-cap': GraduationCap,
      'home': Home,
      'dumbbell': Dumbbell,
      'briefcase': Briefcase,
      'book-open': BookOpen,
      'heart': Heart,
      'folder-open': FolderOpen,
      'tag': Tag
    };
    return iconMap[iconName as keyof typeof iconMap] || BookOpen;
  };

  // Filter tasks based on current filter
  const getFilteredTasks = (tasks: Task[]) => {
    if (currentFilter === 'all') return tasks;
    return tasks.filter(task => task.category === currentFilter);
  };

  const filteredOneTimeTasks = getFilteredTasks(oneTimeTasks);
  const filteredRecurringTasks = getFilteredTasks(recurringTasks);

  const IconComponent = getIconComponent(eventBook.icon);

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
            <span>{t.eventBookDetail.back}</span>
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

        {/* Event Book Header */}
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: eventBook.color + '15' }}
          >
            <IconComponent 
              className="w-8 h-8" 
              style={{ color: eventBook.color }} 
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl mb-1" style={{ color: theme.colors.foreground }}>
              {eventBook.name}
            </h1>
            <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
              {eventBook.description}
            </p>
          </div>
        </div>
      </div>
      
      <div
        className="relative z-10 space-y-6"
        style={safeAreaPadding({ left: 16, right: 16 })}
      >
        <FilterChips 
          tasks={allTasks}
          selectedFilter={currentFilter}
          onFilterChange={setCurrentFilter}
        />
        <StatsCards />
        
        {filteredOneTimeTasks.length > 0 || filteredRecurringTasks.length > 0 ? (
          <div className="space-y-8">
            {filteredOneTimeTasks.length > 0 && (
              <TaskSection 
                title={t.taskTypes['一次性']} 
                tasks={filteredOneTimeTasks}
                onTaskClick={onTaskClick}
              />
            )}
            {filteredRecurringTasks.length > 0 && (
              <TaskSection 
                title={t.taskTypes['循环']} 
                tasks={filteredRecurringTasks}
                onTaskClick={onTaskClick}
              />
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
              {t.eventBookDetail.noTasks}
            </p>
          </div>
        )}
      </div>
      
      <FloatingActionButton 
        onAddTask={onAddTask} 
        onImportICS={onImportICS} 
        onFileStorage={onFileStorage}
        onCategoryManagement={onCategoryManagement}
        showManagementOptions={true}
      />
    </div>
  );
}