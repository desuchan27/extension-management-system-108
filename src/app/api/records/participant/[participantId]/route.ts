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
    { params }: { params: { participantId: string, trainingId: string } }
) {
    try {
        const body = await req.json();

        const { name, age, email, gender, trainingId, addedBy } = body;

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!age) {
            return new NextResponse("Age is required", { status: 400 });
        }

        if (!trainingId) {
            return new NextResponse("Training is required", { status: 400 });
        }

        if (!addedBy) {
            return new NextResponse("Added By is required", { status: 400 });
        }

        if (!params.participantId) {
            return new NextResponse('Participant id is required', { status: 400 });
        }

        const participant = await db.participant.updateMany({
            where: {
                id: params.participantId,
            },
            data: {
                name,
                age,
                email,
                gender,
                trainingId,
                addedBy,
            },
        });

        return NextResponse.json(participant);
    } catch (error) {
        console.log('[PARTICIPANT_PATCH]', error);
        return new NextResponse('Internal server error', { status: 500 });
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