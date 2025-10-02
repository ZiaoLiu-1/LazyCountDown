/**
 * Dexie Database Configuration
 * Defines the IndexedDB database schema and configuration
 */

import Dexie, { Table } from 'dexie';
import type { EventBook, Task, Category } from '../types';

export class LazyCountdownDB extends Dexie {
  // Declare tables
  eventBooks!: Table<EventBook, string>;
  tasks!: Table<Task, string>;
  categories!: Table<Category, string>;

  constructor() {
    super('LazyCountdownDB');
    
    // Define database schema
    // Version 1: Initial schema
    this.version(1).stores({
      eventBooks: 'id, name, createdAt, updatedAt',
      tasks: 'id, eventBookId, deadline, type, category, completed, createdAt, updatedAt',
      categories: 'id, eventBookId, createdAt, updatedAt'
    });
  }
}

// Create and export singleton database instance
export const db = new LazyCountdownDB();

// Initialize database with error handling
export async function initializeDatabase(): Promise<boolean> {
  try {
    // Check if database is accessible
    await db.open();
    console.log('✅ Database initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    return false;
  }
}

// Database helper functions
export async function clearDatabase(): Promise<void> {
  try {
    await db.eventBooks.clear();
    await db.tasks.clear();
    await db.categories.clear();
    console.log('✅ Database cleared successfully');
  } catch (error) {
    console.error('❌ Failed to clear database:', error);
    throw error;
  }
}

export async function getDatabaseStats() {
  try {
    const eventBookCount = await db.eventBooks.count();
    const taskCount = await db.tasks.count();
    const categoryCount = await db.categories.count();
    
    return {
      eventBooks: eventBookCount,
      tasks: taskCount,
      categories: categoryCount
    };
  } catch (error) {
    console.error('❌ Failed to get database stats:', error);
    return { eventBooks: 0, tasks: 0, categories: 0 };
  }
}

