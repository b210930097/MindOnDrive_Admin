import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebaseAdminDb';
import { formatDate } from '@/utils/dayjs';
import { v4 as uuidv4 } from 'uuid';

export interface ChecklistData {
  id: string;
  type: 'driver' | 'vehicle';
  question: string;
  createdAt: string;
  createdBy: string;
  isCorrect?: boolean;
  isFix?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { type, question, createdBy, isCorrect, isFix } = await req.json();

    if (!type || !question || !createdBy) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (type === 'driver' && (isCorrect === undefined || isCorrect === null)) {
      return NextResponse.json(
        { success: false, message: 'Missing isCorrect for driver checklist' },
        { status: 400 },
      );
    }

    if (type === 'vehicle' && (isFix === undefined || isFix === null)) {
      return NextResponse.json(
        { success: false, message: 'Missing isFix for vehicle checklist' },
        { status: 400 },
      );
    }

    const id = uuidv4();

    const checklistData: ChecklistData = {
      id,
      type,
      question,
      createdAt: formatDate(new Date()),
      createdBy,
    };

    if (type === 'driver') {
      checklistData.isCorrect = isCorrect;
    }

    if (type === 'vehicle') {
      checklistData.isFix = isFix;
    }

    await db.collection('checklists').doc(id).set(checklistData);

    return NextResponse.json({ success: true, id });
  } catch (error: unknown) {
    console.error('Checklist create error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { success: false, message: 'Unknown error occurred' },
      { status: 500 },
    );
  }
}
