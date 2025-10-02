import { Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function StatsCards() {
  const { theme, t, currentLanguage } = useTheme();
  
  const statsData = [
    {
      id: 'pending',
      label: t.filterTypes.pending,
      value: '8',
      icon: Clock,
      trend: '+2',
      trendUp: true
    },
    {
      id: 'completed',
      label: t.filterTypes.completed,
      value: '24',
      icon: CheckCircle,
      trend: '+5',
      trendUp: true
    },
    {
      id: 'overdue',
      label: t.filterTypes.overdue,
      value: '2',
      icon: AlertCircle,
      trend: '-1',
      trendUp: false
    },
    {
      id: 'efficiency',
      label: currentLanguage === 'zh' ? '效率' : 'Efficiency',
      value: '92%',
      icon: TrendingUp,
      trend: '+8%',
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
              <div 
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                  stat.trendUp ? '' : ''
                }`}
                style={{
                  backgroundColor: stat.trendUp 
                    ? theme.colors.success + '20' 
                    : theme.colors.destructive + '20',
                  color: stat.trendUp ? theme.colors.success : theme.colors.destructive,
                }}
              >
                <span>{stat.trend}</span>
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