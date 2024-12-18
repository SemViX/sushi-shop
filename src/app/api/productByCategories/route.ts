import { useActiveCategory } from "@/store/categories";
import { prisma } from "../../../../prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const categoryId = req.nextUrl.searchParams.get('id')
    const res = await prisma.product.findMany({
        where:{
            categoryId: Number(categoryId)
        }
    })

    return NextResponse.json(res)
}