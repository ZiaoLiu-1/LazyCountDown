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
}

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function TaskSection({ title, tasks, onTaskClick }: TaskSectionProps) {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 px-1">
        <h2 className="text-sm m-0" style={{ color: theme.colors.mutedForeground }}>
          {title}
        </h2>
        <div 
          className="flex-1 h-px"
          style={{ 
            background: theme.id === 'dark' 
              ? 'linear-gradient(to right, rgba(100, 116, 139, 0.5), transparent)'
              : `linear-gradient(to right, ${theme.colors.cardBorder}, transparent)`
          }}
        />
        <span 
          className="text-xs px-2 py-1 rounded-lg"
          style={{
            color: theme.colors.mutedForeground,
            backgroundColor: theme.colors.card,
          }}
        >
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
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
    </div>
  );
}