'use client';

import type { ProfileFormInput } from '@/app/profile/page';

export async function updateUserProfile(
  userId: string,
  updatedData: ProfileFormInput,
) {
  const res = await fetch('/api/admin/update-branch-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, data: updatedData }),
  });

  if (!res.ok) {
    throw new Error('Failed to update user');
  }
}
