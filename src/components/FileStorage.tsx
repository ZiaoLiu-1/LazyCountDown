import { ArrowLeft, Upload, FolderOpen, File, Trash2, Download, Eye } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { safeAreaPadding } from '../utils/safeArea';

interface FileStorageProps {
  eventBookId: string;
  eventBookName: string;
  eventBookIcon: string;
  eventBookColor: string;
  onBack: () => void;
}

export function FileStorage({ eventBookId, eventBookName, eventBookIcon, eventBookColor, onBack }: FileStorageProps) {
  const { theme, t } = useTheme();

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
          ...safeAreaPadding({ top: 18, left: 16, right: 16 }),
          paddingBottom: 16
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-colors"
          style={{ color: theme.colors.mutedForeground }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.fileStorage.back}</span>
        </button>
        
        <h1 className="text-lg" style={{ color: theme.colors.foreground }}>
          {t.fileStorage.title}
        </h1>
        
        <div className="w-12" />
      </div>

      <div
        className="space-y-6"
        style={safeAreaPadding({ left: 16, right: 16 })}
      >
        {/* Event Book Info */}
        <div 
          className={`p-4 rounded-2xl border ${theme.styles.cardStyle}`}
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.cardBorder,
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: eventBookColor + '15' }}
            >
              <div style={{ color: eventBookColor }}>{eventBookIcon}</div>
            </div>
            <div>
              <h3 style={{ color: theme.colors.foreground }}>
                {eventBookName}
              </h3>
              <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                {t.fileStorage.title}
              </p>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div 
          className={`p-8 rounded-2xl border-2 border-dashed text-center ${theme.styles.cardStyle}`}
          style={{
            backgroundColor: theme.colors.card + '50',
            borderColor: theme.colors.primary + '50',
          }}
        >
          <div className="flex flex-col items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primary + '15' }}
            >
              <Upload 
                className="w-8 h-8" 
                style={{ color: theme.colors.primary }} 
              />
            </div>
            <div>
              <h3 className="text-lg mb-2" style={{ color: theme.colors.foreground }}>
                {t.fileStorage.uploadFiles}
              </h3>
              <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                {t.currentLanguage === 'zh' ? '拖拽文件到此处或点击上传' : 'Drag files here or click to upload'}
              </p>
            </div>
            <button
              className="px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.primaryForeground,
              }}
            >
              {t.currentLanguage === 'zh' ? '选择文件' : 'Choose Files'}
            </button>
          </div>
        </div>

        {/* Files List */}
        <div className="space-y-4">
          <h3 style={{ color: theme.colors.foreground }}>
            {t.fileStorage.recentFiles}
          </h3>
          
          <div 
            className={`p-8 rounded-2xl border text-center ${theme.styles.cardStyle}`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
            }}
          >
            <FolderOpen 
              className="w-12 h-12 mx-auto mb-4" 
              style={{ color: theme.colors.mutedForeground }} 
            />
            <h4 className="mb-2" style={{ color: theme.colors.foreground }}>
              {t.fileStorage.noFiles}
            </h4>
            <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
              {t.fileStorage.noFilesDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}