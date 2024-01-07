import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions  } from "next-auth";
export const authOptions: NextAuthOptions  = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
