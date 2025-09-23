import { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface TagItem {
  id: string;
  name: string;
  count?: number;
  icon?: React.ReactNode;
  color?: string;
  isSelected?: boolean;
}

interface PaginatedTagsProps {
  items: TagItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  itemsPerPage?: number;
  showCount?: boolean;
  variant?: 'default' | 'compact';
  className?: string;
}

export function PaginatedTags({
  items,
  selectedId,
  onSelect,
  itemsPerPage = 4,
  showCount = true,
  variant = 'default',
  className = ''
}: PaginatedTagsProps) {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Check if selected item is on current page, if not, switch to that page
  const selectedIndex = items.findIndex(item => item.id === selectedId);
  const selectedItemPage = Math.floor(selectedIndex / itemsPerPage);
  
  if (selectedIndex !== -1 && selectedItemPage !== currentPage) {
    setTimeout(() => setCurrentPage(selectedItemPage), 0);
  }

  const renderPaginationDots = () => {
    if (totalPages <= 1) return null;

    const dots = [];
    const maxDotsToShow = 5;
    
    if (totalPages <= maxDotsToShow) {
      // Show all dots if there are few pages
      for (let i = 0; i < totalPages; i++) {
        dots.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentPage === i ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{
              backgroundColor: currentPage === i ? theme.colors.primary : theme.colors.mutedForeground + '40'
            }}
          />
        );
      }
    } else {
      // Show condensed dots with ellipsis
      const showEllipsisStart = currentPage > 2;
      const showEllipsisEnd = currentPage < totalPages - 3;

      // First page
      dots.push(
        <button
          key={0}
          onClick={() => goToPage(0)}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            currentPage === 0 ? 'scale-125' : 'hover:scale-110'
          }`}
          style={{
            backgroundColor: currentPage === 0 ? theme.colors.primary : theme.colors.mutedForeground + '40'
          }}
        />
      );

      // Start ellipsis
      if (showEllipsisStart) {
        dots.push(
          <MoreHorizontal key="start-ellipsis" className="w-3 h-3" style={{ color: theme.colors.mutedForeground }} />
        );
      }

      // Middle pages
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        dots.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentPage === i ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{
              backgroundColor: currentPage === i ? theme.colors.primary : theme.colors.mutedForeground + '40'
            }}
          />
        );
      }

      // End ellipsis
      if (showEllipsisEnd) {
        dots.push(
          <MoreHorizontal key="end-ellipsis" className="w-3 h-3" style={{ color: theme.colors.mutedForeground }} />
        );
      }

      // Last page
      if (totalPages > 1) {
        dots.push(
          <button
            key={totalPages - 1}
            onClick={() => goToPage(totalPages - 1)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentPage === totalPages - 1 ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{
              backgroundColor: currentPage === totalPages - 1 ? theme.colors.primary : theme.colors.mutedForeground + '40'
            }}
          />
        );
      }
    }

    return dots;
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Tags Row */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        {totalPages > 1 && (
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
              currentPage === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-opacity-80'
            }`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              border: '1px solid',
            }}
          >
            <ChevronLeft className="w-4 h-4" style={{ color: theme.colors.mutedForeground }} />
          </button>
        )}

        {/* Tags Container */}
        <div className="flex gap-2 flex-1 overflow-hidden">
          {currentItems.map(item => {
            const isSelected = item.id === selectedId;
            
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`${
                  variant === 'compact' ? 'px-3 py-1.5' : 'px-4 py-2'
                } rounded-xl whitespace-nowrap transition-all duration-200 flex-shrink-0 flex items-center gap-2 ${
                  isSelected ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: isSelected 
                    ? item.color || theme.colors.primary 
                    : theme.colors.card,
                  color: isSelected 
                    ? '#ffffff' 
                    : theme.colors.foreground,
                  border: `1px solid ${isSelected 
                    ? item.color || theme.colors.primary 
                    : theme.colors.cardBorder}`,
                }}
              >
                {item.icon && (
                  <span className="flex-shrink-0">
                    {item.icon}
                  </span>
                )}
                <span className={variant === 'compact' ? 'text-sm' : ''}>
                  {item.name}
                </span>
                {showCount && item.count !== undefined && (
                  <span className={`${variant === 'compact' ? 'text-xs' : 'text-sm'} opacity-75`}>
                    ({item.count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {totalPages > 1 && (
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
              currentPage === totalPages - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-opacity-80'
            }`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              border: '1px solid',
            }}
          >
            <ChevronRight className="w-4 h-4" style={{ color: theme.colors.mutedForeground }} />
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 px-2">
          {renderPaginationDots()}
        </div>
      )}

      {/* Page Indicator */}
      {totalPages > 1 && (
        <div className="text-center">
          <span className="text-xs" style={{ color: theme.colors.mutedForeground }}>
            {currentPage + 1} / {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}