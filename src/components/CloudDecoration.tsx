import { useTheme } from '../contexts/ThemeContext';

export function CloudDecoration() {
  const { theme, currentTheme } = useTheme();
  
  // Only show for warm (Ghibli) theme
  if (currentTheme !== 'warm') return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background clouds */}
      <div className="absolute top-10 right-8 opacity-30">
        <CloudShape size="lg" />
      </div>
      <div className="absolute top-32 left-4 opacity-20">
        <CloudShape size="md" />
      </div>
      <div className="absolute top-64 right-16 opacity-25">
        <CloudShape size="sm" />
      </div>
      <div className="absolute bottom-96 left-8 opacity-15">
        <CloudShape size="lg" />
      </div>
      <div className="absolute bottom-32 right-6 opacity-20">
        <CloudShape size="md" />
      </div>
    </div>
  );
}

function CloudShape({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-16 h-10',
    md: 'w-24 h-14', 
    lg: 'w-32 h-18'
  };
  
  return (
    <svg 
      className={sizeClasses[size]} 
      viewBox="0 0 100 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 45c-8 0-15-7-15-15s7-15 15-15c1 0 3 0 4 1 3-5 8-8 14-8 9 0 16 7 16 16 0 1 0 2-1 3 4 2 7 6 7 11 0 7-6 13-13 13H25z"
        fill="rgba(255, 255, 255, 0.4)"
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="1"
      />
    </svg>
  );
}