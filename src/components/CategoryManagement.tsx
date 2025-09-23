import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Edit3, Tag, AlertTriangle, Folder } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { CloudDecoration } from './CloudDecoration';
import { EventBook } from './EventBooksList';
import { safeAreaPadding } from '../utils/safeArea';

interface Category {
  id: string;
  name: string;
  color: string;
  eventBookId: string;
  taskCount: number;
  isSystem?: boolean; // 系统分类不能删除
}

interface CategoryManagementProps {
  eventBook: EventBook;
  onBack: () => void;
}

const mockCategories: Category[] = [
  // 系统分类
  { id: 'all', name: '全部', color: '#6B7280', eventBookId: 'university', taskCount: 12, isSystem: true },
  { id: 'completed', name: '已完成', color: '#10B981', eventBookId: 'university', taskCount: 3, isSystem: true },
  { id: 'pending', name: '未完成', color: '#F59E0B', eventBookId: 'university', taskCount: 7, isSystem: true },
  { id: 'overdue', name: '逾期', color: '#EF4444', eventBookId: 'university', taskCount: 2, isSystem: true },
  
  // 自定义分类
  { id: 'csc3', name: 'CSC3', color: '#3B82F6', eventBookId: 'university', taskCount: 4, isSystem: false },
  { id: 'math', name: '数学课程', color: '#8B5CF6', eventBookId: 'university', taskCount: 3, isSystem: false },
  { id: 'projects', name: '项目作业', color: '#06B6D4', eventBookId: 'university', taskCount: 2, isSystem: false },
];

