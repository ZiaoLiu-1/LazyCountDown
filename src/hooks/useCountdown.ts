/**
 * useCountdown Hook
 * Provides real-time countdown updates for tasks
 */

import { useState, useEffect } from 'react';
import { CountdownService } from '../services';

export function useCountdown(deadline: string | undefined, language: 'zh' | 'en') {
  const [countdown, setCountdown] = useState<string>('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    if (!deadline) {
      setCountdown(language === 'zh' ? '无截止日期' : 'No deadline');
      return;
    }

    const updateCountdown = () => {
      const countdownText = CountdownService.calculateCountdown(deadline, language);
      setCountdown(countdownText);
      setIsUrgent(CountdownService.isUrgent(deadline));
      setIsOverdue(CountdownService.isOverdue(deadline));
    };

    // Initial update
    updateCountdown();

    // Update every minute
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, [deadline, language]);

  return {
    countdown,
    isUrgent,
    isOverdue
  };
}

