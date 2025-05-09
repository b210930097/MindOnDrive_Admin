import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebaseAdminDb';

export async function POST(req: NextRequest) {
  try {
    const { userId, data } = await req.json();

    const querySnapshot = await db
      .collection('users')
      .where('uid', '==', userId)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 },
      );
    }

    const docId = querySnapshot.docs[0].id;

    await db.collection('users').doc(docId).update(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update user API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update user.' },
      { status: 500 },
    );
  }
}
