/**
 * useTasks Hook
 * Loads and manages tasks from the database
 */

import { useState, useEffect } from 'react';
import { TaskRepository } from '../repositories';
import type { Task } from '../types';

interface UseTasksOptions {
  eventBookId?: string;
  category?: string;
  completed?: boolean;
}

export function useTasks(options: UseTasksOptions = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let loadedTasks: Task[];
      
      if (options.eventBookId) {
        loadedTasks = await TaskRepository.getByEventBook(options.eventBookId);
      } else if (options.category) {
        loadedTasks = await TaskRepository.getByCategory(options.category);
      } else if (options.completed !== undefined) {
        loadedTasks = await TaskRepository.filter({ completed: options.completed });
      } else {
        loadedTasks = await TaskRepository.getAll();
      }
      
      setTasks(loadedTasks);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [options.eventBookId, options.category, options.completed]);

  return {
    tasks,
    loading,
    error,
    refresh: loadTasks
  };
}

