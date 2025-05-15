import type { StepStatus } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export * from './tailwindMerge';
export * from './dayjs';
export * from './themeConfig';

export function getFullName(record: {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}): string {
  if (record.lastName || record.firstName) {
    return `${record.lastName ?? ''} ${record.firstName ?? ''}`.trim();
  }
  return record.email ?? '';
}

export const checklistStatusLabels: Record<StepStatus, string> = {
  not_started: 'Эхлээгүй',
  doing: 'Гүйцэтгэж байна',
  done: 'Дууссан',
};

export const generateId = (prefix: string) =>
  `${prefix}-${uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase()}`;
