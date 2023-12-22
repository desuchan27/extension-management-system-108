import db from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(
    req: Request,
    { params }: { params: { trainingId: string } }
) {
    try {
        const training = await db.training.findUnique({
            where: {
                id: params.trainingId,
            }
        })

        return NextResponse.json(training)
    } catch (error) {
        console.log('[TRAINING_GET]', error)
        return new NextResponse('Internal server error', { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { trainingId: string } }
) {
    try {
        const body = await req.json()

        const { title, trainer, description, startDate, endDate, updatedBy } = body

        if (!title) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!trainer) {
            return new NextResponse("Trainer is required", { status: 400 })
        }

        if (!description) {
            return new NextResponse("Description is required", { status: 400 })
        }

        if (!startDate) {
            return new NextResponse("Start Date is required", { status: 400 })
        }

        if (!endDate) {
            return new NextResponse("End Date is required", { status: 400 })
        }

        if (!params.trainingId) {
            return new NextResponse('Training id is required', { status: 400 })
        }


        const training = await db.training.updateMany({
            where: {
                id: params.trainingId,
            },
            data: {
                title,
                trainer,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                updatedBy
            }
        })
        return NextResponse.json(training)
    } catch (error) {
        console.log('[TRAINING_PATCH]', error)
        return new NextResponse('Internal server error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { trainingId: string } }
) {
    try {

        if (!params.trainingId) {
            return new NextResponse('Training id is required', { status: 400 })
        }

        const training = await db.training.deleteMany({
            where: {
                id: params.trainingId,
            }
        })


        return NextResponse.json(training)
    } catch (error) {
        console.log('[TRAINING_DELETE]', error)
        return new NextResponse('Internal server error', { status: 500 })
    }
}