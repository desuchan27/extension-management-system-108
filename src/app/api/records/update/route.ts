import db from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();

        const { title, description } = body;

        if (!title) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!description) {
            return new NextResponse("Description is required", { status: 400 })
        }


        const updates = await db.update.create({
            data: {
                title,
                description,
            }
        })

        return NextResponse.json(updates)

    } catch (error) {
        console.log('[UPDATES_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { updateId: string } },
) {
    try {


        const update = await db.update.findMany({
            where: {
                id: params.updateId,
            }
        })

        return NextResponse.json(update)

    } catch (error) {
        console.log('[UPDATES_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}