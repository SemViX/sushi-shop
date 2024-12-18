import NextAuth from "next-auth/next";
import { POST } from "../../user/route";
import { GET } from "../../categories/route";
import { authOptions } from "@/common/authOptions";


const handler = NextAuth(authOptions)

export {handler as POST, handler as GET}