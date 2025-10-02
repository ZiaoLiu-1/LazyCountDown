import { Settings } from "lucide-react";
import { useTheme } from '../contexts/ThemeContext';
import { safeAreaPadding } from '../utils/safeArea';

interface HeaderProps {
  onSettingsClick?: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
  const { theme } = useTheme();
  
  return (
    <div
      className="flex items-center justify-between mb-2"
      style={safeAreaPadding({ top: 8, left: 16, right: 16 })}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-2 h-8 rounded-full"
          style={{ 
            background: `linear-gradient(180deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
            boxShadow: `0 0 12px ${theme.colors.primary}40`
          }}
        />
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: theme.colors.success }}
          />
          <span className="text-sm mobile-text-size" style={{ color: theme.colors.mutedForeground }}>
            实时同步
          </span>
        </div>
      </div>
      
      <button
        onClick={onSettingsClick}
        className="touch-target rounded-xl transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.cardBorder,
          color: theme.colors.mutedForeground,
        }}
        aria-label="设置"
      >
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );
}