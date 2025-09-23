import { ArrowLeft, Palette, Check, Globe } from 'lucide-react';
import { useTheme, ThemeType, LanguageType } from '../contexts/ThemeContext';
import { safeAreaPadding } from '../utils/safeArea';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const { currentTheme, currentLanguage, setTheme, setLanguage, themes, theme, t } = useTheme();

  const handleThemeChange = (themeId: ThemeType) => {
    setTheme(themeId);
  };

  const handleLanguageChange = (languageId: LanguageType) => {
    setLanguage(languageId);
  };

  const getThemeDescription = (themeId: ThemeType) => {
    switch (themeId) {
      case 'dark':
        return currentLanguage === 'zh' 
          ? '深色玻璃拟态主题采用现代化的玻璃质感设计，配合径向渐变背景和精美的阴影效果，为您提供沉浸式的视觉体验。'
          : 'Dark glass morphism theme features modern glass-like design with radial gradients and elegant shadows for an immersive visual experience.';
      case 'rose':
        return currentLanguage === 'zh'
          ? '玫瑰莫兰迪主题采用温柔的粉色调，营造浪漫优雅的氛围，柔和的色彩搭配带来舒适的视觉感受。'
          : 'Rose Morandi theme uses gentle pink tones to create a romantic and elegant atmosphere with soft color combinations.';
      case 'blue':
        return currentLanguage === 'zh'
          ? '雾蓝莫兰迪主题采用宁静的蓝灰色调，如雾如梦的色彩营造平静安详的视觉体验，有助于专注思考。'
          : 'Misty Blue Morandi theme employs calm blue-gray tones, creating a peaceful and dreamy visual experience that helps focus.';
      case 'morandi':
        return currentLanguage === 'zh'
          ? '莫兰迪色系主题采用优雅柔和的暗淡色调，灵感来自意大利画家Giorgio Morandi的作品风格。柔和的米色、灰色和暖棕色营造出宁静舒适的视觉氛围，减少视觉疲劳，让您在使用中感受到平静与优雅。'
          : 'Morandi color theme uses elegant and soft muted tones inspired by Italian painter Giorgio Morandi\'s work, creating a serene atmosphere that reduces visual fatigue.';
      default:
        return '';
    }
  };

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
          ...safeAreaPadding({ top: 24, left: 16, right: 16 }),
          paddingBottom: 16
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-colors"
          style={{ color: theme.colors.mutedForeground }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.settings.back}</span>
        </button>
        
        <h1 className="text-lg" style={{ color: theme.colors.foreground }}>
          {t.settings.title}
        </h1>
        
        <div className="w-12" />
      </div>

      <div
        className="space-y-6"
        style={safeAreaPadding({ left: 16, right: 16 })}
      >
        {/* Language Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" style={{ color: theme.colors.primary }} />
            <h2 className="text-lg" style={{ color: theme.colors.foreground }}>
              {t.settings.language}
            </h2>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`w-full p-4 rounded-2xl transition-all duration-300 border-2 ${theme.styles.cardStyle}`}
              style={{
                backgroundColor: currentLanguage === 'zh' ? theme.colors.cardHover : theme.colors.card,
                borderColor: currentLanguage === 'zh' ? theme.colors.primary : theme.colors.cardBorder,
                color: theme.colors.foreground,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">🇨🇳</div>
                  <div className="text-left">
                    <div style={{ color: theme.colors.foreground }}>
                      中文（简体）
                    </div>
                    <div className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                      Simplified Chinese
                    </div>
                  </div>
                </div>
                
                {currentLanguage === 'zh' && (
                  <Check className="w-5 h-5" style={{ color: theme.colors.primary }} />
                )}
              </div>
            </button>

            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full p-4 rounded-2xl transition-all duration-300 border-2 ${theme.styles.cardStyle}`}
              style={{
                backgroundColor: currentLanguage === 'en' ? theme.colors.cardHover : theme.colors.card,
                borderColor: currentLanguage === 'en' ? theme.colors.primary : theme.colors.cardBorder,
                color: theme.colors.foreground,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">🇺🇸</div>
                  <div className="text-left">
                    <div style={{ color: theme.colors.foreground }}>
                      English
                    </div>
                    <div className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                      英语
                    </div>
                  </div>
                </div>
                
                {currentLanguage === 'en' && (
                  <Check className="w-5 h-5" style={{ color: theme.colors.primary }} />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5" style={{ color: theme.colors.primary }} />
            <h2 className="text-lg" style={{ color: theme.colors.foreground }}>
              {t.settings.themeStyle}
            </h2>
          </div>
          
          <div className="space-y-3">
            {Object.values(themes).map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => handleThemeChange(themeOption.id)}
                className={`w-full p-4 rounded-2xl transition-all duration-300 border-2 ${theme.styles.cardStyle}`}
                style={{
                  backgroundColor: currentTheme === themeOption.id ? theme.colors.cardHover : theme.colors.card,
                  borderColor: currentTheme === themeOption.id ? theme.colors.primary : theme.colors.cardBorder,
                  color: themeOption.colors.foreground,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Theme Preview */}
                    <div className="relative w-12 h-8 rounded-lg overflow-hidden border">
                      <div 
                        className="absolute inset-0"
                        style={{ background: themeOption.styles.backgroundImage }}
                      />
                      <div 
                        className="absolute bottom-1 left-1 w-2 h-2 rounded-sm"
                        style={{ backgroundColor: themeOption.colors.card }}
                      />
                      <div 
                        className="absolute top-1 right-1 w-1 h-1 rounded-full"
                        style={{ backgroundColor: themeOption.colors.primary }}
                      />
                    </div>
                    
                    <div className="text-left">
                      <div style={{ color: theme.colors.foreground }}>
                        {themeOption.name}
                      </div>
                      <div className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                        {t.themeDescriptions[themeOption.id]}
                      </div>
                    </div>
                  </div>
                  
                  {currentTheme === themeOption.id && (
                    <Check className="w-5 h-5" style={{ color: theme.colors.primary }} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Description */}
        <div 
          className={`p-4 rounded-2xl border ${theme.styles.cardStyle}`}
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.cardBorder,
          }}
        >
          <h3 className="mb-2" style={{ color: theme.colors.foreground }}>
            {t.settings.currentThemeFeatures}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: theme.colors.mutedForeground }}>
            {getThemeDescription(currentTheme)}
          </p>
        </div>

        {/* Preview Cards */}
        <div className="space-y-3">
          <h3 style={{ color: theme.colors.foreground }}>{t.settings.previewEffects}</h3>
          
          {/* Sample Task Card */}
          <div 
            className={`p-4 rounded-2xl transition-all duration-300 border ${theme.styles.cardStyle}`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
            }}
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20">
                <div className="text-lg mb-1" style={{ color: theme.colors.foreground }}>
                  {currentLanguage === 'zh' ? '7天 12小时' : '7d 12h'}
                </div>
                <div className="text-xs" style={{ color: theme.colors.mutedForeground }}>
                  2025-09-25
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 style={{ color: theme.colors.foreground }}>
                    {t.settings.sampleTaskTitle}
                  </h4>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                </div>
                <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                  {t.settings.sampleTaskDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Sample Stats Card */}
          <div 
            className={`p-4 rounded-2xl border ${theme.styles.cardStyle}`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                  {t.settings.activeTasks}
                </p>
                <p className="text-2xl" style={{ color: theme.colors.foreground }}>
                  8
                </p>
              </div>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.colors.primary + '20' }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}