import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: string;
    email: string;
    role?: string;
  }
}
