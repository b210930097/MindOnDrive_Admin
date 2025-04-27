import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebaseAdminDb';

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, message: 'ID байхгүй байна' },
      { status: 400 },
    );
  }

  try {
    await db.collection('checklists').doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
