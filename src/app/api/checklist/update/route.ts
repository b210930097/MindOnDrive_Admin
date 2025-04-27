import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebaseAdminDb';

export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const { question } = await req.json();

  if (!id || !question) {
    return NextResponse.json(
      { success: false, message: 'ID эсвэл асуулт дутуу байна' },
      { status: 400 },
    );
  }

  try {
    await db.collection('checklists').doc(id).update({
      question,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
