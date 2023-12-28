
import { FC } from 'react'
import TrainingData from './components/TrainingData'
import db from '@/lib/db'
import DocumentData from './components/DocumentData'
import ParticipantData from './components/ParticipantData'
import { ClientColumn } from './components/Columns'
import { format } from 'date-fns'

interface pageProps {

}

const page = async ({
    params
}: {
    params: { trainingId: string, documentId: string }
}) => {

    const training = await db.training.findUnique({
        where: {
            id: params.trainingId
        },
        include: {
            documents: true,
            participants: true,
        }
    })

    const participant = await db.participant.findMany({
        where: {
            trainingId: params.trainingId
        }
    })

    const documents = await db.document.findMany({
        where: {
            trainingId: params.trainingId
        },
        include: {
            training: true
        },
        orderBy: {
            createdAt: 'desc'
        },
    })

    const trainings = await db.training.findMany({
        include: {
            documents: true
        }
    })

    const formattedDocuments: ClientColumn[] = documents.map((item) => ({
        id: item.id,
        title: item.title,
        training: item.training.title,
        createdBy: item.createdBy,
        createadAt: format(new Date(item.createdAt), 'MM/dd/yyyy'),
        url: item.url
    }))

    return (
        <div className='bg-white w-full h-screen'>
            <div className="hidden md:flex gap-x-4 justify-center">
                <div className="md:w-2/3 lg:w-4/5">
                    <div>
                        <TrainingData trainingData={training} />
                    </div>
                    <div>
                        {training && <DocumentData documentData={training.documents} data={formattedDocuments} training={trainings} />}
                    </div>
                </div>
                <div className="md:w-1/3 lg:w-1/5">
                    <ParticipantData participantData={participant} trainingData={training} />
                </div>
            </div>
        </div>
    )
}

export default page