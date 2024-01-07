import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions  } from "next-auth";

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