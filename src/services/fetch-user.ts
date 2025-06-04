import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import type { User } from '@/types/user';

export function fetchUsers(
  email: string,
  dashboard: boolean,
  onUpdate: (users: User[]) => void,
): () => void {
  const ref = collection(db, 'users');
  const q =
    email === 'super@admin.com'
      ? query(ref)
      : query(ref, where('createdBy', '==', email));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    let users: User[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        workerId: data.workerId,
        image: data.image ?? null,
        role: data.role ?? 'Driver',
        workStatus: data.workStatus ?? null,
        detectionStatus: data.detectionStatus ?? null,
        lastName: data.lastName ?? '',
        firstName: data.firstName ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        signature: data.signature ?? null,
        birthdate: data.birthdate ?? null,
        comfirmedDate: data.comfirmedDate ?? null,
        isTerms: data.isTerms ?? false,
        companyId: data.companyId ?? '',
        companyName: data.companyName ?? '',
        createdAt: data.createdAt ?? '',
        createdBy: data.createdBy ?? '',
        checklistStatus: data.checklistStatus ?? null,
      };
    });
    if (email === 'super@admin.com') {
      users = users.filter((user) => user.email !== 'super@admin.com');
    }
    if (dashboard) {
      users = users.filter((user) => user.role === 'Driver');
    }
    onUpdate(users);
  });

  return unsubscribe;
}
