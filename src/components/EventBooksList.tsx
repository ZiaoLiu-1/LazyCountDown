import { useState } from 'react';
import { Plus, BookOpen, GraduationCap, Heart, Dumbbell, Briefcase, Home, ChevronRight, Filter } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { formatEventBookName, formatEventBookDescription } from '../utils/dateUtils';

export interface EventBook {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  taskCount: number;
  completedCount: number;
  createdAt: string;
}

interface EventBooksListProps {
  onSelectBook: (book: EventBook) => void;
  onCreateBook: () => void;
  onSettingsClick: () => void;
  onViewAllTasks: () => void; // Add this new prop
}

export function EventBooksList({ onSelectBook, onCreateBook, onSettingsClick, onViewAllTasks }: EventBooksListProps) {
  const { theme, t, currentLanguage } = useTheme();
  
  // Create localized event books data
  const defaultEventBooks: EventBook[] = [
    {
      id: 'university',
      name: formatEventBookName('university', currentLanguage),
      description: formatEventBookDescription('university', currentLanguage),
      icon: 'graduation-cap',
      color: '#3B82F6',
      taskCount: 8,
      completedCount: 3,
      createdAt: '2024-01-15'
    },
    {
      id: 'life',
      name: formatEventBookName('life', currentLanguage),
      description: formatEventBookDescription('life', currentLanguage),
      icon: 'home',
      color: '#10B981',
      taskCount: 5,
      completedCount: 2,
      createdAt: '2024-01-10'
    },
    {
      id: 'fitness',
      name: formatEventBookName('fitness', currentLanguage),
      description: formatEventBookDescription('fitness', currentLanguage),
      icon: 'dumbbell',
      color: '#F59E0B',
      taskCount: 3,
      completedCount: 1,
      createdAt: '2024-01-20'
    },
    {
      id: 'work',
      name: formatEventBookName('work', currentLanguage),
      description: formatEventBookDescription('work', currentLanguage),
      icon: 'briefcase',
      color: '#8B5CF6',
      taskCount: 12,
      completedCount: 7,
      createdAt: '2024-01-08'
    }
  ];
  
  const [eventBooks] = useState<EventBook[]>(defaultEventBooks);

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      'graduation-cap': GraduationCap,
      'home': Home,
      'dumbbell': Dumbbell,
      'briefcase': Briefcase,
      'book-open': BookOpen,
      'heart': Heart
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || BookOpen;
    return IconComponent;
  };

  const calculateProgress = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div 
      className="full-screen-bg no-bounce"
      style={{ background: theme.styles.backgroundImage }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-6 pt-4">
        <div>
          <h1 className="text-2xl mb-1 mobile-text-size" style={{ color: theme.colors.foreground }}>
            {t.eventBooks.title}
          </h1>
          <p className="text-sm mobile-text-size" style={{ color: theme.colors.mutedForeground }}>
            {t.eventBooks.subtitle}
          </p>
        </div>
        
        <button
          onClick={onSettingsClick}
          className="touch-target rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 hover:scale-105 active:scale-95"
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

      {/* Event Books Grid */}
      <div className="px-4 space-y-4 mobile-scroll pb-24">
        {/* View All Tasks Button */}
        <button
          onClick={onViewAllTasks}
          className={`w-full p-5 rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border ${theme.styles.cardStyle} group`}
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.cardBorder,
            boxShadow: theme.styles.shadowStyle,
          }}
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: theme.colors.primary + '15' }}
            >
              <Filter 
                className="w-7 h-7" 
                style={{ color: theme.colors.primary }} 
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg" style={{ color: theme.colors.foreground }}>
                  {t.eventBooks.all}
                </h3>
                <ChevronRight 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  style={{ color: theme.colors.mutedForeground }} 
                />
              </div>
              
              <p className="text-sm mb-3" style={{ color: theme.colors.mutedForeground }}>
                {t.eventBooks.allDesc}
              </p>

              {/* Total Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                    {eventBooks.reduce((sum, book) => sum + book.completedCount, 0)}/{eventBooks.reduce((sum, book) => sum + book.taskCount, 0)} {t.eventBooks.completed}
                  </span>
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-16 h-2 rounded-full"
                      style={{ backgroundColor: theme.colors.muted + '30' }}
                    >
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          backgroundColor: theme.colors.primary,
                          width: `${Math.round((eventBooks.reduce((sum, book) => sum + book.completedCount, 0) / eventBooks.reduce((sum, book) => sum + book.taskCount, 0)) * 100) || 0}%`
                        }}
                      />
                    </div>
                    <span className="text-xs ml-1" style={{ color: theme.colors.mutedForeground }}>
                      {Math.round((eventBooks.reduce((sum, book) => sum + book.completedCount, 0) / eventBooks.reduce((sum, book) => sum + book.taskCount, 0)) * 100) || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>

        {eventBooks.map((book) => {
          const IconComponent = getIconComponent(book.icon);
          const progress = calculateProgress(book.completedCount, book.taskCount);
          
          return (
            <button
              key={book.id}
              onClick={() => onSelectBook(book)}
              className={`w-full p-5 rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border ${theme.styles.cardStyle} group`}
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
                boxShadow: theme.styles.shadowStyle,
              }}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: book.color + '15' }}
                >
                  <IconComponent 
                    className="w-7 h-7" 
                    style={{ color: book.color }} 
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg" style={{ color: theme.colors.foreground }}>
                      {book.name}
                    </h3>
                    <ChevronRight 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                      style={{ color: theme.colors.mutedForeground }} 
                    />
                  </div>
                  
                  <p className="text-sm mb-3" style={{ color: theme.colors.mutedForeground }}>
                    {book.description}
                  </p>

                  {/* Progress and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                        {book.completedCount}/{book.taskCount} {t.eventBooks.completed}
                      </span>
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-16 h-2 rounded-full"
                          style={{ backgroundColor: theme.colors.muted + '30' }}
                        >
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              backgroundColor: book.color,
                              width: `${progress}%`
                            }}
                          />
                        </div>
                        <span className="text-xs ml-1" style={{ color: theme.colors.mutedForeground }}>
                          {progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {/* Create New Event Book Button */}
        <button
          onClick={onCreateBook}
          className={`w-full p-5 rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-2 border-dashed ${theme.styles.cardStyle} group`}
          style={{
            backgroundColor: theme.colors.card + '50',
            borderColor: theme.colors.primary + '50',
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: theme.colors.primary + '15' }}
            >
              <Plus 
                className="w-6 h-6" 
                style={{ color: theme.colors.primary }} 
              />
            </div>
            <div className="text-left">
              <h3 className="text-lg mb-1" style={{ color: theme.colors.primary }}>
                {t.eventBooks.createNew}
              </h3>
              <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                {t.eventBooks.createNewDesc}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="px-4 mt-8">
        <div 
          className={`p-4 rounded-2xl border ${theme.styles.cardStyle}`}
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.cardBorder,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                {t.eventBooks.totalTasks}
              </p>
              <p className="text-2xl mt-1" style={{ color: theme.colors.foreground }}>
                {eventBooks.reduce((sum, book) => sum + book.taskCount, 0)}
              </p>
            </div>
            <div>
              <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                {t.eventBooks.completed}
              </p>
              <p className="text-2xl mt-1" style={{ color: theme.colors.success }}>
                {eventBooks.reduce((sum, book) => sum + book.completedCount, 0)}
              </p>
            </div>
            <div>
              <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                {t.eventBooks.eventBooksCount}
              </p>
              <p className="text-2xl mt-1" style={{ color: theme.colors.primary }}>
                {eventBooks.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}