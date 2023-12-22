import db from "@/lib/db";
import next from "next";
import { getSession, useSession } from "next-auth/react";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();

        const { title, trainer, description, startDate, endDate, createdBy, updatedBy } = body;

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


        const trainings = await db.training.create({
            data: {
                title,
                trainer,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                createdBy,
                updatedBy
            }
        })

        return NextResponse.json(trainings)

    } catch (error) {
        console.log('[TRAININGS_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { trainingId: string } },
) {
    try {


        const training = await db.training.findMany({
            where: {
                id: params.trainingId,
            }
        })

        return NextResponse.json(training)

    } catch (error) {
        console.log('[TRAININGS_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}