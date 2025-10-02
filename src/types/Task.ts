/**
 * Task Type Definitions
 * Represents countdown tasks (one-time and recurring)
 */

export type TaskType = '一次性' | '循环'; // One-time | Recurring
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskCategory = 'pending' | 'completed' | 'overdue' | string; // system categories + custom categories

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string; // ISO date string
  countdown?: string; // Calculated countdown string (not stored, computed)
  type: TaskType;
  priority: TaskPriority;
  category: TaskCategory;
  eventBookId: string; // Foreign key to EventBook
  completed: boolean;
  notificationEnabled: boolean;
  folderColor?: string; // Display color override
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  completedAt?: string; // ISO date string when task was completed
}

export interface RecurringTask extends Task {
  type: '循环';
  recurrencePattern: RecurringPattern;
  duration?: string; // Display duration (e.g., "2小时", "2 hours")
  nextOccurrence?: string; // ISO date string for next occurrence
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval?: number; // e.g., every 2 days, every 3 weeks
  dayOfWeek?: number; // 0-6 for weekly (0 = Sunday)
  dayOfMonth?: number; // 1-31 for monthly
  time?: string; // HH:mm format
}

export interface CreateTaskInput {
  title: string;
  description: string;
  deadline: string;
  type: TaskType;
  priority: TaskPriority;
  category: TaskCategory;
  eventBookId: string;
  notificationEnabled?: boolean;
  recurrencePattern?: RecurringPattern;
  duration?: string;
}

export interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  deadline?: string;
  type?: TaskType;
  priority?: TaskPriority;
  category?: TaskCategory;
  completed?: boolean;
  notificationEnabled?: boolean;
  recurrencePattern?: RecurringPattern;
  duration?: string;
}

