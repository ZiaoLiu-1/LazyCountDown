import { useEffect } from 'react';
import { ArrowLeft, GraduationCap, Home, Dumbbell, Briefcase, BookOpen, Heart, FolderOpen, Tag } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { StatsCards } from './StatsCards';
import { CollapsibleTaskStatusSection } from './CollapsibleTaskStatusSection';
import { FloatingActionButton } from './FloatingActionButton';
import { CloudDecoration } from './CloudDecoration';
import { safeAreaPadding } from '../utils/safeArea';
import { EventBook } from './EventBooksList';
import { useTasks } from '../hooks';
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

// All mock data removed - tasks now load from database only

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

  // Load tasks from database
  const { tasks: dbTasks, loading, refresh } = useTasks({ eventBookId: eventBook.id });

  // Reset scroll position when event book changes
  useEffect(() => {
    window.scrollTo(0, 0);
    refresh();
  }, [eventBook.id]);

  // Convert database tasks to component format with real countdowns
  const convertToTask = (task: TaskType): Task => {
    const countdown = task.completed 
      ? (currentLanguage === 'zh' ? '已完成' : 'Completed')
      : CountdownService.calculateCountdown(task.deadline, currentLanguage);
    
    return {
      id: task.id,
      countdown,
      deadline: task.deadline,
      title: task.title,
      description: task.description,
      folderColor: eventBook.color,
      type: task.type,
      priority: task.priority,
      category: task.completed ? 'completed' : (CountdownService.isOverdue(task.deadline) ? 'overdue' : 'pending'),
      eventBookId: task.eventBookId
    };
  };

  const allTasks = dbTasks.map(convertToTask);

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

  // Group tasks by status
  const overdueTasks = allTasks.filter(task => task.category === 'overdue');
  const inProgressTasks = allTasks.filter(task => task.category === 'pending');
  const completedTasks = allTasks.filter(task => task.category === 'completed');

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
        style={safeAreaPadding({ top: 8, left: 16, right: 16 })}
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
        <StatsCards tasks={dbTasks} />
        
        {allTasks.length > 0 ? (
          <div className="space-y-6">
            {/* Overdue Section */}
            <CollapsibleTaskStatusSection
              title={currentLanguage === 'zh' ? '已逾期' : 'Overdue'}
              tasks={overdueTasks}
              onTaskClick={onTaskClick}
              statusColor="#EF4444"
              defaultExpanded={true}
            />

            {/* In Progress Section */}
            <CollapsibleTaskStatusSection
              title={currentLanguage === 'zh' ? '进行中' : 'In Progress'}
              tasks={inProgressTasks}
              onTaskClick={onTaskClick}
              statusColor="#3B82F6"
              defaultExpanded={true}
            />

            {/* Completed Section */}
            <CollapsibleTaskStatusSection
              title={currentLanguage === 'zh' ? '已完成' : 'Completed'}
              tasks={completedTasks}
              onTaskClick={onTaskClick}
              statusColor="#10B981"
              defaultExpanded={false}
            />
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