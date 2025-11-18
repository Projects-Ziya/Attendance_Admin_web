// src/features/notifications/viewmodel/useNotificationViewModel.ts
import { useState, useEffect } from 'react';

// ✅ Model defined here itself
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  icon: string;
}

// Mock data (replace with API later)
import violeticon from '../assets/icons/violeticon.svg';
import greenicon from '../assets/icons/greenicon.svg';
import blueicon from '../assets/icons/blueicon.svg';

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Leave Request',
    message: 'An employee has submitted a leave request. Review and approve to update the status.',
    type: 'success',
    icon: greenicon,
  },
  {
    id: '2',
    title: 'New Task Assigned',
    message: 'Rohan Sharma Assigned A New Task To David Under Project Apollo.',
    type: 'info',
    icon: violeticon,
  },
  {
    id: '3',
    title: 'Document Uploaded',
    message: 'Karan Malhotra Uploaded New Project Documents For HRMS System.',
    type: 'info',
    icon: blueicon,
  },
];

export function useNotificationViewModel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate API call
    setNotifications(mockNotifications);
  }, []);

  const hideNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, hideNotification };
}