import { ArrowLeft, Upload, Calendar, Check, AlertCircle, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { safeAreaPadding } from '../utils/safeArea';

interface ImportICSProps {
  onBack: () => void;
  onImport: (tasks: any[]) => void;
}

export function ImportICS({ onBack, onImport }: ImportICSProps) {
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
          ...safeAreaPadding({ top: 44, left: 16, right: 16 }),
          paddingBottom: 16
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-colors"
          style={{ color: theme.colors.mutedForeground }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.importICS.back}</span>
        </button>
        
        <h1 className="text-lg" style={{ color: theme.colors.foreground }}>
          {t.importICS.title}
        </h1>
        
        <button
          className="transition-colors"
          style={{ color: theme.colors.primary }}
        >
          {t.importICS.import}
        </button>
      </div>

      <div
        className="space-y-6"
        style={safeAreaPadding({ left: 16, right: 16 })}
      >
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
              <Calendar 
                className="w-8 h-8" 
                style={{ color: theme.colors.primary }} 
              />
            </div>
            <div>
              <h3 className="text-lg mb-2" style={{ color: theme.colors.foreground }}>
                {t.importICS.selectFile}
              </h3>
              <p className="text-sm mb-2" style={{ color: theme.colors.mutedForeground }}>
                {t.importICS.dragDrop}
              </p>
              <p className="text-xs" style={{ color: theme.colors.mutedForeground }}>
                {t.importICS.supportedFormats}
              </p>
            </div>
            <button
              className="px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.primaryForeground,
              }}
            >
              {t.currentLanguage === 'zh' ? '选择文件' : 'Choose File'}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div 
          className={`p-4 rounded-2xl border ${theme.styles.cardStyle}`}
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.cardBorder,
          }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle 
              className="w-5 h-5 mt-0.5" 
              style={{ color: theme.colors.warning }} 
            />
            <div>
              <h4 className="mb-2" style={{ color: theme.colors.foreground }}>
                {t.currentLanguage === 'zh' ? '导入说明' : 'Import Instructions'}
              </h4>
              <ul className="text-sm space-y-1" style={{ color: theme.colors.mutedForeground }}>
                <li>{t.currentLanguage === 'zh' ? '• 支持标准 .ics 日历文件' : '• Support standard .ics calendar files'}</li>
                <li>{t.currentLanguage === 'zh' ? '• 支持 .csv 表格文件' : '• Support .csv spreadsheet files'}</li>
                <li>{t.currentLanguage === 'zh' ? '• 文件大小不超过 10MB' : '• File size should not exceed 10MB'}</li>
                <li>{t.currentLanguage === 'zh' ? '• 导入后可预览和编辑内容' : '• Preview and edit content after import'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sample Data */}
        <div className="space-y-4">
          <h3 style={{ color: theme.colors.foreground }}>
            {t.importICS.preview}
          </h3>
          
          <div 
            className={`p-8 rounded-2xl border text-center ${theme.styles.cardStyle}`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
            }}
          >
            <FileText 
              className="w-12 h-12 mx-auto mb-4" 
              style={{ color: theme.colors.mutedForeground }} 
            />
            <h4 className="mb-2" style={{ color: theme.colors.foreground }}>
              {t.currentLanguage === 'zh' ? '暂无预览内容' : 'No Preview Available'}
            </h4>
            <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
              {t.currentLanguage === 'zh' ? '选择文件后将显示预览内容' : 'Preview will be shown after selecting a file'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}