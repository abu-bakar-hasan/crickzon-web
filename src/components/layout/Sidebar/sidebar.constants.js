// Navigation items displayed in the sidebar.
// href must be an exact match or prefix depending on isActive() logic in SidebarNav.jsx.

import {
  Home01Icon,
  Search01Icon,
  GridIcon,
  Award01Icon,
} from '@hugeicons/core-free-icons';

export const mainNav = [
  { href: '/',             icon: Home01Icon,   label: 'Home'   },
  { href: '/store',        icon: GridIcon,     label: 'Store'  },
  { href: '/store/search', icon: Search01Icon, label: 'Search' },
  {
    href: '/store/brands',
    icon: Award01Icon,
    label: 'Brands',
    desktopOnly: true,
  },
];
