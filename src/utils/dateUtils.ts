import { LanguageType } from '../contexts/ThemeContext';

export function formatCountdown(countdown: string, language: LanguageType): string {
  // If it's already a status like "已完成", "已逾期", translate it
  if (countdown === '已完成') {
    return language === 'zh' ? '已完成' : 'Completed';
  }
  
  if (countdown.startsWith('已逾期')) {
    const match = countdown.match(/已逾期\s*(\d+)\s*天/);
    if (match) {
      const days = match[1];
      return language === 'zh' ? `已逾期 ${days}天` : `Overdue ${days} ${days === '1' ? 'day' : 'days'}`;
    }
    return language === 'zh' ? '已逾期' : 'Overdue';
  }

  // Handle recurring patterns
  if (countdown.includes('每周')) {
    return language === 'zh' ? countdown : countdown.replace('每周', 'Weekly ');
  }
  
  if (countdown.includes('每天')) {
    return language === 'zh' ? countdown : countdown.replace('每天', 'Daily ');
  }
  
  if (countdown.includes('每月')) {
    return language === 'zh' ? countdown : countdown.replace('每月', 'Monthly ');
  }

  // Handle time durations like "55天 15小时", "2天 14小时"
  const timeMatch = countdown.match(/(\d+)\s*天(?:\s*(\d+)\s*小时)?/);
  if (timeMatch) {
    const days = parseInt(timeMatch[1]);
    const hours = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
    
    if (language === 'zh') {
      return hours > 0 ? `${days}天 ${hours}小时` : `${days}天`;
    } else {
      const dayStr = days === 1 ? 'day' : 'days';
      const hourStr = hours === 1 ? 'hour' : 'hours';
      return hours > 0 ? `${days} ${dayStr} ${hours} ${hourStr}` : `${days} ${dayStr}`;
    }
  }

  // Handle hours only like "15小时"
  const hoursMatch = countdown.match(/(\d+)\s*小时/);
  if (hoursMatch) {
    const hours = parseInt(hoursMatch[1]);
    if (language === 'zh') {
      return `${hours}小时`;
    } else {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
  }

  // Handle minutes like "30分钟"
  const minutesMatch = countdown.match(/(\d+)\s*分钟/);
  if (minutesMatch) {
    const minutes = parseInt(minutesMatch[1]);
    if (language === 'zh') {
      return `${minutes}分钟`;
    } else {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
  }

  // Handle "新任务" or "New Task"
  if (countdown === '新任务' || countdown === 'New Task') {
    return language === 'zh' ? '新任务' : 'New Task';
  }

  // If no match, return as is
  return countdown;
}

export function formatEventBookName(eventBookId: string, language: LanguageType): string {
  const names = {
    zh: {
      university: '大学',
      life: '生活',
      fitness: '健身',
      work: '工作'
    },
    en: {
      university: 'University',
      life: 'Life',
      fitness: 'Fitness',
      work: 'Work'
    }
  };

  return names[language][eventBookId as keyof typeof names.zh] || eventBookId;
}

export function formatEventBookDescription(eventBookId: string, language: LanguageType): string {
  const descriptions = {
    zh: {
      university: '课程作业、考试和学术项目',
      life: '日常事务和个人安排',
      fitness: '运动计划和健康目标',
      work: '项目任务和职业发展'
    },
    en: {
      university: 'Coursework, exams and academic projects',
      life: 'Daily affairs and personal arrangements',
      fitness: 'Exercise plans and health goals',
      work: 'Project tasks and career development'
    }
  };

  return descriptions[language][eventBookId as keyof typeof descriptions.zh] || '';
}