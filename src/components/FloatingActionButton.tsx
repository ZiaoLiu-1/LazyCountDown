import { Plus, Upload, Calendar, Sparkles, FolderOpen, Tag } from "lucide-react";
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

interface FloatingActionButtonProps {
  onAddTask?: () => void;
  onImportICS?: () => void;
  onFileStorage?: () => void;
  onCategoryManagement?: () => void;
  showManagementOptions?: boolean; // 控制是否显示文件存储和分类管理选项
}

export function FloatingActionButton({ onAddTask, onImportICS, onFileStorage, onCategoryManagement, showManagementOptions }: FloatingActionButtonProps) {
  const { theme, t } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleAddTask = () => {
    setIsExpanded(false);
    if (onAddTask) {
      onAddTask();
    }
  };

  const handleImportICS = () => {
    setIsExpanded(false);
    if (onImportICS) {
      onImportICS();
    }
  };

  const handleFileStorage = () => {
    setIsExpanded(false);
    if (onFileStorage) {
      onFileStorage();
    }
  };

  const handleCategoryManagement = () => {
    setIsExpanded(false);
    if (onCategoryManagement) {
      onCategoryManagement();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Enhanced theme-based styles with Morandi aesthetics
  const getButtonStyles = () => {
    switch (theme.id) {
      case 'dark':
        return {
          main: {
            background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.3) 0%, rgba(100, 116, 139, 0.4) 50%, rgba(71, 85, 105, 0.5) 100%)',
            shadow: '0 12px 24px -6px rgba(0, 0, 0, 0.3), 0 4px 12px -2px rgba(100, 116, 139, 0.2)',
            hoverShadow: '0 16px 32px -6px rgba(0, 0, 0, 0.4), 0 6px 16px -2px rgba(100, 116, 139, 0.3)',
            glow: 'rgba(148, 163, 184, 0.2)'
          },
          action: {
            background: 'rgba(15, 23, 42, 0.75)',
            border: 'rgba(148, 163, 184, 0.15)',
            shadow: '0 6px 20px -4px rgba(0, 0, 0, 0.3), 0 2px 8px -1px rgba(100, 116, 139, 0.15)',
            backdropFilter: 'blur(12px)'
          }
        };
      case 'rose':
        return {
          main: {
            background: 'linear-gradient(135deg, rgba(196, 164, 175, 0.8) 0%, rgba(181, 161, 168, 0.85) 50%, rgba(212, 181, 196, 0.9) 100%)',
            shadow: '0 8px 20px -6px rgba(196, 164, 175, 0.3), 0 3px 10px -2px rgba(0, 0, 0, 0.1)',
            hoverShadow: '0 12px 28px -6px rgba(196, 164, 175, 0.4), 0 5px 14px -2px rgba(0, 0, 0, 0.15)',
            glow: 'rgba(196, 164, 175, 0.25)'
          },
          action: {
            background: 'rgba(253, 251, 252, 0.9)',
            border: 'rgba(217, 205, 209, 0.4)',
            shadow: '0 6px 20px -4px rgba(181, 161, 168, 0.15), 0 2px 8px -1px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)'
          }
        };
      case 'blue':
        return {
          main: {
            background: 'linear-gradient(135deg, rgba(164, 180, 196, 0.8) 0%, rgba(161, 170, 181, 0.85) 50%, rgba(181, 196, 212, 0.9) 100%)',
            shadow: '0 8px 20px -6px rgba(164, 180, 196, 0.3), 0 3px 10px -2px rgba(0, 0, 0, 0.1)',
            hoverShadow: '0 12px 28px -6px rgba(164, 180, 196, 0.4), 0 5px 14px -2px rgba(0, 0, 0, 0.15)',
            glow: 'rgba(164, 180, 196, 0.25)'
          },
          action: {
            background: 'rgba(251, 252, 253, 0.9)',
            border: 'rgba(205, 213, 217, 0.4)',
            shadow: '0 6px 20px -4px rgba(161, 170, 181, 0.15), 0 2px 8px -1px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)'
          }
        };
      case 'morandi':
        return {
          main: {
            background: 'linear-gradient(135deg, rgba(160, 147, 138, 0.8) 0%, rgba(156, 145, 136, 0.85) 50%, rgba(139, 125, 107, 0.9) 100%)',
            shadow: '0 8px 20px -6px rgba(160, 147, 138, 0.3), 0 3px 10px -2px rgba(0, 0, 0, 0.1)',
            hoverShadow: '0 12px 28px -6px rgba(160, 147, 138, 0.4), 0 5px 14px -2px rgba(0, 0, 0, 0.15)',
            glow: 'rgba(160, 147, 138, 0.25)'
          },
          action: {
            background: 'rgba(253, 252, 251, 0.9)',
            border: 'rgba(209, 206, 203, 0.4)',
            shadow: '0 6px 20px -4px rgba(156, 145, 136, 0.15), 0 2px 8px -1px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)'
          }
        };
      default:
        return {
          main: {
            background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.7) 0%, rgba(100, 116, 139, 0.8) 100%)',
            shadow: '0 10px 24px -6px rgba(100, 116, 139, 0.3)',
            hoverShadow: '0 14px 32px -6px rgba(100, 116, 139, 0.4)',
            glow: 'rgba(148, 163, 184, 0.2)'
          },
          action: {
            background: 'rgba(255, 255, 255, 0.85)',
            border: 'rgba(156, 163, 175, 0.2)',
            shadow: '0 6px 20px -4px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }
        };
    }
  };

  const styles = getButtonStyles();

  return (
    <div className="fixed z-50" style={{ 
      right: `calc(16px + env(safe-area-inset-right))`,
      bottom: `calc(24px + env(safe-area-inset-bottom))`
    }}>
      {/* Enhanced Backdrop */}
      {isExpanded && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
            style={{ zIndex: -1 }}
            onClick={() => setIsExpanded(false)}
          />
          {/* Radial glow effect */}
          <div 
            className="fixed bottom-6 right-4 w-24 h-24 rounded-full opacity-15 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${styles.main.glow} 0%, transparent 70%)`,
              zIndex: -2,
              filter: 'blur(16px)'
            }}
          />
        </>
      )}

      {/* Action buttons container */}
      <div className={`flex flex-col items-end gap-3 mb-4 transition-all duration-500 ease-out ${
        isExpanded 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
      }`}>
        
        {/* Import ICS Button */}
        <div className={`transform transition-all duration-500 ${isExpanded ? 'translate-x-0' : 'translate-x-3'}`}
             style={{ transitionDelay: isExpanded ? '80ms' : '0ms' }}>
          <button
            onClick={handleImportICS}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
            style={{
              background: styles.action.background,
              backdropFilter: styles.action.backdropFilter,
              border: `1px solid ${styles.action.border}`,
              boxShadow: styles.action.shadow,
              color: theme.colors.foreground,
              minWidth: '140px'
            }}
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
            
            <div className="relative flex items-center gap-2.5">
              <div className="p-1 rounded-lg transition-all duration-300 group-hover:scale-110"
                   style={{ backgroundColor: theme.colors.primary + '10' }}>
                <Calendar className="w-3.5 h-3.5" style={{ color: theme.colors.primary }} />
              </div>
              <span className="text-sm font-medium">{t.floatingActions.importCalendar}</span>
            </div>
          </button>
        </div>

        {/* Add Task Button */}
        <div className={`transform transition-all duration-500 ${isExpanded ? 'translate-x-0' : 'translate-x-3'}`}
             style={{ transitionDelay: isExpanded ? '40ms' : '0ms' }}>
          <button
            onClick={handleAddTask}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
            style={{
              background: styles.action.background,
              backdropFilter: styles.action.backdropFilter,
              border: `1px solid ${styles.action.border}`,
              boxShadow: styles.action.shadow,
              color: theme.colors.foreground,
              minWidth: '140px'
            }}
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
            
            <div className="relative flex items-center gap-2.5">
              <div className="p-1 rounded-lg transition-all duration-300 group-hover:scale-110"
                   style={{ backgroundColor: theme.colors.primary + '10' }}>
                <Plus className="w-3.5 h-3.5" style={{ color: theme.colors.primary }} />
              </div>
              <span className="text-sm font-medium">{t.floatingActions.addCountdown}</span>
            </div>
          </button>
        </div>

        {/* Category Management Button */}
        {showManagementOptions && (
          <div className={`transform transition-all duration-500 ${isExpanded ? 'translate-x-0' : 'translate-x-3'}`}
               style={{ transitionDelay: isExpanded ? '120ms' : '0ms' }}>
            <button
              onClick={handleCategoryManagement}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
              style={{
                background: styles.action.background,
                backdropFilter: styles.action.backdropFilter,
                border: `1px solid ${styles.action.border}`,
                boxShadow: styles.action.shadow,
                color: theme.colors.foreground,
                minWidth: '140px'
              }}
            >
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
              
              <div className="relative flex items-center gap-2.5">
                <div className="p-1 rounded-lg transition-all duration-300 group-hover:scale-110"
                     style={{ backgroundColor: theme.colors.primary + '10' }}>
                  <Tag className="w-3.5 h-3.5" style={{ color: theme.colors.primary }} />
                </div>
                <span className="text-sm font-medium">{t.floatingActions.categoryManagement}</span>
              </div>
            </button>
          </div>
        )}

        {/* File Storage Button */}
        {showManagementOptions && (
          <div className={`transform transition-all duration-500 ${isExpanded ? 'translate-x-0' : 'translate-x-3'}`}
               style={{ transitionDelay: isExpanded ? '160ms' : '0ms' }}>
            <button
              onClick={handleFileStorage}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
              style={{
                background: styles.action.background,
                backdropFilter: styles.action.backdropFilter,
                border: `1px solid ${styles.action.border}`,
                boxShadow: styles.action.shadow,
                color: theme.colors.foreground,
                minWidth: '140px'
              }}
            >
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
              
              <div className="relative flex items-center gap-2.5">
                <div className="p-1 rounded-lg transition-all duration-300 group-hover:scale-110"
                     style={{ backgroundColor: theme.colors.primary + '10' }}>
                  <FolderOpen className="w-3.5 h-3.5" style={{ color: theme.colors.primary }} />
                </div>
                <span className="text-sm font-medium">{t.floatingActions.fileStorage}</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Main FAB - Mobile optimized */}
      <button
        className="group relative touch-target rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden"
        style={{
          background: styles.main.background,
          boxShadow: isExpanded ? styles.main.hoverShadow : styles.main.shadow,
          color: theme.colors.primaryForeground,
          backdropFilter: 'blur(12px)',
          border: `1px solid ${theme.colors.primary}20`
        }}
        aria-label={isExpanded ? t.common.close : "打开菜单"}
        title={isExpanded ? t.common.close : "打开菜单"}
        onClick={toggleExpanded}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = styles.main.hoverShadow;
        }}
        onMouseLeave={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.boxShadow = styles.main.shadow;
          }
        }}
      >
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Sparkle effect for expanded state */}
        {isExpanded && (
          <div className="absolute inset-0">
            <Sparkles 
              className="absolute top-1.5 right-1.5 w-2 h-2 text-white/50 animate-pulse" 
              style={{ animationDelay: '0s' }} 
            />
            <Sparkles 
              className="absolute bottom-2 left-1.5 w-1.5 h-1.5 text-white/30 animate-pulse" 
              style={{ animationDelay: '1s' }} 
            />
          </div>
        )}
        
        {/* Icon container */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className={`transition-all duration-500 ${isExpanded ? 'rotate-135 scale-90' : 'rotate-0 scale-100'}`}>
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          </div>
        </div>

        {/* Subtle rotating border animation */}
        <div className="absolute inset-0 rounded-xl opacity-30">
          <div className={`absolute inset-0 rounded-xl transition-all duration-1000 ${
            isExpanded ? 'animate-spin' : ''
          }`} style={{
            background: `conic-gradient(from 0deg, transparent, ${theme.colors.primary}30, transparent)`,
            animationDuration: '4s'
          }} />
        </div>
      </button>
    </div>
  );
}