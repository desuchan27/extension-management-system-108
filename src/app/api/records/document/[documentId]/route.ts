import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(
    req: Request,
    { params }: { params: { documentId: string } }
) {
    try {

        if (!params.documentId) {
            return new NextResponse('Training id is required', { status: 400 })
        }

        const document = await db.document.deleteMany({
            where: {
                id: params.documentId,
            }
        })
        return NextResponse.json(document)
    } catch (error) {
        console.log('[DOCUMENT_DELETE]', error)
        return new NextResponse('Internal server error', { status: 500 })
    }
}