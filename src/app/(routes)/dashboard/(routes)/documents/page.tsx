import { FC } from 'react'
import Client from './components/Client'
import db from '@/lib/db'
import { ClientColumn } from './components/Columns'
import { format } from 'date-fns'


const page = async ({
  params
}: {
  params: { documentId: string, trainingId: string }
}) => {
  

  const documents = await db.document.findMany({
    where: {
      id: params.documentId
    },
    include: {
        training: true
    },
    orderBy: {
      createdAt: 'desc'
    },
  })


    const training = await db.training.findMany({
        where: {
            id: params.trainingId
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
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Client data={formattedDocuments} initialData={null} training={training} />
      </div>
    </div>
  )
}

export default page