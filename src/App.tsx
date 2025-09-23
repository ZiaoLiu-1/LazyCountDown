import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import { EventBooksList, EventBook } from './components/EventBooksList';
import { EventBookDetail } from './components/EventBookDetail';
import { CreateEventBook } from './components/CreateEventBook';
import { AllTasksView } from './components/AllTasksView';
import { FileStorage } from './components/FileStorage';
import { CategoryManagement } from './components/CategoryManagement';
import { TaskDetail } from './components/TaskDetail';
import { Settings } from './components/Settings';
import { ImportICS } from './components/ImportICS';

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
  eventBookId: string; // Add this field
}

type FilterType = 'all' | 'completed' | 'pending' | 'overdue' | 'csc3';

function AppContent() {
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState<'eventBooks' | 'allTasks' | 'eventBookDetail' | 'fileStorage' | 'categoryManagement' | 'createEventBook' | 'taskDetail' | 'settings' | 'category' | 'import'>('eventBooks');
  const [selectedEventBook, setSelectedEventBook] = useState<EventBook | undefined>(undefined);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<FilterType>('all');

  const handleSelectEventBook = (eventBook: EventBook) => {
    setSelectedEventBook(eventBook);
    setCurrentView('eventBookDetail');
  };

  const handleViewAllTasks = () => {
    setCurrentView('allTasks');
  };

  const handleEventBookClick = (eventBookId: string) => {
    // Find the event book and navigate to it
    // In a real app, you would fetch the event book data
    console.log('Navigate to event book:', eventBookId);
  };

  const handleCreateEventBook = () => {
    setCurrentView('createEventBook');
  };

  const handleSaveEventBook = (eventBookData: {
    name: string;
    description: string;
    icon: string;
    color: string;
  }) => {
    // In a real app, you would save this to your state/database
    console.log('Saving new event book:', eventBookData);
    setCurrentView('eventBooks');
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setCurrentView('taskDetail');
  };

  const handleBack = () => {
    if (currentView === 'allTasks') {
      setCurrentView('eventBooks');
    } else if (currentView === 'eventBookDetail') {
      setCurrentView('eventBooks');
      setSelectedEventBook(undefined);
    } else if (currentView === 'fileStorage') {
      setCurrentView('eventBookDetail');
    } else if (currentView === 'categoryManagement') {
      setCurrentView('eventBookDetail');
    } else if (currentView === 'createEventBook') {
      setCurrentView('eventBooks');
    } else if (currentView === 'taskDetail') {
      // Return to the previous view based on context
      if (selectedEventBook) {
        setCurrentView('eventBookDetail');
      } else {
        setCurrentView('allTasks');
      }
      setSelectedTask(undefined);
    } else if (currentView === 'category') {
      setCurrentView('eventBookDetail');
      setSelectedCategory('all');
    } else if (currentView === 'import') {
      if (selectedEventBook) {
        setCurrentView('eventBookDetail');
      } else {
        setCurrentView('allTasks');
      }
    } else {
      setCurrentView('eventBooks');
      setSelectedTask(undefined);
      setSelectedCategory('all');
    }
  };

  const handleFileStorageClick = () => {
    setCurrentView('fileStorage');
  };

  const handleCategoryManagementClick = () => {
    setCurrentView('categoryManagement');
  };

  const handleSettingsClick = () => {
    setCurrentView('settings');
  };

  const handleSaveTask = (updatedTask: Task) => {
    // In a real app, you would update the task in your state/database
    console.log('Saving task:', updatedTask);
    // Return to the appropriate view
    if (selectedEventBook) {
      setCurrentView('eventBookDetail');
    } else {
      setCurrentView('allTasks');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    // In a real app, you would delete the task from your state/database
    console.log('Deleting task:', taskId);
    // Return to the appropriate view
    if (selectedEventBook) {
      setCurrentView('eventBookDetail');
    } else {
      setCurrentView('allTasks');
    }
  };

  const handleCompleteTask = (taskId: string) => {
    // In a real app, you would mark the task as completed
    console.log('Completing task:', taskId);
    // Return to the appropriate view
    if (selectedEventBook) {
      setCurrentView('eventBookDetail');
    } else {
      setCurrentView('allTasks');
    }
  };

  const handleAddTask = () => {
    const newTask = {
      countdown: '新任务',
      title: '',
      description: '',
      folderColor: '#3B82F6',
      type: '一次性' as const,
      priority: 'medium' as const,
      category: 'pending', // 默认为"进行中"
      eventBookId: selectedEventBook?.id || ''
    };
    setSelectedTask(newTask as any);
    setCurrentView('taskDetail');
  };

  const handleImportClick = () => {
    setCurrentView('import');
  };

  const handleImportTasks = (importedTasks: any[]) => {
    // In a real app, you would add imported tasks to the current event book
    console.log('Importing tasks to event book:', selectedEventBook?.id, importedTasks);
    // Return to the appropriate view
    if (selectedEventBook) {
      setCurrentView('eventBookDetail');
    } else {
      setCurrentView('allTasks');
    }
  };

  const handleCategoryClick = (category: FilterType) => {
    setSelectedCategory(category);
    setCurrentView('category');
  };

  // Render different views based on current state
  if (currentView === 'settings') {
    return <Settings onBack={handleBack} />;
  }

  if (currentView === 'allTasks') {
    return (
      <AllTasksView
        onBack={handleBack}
        onTaskClick={handleTaskClick}
        onAddTask={handleAddTask}
        onImportICS={handleImportClick}
        onSettingsClick={handleSettingsClick}
        onEventBookClick={handleEventBookClick}
      />
    );
  }

  if (currentView === 'createEventBook') {
    return (
      <CreateEventBook
        onBack={handleBack}
        onSave={handleSaveEventBook}
      />
    );
  }

  if (currentView === 'taskDetail') {
    return (
      <TaskDetail
        task={selectedTask}
        onBack={handleBack}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        onComplete={handleCompleteTask}
      />
    );
  }

  if (currentView === 'eventBookDetail' && selectedEventBook) {
    return (
      <EventBookDetail
        eventBook={selectedEventBook}
        onBack={handleBack}
        onTaskClick={handleTaskClick}
        onAddTask={handleAddTask}
        onImportICS={handleImportClick}
        onSettingsClick={handleSettingsClick}
        onFileStorage={handleFileStorageClick}
        onCategoryManagement={handleCategoryManagementClick}
      />
    );
  }

  if (currentView === 'fileStorage' && selectedEventBook) {
    const getIconComponent = (iconName: string) => {
      const iconMap = {
        'graduation-cap': '🎓',
        'home': '🏠',
        'dumbbell': '💪',
        'briefcase': '💼',
        'book-open': '📖',
        'heart': '❤️'
      };
      return iconMap[iconName as keyof typeof iconMap] || '📁';
    };

    return (
      <FileStorage
        eventBookId={selectedEventBook.id}
        eventBookName={selectedEventBook.name}
        eventBookIcon={selectedEventBook.icon}
        eventBookColor={selectedEventBook.color}
        onBack={handleBack}
      />
    );
  }

  if (currentView === 'categoryManagement' && selectedEventBook) {
    return (
      <CategoryManagement
        eventBook={selectedEventBook}
        onBack={handleBack}
      />
    );
  }

  if (currentView === 'import') {
    return (
      <ImportICS
        onBack={handleBack}
        onImport={handleImportTasks}
      />
    );
  }

  if (currentView === 'category' && selectedEventBook) {
    // You would need to implement CategoryView for event book context
    // For now, just redirect back
    setCurrentView('eventBookDetail');
  }

  // Default view: Event Books List
  return (
    <EventBooksList
      onSelectBook={handleSelectEventBook}
      onCreateBook={handleCreateEventBook}
      onSettingsClick={handleSettingsClick}
      onViewAllTasks={handleViewAllTasks}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}