import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { TaskCard } from './TaskCard';
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
  eventBookId?: string;
}

interface CollapsibleTaskStatusSectionProps {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  statusColor: string;
  defaultExpanded?: boolean;
}

export function CollapsibleTaskStatusSection({ 
  title, 
  tasks, 
  onTaskClick, 
  statusColor,
  defaultExpanded = true 
}: CollapsibleTaskStatusSectionProps) {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
        style={{
          backgroundColor: theme.colors.card,
          border: `1px solid ${theme.colors.cardBorder}`,
        }}
      >
        <div className="flex items-center gap-3">
          <ChevronRight 
            className="w-5 h-5 transition-transform duration-200"
            style={{ 
              color: statusColor,
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
          />
          <span 
            className="text-base font-medium"
            style={{ color: theme.colors.foreground }}
          >
            {title}
          </span>
        </div>
        <span 
          className="text-sm px-3 py-1 rounded-full font-medium"
          style={{
            color: statusColor,
            backgroundColor: statusColor + '20',
          }}
        >
          {tasks.length}
        </span>
      </button>
      
      {/* Collapsible Content */}
      {isExpanded && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {tasks.map((task) => (
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
              priority={task.priority}
              onClick={() => onTaskClick(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

