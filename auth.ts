import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const email = process.env.AUTH_USER_EMAIL;
        const passwordHash = process.env.AUTH_PASSWORD_HASH;

        if (!email || !passwordHash) {
          return null;
        }

        if (parsed.data.email.toLowerCase() !== email.toLowerCase()) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          parsed.data.password,
          passwordHash,
        );

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: 'bishopric-owner',
          name: 'Bishopric',
          email,
        };
      },
    }),
  ],
});