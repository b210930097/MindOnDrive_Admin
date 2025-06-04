import type { Action, Subject } from '@/config/routes';
import type { MenuDividerType } from 'antd/es/menu/interface';
import type * as React from 'react';

export interface NavSectionTitle {
  key: string;
  auth?: boolean;
  action?: Action;
  subject?: Subject;
  sectionTitle: string;
}

export interface NavGroup {
  key: string;
  label?: JSX.Element | string;
  icon?: React.ReactNode;
  action?: Action;
  subject?: Subject;
  auth?: boolean;
  isOpen?: boolean;
  type?: MenuDividerType;
  onClick?: () => void;
  children?: (NavGroup | NavLink)[];
}

export interface NavLink {
  key: string;
  label: JSX.Element | string;
  icon?: React.ReactNode;
  onClick: () => void;
  path?: string;
  action?: Action;
  subject?: Subject;
  auth?: boolean;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
}

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[];
export type HorizontalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[];
