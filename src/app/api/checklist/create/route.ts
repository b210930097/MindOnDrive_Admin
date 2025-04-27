import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebaseAdminDb';

export async function POST(req: NextRequest) {
  try {
    const { type, question, createdBy } = await req.json();

    if (!type || !question || !createdBy) {
      return NextResponse.json(
        { success: false, message: 'Missing fields' },
        { status: 400 },
      );
    }

    await db.collection('checklists').add({
      type,
      question,
      createdAt: new Date(),
      createdBy,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Checklist create error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
