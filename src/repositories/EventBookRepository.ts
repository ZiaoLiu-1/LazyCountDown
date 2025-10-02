/**
 * EventBook Repository
 * Handles all CRUD operations for EventBooks
 */

import { db } from './db';
import type { EventBook, CreateEventBookInput, UpdateEventBookInput } from '../types';

export class EventBookRepository {
  /**
   * Create a new event book
   */
  static async create(input: CreateEventBookInput): Promise<EventBook> {
    try {
      const now = new Date().toISOString();
      const eventBook: EventBook = {
        id: `eb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...input,
        taskCount: 0,
        completedCount: 0,
        createdAt: now,
        updatedAt: now
      };

      await db.eventBooks.add(eventBook);
      console.log('✅ Event book created:', eventBook.id);
      return eventBook;
    } catch (error) {
      console.error('❌ Failed to create event book:', error);
      throw new Error('Failed to create event book');
    }
  }

  /**
   * Get event book by ID
   */
  static async getById(id: string): Promise<EventBook | undefined> {
    try {
      return await db.eventBooks.get(id);
    } catch (error) {
      console.error('❌ Failed to get event book:', error);
      throw new Error('Failed to get event book');
    }
  }

  /**
   * Get all event books
   */
  static async getAll(): Promise<EventBook[]> {
    try {
      return await db.eventBooks.orderBy('createdAt').reverse().toArray();
    } catch (error) {
      console.error('❌ Failed to get all event books:', error);
      throw new Error('Failed to get all event books');
    }
  }

  /**
   * Update an event book
   */
  static async update(input: UpdateEventBookInput): Promise<EventBook | undefined> {
    try {
      const { id, ...updates } = input;
      const updatedAt = new Date().toISOString();
      
      await db.eventBooks.update(id, {
        ...updates,
        updatedAt
      });

      return await this.getById(id);
    } catch (error) {
      console.error('❌ Failed to update event book:', error);
      throw new Error('Failed to update event book');
    }
  }

  /**
   * Delete an event book and all its associated tasks
   */
  static async delete(id: string): Promise<void> {
    try {
      // Delete all tasks associated with this event book
      await db.tasks.where('eventBookId').equals(id).delete();
      
      // Delete all categories associated with this event book
      await db.categories.where('eventBookId').equals(id).delete();
      
      // Delete the event book itself
      await db.eventBooks.delete(id);
      
      console.log('✅ Event book deleted:', id);
    } catch (error) {
      console.error('❌ Failed to delete event book:', error);
      throw new Error('Failed to delete event book');
    }
  }

  /**
   * Update task counts for an event book
   */
  static async updateTaskCounts(eventBookId: string): Promise<void> {
    try {
      const tasks = await db.tasks.where('eventBookId').equals(eventBookId).toArray();
      const taskCount = tasks.length;
      const completedCount = tasks.filter(t => t.completed).length;

      await db.eventBooks.update(eventBookId, {
        taskCount,
        completedCount,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Failed to update task counts:', error);
      throw new Error('Failed to update task counts');
    }
  }

  /**
   * Get event books with task statistics
   */
  static async getAllWithStats(): Promise<EventBook[]> {
    try {
      const eventBooks = await this.getAll();
      
      // Update counts for each event book
      await Promise.all(
        eventBooks.map(eb => this.updateTaskCounts(eb.id))
      );

      // Fetch updated event books
      return await this.getAll();
    } catch (error) {
      console.error('❌ Failed to get event books with stats:', error);
      throw new Error('Failed to get event books with stats');
    }
  }
}

