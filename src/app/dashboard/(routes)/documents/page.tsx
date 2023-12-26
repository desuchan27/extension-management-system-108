import { FC } from 'react'
import Client from './components/Client'
import db from '@/lib/db'
import { ClientColumn } from './components/Columns'
import { format } from 'date-fns'


const page = async ({
  params
}: {
  params: { documentId: string }
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
  
  const formattedDocuments: ClientColumn[] = documents.map((item) => ({
    id: item.id,
    title: item.title,
    training: item.training.title,
    createdBy: item.createdBy,
    createdAt: format(item.createdAt, 'MMM do, yyy h:mm a'),
  }))


  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Client data={formattedDocuments} />
      </div>
    </div>
  )
}

export default page