import { TNavItem } from '../types';
import { icons } from '@/ui/icons';

export const navLinks: TNavItem[] = [
  {
    name: 'Create Document',
    label: 'Створити',
    href: '/create-document',
    icon: icons['Plus'],
  },
  {
    name: 'Documents',
    label: 'Документи',
    href: '/documents',
    icon: icons['FolderOpen'],
  },
  {
    name: 'Templates',
    label: 'Темплейти',
    href: '/templates',
    icon: icons['FileSearch'],
  },
  {
    name: 'Elements',
    label: 'Елементи',
    href: '/elements',
    icon: icons['Layers'],
  },
  {
    name: 'Variables',
    label: 'Змінні',
    href: '/variables',
    icon: icons['Paperclip'],
  },
];
