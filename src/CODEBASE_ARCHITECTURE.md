# 倒计时管理器 - 代码库架构文档

## 📁 项目概览
这是一个基于 React + TypeScript 的手机端倒计时管理应用，采用莫兰迪色系设计，支持中英文双语切换，具备完整的事件薄管理和任务追踪功能。

---

## 🏗️ 核心架构

### 1. 主入口 & 路由管理
**文件位置：`/App.tsx`**
- **功能**：应用主入口，负责所有页面路由和状态管理
- **核心职责**：
  - 页面导航逻辑 (`currentView` 状态管理)
  - 全局状态传递（selectedEventBook, selectedTask, selectedCategory）
  - 事件处理函数定义和分发
  - ThemeProvider 包装器
- **涉及的视图状态**：
  - `eventBooks` - 事件薄列表页
  - `allTasks` - 全部任务页
  - `eventBookDetail` - 事件薄详情页
  - `fileStorage` - 文件存储页
  - `categoryManagement` - 分类管理页
  - `createEventBook` - 创建事件薄页
  - `taskDetail` - 任务详情页
  - `settings` - 设置页
  - `import` - 导入页面

---

## 🎨 主题与国际化系统

### 2. 主题上下文管理
**文件位置：`/contexts/ThemeContext.tsx`**
- **功能**：全局主题和语言管理
- **包含内容**：
  - 4种主题定义：`dark`, `rose`, `blue`, `morandi`
  - 中英文双语文本定义
  - 主题颜色配置和样式配置
  - 语言切换功能
  - 本地化文本提供
- **主要导出**：
  - `ThemeProvider` - React Context Provider
  - `useTheme` - Hook 获取主题和翻译
  - `ThemeType`, `LanguageType` - 类型定义

### 3. 日期和格式工具
**文件位置：`/utils/dateUtils.ts`**
- **功能**：处理时间格式化和本地化
- **主要函数**：
  - `formatCountdown()` - 倒计时文本格式化（"55天 15小时" ↔ "55 days 15 hours"）
  - `formatEventBookName()` - 事件薄名称本地化
  - `formatEventBookDescription()` - 事件薄描述本地化

---

## 📱 主要页面组件

### 4. 事件薄列表页
**文件位置：`/components/EventBooksList.tsx`**
- **功能**：应用首页，显示所有事件薄
- **核心特性**：
  - 事件薄卡片展示（包含进度条和统计）
  - "查看全部任务"快捷入口
  - 创建新事件薄按钮
  - 整体统计信息
- **依赖的工具函数**：
  - `formatEventBookName()` - 获取本地化事件薄名称
  - `formatEventBookDescription()` - 获取本地化描述

### 5. 全部任务视图
**文件位置：`/components/AllTasksView.tsx`**
- **功能**：展示所有事件薄中的任务汇总
- **核心特性**：
  - 动态任务数据生成（基于当前语言）
  - 状态筛选器（全部/已完成/进行中/逾期/效率）
  - 事件薄筛选器
  - 任务分类显示（一次性/循环）
  - 任务状态标识（紧急/逾期/已完成）
- **依赖组件**：
  - `FilterChips` - 状态筛选芯片
  - `EventBookSlider` - 事件薄筛选滑块
  - `StatsCards` - 统计卡片
  - `FloatingActionButton` - 浮动操作按钮
  - `CloudDecoration` - 背景装饰
- **依赖工具函数**：
  - `formatCountdown()` - 倒计时格式化
  - `formatEventBookName()` - 事件薄名称本地化

### 6. 事件薄详情页
**文件位置：`/components/EventBookDetail.tsx`**
- **功能**：单个事件薄的详细管理界面
- **核心特性**：
  - 任务列表展示
  - 分类筛选功能
  - 统计数据展示
  - 管理功能入口（文件存储、分类管理）
- **依赖组件**：
  - `FilterChips` - 筛选芯片
  - `StatsCards` - 统计卡片
  - `TaskSection` - 任务分组展示
  - `FloatingActionButton` - 浮动按钮（带管理选项）

### 7. 创建事件薄页
**文件位置：`/components/CreateEventBook.tsx`**
- **功能**：创建新事件薄的表单界面
- **核心特性**：
  - 名称和描述输入
  - 图标选择器（12个预设图标）
  - 颜色选择器（8种莫兰迪配色）
  - 实时预览效果

### 8. 任务详情页
**文件位置：`/components/TaskDetail.tsx`**
- **功能**：任务创建和编辑界面
- **核心特性**：
  - 基本信息编辑（标题、描述）
  - 截止时间设置
  - 任务类型选择（一次性/循环）
  - 优先级设置
  - 分类选择
  - 操作按钮（完成/删除）
- **依赖组件**：
  - `CategorySlider` - 分类选择滑块

### 9. 设置页面
**文件位置：`/components/Settings.tsx`**
- **功能**：应用设置和主题管理
- **核心特性**：
  - 主题切换（4种主题选择）
  - 语言切换（中文/英文）
  - 主题预览效果
  - 实时效果展示

---

## 🛠️ 功能组件

