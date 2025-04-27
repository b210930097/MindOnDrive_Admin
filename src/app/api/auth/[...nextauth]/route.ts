import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Имэйл болон нууц үгээ оруулна уу');
        }
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
          const user = userCredential.user;

          if (!user.email) {
            throw new Error('Имэйл мэдээлэл олдсонгүй.');
          }

          return {
            id: user.uid,
            email: user.email,
          };
        } catch (error) {
          console.error('Login error:', error);
          throw new Error('Имэйл эсвэл нууц үг буруу байна');
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.uid as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
        token.role = user.role || 'admin';
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth',
  },
  secret: 'USkkrfYW7tOU4kObdC/xjgqgRXJRmQ2KqoXaCK4Fvoo=',
});

export { handler as GET, handler as POST };
