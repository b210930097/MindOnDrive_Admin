import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { db } from '@/lib/firebase/firebaseAdminDb';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
          const user = userCredential.user;

          if (!user?.uid || !user.email) return null;

          const userDoc = await db.collection('users').doc(user.uid).get();

          if (!userDoc.exists) return null;

          const userData = userDoc.data();

          if (!userData) return null;

          // ✅ Ensure createdAt exists
          if (!userData.createdAt) {
            await db.collection('users').doc(user.uid).update({
              createdAt: new Date().toISOString(),
            });
            userData.createdAt = new Date().toISOString();
          }

          return {
            id: user.uid,
            email: user.email,
            name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            role: userData.role || 'Driver',
            phone: userData.phone || '',
            workStatus: userData.workStatus || null,
            detectionStatus: userData.detectionStatus || null,
            signature: userData.signature || null,
            birthdate: userData.birthdate || null,
            isTerms: userData.isTerms ?? false,
            companyId: userData.companyId || '',
            companyName: userData.companyName || '',
            createdBy: userData.createdBy || '',
            createdAt: userData.createdAt || '',
          };
        } catch (error) {
          console.error('Login error in authorize():', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      // When user just logged in or when session is being refreshed manually
      if (user || trigger === 'update') {
        const uid = user?.id || token?.uid;
        const userDoc = await db.collection('users').doc(uid).get();

        if (!userDoc.exists) return token;

        const userData = userDoc.data() || {};

        return {
          ...token,
          uid,
          email: userData.email || token.email,
          name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          role: userData.role || 'Driver',
          phone: userData.phone || '',
          workStatus: userData.workStatus || null,
          detectionStatus: userData.detectionStatus || null,
          signature: userData.signature || null,
          birthdate: userData.birthdate || null,
          isTerms: userData.isTerms ?? false,
          companyId: userData.companyId || '',
          companyName: userData.companyName || '',
          createdBy: userData.createdBy || '',
          createdAt: userData.createdAt || '',
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.uid,
        email: token.email,
        name: token.name,
        firstName: token.firstName,
        lastName: token.lastName,
        role: token.role,
        phone: token.phone,
        workStatus: token.workStatus,
        detectionStatus: token.detectionStatus,
        signature: token.signature,
        birthdate: token.birthdate,
        isTerms: token.isTerms,
        companyId: token.companyId,
        companyName: token.companyName,
        createdBy: token.createdBy,
        createdAt: token.createdAt,
      };
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
  secret: 'USkkrfYW7tOU4kObdC/xjgqgRXJRmQ2KqoXaCK4Fvoo=',
});

export { handler as GET, handler as POST };
