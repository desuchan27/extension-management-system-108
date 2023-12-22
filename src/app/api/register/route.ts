import db from '@/lib/db'
import * as bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'


export async function POST(
    req: Request
) {
    const body = await req.json()
    const { name, username, email, password } = body
    console.log()
    try {

        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }

        if (!username) {
            return new NextResponse('Username is required', { status: 400 })
        }

        if (!email) {
            return new NextResponse('Email is required', { status: 400 })
        }

        if (!password) {
            return new NextResponse('Password is required', { status: 400 })
        }

        const admin = await db.admin.create({
            data: {
                name,
                username,
                email,
                password: await bcrypt.hash(password, 10),
            },
        })
        return NextResponse.json(admin)
    } catch (error) {
        console.log(error)
        return new NextResponse('internal server error', { status: 500 })
    }
}