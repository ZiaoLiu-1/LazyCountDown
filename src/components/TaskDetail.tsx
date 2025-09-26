import { useState } from 'react';
import { ArrowLeft, Check, Trash2, Calendar, Clock, Star, RefreshCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { safeAreaInset, safeAreaPadding } from '../utils/safeArea';
import { getCustomCategories, isSystemCategory } from '../data/categories';
import { CategorySlider } from './CategorySlider';

interface TaskDetailProps {
  task?: {
    id: string;
    title: string;
    description: string;
    deadline?: string;
    countdown?: string;
    folderColor: string;
    type: '一次性' | '循环';
    priority?: 'high' | 'medium' | 'low';
    category?: string;
    status?: 'pending' | 'completed' | 'overdue';
    eventBookId?: string;
  };
  onBack: () => void;
  onSave: (task: any) => void;
  onDelete?: (taskId: string) => void;
  onComplete?: (taskId: string) => void;
}

export function TaskDetail({ task, onBack, onSave, onDelete, onComplete }: TaskDetailProps) {
  const { theme, t, currentLanguage } = useTheme();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [deadline, setDeadline] = useState(task?.deadline || '2025-11-13');
  const [deadlineTime, setDeadlineTime] = useState('00:00');
  const [taskType, setTaskType] = useState<'一次性' | '循环'>(task?.type || '一次性');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const eventBookId = task?.eventBookId || 'university';
  const availableCustomCategories = getCustomCategories(eventBookId, currentLanguage);
  const initialCategory = task?.category && !isSystemCategory(task.category)
    ? task.category
    : availableCustomCategories[0]?.id;
  const [category, setCategory] = useState<string | undefined>(initialCategory);

  const priorities = [
    { id: 'high', label: t.priorities.high, color: '#F87171' },
    { id: 'medium', label: t.priorities.medium, color: '#F59E0B' },
    { id: 'low', label: t.priorities.low, color: '#64748B' }
  ];

  const handleSave = () => {
    const updatedTask = {
      id: task?.id || Date.now().toString(),
      title,
      description,
      deadline,
      countdown: task?.countdown || (currentLanguage === 'zh' ? '新任务' : 'New Task'),
      folderColor: task?.folderColor || '#3B82F6',
      type: taskType,
      priority,
      category,
      status: task?.status || 'pending',
      eventBookId: task?.eventBookId || 'university'
    };
    onSave(updatedTask);
  };

  return (
    <div
      className="full-screen-bg"
      style={{
        background: theme.styles.backgroundImage,
        color: theme.colors.foreground,
        ...safeAreaPadding({ bottom: 96 })
      }}
    >
      {/* Fixed Header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b"
        style={{
          ...safeAreaPadding({ top: 16, left: 16, right: 16 }),
          paddingBottom: 16,
          backgroundColor: theme.colors.background + 'F0', // 半透明背景
          backdropFilter: 'blur(10px)',
          borderColor: theme.colors.cardBorder
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-colors"
          style={{ color: theme.colors.mutedForeground }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.taskDetail.back}</span>
        </button>
        
        <h1 className="text-lg" style={{ color: theme.colors.foreground }}>
          {task ? t.taskDetail.edit : t.taskDetail.create}
        </h1>
        
        <button
          onClick={handleSave}
          className="transition-colors"
          style={{ color: theme.colors.primary }}
        >
          {t.taskDetail.save}
        </button>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div
        className="space-y-6"
        style={{
          paddingTop: safeAreaInset('top', 80),
          ...safeAreaPadding({ left: 16, right: 16 })
        }}
      >
        {/* Title Input */}
        <div className="space-y-3">
          <label className="text-sm flex items-center gap-1" style={{ color: theme.colors.mutedForeground }}>
            {t.taskDetail.titleLabel} <span style={{ color: theme.colors.destructive }}>*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-4 rounded-2xl border transition-all focus:outline-none ${theme.styles.cardStyle}`}
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
                color: theme.colors.foreground,
              }}
              placeholder={t.taskDetail.titlePlaceholder}
              onFocus={(e) => {
                e.target.style.borderColor = theme.colors.primary + '50';
                e.target.style.backgroundColor = theme.colors.cardHover;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.colors.cardBorder;
                e.target.style.backgroundColor = theme.colors.card;
              }}
            />
          </div>
        </div>

        {/* Description Input */}
        <div className="space-y-3">
          <label className="text-sm" style={{ color: theme.colors.mutedForeground }}>{t.taskDetail.descLabel}</label>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`w-full p-4 rounded-2xl border transition-all resize-none focus:outline-none ${theme.styles.cardStyle}`}
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
                color: theme.colors.foreground,
              }}
              placeholder={t.taskDetail.descPlaceholder}
              onFocus={(e) => {
                e.target.style.borderColor = theme.colors.primary + '50';
                e.target.style.backgroundColor = theme.colors.cardHover;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.colors.cardBorder;
                e.target.style.backgroundColor = theme.colors.card;
              }}
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="space-y-3">
          <label className="text-sm" style={{ color: theme.colors.mutedForeground }}>{t.taskDetail.categoryLabel}</label>
          {availableCustomCategories.length > 0 ? (
            <CategorySlider
              items={availableCustomCategories}
              selectedId={category || ''}
              onSelect={setCategory}
            />
          ) : (
            <div
              className={`p-4 rounded-2xl border text-sm ${theme.styles.cardStyle}`}
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
                color: theme.colors.mutedForeground,
              }}
            >
              {currentLanguage === 'zh'
                ? '暂无自定义分类，可在分类管理中创建新的文件夹。'
                : 'No custom folders yet. Create one in category management.'}
            </div>
          )}
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-sm flex items-center gap-1" style={{ color: theme.colors.mutedForeground }}>
              <Calendar className="w-4 h-4" />
              {t.taskDetail.deadlineLabel}
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`w-full p-4 rounded-2xl border transition-all focus:outline-none ${theme.styles.cardStyle}`}
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
                color: theme.colors.foreground,
              }}
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm flex items-center gap-1" style={{ color: theme.colors.mutedForeground }}>
              <Clock className="w-4 h-4" />
              {t.currentLanguage === 'zh' ? '截止时间' : 'Deadline Time'}
            </label>
            <input
              type="time"
              value={deadlineTime}
              onChange={(e) => setDeadlineTime(e.target.value)}
              className={`w-full p-4 rounded-2xl border transition-all focus:outline-none ${theme.styles.cardStyle}`}
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
                color: theme.colors.foreground,
              }}
            />
          </div>
        </div>

        {/* Task Type */}
        <div className="space-y-3">
          <label className="text-sm" style={{ color: theme.colors.mutedForeground }}>{t.taskDetail.typeLabel}</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTaskType('一次性')}
              className="flex items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 border"
              style={{
                backgroundColor: taskType === '一次性' ? theme.colors.primary + '20' : theme.colors.card,
                borderColor: taskType === '一次性' ? theme.colors.primary + '30' : theme.colors.cardBorder,
                color: taskType === '一次性' ? theme.colors.primary : theme.colors.mutedForeground
              }}
            >
              <Clock className="w-4 h-4" />
              {t.taskTypes['一次性']}
            </button>
            <button
              onClick={() => setTaskType('循环')}
              className="flex items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 border"
              style={{
                backgroundColor: taskType === '循环' ? theme.colors.primary + '20' : theme.colors.card,
                borderColor: taskType === '循环' ? theme.colors.primary + '30' : theme.colors.cardBorder,
                color: taskType === '循环' ? theme.colors.primary : theme.colors.mutedForeground
              }}
            >
              <RefreshCw className="w-4 h-4" />
              {t.taskTypes['循环']}
            </button>
          </div>
        </div>

        {/* Priority */}
        <div className="space-y-3">
          <label className="text-sm flex items-center gap-1" style={{ color: theme.colors.mutedForeground }}>
            <Star className="w-4 h-4" />
            {t.taskDetail.priorityLabel}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {priorities.map((p) => (
              <button
                key={p.id}
                onClick={() => setPriority(p.id)}
                className="p-4 rounded-2xl transition-all duration-300 border"
                style={{
                  backgroundColor: priority === p.id ? p.color + '20' : theme.colors.card,
                  borderColor: priority === p.id ? p.color + '30' : theme.colors.cardBorder,
                  color: priority === p.id ? p.color : theme.colors.mutedForeground
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {task && (
          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              onClick={() => onComplete?.(task.id)}
              className="flex items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 border"
              style={{
                backgroundColor: theme.colors.success + '20',
                borderColor: theme.colors.success + '30',
                color: theme.colors.success
              }}
            >
              <Check className="w-5 h-5" />
              {t.taskDetail.complete}
            </button>
            <button
              onClick={() => onDelete?.(task.id)}
              className="flex items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 border"
              style={{
                backgroundColor: theme.colors.destructive + '20',
                borderColor: theme.colors.destructive + '30',
                color: theme.colors.destructive
              }}
            >
              <Trash2 className="w-5 h-5" />
              {t.taskDetail.delete}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}