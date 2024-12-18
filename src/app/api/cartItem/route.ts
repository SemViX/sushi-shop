import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function POST(req:NextRequest) {
    try{
        const body = await req.json()
        const userId = req.nextUrl.searchParams.get('userId');
        let newItem;
        const cart = await prisma.cart.findFirst({ where: {userId: Number(userId)}})

        const cartItem = await prisma.cartItem.findFirst({
            where:{
                productId: Number(body),
                cartId: cart?.id
            }
        })

        if (cartItem){
            newItem = await prisma.cartItem.update({
                where:{
                    id: Number(cartItem.id)
                },
                data:{
                    quantity: {increment:1}
                }
            })
            
        }
        else{
            newItem = await prisma.cartItem.create({
                data:{
                    cartId: cart?.id ?? 0,
                    productId: Number(body)
                }
            })
        }
    
        return NextResponse.json(newItem)
    }
    catch(err)
    {
        return NextResponse.json(err)
    }
}

export async function GET(req:NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId')
    const res = await prisma.cartItem.findMany({
        where:{
            cart:{
                userId:Number(userId)
            }
        },
        include:{
            product: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
    
    return NextResponse.json(res)
}

export async function PUT(req:NextRequest) {
    const cartItemId = Number(await req.nextUrl.searchParams.get('cartItemId'))
    const quantity = Number(await req.json())
    const res = await prisma.cartItem.update({
        where:{
            id: cartItemId
        },
        data:{
            quantity:{
                increment: quantity
            }
        }
    })

    return NextResponse.json(res)
}

export async function DELETE(req:NextRequest) {
    const id = req.nextUrl.searchParams.get('id')
    await prisma.cartItem.delete({
        where:{
            id: Number(id)
        }
    })

    return new Response(null)
}