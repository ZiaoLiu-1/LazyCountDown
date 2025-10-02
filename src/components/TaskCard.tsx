import { Calendar, RefreshCw, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { useTheme } from '../contexts/ThemeContext';
import { formatCountdown } from '../utils/dateUtils';

interface TaskCardProps {
  countdown: string;
  deadline?: string;
  title: string;
  description: string;
  folderColor: string;
  type: '一次性' | '循环';
  duration?: string;
  onClick?: () => void;
  category?: string; // Add category prop to determine task status
  priority?: 'high' | 'medium' | 'low';
}

export function TaskCard({
  countdown,
  deadline,
  title,
  description,
  folderColor,
  type,
  duration,
  onClick,
  category = 'pending',
  priority = 'medium'
}: TaskCardProps) {
  const { theme, t, currentLanguage } = useTheme();
  const isRecurring = type === '循环';
  const isCompleted = category === 'completed';
  const isOverdue = category === 'overdue';
  
  // Format countdown text based on current language 
  const formattedCountdown = formatCountdown(countdown, currentLanguage);
  
  // Determine if task is urgent (within 3 days) or due soon (within 2 days)
  const isUrgent = () => {
    if (isRecurring || isCompleted) return false;
    if (!deadline) return false;
    
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };
  
  const isDueSoon = () => {
    if (isRecurring || isCompleted || isOverdue) return false;
    if (!deadline) return false;
    
    const deadlineDate = new Date(deadline);
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
        backgroundColor: `linear-gradient(135deg, rgba(245, 158, 11, 0.20) 0%, rgba(245, 158, 11, 0.12) 100%)`,
        statusIcon: <Clock className="w-4 h-4" style={{ color: '#f59e0b' }} />,
        statusColor: '#f59e0b'
      };
    }
    
    if (isUrgent()) {
      return {
        containerClass: 'task-urgent',
        borderColor: theme.colors.warning,
        backgroundColor: `linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.08) 100%)`,
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
      className={`
        relative overflow-hidden rounded-2xl p-5 transition-all duration-300 cursor-pointer group
        border hover:scale-[1.02] active:scale-[0.98]
        ${theme.styles.cardStyle} ${theme.styles.shadowStyle} ${styling.containerClass}
      `}
      style={{
        backgroundColor: styling.backgroundColor,
        borderColor: styling.borderColor,
      }}
      role="article"
      aria-label={`${t.common.newTask} ${title} ${isCompleted ? t.common.completed : isOverdue ? t.common.overdue : isUrgent() ? t.common.dueSoon : ''}`}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!isCompleted) {
          e.currentTarget.style.backgroundColor = theme.colors.cardHover;
          if (theme.id === 'undraw') {
            e.currentTarget.style.borderColor = styling.statusColor;
            e.currentTarget.style.transform = 'translateY(-1px)';
          } else {
            e.currentTarget.style.borderColor = styling.statusColor + '30';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!isCompleted) {
          e.currentTarget.style.backgroundColor = typeof styling.backgroundColor === 'string' ? styling.backgroundColor : theme.colors.card;
          e.currentTarget.style.borderColor = styling.borderColor;
          if (theme.id === 'undraw') {
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }
      }}
    >
      {/* Decorative background gradient */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: theme.id === 'dark' 
            ? `radial-gradient(circle at 20% 20%, ${folderColor}40 0%, transparent 50%)`
            : `linear-gradient(135deg, ${folderColor}10 0%, transparent 50%)`
        }}
      />
      
      <div className="relative z-10 flex gap-4">
        {/* Left section - Countdown */}
        <div className="flex-shrink-0 w-28">
          <div className="flex items-center gap-2 mb-1">
            <div 
              className={`text-lg ${isCompleted ? 'line-through' : ''}`} 
              style={{ 
                color: isCompleted ? theme.colors.success : 
                      isOverdue ? '#ef4444' : 
                      isUrgent() ? theme.colors.warning : 
                      theme.colors.foreground 
              }}
            >
              {formattedCountdown}
            </div>
            {styling.statusIcon}
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: theme.colors.mutedForeground }}>
            {isRecurring ? (
              <>
                <RefreshCw className="w-3 h-3" />
                <span>{duration}</span>
              </>
            ) : (
              <>
                <Calendar className="w-3 h-3" />
                <span>{deadline}</span>
              </>
            )}
          </div>
        </div>

        {/* Right section - Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 
              className={`text-base m-0 leading-snug transition-colors ${isCompleted ? 'line-through' : ''}`} 
              style={{ 
                color: isCompleted ? theme.colors.mutedForeground : theme.colors.foreground 
              }}
            >
              {title}
            </h3>
            <div className="flex items-center gap-2">
              {/* Priority indicator - only show for urgent tasks, not overdue */}
              {(isUrgent() && !isOverdue && !isDueSoon()) && (
                <div
                  className="flex-shrink-0 w-2 h-2 rounded-full animate-pulse"
                  style={{ 
                    background: theme.colors.warning
                  }}
                />
              )}
              <div
                className="flex-shrink-0 w-3 h-3 rounded-full shadow-sm"
                style={{ 
                  background: folderColor,
                  boxShadow: theme.id === 'dark' ? `0 0 8px ${folderColor}40` : `0 2px 4px ${folderColor}30`,
                  opacity: isCompleted ? 0.5 : 1
                }}
              />
            </div>
          </div>
          
          <p 
            className={`text-sm leading-relaxed m-0 ${isCompleted ? 'line-through' : ''}`} 
            style={{ 
              color: isCompleted ? theme.colors.mutedForeground + '80' : theme.colors.mutedForeground 
            }}
          >
            {description}
          </p>

          {/* Status badge for completed/overdue/due soon tasks */}
          {(isCompleted || isOverdue || isDueSoon() || isUrgent()) && (
            <div className="mt-3">
              <span 
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md"
                style={{ 
                  backgroundColor: styling.statusColor + '15',
                  color: styling.statusColor
                }}
              >
                {styling.statusIcon}
                {isCompleted && t.common.completed}
                {isOverdue && t.common.overdue}
                {isDueSoon() && !isOverdue && !isCompleted && t.common.dueSoon}
                {isUrgent() && !isOverdue && !isCompleted && !isDueSoon() && t.common.dueSoon}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}