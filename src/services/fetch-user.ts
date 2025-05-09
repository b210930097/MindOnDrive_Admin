'use client';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import type { User } from '@/types/user';

export async function fetchUsers(email: string): Promise<User[]> {
  const ref = collection(db, 'users');
  const q = query(ref, where('createdBy', '==', email));

  const snapshot = await getDocs(q);

  const users = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      uid: doc.id,
      role: data.role ?? 'Driver',
      workStatus: data.workStatus ?? null,
      detectionStatus: data.detectionStatus ?? null,
      lastName: data.lastName ?? '',
      firstName: data.firstName ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      signature: data.signature ?? null,
      birthdate: data.birthdate ?? null,
      isTerms: data.isTerms ?? false,
      companyId: data.companyId ?? '',
      companyName: data.companyName ?? '',
      createdAt: data.createdAt ?? '',
      createdBy: data.createdBy ?? '',
    };
  });

  return users;
}
