import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      workerId: string;
      image: string;
      email: string;
      name: string;
      firstName: string;
      lastName: string;
      role: string;
      phone: string;
      workStatus: string | null;
      detectionStatus: string | null;
      signature: string | null;
      birthdate: string | null;
      comfirmedDate: string | null;
      isTerms: boolean;
      companyId: string;
      companyName: string;
      createdBy: string;
      createdAt: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    workerId: string;
    image: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
    workStatus: string | null;
    detectionStatus: string | null;
    signature: string | null;
    birthdate: string | null;
    comfirmedDate: string | null;
    isTerms: boolean;
    companyId: string;
    companyName: string;
    createdBy: string;
    createdAt: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: string;
    workerId: string;
    image: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
    workStatus: string | null;
    detectionStatus: string | null;
    signature: string | null;
    birthdate: string | null;
    comfirmedDate: string | null;
    isTerms: boolean;
    companyId: string;
    companyName: string;
    createdBy: string;
    createdAt: string;
  }
}
