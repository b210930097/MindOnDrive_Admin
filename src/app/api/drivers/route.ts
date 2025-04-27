import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebaseAdminDb';
import type { DocumentData } from 'firebase-admin/firestore';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');
  const role = url.searchParams.get('role');

  if (!email || !role) {
    return NextResponse.json({ error: 'No permission' }, { status: 401 });
  }

  if (role === 'superadmin') {
    const snapshot = await db.collection('branches').get();
    const branches = snapshot.docs.map((doc: DocumentData) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ branches });
  } else if (role === 'branchAdmin') {
    const driverSnapshot = await db
      .collection('drivers')
      .where('createdBy', '==', email)
      .get();

    const drivers = driverSnapshot.docs.map(
      (doc: FirebaseFirestore.DocumentData) => ({
        id: doc.id,
        ...doc.data(),
      }),
    );

    return NextResponse.json({ drivers });
  }
}
