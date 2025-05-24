import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./db-connect";
import { User } from "@/models/user.model";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                try {
                    await connectToDatabase();

                    const user = await User.findOne({
                        email: credentials.email,
                    });

                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    const isMatch = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isMatch) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Error authorizing user", error);
                    throw new Error(error as string);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 14 * 24 * 60 * 60, // 14 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};
