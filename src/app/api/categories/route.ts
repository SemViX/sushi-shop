import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { IAddCategoryInput } from "@/utils/propsTypes";


export async function GET() {
    const res = await prisma.category.findMany()
    return NextResponse.json(res)
}

export async function POST(req:NextRequest) {
    const body:IAddCategoryInput = await req.json()
    const res = await prisma.category.create({
        data:{
            name: body.name
        },
    })
    return NextResponse.json(res)
}

export async function DELETE(req:NextRequest) {
    const categoryId = req.nextUrl.searchParams.get('id')

    await prisma.category.delete({
        where:{
            id: Number(categoryId)
        }
    })

    return new Response(null)
}

export async function PUT(req:NextRequest) {
    const data = await req.json()
    const catId = req.nextUrl.searchParams.get('catId')
    console.log(catId)

    const res = await prisma.category.update({
        where:{
            id:Number(catId)
        },
        data:{
            name: data.name
        }
    })

    return NextResponse.json(res)
}