export function CategoryManagement({ eventBook, onBack }: CategoryManagementProps) {
  const { theme } = useTheme();
  const [categories, setCategories] = useState<Category[]>(
    mockCategories.filter(cat => cat.eventBookId === eventBook.id)
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [deleteOption, setDeleteOption] = useState<'keep' | 'delete'>('keep');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6');

  const customCategories = categories.filter(cat => !cat.isSystem);
  const systemCategories = categories.filter(cat => cat.isSystem);

  const predefinedColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', 
    '#06B6D4', '#EC4899', '#84CC16', '#F97316', '#6366F1'
  ];

  const handleDeleteCategory = (category: Category) => {
    if (category.isSystem) return;
    setCategoryToDelete(category);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!categoryToDelete) return;

    if (deleteOption === 'delete') {
      // 在真实应用中，这里会删除该分类下的所有任务
      console.log(`Deleting category ${categoryToDelete.name} and all its tasks`);
    } else {
      // 在真实应用中，这里会将任务移动到"未完成"分类
      console.log(`Deleting category ${categoryToDelete.name} but keeping tasks`);
    }

    setCategories(prev => prev.filter(cat => cat.id !== categoryToDelete.id));
    setShowDeleteDialog(false);
    setCategoryToDelete(null);
    setDeleteOption('keep');
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      color: newCategoryColor,
      eventBookId: eventBook.id,
      taskCount: 0,
      isSystem: false
    };

    setCategories(prev => [...prev, newCategory]);
    setNewCategoryName('');
    setNewCategoryColor('#3B82F6');
    setShowAddForm(false);
  };

  return (
    <div
      className="full-screen-bg relative"
      style={{
        background: theme.styles.backgroundImage,
        ...safeAreaPadding({ bottom: 96 })
      }}
    >
      <CloudDecoration />

      {/* Header */}
      <div
        className="relative z-10 pb-2"
        style={safeAreaPadding({ top: 24, left: 16, right: 16 })}
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 transition-colors"
            style={{ color: theme.colors.mutedForeground }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          
          <div className="flex items-center gap-3">
            <h1 className="text-lg" style={{ color: theme.colors.foreground }}>
              分类管理
            </h1>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.primaryForeground
            }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Event Book Info */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: eventBook.color + '15' }}
          >
            <Folder 
              className="w-6 h-6" 
              style={{ color: eventBook.color }} 
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl mb-1" style={{ color: theme.colors.foreground }}>
              {eventBook.name}
            </h2>
            <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
              管理此事件薄的任务分类
            </p>
          </div>
        </div>
      </div>
      
      <div
        className="relative z-10 space-y-6"
        style={safeAreaPadding({ left: 16, right: 16 })}
      >
        {/* Add Category Form */}
        {showAddForm && (
          <div 
            className={`p-6 rounded-2xl border ${theme.styles.cardStyle}`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              boxShadow: theme.styles.shadowStyle,
            }}
          >
            <h3 className="text-lg mb-4" style={{ color: theme.colors.foreground }}>
              添加新分类
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: theme.colors.mutedForeground }}>
                  分类名称
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="请输入分类名称"
                  className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2"
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
                  分类颜色
                </label>
                <div className="flex gap-2 flex-wrap">
                  {predefinedColors.map(color => (
                    <button
                      key={color}
                      onClick={() => setNewCategoryColor(color)}
                      className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                        newCategoryColor === color ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="flex-1 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.primaryForeground
                  }}
                >
                  添加分类
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewCategoryName('');
                    setNewCategoryColor('#3B82F6');
                  }}
                  className="flex-1 py-3 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.cardBorder,
                    color: theme.colors.foreground
                  }}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {/* System Categories */}
        <div className="space-y-4">
          <h3 className="text-lg" style={{ color: theme.colors.foreground }}>
            系统分类
          </h3>
          <div className="space-y-3">
            {systemCategories.map(category => (
              <div
                key={category.id}
                className={`p-4 rounded-2xl border ${theme.styles.cardStyle}`}
                style={{
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.cardBorder,
                  boxShadow: theme.styles.shadowStyle,
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: category.color + '15' }}
                  >
                    <Tag 
                      className="w-5 h-5" 
                      style={{ color: category.color }} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-base mb-1" style={{ color: theme.colors.foreground }}>
                      {category.name}
                    </h4>
                    <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                      {category.taskCount} 个任务
                    </p>
                  </div>
                  
                  <div 
                    className="px-3 py-1 rounded-lg text-sm"
                    style={{
                      backgroundColor: theme.colors.mutedForeground + '15',
                      color: theme.colors.mutedForeground
                    }}
                  >
                    系统分类
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Categories */}
        <div className="space-y-4">
          <h3 className="text-lg" style={{ color: theme.colors.foreground }}>
            自定义分类 ({customCategories.length})
          </h3>
          
          {customCategories.length > 0 ? (
            <div className="space-y-3">
              {customCategories.map(category => (
                <div
                  key={category.id}
                  className={`p-4 rounded-2xl border ${theme.styles.cardStyle}`}
                  style={{
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.cardBorder,
                    boxShadow: theme.styles.shadowStyle,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: category.color + '15' }}
                    >
                      <Tag 
                        className="w-5 h-5" 
                        style={{ color: category.color }} 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-base mb-1" style={{ color: theme.colors.foreground }}>
                        {category.name}
                      </h4>
                      <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                        {category.taskCount} 个任务
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                        style={{
                          backgroundColor: theme.colors.primary + '15',
                          color: theme.colors.primary
                        }}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                        style={{
                          backgroundColor: theme.colors.destructive + '15',
                          color: theme.colors.destructive
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              className={`p-8 rounded-2xl border text-center ${theme.styles.cardStyle}`}
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.mutedForeground + '15' }}
                >
                  <Tag 
                    className="w-8 h-8" 
                    style={{ color: theme.colors.mutedForeground }} 
                  />
                </div>
                <div>
                  <h3 className="text-lg mb-2" style={{ color: theme.colors.foreground }}>
                    还没有自定义分类
                  </h3>
                  <p className="text-sm mb-4" style={{ color: theme.colors.mutedForeground }}>
                    点击右上角的 + 按钮来创建第一个自定义分类
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.primaryForeground
                    }}
                  >
                    创建分类
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && categoryToDelete && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={safeAreaPadding({ top: 24, bottom: 24, left: 16, right: 16 })}
        >
          <div 
            className={`w-full max-w-md p-6 rounded-2xl border ${theme.styles.cardStyle}`}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              boxShadow: theme.styles.shadowStyle,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: theme.colors.destructive + '15' }}
              >
                <AlertTriangle 
                  className="w-6 h-6" 
                  style={{ color: theme.colors.destructive }} 
                />
              </div>
              <div>
                <h3 className="text-lg" style={{ color: theme.colors.foreground }}>
                  删除分类
                </h3>
                <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                  此操作无法撤销
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-4" style={{ color: theme.colors.foreground }}>
                确定要删除分类 <span style={{ color: categoryToDelete.color }}>"{categoryToDelete.name}"</span> 吗？
              </p>
              <p className="text-sm mb-4" style={{ color: theme.colors.mutedForeground }}>
                该分类下有 {categoryToDelete.taskCount} 个任务，请选择如何处理：
              </p>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deleteOption"
                    value="keep"
                    checked={deleteOption === 'keep'}
                    onChange={(e) => setDeleteOption(e.target.value as 'keep' | 'delete')}
                    className="w-4 h-4"
                    style={{ accentColor: theme.colors.primary }}
                  />
                  <div>
                    <div className="text-sm" style={{ color: theme.colors.foreground }}>
                      保留任务
                    </div>
                    <div className="text-xs" style={{ color: theme.colors.mutedForeground }}>
                      将任务移动到"未完成"分类
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deleteOption"
                    value="delete"
                    checked={deleteOption === 'delete'}
                    onChange={(e) => setDeleteOption(e.target.value as 'keep' | 'delete')}
                    className="w-4 h-4"
                    style={{ accentColor: theme.colors.destructive }}
                  />
                  <div>
                    <div className="text-sm" style={{ color: theme.colors.foreground }}>
                      删除所有任务
                    </div>
                    <div className="text-xs" style={{ color: theme.colors.mutedForeground }}>
                      永久删除该分类下的所有任务
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 py-3 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.cardBorder,
                  color: theme.colors.foreground
                }}
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: theme.colors.destructive,
                  color: theme.colors.destructiveForeground
                }}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}