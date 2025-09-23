import { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface EventBookSelectorItem {
  id: string;
  name: string;
  color: string;
  icon: ReactNode;
}

interface EventBookSelectorProps {
  items: EventBookSelectorItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function EventBookSelector({ items, selectedId, onSelect }: EventBookSelectorProps) {
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
          {/* Event Book Icon */}
          <div 
            className="w-4 h-4 flex items-center justify-center flex-shrink-0"
            style={{ 
              color: selectedId === item.id 
                ? theme.colors.primary
                : item.color
            }}
          >
            {item.icon}
          </div>
          
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
}