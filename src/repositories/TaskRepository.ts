/**
 * Task Repository
 * Handles all CRUD operations for Tasks
 */

import { db } from './db';
import type { Task, CreateTaskInput, UpdateTaskInput, TaskCategory } from '../types';
import { EventBookRepository } from './EventBookRepository';

export class TaskRepository {
  /**
   * Create a new task
   */
  static async create(input: CreateTaskInput): Promise<Task> {
    try {
      const now = new Date().toISOString();
      const task: Task = {
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: input.title,
        description: input.description,
        deadline: input.deadline,
        type: input.type,
        priority: input.priority,
        category: input.category,
        eventBookId: input.eventBookId,
        completed: false,
        notificationEnabled: input.notificationEnabled ?? false,
        createdAt: now,
        updatedAt: now
      };

      // Add recurring task specific fields if applicable
      if (input.type === '循环' && input.recurrencePattern) {
        (task as any).recurrencePattern = input.recurrencePattern;
        (task as any).duration = input.duration;
      }

      await db.tasks.add(task);
      
      // Update event book task counts
      await EventBookRepository.updateTaskCounts(input.eventBookId);
      
      console.log('✅ Task created:', task.id);
      return task;
    } catch (error) {
      console.error('❌ Failed to create task:', error);
      throw new Error('Failed to create task');
    }
  }

  /**
   * Get task by ID
   */
  static async getById(id: string): Promise<Task | undefined> {
    try {
      return await db.tasks.get(id);
    } catch (error) {
      console.error('❌ Failed to get task:', error);
      throw new Error('Failed to get task');
    }
  }

  /**
   * Get all tasks
   */
  static async getAll(): Promise<Task[]> {
    try {
      return await db.tasks.orderBy('deadline').toArray();
    } catch (error) {
      console.error('❌ Failed to get all tasks:', error);
      throw new Error('Failed to get all tasks');
    }
  }

  /**
   * Get tasks by event book
   */
  static async getByEventBook(eventBookId: string): Promise<Task[]> {
    try {
      return await db.tasks
        .where('eventBookId')
        .equals(eventBookId)
        .sortBy('deadline');
    } catch (error) {
      console.error('❌ Failed to get tasks by event book:', error);
      throw new Error('Failed to get tasks by event book');
    }
  }

  /**
   * Get tasks by category
   */
  static async getByCategory(category: TaskCategory): Promise<Task[]> {
    try {
      return await db.tasks
        .where('category')
        .equals(category)
        .sortBy('deadline');
    } catch (error) {
      console.error('❌ Failed to get tasks by category:', error);
      throw new Error('Failed to get tasks by category');
    }
  }

  /**
   * Get completed tasks
   */
  static async getCompleted(): Promise<Task[]> {
    try {
      return await db.tasks
        .where('completed')
        .equals(true)
        .sortBy('completedAt');
    } catch (error) {
      console.error('❌ Failed to get completed tasks:', error);
      throw new Error('Failed to get completed tasks');
    }
  }

  /**
   * Get overdue tasks
   */
  static async getOverdue(): Promise<Task[]> {
    try {
      const now = new Date().toISOString();
      const allTasks = await db.tasks
        .where('completed')
        .equals(false)
        .toArray();

      return allTasks.filter(task => task.deadline < now);
    } catch (error) {
      console.error('❌ Failed to get overdue tasks:', error);
      throw new Error('Failed to get overdue tasks');
    }
  }

  /**
   * Update a task
   */
  static async update(input: UpdateTaskInput): Promise<Task | undefined> {
    try {
      const { id, ...updates } = input;
      const updatedAt = new Date().toISOString();
      
      // Get the current task to access eventBookId
      const currentTask = await this.getById(id);
      if (!currentTask) {
        throw new Error('Task not found');
      }

      await db.tasks.update(id, {
        ...updates,
        updatedAt
      });

      // Update event book task counts
      await EventBookRepository.updateTaskCounts(currentTask.eventBookId);

      return await this.getById(id);
    } catch (error) {
      console.error('❌ Failed to update task:', error);
      throw new Error('Failed to update task');
    }
  }

  /**
   * Toggle task completion
   */
  static async toggleComplete(id: string): Promise<Task | undefined> {
    try {
      const task = await this.getById(id);
      if (!task) {
        throw new Error('Task not found');
      }

      const now = new Date().toISOString();
      const updates: Partial<Task> = {
        completed: !task.completed,
        updatedAt: now
      };

      if (!task.completed) {
        updates.completedAt = now;
      } else {
        updates.completedAt = undefined;
      }

      await db.tasks.update(id, updates);
      
      // Update event book task counts
      await EventBookRepository.updateTaskCounts(task.eventBookId);

      return await this.getById(id);
    } catch (error) {
      console.error('❌ Failed to toggle task completion:', error);
      throw new Error('Failed to toggle task completion');
    }
  }

  /**
   * Delete a task
   */
  static async delete(id: string): Promise<void> {
    try {
      const task = await this.getById(id);
      if (!task) {
        throw new Error('Task not found');
      }

      await db.tasks.delete(id);
      
      // Update event book task counts
      await EventBookRepository.updateTaskCounts(task.eventBookId);
      
      console.log('✅ Task deleted:', id);
    } catch (error) {
      console.error('❌ Failed to delete task:', error);
      throw new Error('Failed to delete task');
    }
  }

  /**
   * Get tasks filtered by multiple criteria
   */
  static async filter(filters: {
    eventBookId?: string;
    category?: TaskCategory;
    completed?: boolean;
    type?: '一次性' | '循环';
  }): Promise<Task[]> {
    try {
      let query = db.tasks.toCollection();

      if (filters.eventBookId) {
        query = db.tasks.where('eventBookId').equals(filters.eventBookId);
      }

      const tasks = await query.toArray();

      return tasks.filter(task => {
        if (filters.category !== undefined && task.category !== filters.category) {
          return false;
        }
        if (filters.completed !== undefined && task.completed !== filters.completed) {
          return false;
        }
        if (filters.type !== undefined && task.type !== filters.type) {
          return false;
        }
        return true;
      });
    } catch (error) {
      console.error('❌ Failed to filter tasks:', error);
      throw new Error('Failed to filter tasks');
    }
  }
}

