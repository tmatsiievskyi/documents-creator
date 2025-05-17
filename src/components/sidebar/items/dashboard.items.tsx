import {
  URL_DASHBOARD,
  URL_DASHBOARD_DOCUMENTS,
  URL_DASHBOARD_FEATURES,
  URL_DASHBOARD_TEMPLATES,
  URL_DASHBOARD_VARIABLES,
} from '@/shared/constants';
import { icons } from '@/ui';

const TemplateIcon = icons['SquareDashedKanban'];
const DocumentIcon = icons['NotebookPen'];
const FunctionIcon = icons['FunctionSquare'];
const VariableIcon = icons['Paperclip'];
const DashboardIcon = icons['LayoutDashboard'];

export const dashboardMenuItems = [
  {
    name: 'Dashboard',
    url: URL_DASHBOARD,
    icon: DashboardIcon,
  },
  {
    name: 'Documents',
    url: URL_DASHBOARD_DOCUMENTS,
    icon: DocumentIcon,
  },
  {
    name: 'Templates',
    url: URL_DASHBOARD_TEMPLATES,
    icon: TemplateIcon,
  },
  {
    name: 'Features',
    url: URL_DASHBOARD_FEATURES,
    icon: FunctionIcon,
  },
  {
    name: 'Variables',
    url: URL_DASHBOARD_VARIABLES,
    icon: VariableIcon,
  },
];
