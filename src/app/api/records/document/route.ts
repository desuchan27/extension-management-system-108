import db from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();

        const { title, url, trainingId, createdBy } = body;

        if (!title) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!url) {
            return new NextResponse("Url is required", { status: 400 })
        }

        if (!trainingId) {
            return new NextResponse("Training is required", { status: 400 })
        }

        if (!createdBy) {
            return new NextResponse("Created By is required", { status: 400 })
        }

        const documents = await db.document.create({
            data: {
                title,
                url,
                trainingId,
                createdBy,
            }
        })

        return NextResponse.json(documents)

    } catch (error) {
        console.log('[DOCUMENTS_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { documentId: string } },
) {
    try {


        const document = await db.document.findMany({
            where: {
                id: params.documentId,
            }
        })

        return NextResponse.json(document)

    } catch (error) {
        console.log('[DOCUMENTS_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}