import { TNavItem } from '../types';
import { icons } from '@/ui/icons';

export const navLinks: TNavItem[] = [
  {
    name: 'Create Document',
    label: 'Створити документ',
    href: '/create-document',
    icon: icons['FilePlus2Icon'],
  },
  {
    name: 'Documents',
    label: 'Документи',
    href: '/dashboard/documents',
    icon: icons['FolderOpen'],
  },
  {
    name: 'Templates',
    label: 'Темплейти',
    href: '/dashboard/templates',
    icon: icons['FileSearch'],
  },
  {
    name: 'Elements',
    label: 'Елементи',
    href: '/dashboard/elements',
    icon: icons['Layers'],
  },
  {
    name: 'Variables',
    label: 'Змінні',
    href: '/dashboard/variables',
    icon: icons['Paperclip'],
  },
];
