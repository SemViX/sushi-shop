import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { ROUTES } from './utils/routes'

export {default} from 'next-auth/middleware'

export async function middleware(req:NextRequest) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

    if (!token) {
        return NextResponse.redirect(new URL(ROUTES.signIn, req.url))
    }

    const userRole = token.role;
    if (userRole !== 'admin' && req.nextUrl.href.includes('/admin')){
        return NextResponse.redirect(new URL(ROUTES.main, req.url))
    }

    return NextResponse.next()
}

export const config = {matcher: ['/cart', '/profile',  '/admin/:path*']}

