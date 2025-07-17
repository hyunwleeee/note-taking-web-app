import Icon from "@type/icon";

export const NAV_LIST: { name: string, path: string, icon: Icon }[] = [
  { name: 'all notes', path: '/', icon: 'home' },
  { name: 'archived', path: '/archived', icon: 'archive' },
];

export const TAG_MENU_LIST: { name: string, path: string }[] = [
  { name: 'Cooking', path: '/tags/Cooking' },
  { name: 'Dev', path: '/tags/Dev' },
  { name: 'Fitness', path: '/tags/Fitness' },
  { name: 'Health', path: '/tags/Health' },
  { name: 'Personal', path: '/tags/Personal' },
  { name: 'React', path: '/tags/React' },
  { name: 'Recipes', path: '/tags/Recipes' },
  { name: 'Shopping', path: '/tags/Shopping' },
  { name: 'Travel', path: '/tags/Travel' },
  { name: 'TypeScript', path: '/tags/TypeScript' },
];

export const SETTING_MENU_LIST:
  { name: string, path: string, icon: Icon }[] = [
    { name: 'color theme', path: '/settings/color-theme', icon: 'sun' },
    { name: 'font theme', path: '/settings/font-theme', icon: 'font' },
    { name: 'change password', path: '/settings/change-password', icon: 'lock' },
  ];

export const LOGOUT_MENU_DATA: {
  name: string;
  path: string;
  icon: Icon
} = { name: 'logout', path: '/settings/logout', icon: 'logout' };

export const MENU_LIST: { name: string, path: string, icon: Icon }[] = [
  { name: 'color theme', path: '/settings/color-theme', icon: 'sun' },
  { name: 'font theme', path: '/settings/font-theme', icon: 'font' },
  { name: 'change password', path: '/settings/change-password', icon: 'lock' },
];
