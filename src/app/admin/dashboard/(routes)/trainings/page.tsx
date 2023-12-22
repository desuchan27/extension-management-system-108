import { FC } from 'react'
import Client from './components/Client'
import db from '@/lib/db'
import { ClientColumn } from './components/Columns'
import { format } from 'date-fns'


const page = async ({
  params
}: {
  params: { trainingId: string }
}) => {

  const trainings = await db.training.findMany({
    where: {
      id: params.trainingId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  const formattedTrainings: ClientColumn[] = trainings.map((item) => ({
    title: item.title,
    trainer: item.trainer,
    startDate: format(item.startDate, 'MMM do, yyy h:mm a'),
    endDate: format(item.endDate, 'MMM do, yyy h:mm a'),
    createdBy: item.createdBy,
    updatedBy: item.updatedBy,
    createdAt: format(item.createdAt, 'MMM do, yyy h:mm a'),
  }))


  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Client data={formattedTrainings} />
      </div>
    </div>
  )
}

export default page