import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";


export async function GET(req:NextRequest) {
    const query = req.nextUrl.searchParams.get('searchQuery')

    const res = await prisma.category.findMany({
        where:{
            name:{
                contains: query ?? ''
            }
        },
        include:{
            products:true
        }
    })

    return NextResponse.json(res)
}