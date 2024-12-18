import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { IAddProductInput } from "@/utils/propsTypes";

export async function GET(req:NextRequest) {
    const query = req.nextUrl.searchParams.get('searchQuery')

    const res = await prisma.product.findMany({
        where:{
            name:{
                contains: query || ''
            }
        }
    })

    return NextResponse.json(res)
}

export async function POST(req:NextRequest) {
    const body:IAddProductInput = await req.json()
    const {image, name, price, description, discount, category} = body

    const res = await prisma.product.create({
        data:{
            name: name,
            description: description,
            price: Number(price - (price * (discount / 100))),
            discount: Number(discount),
            image: image,
            category: {
                connect:{
                    name: category
                }
            }
        }
    })

    return NextResponse.json(res)
}

export async function DELETE(req:NextRequest) {
    const prodId = req.nextUrl.searchParams.get('id')

    await prisma.product.delete({
        where:{
            id: Number(prodId)
        }
    })

    return new Response(null)
}