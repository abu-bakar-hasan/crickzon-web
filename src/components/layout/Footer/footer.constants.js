// Static data for the Footer component.
// Keeps link arrays and social icons out of component files.

import {
  InstagramIcon,
  NewTwitterIcon,
  YoutubeIcon,
} from '@hugeicons/core-free-icons';

export const SHOP_LINKS = [
  { label: 'All Products',    href: '/store' },
  { label: 'Bats',            href: '/store?category=bats' },
  { label: 'Balls',           href: '/store?category=balls' },
  { label: 'Protective Gear', href: '/store?category=protective-gear' },
  { label: 'Accessories',     href: '/store?category=accessories' },
];

export const SUPPORT_LINKS = [
  { label: 'Contact Us',       href: '/contact' },
  { label: 'FAQ',              href: '/faq' },
  { label: 'Shipping Policy',  href: '/shipping-policy' },
  { label: 'Return Policy',    href: '/return-policy' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram',  href: 'https://instagram.com/crickzon',  icon: InstagramIcon  },
  { label: 'Twitter / X', href: 'https://twitter.com/crickzon',   icon: NewTwitterIcon },
  { label: 'YouTube',    href: 'https://youtube.com/@crickzon',   icon: YoutubeIcon    },
];
