import { useState, useEffect } from 'react';
import { ArrowLeft, Check, GraduationCap, Home, Dumbbell, Briefcase, BookOpen, Heart, Palette, Camera, Music, Coffee, Car, Plane } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { safeAreaPadding } from '../utils/safeArea';

interface CreateEventBookProps {
  onBack: () => void;
  onSave: (eventBook: {
    name: string;
    description: string;
    icon: string;
    color: string;
  }) => void;
}

const availableIcons = [
  { id: 'graduation-cap', component: GraduationCap },
  { id: 'home', component: Home },
  { id: 'dumbbell', component: Dumbbell },
  { id: 'briefcase', component: Briefcase },
  { id: 'book-open', component: BookOpen },
  { id: 'heart', component: Heart },
  { id: 'palette', component: Palette },
  { id: 'camera', component: Camera },
  { id: 'music', component: Music },
  { id: 'coffee', component: Coffee },
  { id: 'car', component: Car },
  { id: 'plane', component: Plane }
];

const availableColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
  '#8B5CF6', '#06B6D4', '#84CC16', '#F97316',
  '#EC4899', '#6B7280', '#14B8A6', '#A855F7'
];

export function CreateEventBook({ onBack, onSave }: CreateEventBookProps) {
  const { theme, t } = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('book-open');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  // Reset scroll position to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        name: name.trim(),
        description: description.trim(),
        icon: selectedIcon,
        color: selectedColor
      });
    }
  };

  const isValid = name.trim().length > 0;

  return (
    <div
      className="full-screen-bg"
      style={{
        background: theme.styles.backgroundImage,
        ...safeAreaPadding({ bottom: 96 })
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between mb-6"
        style={{
          ...safeAreaPadding({ top: 8, left: 16, right: 16 }),
          paddingBottom: 16
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-colors"
          style={{ color: theme.colors.mutedForeground }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.createEventBook.back}</span>
        </button>
        
        <h1 className="text-lg" style={{ color: theme.colors.foreground }}>
          {t.createEventBook.title}
        </h1>
        
        <button
          onClick={handleSave}
          disabled={!isValid}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          style={{
            backgroundColor: isValid ? theme.colors.primary : theme.colors.muted,
            color: theme.colors.primaryForeground,
          }}
        >
          <Check className="w-4 h-4" />
          <span>{t.createEventBook.save}</span>
        </button>
      </div>

      <div
        className="space-y-8"
        style={safeAreaPadding({ left: 16, right: 16 })}
      >
        {/* Preview */}
        <div 
          className={`p-6 rounded-3xl border ${theme.styles.cardStyle}`}
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.cardBorder,
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{ backgroundColor: selectedColor + '15' }}
            >
              {(() => {
                const iconData = availableIcons.find(icon => icon.id === selectedIcon);
                const IconComponent = iconData?.component || BookOpen;
                return <IconComponent className="w-8 h-8" style={{ color: selectedColor }} />;
              })()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg mb-1" style={{ color: theme.colors.foreground }}>
                {name || t.createEventBook.defaultName}
              </h3>
              <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                {description || t.createEventBook.defaultDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg" style={{ color: theme.colors.foreground }}>
            {t.createEventBook.basicInfo}
          </h2>
          
          <div>
            <label className="block text-sm mb-2" style={{ color: theme.colors.mutedForeground }}>
              {t.createEventBook.nameLabel}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.createEventBook.namePlaceholder}
              className="w-full p-4 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
                color: theme.colors.foreground,
                '--tw-ring-color': theme.colors.primary + '50'
              } as any}
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ color: theme.colors.mutedForeground }}>
              {t.createEventBook.descLabel}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.createEventBook.descPlaceholder}
              rows={3}
              className="w-full p-4 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 resize-none"
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
                color: theme.colors.foreground,
                '--tw-ring-color': theme.colors.primary + '50'
              } as any}
            />
          </div>
        </div>

        {/* Icon Selection */}
        <div className="space-y-4">
          <h2 className="text-lg" style={{ color: theme.colors.foreground }}>
            {t.createEventBook.selectIcon}
          </h2>
          
          <div className="grid grid-cols-4 gap-3">
            {availableIcons.map((iconData) => {
              const IconComponent = iconData.component;
              const isSelected = selectedIcon === iconData.id;
              
              return (
                <button
                  key={iconData.id}
                  onClick={() => setSelectedIcon(iconData.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 active:scale-95 flex flex-col items-center ${theme.styles.cardStyle}`}
                  style={{
                    backgroundColor: isSelected ? selectedColor + '10' : theme.colors.card,
                    borderColor: isSelected ? selectedColor : theme.colors.cardBorder,
                  }}
                >
                  <IconComponent 
                    className="w-6 h-6 mb-2" 
                    style={{ color: isSelected ? selectedColor : theme.colors.mutedForeground }} 
                  />
                  <p className="text-xs text-center" style={{ 
                    color: isSelected ? selectedColor : theme.colors.mutedForeground 
                  }}>
                    {t.icons[iconData.id as keyof typeof t.icons]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Selection */}
        <div className="space-y-4">
          <h2 className="text-lg" style={{ color: theme.colors.foreground }}>
            {t.createEventBook.selectColor}
          </h2>
          
          <div className="grid grid-cols-6 gap-3">
            {availableColors.map((color) => {
              const isSelected = selectedColor === color;
              
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 border-2 ${
                    isSelected ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{
                    backgroundColor: color,
                    borderColor: isSelected ? theme.colors.foreground : 'transparent',
                    '--tw-ring-color': color + '50',
                    '--tw-ring-offset-color': theme.colors.background
                  } as any}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}