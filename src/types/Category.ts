/**
 * Category Type Definitions
 * Represents custom categories for organizing tasks within event books
 */

export interface Category {
  id: string;
  label: string;
  color: string; // Hex color code
  eventBookId: string; // Foreign key to EventBook
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface CreateCategoryInput {
  label: string;
  color: string;
  eventBookId: string;
}

export interface UpdateCategoryInput {
  id: string;
  label?: string;
  color?: string;
}

