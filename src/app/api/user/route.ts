import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { IRegistrationInput } from "@/utils/propsTypes";
import {hash} from 'bcrypt'
import { truncateSync } from "fs";


export async function GET(req:NextRequest) {
    const query = req.nextUrl.searchParams.get('searchQuery')
    const res = await prisma.user.findMany({
        where:{
            username:{
                contains: query || ''
            }
        },
        orderBy:{
            createdAt: 'asc'
        }
    })
    return NextResponse.json(res)
}

export async function POST(req:NextRequest) {
    const body = await req.json()
    const {username, password, email, avatar}:IRegistrationInput = body
    const isEmailExist = await prisma.user.findFirst({
        where:{email:email}
    })

    if (isEmailExist) {
        return NextResponse.json({error:'Електоронна адреса уже викорстовується'}, {status:409} )
    }

    const hashed_password = await hash(password, 10)
    const new_user = await prisma.user.create({
        data:{
            username: username,
            password: hashed_password,
            email: email,
            avatar: avatar,
            role: 'user',
            cart:{
                create: {}
            }
        }
    })

    return NextResponse.json(new_user)
}

export async function PUT(req:NextRequest) {
    const body = await req.json()    
    console.log(body)
    const res = await prisma.user.update({
        where:{
            id: Number(body.id)
        },
        data:body
    })

    return NextResponse.json(res)
}

export async function DELETE(req:NextRequest) {
    try{
        const userId = req.nextUrl.searchParams.get('id')
        await prisma.user.delete({
            where:{
                id: Number(userId)
            }
        })

        return new Response(null)
    }
    catch(err){
        return NextResponse.json({message:err}, {status:500})
    }
}