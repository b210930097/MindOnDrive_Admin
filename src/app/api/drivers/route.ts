import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebaseAdminDb';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');
  const role = url.searchParams.get('role');

  if (!email || !role) {
    return NextResponse.json({ error: 'No permission' }, { status: 401 });
  }

  if (role === 'superAdmin') {
    const snapshot = await db
      .collection('users')
      .where('createdBy', '==', email)
      .get();

    const data = snapshot.docs.map((doc: FirebaseFirestore.DocumentData) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ data });
  } else if (role === 'Admin') {
    const snapshot = await db
      .collection('users')
      .where('createdBy', '==', email)
      .get();

    const data = snapshot.docs.map((doc: FirebaseFirestore.DocumentData) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ data });
  }
}
