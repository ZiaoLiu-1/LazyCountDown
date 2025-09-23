import { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeType = 'dark' | 'rose' | 'blue' | 'morandi';
export type LanguageType = 'zh' | 'en';

interface Theme {
  id: ThemeType;
  name: string;
  colors: {
    background: string;
    backgroundSecondary: string;
    foreground: string;
    card: string;
    cardHover: string;
    cardBorder: string;
    muted: string;
    mutedForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    destructive: string;
  };
  styles: {
    backgroundImage: string;
    cardStyle: string;
    buttonStyle: string;
    shadowStyle: string;
  };
}

// Language text definitions
const texts = {
  zh: {
    themes: {
      dark: '深色玻璃',
      rose: '玫瑰莫兰迪',
      blue: '雾蓝莫兰迪',
      morandi: '莫兰迪色系'
    },
    themeDescriptions: {
      dark: '现代玻璃拟态效果',
      rose: '温柔浪漫粉色调',
      blue: '宁静蓝灰色调',
      morandi: '优雅柔和的莫兰迪色调'
    },
    settings: {
      title: '设置',
      back: '返回',
      themeStyle: '主题风格',
      language: '语言设置',
      currentThemeFeatures: '当前主题特色',
      previewEffects: '预览效果',
      activeTasks: '进行中任务',
      sampleTaskTitle: '示例任务标题',
      sampleTaskDesc: '这是一个示例任务描述，展示当前主题的视觉效果。'
    },
    eventBooks: {
      title: '事件薄',
      subtitle: '管理您的不同生活主题',
      createNew: '创建新事件薄',
      createNewDesc: '添加新的主题来组织您的任务',
      totalTasks: '总任务数',
      completed: '已完成',
      eventBooksCount: '事件薄',
      all: '全部',
      allDesc: '查看所有事件薄中的倒计时任务',
      // Event book names
      university: '大学',
      life: '生活',
      fitness: '健身',
      work: '工作'
    },
    createEventBook: {
      title: '创建事件薄',
      back: '返回',
      save: '保存',
      basicInfo: '基本信息',
      nameLabel: '事件薄名称 *',
      namePlaceholder: '例如：大学、工作、生活...',
      descLabel: '描述',
      descPlaceholder: '描述这个事件薄的用途和包含的任务类型...',
      selectIcon: '选择图标',
      selectColor: '选择颜色',
      defaultName: '事件薄名称',
      defaultDesc: '添加描述来说明这个事件薄的用途...'
    },
    icons: {
      'graduation-cap': '学习',
      'home': '生活', 
      'dumbbell': '健身',
      'briefcase': '工作',
      'book-open': '阅读',
      'heart': '健康',
      'palette': '艺术',
      'camera': '摄影',
      'music': '音乐',
      'coffee': '社交',
      'car': '交通',
      'plane': '旅行'
    },
    taskTypes: {
      '一次性': '一次性',
      '循环': '循环'
    },
    priorities: {
      'high': '高',
      'medium': '中',
      'low': '低'
    },
    filterTypes: {
      'all': '全部',
      'completed': '已完成',
      'pending': '进行中',
      'overdue': '逾期',
      'csc3': '效率'
    },
    allTasks: {
      title: '全部任务',
      subtitle: '查看所有事件薄中的倒计时任务',
      back: '返回',
      addTask: '添加倒计时',
      importICS: '导入日历',
      settings: '设置',
      noTasks: '暂无任务',
      noTasksDesc: '点击下方按钮添加您的第一个倒计时任务',
      totalCount: '共 {count} 个任务',
      completedCount: '已完成 {count} 个',
      pendingCount: '进行中 {count} 个',
      overdueCount: '逾期 {count} 个',
      oneTimeTasks: '一次性任务',
      recurringTasks: '循环任务'
    },
    eventBookDetail: {
      back: '返回',
      addTask: '添加倒计时',
      importICS: '导入日历',
      settings: '设置',
      fileStorage: '文件存储',
      categoryManagement: '分类管理',
      noTasks: '暂无任务',
      noTasksDesc: '点击下方按钮添加您的第一个倒计时任务',
      totalTasks: '总任务',
      completedTasks: '已完成',
      efficiency: '效率'
    },
    taskDetail: {
      back: '返回',
      save: '保存',
      delete: '删除',
      complete: '完成',
      edit: '编辑任务',
      create: '创建任务',
      basicInfo: '基本信息',
      titleLabel: '任务标题 *',
      titlePlaceholder: '输入任务标题...',
      descLabel: '任务描述',
      descPlaceholder: '输入任务描述...',
      deadlineLabel: '截止时间',
      typeLabel: '任务类型',
      priorityLabel: '优先级',
      categoryLabel: '分类',
      colorLabel: '颜色标签',
      preview: '预览效果'
    },
    floatingActions: {
      addCountdown: '添加倒计时',
      importCalendar: '导入日历',
      fileStorage: '文件存储',
      categoryManagement: '分类管理'
    },
    fileStorage: {
      title: '文件存储',
      back: '返回',
      noFiles: '暂无文件',
      noFilesDesc: '您还没有上传任何文件',
      uploadFiles: '上传文件',
      recentFiles: '最近文件',
      allFiles: '所有文件'
    },
    categoryManagement: {
      title: '分类管理',
      back: '返回',
      addCategory: '添加分类',
      editCategory: '编辑分类',
      deleteCategory: '删除分类',
      categoryName: '分类名称',
      categoryColor: '分类颜色',
      noCategories: '暂无分类',
      noCategoriesDesc: '点击下方按钮创建您的第一个分类'
    },
    importICS: {
      title: '导入日历',
      back: '返回',
      import: '导入',
      selectFile: '选择文件',
      fileSelected: '已选择文件',
      importSuccess: '导入成功',
      importError: '导入失败',
      supportedFormats: '支持的格式：.ics, .csv',
      dragDrop: '拖拽文件到此处或点击选择',
      preview: '预览内容'
    },
    common: {
      confirm: '确认',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      add: '添加',
      remove: '移除',
      close: '关闭',
      search: '搜索',
      filter: '筛选',
      sort: '排序',
      loading: '加载中...',
      error: '错误',
      success: '成功',
      warning: '警告',
      info: '信息',
      today: '今天',
      yesterday: '昨天',
      tomorrow: '明天',
      thisWeek: '本周',
      thisMonth: '本月',
      daysLeft: '{days} 天',
      hoursLeft: '{hours} 小时',
      minutesLeft: '{minutes} 分钟',
      timeUp: '时间到',
      // Status phrases
      completed: '已完成',
      overdue: '已逾期',
      dueSoon: '即将到期',
      newTask: '新任务',
      // Time units
      day: '天',
      days: '天',
      hour: '小时',
      hours: '小时',
      minute: '分钟',
      minutes: '分钟',
      // Recurring patterns
      weekly: '每周',
      daily: '每天',
      monthly: '每月'
    }
  },
  en: {
    themes: {
      dark: 'Dark Glass',
      rose: 'Rose Morandi',
      blue: 'Misty Blue', 
      morandi: 'Morandi Colors'
    },
    themeDescriptions: {
      dark: 'Modern glass morphism effect',
      rose: 'Gentle romantic pink tones',
      blue: 'Serene blue-gray tones',
      morandi: 'Elegant soft Morandi colors'
    },
    settings: {
      title: 'Settings',
      back: 'Back',
      themeStyle: 'Theme Style',
      language: 'Language Settings',
      currentThemeFeatures: 'Current Theme Features',
      previewEffects: 'Preview Effects',
      activeTasks: 'Active Tasks',
      sampleTaskTitle: 'Sample Task Title',
      sampleTaskDesc: 'This is a sample task description showing the current theme\'s visual effects.'
    },
    eventBooks: {
      title: 'Event Books',
      subtitle: 'Manage your different life themes',
      createNew: 'Create New Event Book',
      createNewDesc: 'Add new theme to organize your tasks',
      totalTasks: 'Total Tasks',
      completed: 'Completed',
      eventBooksCount: 'Event Books',
      all: 'All',
      allDesc: 'View countdown tasks from all event books',
      // Event book names
      university: 'University',
      life: 'Life',
      fitness: 'Fitness',
      work: 'Work'
    },
    createEventBook: {
      title: 'Create Event Book',
      back: 'Back',
      save: 'Save',
      basicInfo: 'Basic Information',
      nameLabel: 'Event Book Name *',
      namePlaceholder: 'e.g.: University, Work, Life...',
      descLabel: 'Description',
      descPlaceholder: 'Describe the purpose and task types of this event book...',
      selectIcon: 'Select Icon',
      selectColor: 'Select Color',
      defaultName: 'Event Book Name',
      defaultDesc: 'Add description to explain the purpose of this event book...'
    },
    icons: {
      'graduation-cap': 'Study',
      'home': 'Life',
      'dumbbell': 'Fitness',
      'briefcase': 'Work', 
      'book-open': 'Reading',
      'heart': 'Health',
      'palette': 'Art',
      'camera': 'Photo',
      'music': 'Music',
      'coffee': 'Social',
      'car': 'Transport',
      'plane': 'Travel'
    },
    taskTypes: {
      '一次性': 'One-time',
      '循环': 'Recurring'
    },
    priorities: {
      'high': 'High',
      'medium': 'Medium',
      'low': 'Low'
    },
    filterTypes: {
      'all': 'All',
      'completed': 'Completed',
      'pending': 'In Progress',
      'overdue': 'Overdue',
      'csc3': 'Efficiency'
    },
    allTasks: {
      title: 'All Tasks',
      subtitle: 'View countdown tasks from all event books',
      back: 'Back',
      addTask: 'Add Countdown',
      importICS: 'Import Calendar',
      settings: 'Settings',
      noTasks: 'No Tasks',
      noTasksDesc: 'Click the button below to add your first countdown task',
      totalCount: '{count} tasks total',
      completedCount: '{count} completed',
      pendingCount: '{count} in progress',
      overdueCount: '{count} overdue',
      oneTimeTasks: 'One-time Tasks',
      recurringTasks: 'Recurring Tasks'
    },
    eventBookDetail: {
      back: 'Back',
      addTask: 'Add Countdown',
      importICS: 'Import Calendar',
      settings: 'Settings',
      fileStorage: 'File Storage',
      categoryManagement: 'Category Management',
      noTasks: 'No Tasks',
      noTasksDesc: 'Click the button below to add your first countdown task',
      totalTasks: 'Total Tasks',
      completedTasks: 'Completed',
      efficiency: 'Efficiency'
    },
    taskDetail: {
      back: 'Back',
      save: 'Save',
      delete: 'Delete',
      complete: 'Complete',
      edit: 'Edit Task',
      create: 'Create Task',
      basicInfo: 'Basic Information',
      titleLabel: 'Task Title *',
      titlePlaceholder: 'Enter task title...',
      descLabel: 'Task Description',
      descPlaceholder: 'Enter task description...',
      deadlineLabel: 'Deadline',
      typeLabel: 'Task Type',
      priorityLabel: 'Priority',
      categoryLabel: 'Category',
      colorLabel: 'Color Label',
      preview: 'Preview'
    },
    floatingActions: {
      addCountdown: 'Add Countdown',
      importCalendar: 'Import Calendar',
      fileStorage: 'File Storage',
      categoryManagement: 'Category Management'
    },
    fileStorage: {
      title: 'File Storage',
      back: 'Back',
      noFiles: 'No Files',
      noFilesDesc: 'You haven\'t uploaded any files yet',
      uploadFiles: 'Upload Files',
      recentFiles: 'Recent Files',
      allFiles: 'All Files'
    },
    categoryManagement: {
      title: 'Category Management',
      back: 'Back',
      addCategory: 'Add Category',
      editCategory: 'Edit Category',
      deleteCategory: 'Delete Category',
      categoryName: 'Category Name',
      categoryColor: 'Category Color',
      noCategories: 'No Categories',
      noCategoriesDesc: 'Click the button below to create your first category'
    },
    importICS: {
      title: 'Import Calendar',
      back: 'Back',
      import: 'Import',
      selectFile: 'Select File',
      fileSelected: 'File Selected',
      importSuccess: 'Import Successful',
      importError: 'Import Failed',
      supportedFormats: 'Supported formats: .ics, .csv',
      dragDrop: 'Drag files here or click to select',
      preview: 'Preview Content'
    },
    common: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      remove: 'Remove',
      close: 'Close',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      daysLeft: '{days} days',
      hoursLeft: '{hours} hours',
      minutesLeft: '{minutes} minutes',
      timeUp: 'Time\'s up',
      // Status phrases
      completed: 'Completed',
      overdue: 'Overdue',
      dueSoon: 'Due Soon',
      newTask: 'New Task',
      // Time units
      day: 'day',
      days: 'days',
      hour: 'hour',
      hours: 'hours',
      minute: 'minute',
      minutes: 'minutes',
      // Recurring patterns
      weekly: 'Weekly',
      daily: 'Daily',
      monthly: 'Monthly'
    }
  }
};

