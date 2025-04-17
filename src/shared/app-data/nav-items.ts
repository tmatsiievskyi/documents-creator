import {
  DASHBOARD_CREATE_DOCUMENT,
  DASHBOARD_DOCUMENTS,
  DASHBOARD_ELEMENTS,
  DASHBOARD_TEMPLATES,
  DASHBOARD_VARIABLES,
} from '../constants';
import { TNavItem } from '../types';
import { icons } from '@/ui/icons';
// TODO: delete
export const navLinks: TNavItem[] = [
  {
    name: 'Create Document',
    label: 'Створити',
    href: `${DASHBOARD_CREATE_DOCUMENT}`,
    icon: icons['Plus'],
  },
  {
    name: 'Documents',
    label: 'Документи',
    href: `${DASHBOARD_DOCUMENTS}`,
    icon: icons['FolderOpen'],
  },
  {
    name: 'Templates',
    label: 'Темплейти',
    href: `${DASHBOARD_TEMPLATES}`,
    icon: icons['FileSearch'],
  },
  {
    name: 'Elements',
    label: 'Елементи',
    href: `${DASHBOARD_ELEMENTS}`,
    icon: icons['Layers'],
  },
  {
    name: 'Variables',
    label: 'Змінні',
    href: `${DASHBOARD_VARIABLES}`,
    icon: icons['Paperclip'],
  },
];
