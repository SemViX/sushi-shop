
import NextAuth from "next-auth";

declare module 'next-auth'{
    interface User{
        username: string,
        role: string,
        avatar: string,
    }
    interface Session{
        user: User & {
            username: string,
            role: string,
            avatar:string
        }
    }
}