const themes: Record<ThemeType, Omit<Theme, 'name'>> = {
  dark: {
    id: 'dark',
    colors: {
      background: '#1A1D23',
      backgroundSecondary: '#20242B',
      foreground: '#E8E6E3',
      card: 'rgba(255, 255, 255, 0.03)',
      cardHover: 'rgba(255, 255, 255, 0.06)',
      cardBorder: 'rgba(148, 163, 184, 0.08)',
      muted: '#8B8680',
      mutedForeground: '#A8A29E',
      primary: '#94A3B8',
      primaryForeground: '#1A1D23',
      secondary: '#2D3748',
      accent: '#78716C',
      success: '#6B8E7A',
      warning: '#D4B896',
      destructive: '#C89B9B',
    },
    styles: {
      backgroundImage: 'radial-gradient(ellipse at top, #2D3748 0%, #1A1D23 50%, #0F1419 100%)',
      cardStyle: 'backdrop-blur-md',
      buttonStyle: 'backdrop-blur-sm',
      shadowStyle: 'shadow-xl shadow-black/20',
    }
  },
  rose: {
    id: 'rose',
    colors: {
      background: '#F5F0F2',
      backgroundSecondary: '#EDE7E9',
      foreground: '#4A3D42',
      card: '#FDFBFC',
      cardHover: '#F9F6F7',
      cardBorder: '#D9CDD1',
      muted: '#B5A1A8',
      mutedForeground: '#8B7B82',
      primary: '#C4A4AF',
      primaryForeground: '#FEFEFE',
      secondary: '#F0E6EA',
      accent: '#D4B5C4',
      success: '#8B9B8A',
      warning: '#D4B896',
      destructive: '#C89B9B',
    },
    styles: {
      backgroundImage: 'linear-gradient(135deg, #F5F0F2 0%, #F0E6EA 25%, #EDE7E9 50%, #E8DDE1 75%, #E3D4D9 100%)',
      cardStyle: 'shadow-md border rounded-2xl',
      buttonStyle: 'shadow-sm rounded-xl',
      shadowStyle: 'shadow-lg shadow-rose-200/25',
    }
  },
  blue: {
    id: 'blue',
    colors: {
      background: '#F0F3F5',
      backgroundSecondary: '#E7EAED',
      foreground: '#3D434A',
      card: '#FBFCFD',
      cardHover: '#F6F8F9',
      cardBorder: '#CDD5D9',
      muted: '#A1AAB5',
      mutedForeground: '#7B8288',
      primary: '#A4B4C4',
      primaryForeground: '#FEFEFE',
      secondary: '#E6EAED',
      accent: '#B5C4D4',
      success: '#8B9B8A',
      warning: '#D4B896',
      destructive: '#C89B9B',
    },
    styles: {
      backgroundImage: 'linear-gradient(135deg, #F0F3F5 0%, #E6EAED 25%, #E7EAED 50%, #DDE3E6 75%, #D4DBE0 100%)',
      cardStyle: 'shadow-md border rounded-2xl',
      buttonStyle: 'shadow-sm rounded-xl',
      shadowStyle: 'shadow-lg shadow-blue-200/25',
    }
  },
  morandi: {
    id: 'morandi',
    colors: {
      background: '#F5F2F0',
      backgroundSecondary: '#EAE7E4',
      foreground: '#4A453F',
      card: '#FDFCFB',
      cardHover: '#F8F6F4',
      cardBorder: '#D1CECB',
      muted: '#9C9188',
      mutedForeground: '#78716C',
      primary: '#A0938A',
      primaryForeground: '#FEFEFE',
      secondary: '#E8E4E1',
      accent: '#C4B5A0',
      success: '#8B9B8A',
      warning: '#D4B896',
      destructive: '#C89B9B',
    },
    styles: {
      backgroundImage: 'linear-gradient(135deg, #F5F2F0 0%, #ECE8E5 25%, #E8E4E1 50%, #E4DFD8 75%, #DFD9D1 100%)',
      cardStyle: 'shadow-md border rounded-2xl',
      buttonStyle: 'shadow-sm rounded-xl',
      shadowStyle: 'shadow-lg shadow-stone-300/25',
    }
  }
};

interface ThemeContextType {
  currentTheme: ThemeType;
  currentLanguage: LanguageType;
  theme: Theme;
  t: typeof texts.zh;
  setTheme: (theme: ThemeType) => void;
  setLanguage: (language: LanguageType) => void;
  themes: Record<ThemeType, Theme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('dark');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>('zh');

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
  };

  const setLanguage = (language: LanguageType) => {
    setCurrentLanguage(language);
  };

  // Create themes with localized names
  const localizedThemes = Object.entries(themes).reduce((acc, [key, theme]) => {
    acc[key as ThemeType] = {
      ...theme,
      name: texts[currentLanguage].themes[key as ThemeType]
    };
    return acc;
  }, {} as Record<ThemeType, Theme>);

  const currentThemeData = {
    ...themes[currentTheme],
    name: texts[currentLanguage].themes[currentTheme]
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      currentLanguage,
      theme: currentThemeData,
      t: texts[currentLanguage],
      setTheme,
      setLanguage,
      themes: localizedThemes
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}