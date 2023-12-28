import db from "@/lib/db";
import next from "next";
import { getSession, useSession } from "next-auth/react";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();

        const { name, age, email, gender, trainingId, addedBy } = body;


        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!age) {
            return new NextResponse("Age is required", { status: 400 })
        }

        if (!trainingId) {
            return new NextResponse("Training is required", { status: 400 })
        }

        if (!addedBy) {
            return new NextResponse("Added By is required", { status: 400 })
        }


        const participant = await db.participant.create({
            data: {
                name,
                age,
                email,
                trainingId,
                gender,
                addedBy,
            }
        })

        return NextResponse.json(participant)

    } catch (error) {
        console.log('[PARTICIPANTS_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { participantId: string } },
) {
    try {


        const participant = await db.participant.findMany({
            where: {
                id: params.participantId,
            }
        })

        return NextResponse.json(participant)

    } catch (error) {
        console.log('[PARTICIPANTS_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}