### 10. 浮动操作按钮
**文件位置：`/components/FloatingActionButton.tsx`**
- **功能**：多功能浮动按钮，根据页面上下文显示不同选项
- **支持操作**：
  - 添加倒计时任务
  - 导入日历文件
  - 文件存储（仅事件薄详情页）
  - 分类管理（仅事件薄详情页）
- **特性**：
  - 展开/收起动画
  - 主题适配的渐变效果
  - 条件显示管理选项

### 11. 筛选芯片组件
**文件位置：`/components/FilterChips.tsx`**
- **功能**：任务状态筛选器
- **筛选选项**：
  - 全部、已完成、进行中、逾期、效率
- **特性**：
  - 动态任务计数
  - 选中状态视觉反馈
  - 本地化标签文本

### 12. 事件薄滑块
**文件位置：`/components/EventBookSlider.tsx`**
- **功能**：水平滚动的事件薄筛选器
- **特性**：
  - 图标+名称显示
  - 任务数量统计
  - 选中状态高亮

### 13. 统计卡片
**文件位置：`/components/StatsCards.tsx`**
- **功能**：显示任务统计信息
- **数据项**：
  - 总任务数、已完成数、进行中数
  - 完成率计算和可视化
- **特性**：
  - 响应式网格布局
  - 主题适配的颜色方案

### 14. 任务分组展示
**文件位置：`/components/TaskSection.tsx`**
- **功能**：按类型分组显示任务
- **支持分组**：
  - 一次性任务
  - 循环任务
- **特性**：
  - 折叠/展开功能
  - 任务数量显示

### 15. 任务卡片
**文件位置：`/components/TaskCard.tsx`**
- **功能**：单个任务的卡片展示
- **显示信息**：
  - 任务标题和描述
  - 倒计时信息
  - 任务类型标签
  - 优先级指示器
  - 完成状态
- **特性**：
  - 状态着色（逾期、紧急、已完成）
  - 点击交互效果
  - 主题适配样式

---

## 🗂️ 专门功能页面

### 16. 文件存储
**文件位置：`/components/FileStorage.tsx`**
- **功能**：事件薄相关文件管理
- **特性**：
  - 文件上传界面
  - 拖拽上传支持
  - 文件列表展示
  - 空状态提示

### 17. 分类管理
**文件位置：`/components/CategoryManagement.tsx`**
- **功能**：任务分类的增删改管理
- **特性**：
  - 分类列表展示
  - 添加新分类
  - 分类颜色设置
  - 分类统计信息

### 18. 导入功能
**文件位置：`/components/ImportICS.tsx`**
- **功能**：导入日历文件和CSV文件
- **支持格式**：
  - .ics 日历文件
  - .csv 表格文件
- **特性**：
  - 文件选择界面
  - 导入预览
  - 支持格式说明

### 19. 分类滑块
**文件位置：`/components/CategorySlider.tsx`**
- **功能**：水平滚动的分类选择器
- **用于**：
  - 任务详情页的分类选择
  - 分类管理页的快速筛选

---

## 🎯 辅助组件

### 20. 云朵装饰
**文件位置：`/components/CloudDecoration.tsx`**
- **功能**：页面背景装饰元素
- **特性**：
  - SVG云朵图形
  - 动态透明度
  - 主题色彩适配

### 21. 分页标签
**文件位置：`/components/PaginatedTags.tsx`**
- **功能**：支持分页的标签组件
- **用于**：大量标签的分组展示

### 22. 页面头部
**文件位置：`/components/Header.tsx`**
- **功能**：通用页面头部组件
- **包含**：
  - 返回按钮
  - 页面标题
  - 操作按钮

---

## 📂 弃用/备用组件

### 23. 分类视图
**文件位置：`/components/CategoryView.tsx`**
- **状态**：当前未在主要流程中使用
- **功能**：按分类展示任务列表

### 24. 文件夹相关组件
**文件位置**：
- `/components/FolderSection.tsx`
- `/components/FolderView.tsx`
- **状态**：早期版本组件，已被事件薄系统替代

---

## 🧩 UI组件库

### 25. ShadCN/UI 组件
**文件位置：`/components/ui/`**
- **包含**：完整的 ShadCN/UI 组件库
- **主要使用的组件**：
  - `button.tsx` - 按钮组件
  - `card.tsx` - 卡片组件
  - `input.tsx` - 输入框
  - `textarea.tsx` - 文本域
  - `select.tsx` - 选择器
  - `switch.tsx` - 开关
  - `dialog.tsx` - 对话框
  - `tooltip.tsx` - 提示框
- **特殊组件**：
  - `figma/ImageWithFallback.tsx` - 图片回退组件

---

## 🎨 样式系统

### 26. 全局样式
**文件位置：`/styles/globals.css`**
- **功能**：Tailwind V4 配置和全局样式
- **包含内容**：
  - CSS 变量定义（颜色、字体、间距）
  - 深色模式支持
  - 自定义动画定义
  - 任务状态样式
  - 滚动条隐藏
