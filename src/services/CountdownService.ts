/**
 * CountdownService
 * Handles countdown calculations and formatting
 */

import { formatDistanceToNow, formatDistance, isPast, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';

export class CountdownService {
  /**
   * Calculate countdown string from deadline
   */
  static calculateCountdown(deadline: string, language: 'zh' | 'en'): string {
    const now = new Date();
    const deadlineDate = new Date(deadline);

    // Check if deadline is in the past
    if (isPast(deadlineDate) && deadlineDate.getTime() < now.getTime()) {
      const daysOverdue = Math.abs(differenceInDays(deadlineDate, now));
      return language === 'zh' 
        ? `已逾期 ${daysOverdue}天` 
        : `Overdue ${daysOverdue} ${daysOverdue === 1 ? 'day' : 'days'}`;
    }

    // Calculate time remaining
    const days = differenceInDays(deadlineDate, now);
    const hours = differenceInHours(deadlineDate, now) % 24;
    const minutes = differenceInMinutes(deadlineDate, now) % 60;

    // Format based on time remaining
    if (days > 0) {
      if (hours > 0) {
        return language === 'zh'
          ? `${days}天 ${hours}小时`
          : `${days} ${days === 1 ? 'day' : 'days'} ${hours} ${hours === 1 ? 'hour' : 'hours'}`;
      }
      return language === 'zh'
        ? `${days}天`
        : `${days} ${days === 1 ? 'day' : 'days'}`;
    }

    if (hours > 0) {
      if (minutes > 0) {
        return language === 'zh'
          ? `${hours}小时 ${minutes}分钟`
          : `${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
      }
      return language === 'zh'
        ? `${hours}小时`
        : `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }

    if (minutes > 0) {
      return language === 'zh'
        ? `${minutes}分钟`
        : `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }

    return language === 'zh' ? '即将到期' : 'Due soon';
  }

  /**
   * Check if task is urgent (within 3 days)
   */
  static isUrgent(deadline: string): boolean {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    
    if (isPast(deadlineDate)) return false;
    
    const days = differenceInDays(deadlineDate, now);
    return days <= 3 && days >= 0;
  }

  /**
   * Check if task is overdue
   */
  static isOverdue(deadline: string): boolean {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return isPast(deadlineDate) && deadlineDate.getTime() < now.getTime();
  }

  /**
   * Get relative time string (used for recurring tasks)
   */
  static getRelativeTime(date: string, language: 'zh' | 'en'): string {
    const dateObj = new Date(date);
    const locale = language === 'zh' ? zhCN : enUS;
    
    return formatDistanceToNow(dateObj, {
      addSuffix: true,
      locale
    });
  }
}

