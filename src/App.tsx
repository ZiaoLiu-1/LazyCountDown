import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import { EventBooksList } from './components/EventBooksList';
import { EventBookDetail } from './components/EventBookDetail';
import { CreateEventBook } from './components/CreateEventBook';
import { AllTasksView } from './components/AllTasksView';
import { FileStorage } from './components/FileStorage';
import { CategoryManagement } from './components/CategoryManagement';
import { TaskDetail } from './components/TaskDetail';
import { Settings } from './components/Settings';
import { ImportICS } from './components/ImportICS';
import { initializeDatabase, getDatabaseStats, EventBookRepository, TaskRepository } from './repositories';
import type { EventBook, Task as TaskType } from './types';

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

  // Initialize database on app startup
  useEffect(() => {
    const setupDatabase = async () => {
      const initialized = await initializeDatabase();
      if (initialized) {
        const stats = await getDatabaseStats();
        console.log('📊 Database stats:', stats);
      }
    };
    setupDatabase();
  }, []);

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

  const handleSaveEventBook = async (eventBookData: {
    name: string;
    description: string;
    icon: string;
    color: string;
  }) => {
    try {
      await EventBookRepository.create(eventBookData);
      console.log('✅ Event book saved successfully');
      setCurrentView('eventBooks');
    } catch (error) {
      console.error('❌ Failed to save event book:', error);
      // In production, show a user-friendly error message
    }
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

  const handleSaveTask = async (updatedTask: Task) => {
    try {
      if (updatedTask.id && !updatedTask.id.startsWith('task_')) {
        // Creating a new task
        await TaskRepository.create({
          title: updatedTask.title,
          description: updatedTask.description,
          deadline: updatedTask.deadline || new Date().toISOString(),
          type: updatedTask.type,
          priority: updatedTask.priority || 'medium',
          category: updatedTask.category || 'pending',
          eventBookId: updatedTask.eventBookId,
          notificationEnabled: false
        });
        console.log('✅ Task created successfully');
      } else {
        // Updating existing task
        await TaskRepository.update({
          id: updatedTask.id,
          title: updatedTask.title,
          description: updatedTask.description,
          deadline: updatedTask.deadline,
          type: updatedTask.type,
          priority: updatedTask.priority,
          category: updatedTask.category
        });
        console.log('✅ Task updated successfully');
      }
      
      // Return to the appropriate view
      if (selectedEventBook) {
        setCurrentView('eventBookDetail');
      } else {
        setCurrentView('allTasks');
      }
    } catch (error) {
      console.error('❌ Failed to save task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await TaskRepository.delete(taskId);
      console.log('✅ Task deleted successfully');
      
      // Return to the appropriate view
      if (selectedEventBook) {
        setCurrentView('eventBookDetail');
      } else {
        setCurrentView('allTasks');
      }
    } catch (error) {
      console.error('❌ Failed to delete task:', error);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await TaskRepository.toggleComplete(taskId);
      console.log('✅ Task completion toggled successfully');
      
      // Return to the appropriate view
      if (selectedEventBook) {
        setCurrentView('eventBookDetail');
      } else {
        setCurrentView('allTasks');
      }
    } catch (error) {
      console.error('❌ Failed to toggle task completion:', error);
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