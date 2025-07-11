import Icon from "@type/icon";

export const NAV_LIST: { title: string, path: string, icon: Icon }[] = [
  { title: 'all notes', path: '/', icon: 'home' },
  { title: 'archived', path: '/archived', icon: 'archive' },
];

export const LEGACY_TAG_MENU_LIST: { title: string, path: string }[] = [
  { title: 'Cooking', path: '/tags/Cooking' },
  { title: 'Dev', path: '/tags/Dev' },
  { title: 'Fitness', path: '/tags/Fitness' },
  { title: 'Health', path: '/tags/Health' },
  { title: 'Personal', path: '/tags/Personal' },
  { title: 'React', path: '/tags/React' },
  { title: 'Recipes', path: '/tags/Recipes' },
  { title: 'Shopping', path: '/tags/Shopping' },
  { title: 'Travel', path: '/tags/Travel' },
  { title: 'TypeScript', path: '/tags/TypeScript' },
];

export const SETTING_MENU_LIST:
  { title: string, path: string, icon: Icon }[] = [
    { title: 'color theme', path: '/settings/color-theme', icon: 'sun' },
    { title: 'font theme', path: '/settings/font-theme', icon: 'font' },
    { title: 'change password', path: '/settings/change-password', icon: 'lock' },
  ];

export const LOGOUT_MENU_DATA: {
  title: string;
  path: string;
  icon: Icon
} = { title: 'logout', path: '/settings/logout', icon: 'logout' };

export const MENU_LIST: { title: string, path: string, icon: Icon }[] = [
  { title: 'color theme', path: '/settings/color-theme', icon: 'sun' },
  { title: 'font theme', path: '/settings/font-theme', icon: 'font' },
  { title: 'change password', path: '/settings/change-password', icon: 'lock' },
];
