import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Books',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  {
    name: 'Profile',
    url: '/profile',
    icon: 'icon-user',
    badge: {
      variant: 'info',
      text: ''
    }
  }
];