- **自定义动画**：
  - `rotate-135` - 按钮旋转
  - `task-completed` - 任务完成划线
  - `task-overdue` - 逾期任务样式
  - `animate-float` - 浮动动画
  - `animate-pulse-warning` - 警告脉冲

---

## 🔄 数据流和状态管理

### 27. 状态管理架构
```
App.tsx (主状态)
├── currentView (页面路由)
├── selectedEventBook (当前事件薄)
├── selectedTask (当前任务)
├── selectedCategory (当前分类)
└── ThemeContext (全局主题和语言)
```

### 28. 事件流向
```
用户操作 → 页面组件 → App.tsx 事件处理函数 → 状态更新 → 页面重新渲染
```

### 29. 主题数据流向
```
ThemeContext → useTheme Hook → 组件样式应用
             → 语言文本获取 → UI文本显示
```

---

## 🌐 国际化系统

### 30. 翻译文件结构
**位置**：`/contexts/ThemeContext.tsx` 内的 `texts` 对象
- **支持语言**：中文 (`zh`) 和英文 (`en`)
- **翻译分类**：
  - `themes` - 主题名称
  - `settings` - 设置页文本
  - `eventBooks` - 事件薄相关
  - `taskDetail` - 任务详情
  - `filterTypes` - 筛选类型
  - `priorities` - 优先级
  - `common` - 通用文本

### 31. 动态数据本地化
**位置**：`/utils/dateUtils.ts`
- **处理内容**：
  - 倒计时文本格式化
  - 事件薄名称翻译
  - 时间单位转换
  - 状态文本翻译

---

## 📋 接口和类型定义

### 32. 主要数据类型
```typescript
// 任务接口
interface Task {
  id: string;
  countdown: string;
  deadline?: string;
  title: string;
  description: string;
  folderColor: string;
  type: '一次性' | '循环';
  duration?: string;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
  eventBookId: string;
}

// 事件薄接口
interface EventBook {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  taskCount: number;
  completedCount: number;
  createdAt: string;
}

// 筛选类型
type FilterType = 'all' | SystemCategoryId | string;

// 主题类型
type ThemeType = 'dark' | 'rose' | 'blue' | 'morandi';

// 语言类型  
type LanguageType = 'zh' | 'en';
```

---

## 🎯 核心功能实现位置

### 33. 主题切换功能
- **配置**：`/contexts/ThemeContext.tsx` - 主题定义
- **切换界面**：`/components/Settings.tsx` - 设置页面
- **应用**：所有组件通过 `useTheme()` Hook 获取主题

### 34. 语言切换功能
- **配置**：`/contexts/ThemeContext.tsx` - 翻译文本
- **切换界面**：`/components/Settings.tsx` - 语言选择
- **工具函数**：`/utils/dateUtils.ts` - 动态内容翻译
- **应用**：所有组件通过 `useTheme()` Hook 获取翻译

### 35. 任务管理功能
- **列表展示**：`/components/AllTasksView.tsx`, `/components/EventBookDetail.tsx`
- **任务创建/编辑**：`/components/TaskDetail.tsx`
- **筛选功能**：`/components/FilterChips.tsx`, `/components/EventBookSlider.tsx`
- **统计展示**：`/components/StatsCards.tsx`

### 36. 事件薄管理功能
- **列表展示**：`/components/EventBooksList.tsx`
- **详情管理**：`/components/EventBookDetail.tsx`
- **创建功能**：`/components/CreateEventBook.tsx`
- **数据本地化**：`/utils/dateUtils.ts`

### 37. 文件和分类管理
- **文件存储**：`/components/FileStorage.tsx`
- **分类管理**：`/components/CategoryManagement.tsx`
- **导入功能**：`/components/ImportICS.tsx`

---

## 🎨 视觉设计系统

### 38. 莫兰迪色系实现
- **配置位置**：`/contexts/ThemeContext.tsx` - 四套主题配色
- **应用方式**：通过 `theme.colors` 和 `theme.styles` 动态应用
- **特色效果**：
  - 玻璃拟态效果（深色主题）
  - 柔和渐变背景
  - 精细阴影和边框
  - 低饱和度配色方案

### 39. 响应式和移动端优化
- **实现位置**：各组件内的 Tailwind 类名
- **特色功能**：
  - 触摸友好的按钮尺寸
  - 滑动交互支持
  - 底部浮动按钮设计
  - 卡片式界面布局

---

## 📱 移动端特色功能

### 40. 手势和交互
- **滑动筛选**：`/components/EventBookSlider.tsx`, `/components/CategorySlider.tsx`
- **浮动操作**：`/components/FloatingActionButton.tsx`
- **卡片交互**：hover 和 active 状态的缩放效果
- **触摸反馈**：按钮点击的视觉反馈

### 41. 导航系统
- **实现位置**：`/App.tsx` 的路由逻辑
- **特色**：
  - 基于状态的页面切换
  - 智能返回逻辑
  - 上下文保持（记住来源页面）
  - 无页面刷新的单页应用体验

---

这份文档详细说明了整个代码库的架构和每个功能模块的具体实现位置。通过这份文档，您可以快速定位任何功能的相关代码文件，并理解各个组件之间的关系和数据流向。