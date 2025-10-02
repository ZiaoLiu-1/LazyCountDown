/**
 * useEventBooks Hook
 * Loads and manages event books from the database
 */

import { useState, useEffect } from 'react';
import { EventBookRepository } from '../repositories';
import type { EventBook } from '../types';

export function useEventBooks() {
  const [eventBooks, setEventBooks] = useState<EventBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEventBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const books = await EventBookRepository.getAllWithStats();
      setEventBooks(books);
    } catch (err) {
      console.error('Failed to load event books:', err);
      setError('Failed to load event books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEventBooks();
  }, []);

  return {
    eventBooks,
    loading,
    error,
    refresh: loadEventBooks
  };
}

