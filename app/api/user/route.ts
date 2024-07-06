import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json(); 
        const {email, username, password} = body;
        
        const existingUserByEmail = await prisma.user.findUnique({
            where: {email: email}
        });
        if (existingUserByEmail) {
            return NextResponse.json({user: null, message: 'Email already exists'}, {status: 409});
        }

        const existingUserByUsername = await prisma.user.findUnique({
            where: {username: username}
        });
        if (existingUserByUsername) {
            return NextResponse.json({user: null, message: 'User with this username already exists'}, {status: 409});
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })


        return NextResponse.json({ user: newUser, message: "User created successfully"}, {status: 201});
    } catch(error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}