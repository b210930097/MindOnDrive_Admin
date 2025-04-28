import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/firebaseAdmin';
import { db } from '@/lib/firebase/firebaseAdminDb';
import { formatDate } from '@/utils/dayjs';

export async function POST(req: NextRequest) {
  try {
    const { email, phone, password, createdBy } = await req.json();

    const userRecord = await adminAuth.createUser({
      email,
      password,
      phoneNumber: '+976' + phone,
      emailVerified: false,
      disabled: false,
    });

    await db
      .collection('branches')
      .doc(userRecord.uid)
      .set({
        email,
        phone,
        role: 'branchAdmin',
        createdAt: formatDate(new Date()),
        createdBy,
      });

    return NextResponse.json({ success: true });
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
