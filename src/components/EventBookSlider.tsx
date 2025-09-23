import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface EventBookSliderItem {
  id: string;
  name: string;
  count: number;
  icon?: React.ReactNode;
  color?: string;
}

interface EventBookSliderProps {
  items: EventBookSliderItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function EventBookSlider({ items, selectedId, onSelect }: EventBookSliderProps) {
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons);
      return () => scrollElement.removeEventListener('scroll', checkScrollButtons);
    }
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            backgroundColor: theme.colors.card,
            border: `1px solid ${theme.colors.cardBorder}`,
            boxShadow: theme.styles.shadowStyle,
          }}
        >
          <ChevronLeft className="w-4 h-4" style={{ color: theme.colors.foreground }} />
        </button>
      )}

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            backgroundColor: theme.colors.card,
            border: `1px solid ${theme.colors.cardBorder}`,
            boxShadow: theme.styles.shadowStyle,
          }}
        >
          <ChevronRight className="w-4 h-4" style={{ color: theme.colors.foreground }} />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {items.map((item) => {
          const isSelected = item.id === selectedId;
          
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`
                flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl 
                transition-all duration-300 hover:scale-105 active:scale-95
                ${theme.styles.cardStyle}
              `}
              style={{
                backgroundColor: isSelected 
                  ? (item.color ? item.color + '15' : theme.colors.primary + '15')
                  : theme.colors.card,
                borderColor: isSelected 
                  ? (item.color ? item.color + '60' : theme.colors.primary + '60')
                  : theme.colors.cardBorder,
                boxShadow: isSelected 
                  ? `0 4px 12px ${item.color ? item.color + '20' : theme.colors.primary + '20'}`
                  : theme.styles.shadowStyle,
                border: `1px solid`,
              }}
            >
              {/* Icon */}
              {item.icon && (
                <div 
                  className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: isSelected 
                      ? (item.color ? item.color + '20' : theme.colors.primary + '20')
                      : theme.colors.muted + '20'
                  }}
                >
                  <div style={{ 
                    color: isSelected 
                      ? (item.color || theme.colors.primary)
                      : theme.colors.mutedForeground 
                  }}>
                    {item.icon}
                  </div>
                </div>
              )}

              {/* Name */}
              <span 
                className="text-sm whitespace-nowrap"
                style={{ 
                  color: isSelected 
                    ? (item.color || theme.colors.primary)
                    : theme.colors.foreground 
                }}
              >
                {item.name}
              </span>

              {/* Count */}
              <span 
                className="text-xs px-2 py-1 rounded-lg"
                style={{ 
                  backgroundColor: isSelected 
                    ? (item.color ? item.color + '20' : theme.colors.primary + '20')
                    : theme.colors.muted + '15',
                  color: isSelected 
                    ? (item.color || theme.colors.primary)
                    : theme.colors.mutedForeground
                }}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}