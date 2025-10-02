/**
 * Category Repository
 * Handles all CRUD operations for Categories
 */

import { db } from './db';
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '../types';

export class CategoryRepository {
  /**
   * Create a new category
   */
  static async create(input: CreateCategoryInput): Promise<Category> {
    try {
      const now = new Date().toISOString();
      const category: Category = {
        id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...input,
        createdAt: now,
        updatedAt: now
      };

      await db.categories.add(category);
      console.log('✅ Category created:', category.id);
      return category;
    } catch (error) {
      console.error('❌ Failed to create category:', error);
      throw new Error('Failed to create category');
    }
  }

  /**
   * Get category by ID
   */
  static async getById(id: string): Promise<Category | undefined> {
    try {
      return await db.categories.get(id);
    } catch (error) {
      console.error('❌ Failed to get category:', error);
      throw new Error('Failed to get category');
    }
  }

  /**
   * Get all categories
   */
  static async getAll(): Promise<Category[]> {
    try {
      return await db.categories.orderBy('createdAt').toArray();
    } catch (error) {
      console.error('❌ Failed to get all categories:', error);
      throw new Error('Failed to get all categories');
    }
  }

  /**
   * Get categories by event book
   */
  static async getByEventBook(eventBookId: string): Promise<Category[]> {
    try {
      return await db.categories
        .where('eventBookId')
        .equals(eventBookId)
        .sortBy('createdAt');
    } catch (error) {
      console.error('❌ Failed to get categories by event book:', error);
      throw new Error('Failed to get categories by event book');
    }
  }

  /**
   * Update a category
   */
  static async update(input: UpdateCategoryInput): Promise<Category | undefined> {
    try {
      const { id, ...updates } = input;
      const updatedAt = new Date().toISOString();
      
      await db.categories.update(id, {
        ...updates,
        updatedAt
      });

      return await this.getById(id);
    } catch (error) {
      console.error('❌ Failed to update category:', error);
      throw new Error('Failed to update category');
    }
  }

  /**
   * Delete a category
   */
  static async delete(id: string): Promise<void> {
    try {
      await db.categories.delete(id);
      console.log('✅ Category deleted:', id);
    } catch (error) {
      console.error('❌ Failed to delete category:', error);
      throw new Error('Failed to delete category');
    }
  }

  /**
   * Delete all categories for an event book
   */
  static async deleteByEventBook(eventBookId: string): Promise<void> {
    try {
      await db.categories.where('eventBookId').equals(eventBookId).delete();
      console.log('✅ Categories deleted for event book:', eventBookId);
    } catch (error) {
      console.error('❌ Failed to delete categories by event book:', error);
      throw new Error('Failed to delete categories by event book');
    }
  }
}

