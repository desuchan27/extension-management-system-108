import { FC } from 'react'
import Client from './components/Client'
import db from '@/lib/db'
import { ClientColumn } from './components/Columns'


const page = async ({ 
  params
} : {
  params: { trainingId: string }
}) => {

  const trainings = await db.training.findMany({
    where: {
      id: params.trainingId
    }
  })
  const formattedTrainings: ClientColumn[] = trainings.map((item) => ({
    id: item.id,
    title: item.title,
    startDate: item.startDate,
    endDate: item.endDate,
    createdBy: item.createdBy,
    updatedBy: item.updatedBy
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