'use client';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import type { BranchAdmin, Driver } from '@/types/user';

export async function fetchBranchAdmins(): Promise<BranchAdmin[]> {
  const snapshot = await getDocs(collection(db, 'branches'));

  const branches = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      email: data.email || '',
      name: data.name || '',
      phone: data.phone || '',
      createdAt: data.createdAt || null,
      role: 'branchAdmin' as const,
    };
  });

  return branches;
}

export async function fetchDriversByBranch(
  branchAdminEmail: string,
): Promise<Driver[]> {
  const driversRef = collection(db, 'drivers');
  const q = query(driversRef, where('createdBy', '==', branchAdminEmail));

  const snapshot = await getDocs(q);

  const drivers = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      createdAt: data.createdAt || null,
      role: 'driver' as const,
    };
  });

  return drivers;
}
