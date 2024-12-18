import { ROUTES } from "@/utils/routes";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from "../../prisma/prisma-client";
import { compare } from "bcrypt";

export const authOptions:NextAuthOptions = {
    secret:process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    pages:{
        signIn: ROUTES.signIn
    },
    session:{
        strategy: 'jwt'
    },
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const existingUser =  await prisma.user.findFirst({
                    where:{
                        email: credentials.email
                    }
                })

                if(!existingUser){
                    return null
                }

                const passwordMatch = await compare(credentials.password, existingUser.password)
                if (!passwordMatch){
                    return null
                }

                return {
                    id: String(existingUser.id),
                    username: existingUser.username,
                    email:existingUser.email,
                    role: existingUser.role,
                    avatar: existingUser.avatar
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, user, trigger, session}) {
            if (user) {
                return{
                    ...token,
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                }
            }

            if (trigger === 'update' && session){
                token = session
                return token
            }

            return token
        },
        async session({session, token}) {
            return{
                ...session,
                user:{
                    ...session.user,
                    id:token.id,
                    username:token.username,
                    email: token.email,
                    role: token.role,
                    avatar: token.avatar
                }
            }
            return session
        },
    }
} 