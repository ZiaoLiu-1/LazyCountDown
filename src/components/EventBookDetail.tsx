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
import { useTasks, useCountdown } from '../hooks';
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
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  // Load tasks from database
  const { tasks: dbTasks, loading, refresh } = useTasks({ eventBookId: eventBook.id });

  // Reset scroll position and filter when event book changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentFilter('all'); // Reset filter to 'all' when switching event books
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
  const oneTimeTasks = allTasks.filter(t => t.type === '一次性');
  const recurringTasks = allTasks.filter(t => t.type === '循环');

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
        <StatsCards tasks={dbTasks} />
        
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