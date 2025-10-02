/**
 * Central export for all type definitions
 * Import types from here in other files: import { Task, EventBook } from '@/types'
 */

export type { EventBook, CreateEventBookInput, UpdateEventBookInput } from './EventBook';
export type { 
  Task, 
  RecurringTask, 
  TaskType, 
  TaskPriority, 
  TaskCategory,
  RecurringPattern,
  CreateTaskInput, 
  UpdateTaskInput 
} from './Task';
export type { Category, CreateCategoryInput, UpdateCategoryInput } from './Category';
export type { 
  NotificationSettings, 
  NotificationTiming, 
  UserSettings 
} from './Settings';
export { DEFAULT_NOTIFICATION_TIMINGS, DEFAULT_SETTINGS } from './Settings';

