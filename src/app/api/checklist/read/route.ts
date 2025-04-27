import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebaseAdminDb';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { success: false, message: 'Email is required' },
      { status: 400 },
    );
  }

  try {
    const snapshot = await db
      .collection('checklists')
      .where('createdBy', '==', email)
      .get();

    const checklists = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, checklists });
  } catch (error: any) {
    console.error('Checklist fetch error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
