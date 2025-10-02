/**
 * EventBook Type Definitions
 * Represents a collection/folder of tasks organized by theme or context
 */

export interface EventBook {
  id: string;
  name: string;
  description: string;
  icon: string; // Icon identifier (e.g., 'graduation-cap', 'home', 'briefcase')
  color: string; // Hex color code
  taskCount: number;
  completedCount: number;
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface CreateEventBookInput {
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface UpdateEventBookInput {
  id: string;
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
}

