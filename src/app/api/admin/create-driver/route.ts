import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/firebaseAdmin';
import { db } from '@/lib/firebase/firebaseAdminDb';
import { formatDate } from '@/utils/dayjs';
import { generateId } from '@/utils';

export async function POST(req: NextRequest) {
  try {
    const { email, phone, password, companyId, companyName, createdBy } =
      await req.json();

    const userRecord = await adminAuth.createUser({
      email,
      password,
      phoneNumber: '+976' + phone,
      emailVerified: false,
      disabled: false,
    });

    const workerId = generateId('DRV');

    await db
      .collection('users')
      .doc(userRecord.uid)
      .set({
        uid: userRecord.uid,
        role: 'Driver',
        workStatus: 'Бэлэн биш',
        image: null,
        detectionStatus: 'Тодорхойгүй',
        checklistStatus: {
          driver: 'not_started',
          vehicle: 'not_started',
          confirmed: 'not_started',
        },
        firstName: null,
        lastName: null,
        email,
        phone,
        signature: null,
        birthdate: null,
        isTerms: false,
        companyId,
        companyName,
        workerId,
        createdAt: formatDate(new Date()),
        createdBy,
      });

    return NextResponse.json({ success: true, id: userRecord.uid });
  } catch (error: unknown) {
    console.error(error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
}
