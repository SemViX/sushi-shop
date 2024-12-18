import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";


export async function GET(req:NextRequest) {
    const catId= req.nextUrl.searchParams.get('id')
    const res = await prisma.product.findMany({
        where:{
            categoryId: Number(catId),
            discount: {
                not: null
            }
        }
    })

    return NextResponse.json(res)
}