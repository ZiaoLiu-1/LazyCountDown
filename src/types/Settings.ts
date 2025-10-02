/**
 * Settings Type Definitions
 * User preferences and app configuration
 */

import { ThemeType, LanguageType } from '../contexts/ThemeContext';

export interface NotificationSettings {
  enabled: boolean;
  timings: NotificationTiming[];
  soundEnabled: boolean;
}

export interface NotificationTiming {
  id: string;
  label: string;
  minutesBefore: number; // Minutes before deadline (e.g., 1440 = 1 day, 60 = 1 hour, 30 = 30 min)
}

export interface UserSettings {
  theme: ThemeType;
  language: LanguageType;
  notifications: NotificationSettings;
}

export const DEFAULT_NOTIFICATION_TIMINGS: NotificationTiming[] = [
  { id: '1day', label: '1 day before', minutesBefore: 1440 },
  { id: '1hour', label: '1 hour before', minutesBefore: 60 },
  { id: '30min', label: '30 minutes before', minutesBefore: 30 }
];

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  language: 'zh',
  notifications: {
    enabled: false,
    timings: DEFAULT_NOTIFICATION_TIMINGS,
    soundEnabled: true
  }
};

