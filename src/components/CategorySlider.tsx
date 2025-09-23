import { useTheme } from '../contexts/ThemeContext';

interface CategorySliderItem {
  id: string;
  label: string;
  color: string;
}

interface CategorySliderProps {
  items: CategorySliderItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CategorySlider({ items, selectedId, onSelect }: CategorySliderProps) {
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
          {/* Color indicator dot */}
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ 
              backgroundColor: selectedId === item.id ? theme.colors.primary : item.color
            }}
          />
          
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}