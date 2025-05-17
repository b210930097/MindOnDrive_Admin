import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import type { User } from '@/types/user';

export function fetchUsers(
  email: string,
  onUpdate: (users: User[]) => void,
): () => void {
  const ref = collection(db, 'users');
  const q = query(ref, where('createdBy', '==', email));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const users: User[] = snapshot.docs.map((doc) => {
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
        isTerms: data.isTerms ?? false,
        companyId: data.companyId ?? '',
        companyName: data.companyName ?? '',
        createdAt: data.createdAt ?? '',
        createdBy: data.createdBy ?? '',
        checklistStatus: data.checklistStatus ?? null,
      };
    });
    onUpdate(users);
  });

  return unsubscribe;
}
