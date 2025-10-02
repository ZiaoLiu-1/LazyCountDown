import { Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Task {
  id: string;
  completed: boolean;
  category?: string;
}

interface StatsCardsProps {
  tasks: Task[];
}

export function StatsCards({ tasks }: StatsCardsProps) {
  const { theme, t, currentLanguage } = useTheme();
  
  // Calculate real stats from tasks
  const pendingCount = tasks.filter(t => !t.completed && t.category !== 'overdue').length;
  const completedCount = tasks.filter(t => t.completed).length;
  const overdueCount = tasks.filter(t => t.category === 'overdue' && !t.completed).length;
  const totalTasks = tasks.length;
  const efficiency = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  
  const statsData = [
    {
      id: 'pending',
      label: t.filterTypes.pending,
      value: pendingCount.toString(),
      icon: Clock,
      trend: '',
      trendUp: true
    },
    {
      id: 'completed',
      label: t.filterTypes.completed,
      value: completedCount.toString(),
      icon: CheckCircle,
      trend: '',
      trendUp: true
    },
    {
      id: 'overdue',
      label: t.filterTypes.overdue,
      value: overdueCount.toString(),
      icon: AlertCircle,
      trend: '',
      trendUp: false
    },
    {
      id: 'efficiency',
      label: currentLanguage === 'zh' ? '效率' : 'Efficiency',
      value: `${efficiency}%`,
      icon: TrendingUp,
      trend: '',
      trendUp: true
    }
  ];
  
  return (
    <div className="grid grid-cols-2 gap-3">
      {statsData.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.id}
            className={`p-4 rounded-2xl transition-all duration-300 border ${theme.styles.cardStyle}`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                className="p-2 rounded-xl"
                style={{ 
                  backgroundColor: theme.colors.primary + (theme.id === 'dark' ? '20' : '10'),
                }}
              >
                <IconComponent 
                  className="w-4 h-4" 
                  style={{ color: theme.colors.primary }}
                />
              </div>
            </div>
            
            <div>
              <p className="text-xs mb-1" style={{ color: theme.colors.mutedForeground }}>
                {stat.label}
              </p>
              <p className="text-2xl" style={{ color: theme.colors.foreground }}>
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}