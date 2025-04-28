import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebaseAdminDb';
import type { ChecklistData } from '../create/route';

type UpdateChecklistData = Partial<
  Pick<ChecklistData, 'question' | 'isCorrect' | 'isFix'>
>;

export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const { question, isCorrect, isFix } = await req.json();

  if (!id) {
    return NextResponse.json(
      { success: false, message: 'ID байхгүй байна' },
      { status: 400 },
    );
  }

  try {
    const updateData: UpdateChecklistData = {};

    if (question !== undefined) updateData.question = question;
    if (isCorrect !== undefined) updateData.isCorrect = isCorrect;
    if (isFix !== undefined) updateData.isFix = isFix;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Шинэчлэх утга олдсонгүй.' },
        { status: 400 },
      );
    }

    await db.collection('checklists').doc(id).update(updateData);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 },
      );
    }
  }
}
