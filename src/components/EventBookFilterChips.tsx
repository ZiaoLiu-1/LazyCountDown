import { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface EventBookFilterItem {
  id: string;
  name: string;
  count: number;
  icon?: ReactNode;
  color?: string;
}

interface EventBookFilterChipsProps {
  items: EventBookFilterItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function EventBookFilterChips({ items, selectedId, onSelect }: EventBookFilterChipsProps) {
  const { theme } = useTheme();
  
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`
            flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all duration-300
            ${selectedId === item.id ? 'border-2' : 'border'}
          `}
          style={{
            backgroundColor: selectedId === item.id ? theme.colors.primary + '20' : theme.colors.card,
            borderColor: selectedId === item.id ? theme.colors.primary : theme.colors.cardBorder,
            color: selectedId === item.id ? theme.colors.primary : theme.colors.mutedForeground,
          }}
        >
          {/* Icon - only show if provided and preserve event book colors */}
          {item.icon && (
            <div 
              className="w-4 h-4 flex items-center justify-center flex-shrink-0"
              style={{ 
                color: selectedId === item.id 
                  ? theme.colors.primary  // When selected, use primary color like FilterChips
                  : (item.color || theme.colors.mutedForeground)  // When not selected, use event book color
              }}
            >
              {item.icon}
            </div>
          )}
          
          <span>{item.name}</span>
          
          <span 
            className="px-2 py-0.5 rounded-lg text-xs"
            style={{
              backgroundColor: selectedId === item.id ? theme.colors.primary + '30' : theme.colors.cardBorder,
              color: selectedId === item.id ? theme.colors.primary : theme.colors.mutedForeground,
            }}
          >
            {item.count}
          </span>
        </button>
      ))}
    </div>
  );
}