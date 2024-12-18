import { BASE_DIR } from "@/utils/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { useQuery } from "react-query";
import { prisma } from "../../../../prisma/prisma-client";
import { IAddProductInput } from "@/utils/propsTypes";

export async function GET(req:NextRequest) {
    const prodId = req.nextUrl.searchParams.get('id')

    const res = await prisma.product.findFirst({
        where:{
            id: Number(prodId)
        },
        include:{
            category:true
        }
    })
    return NextResponse.json(res)
}

export async function PUT(req:NextRequest) {
    const body:IAddProductInput = await req.json()
    const prodId = req.nextUrl.searchParams.get('id')

    const res = await prisma.product.update({
        where:{
            id: Number(prodId)
        },
        data:{
            name: body.name,
            image: body.image,
            description: body.description,
            category:{
                connect:{
                    name: body.category
                }
            },
            price: Number(body.price),
            discount: Number(body.discount || 0)
        }
    })

    return NextResponse.json(res)
}