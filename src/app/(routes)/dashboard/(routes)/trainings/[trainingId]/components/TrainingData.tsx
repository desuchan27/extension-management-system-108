"use client"

import { Badge } from '@/components/ui/badge';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Training } from '@prisma/client'
import { Calendar, CalendarIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react'

interface TrainingDataProps {
  trainingData: Training | null
}

const TrainingData: FC<TrainingDataProps> = ({ trainingData }) => {

  const router = useRouter()
  const params = useParams()

  const startDate = trainingData?.startDate ? new Date(trainingData.startDate).toLocaleDateString() : '';
  const endDate = trainingData?.endDate ? new Date(trainingData.endDate).toLocaleDateString() : '';



  return (
    <div className='h-full'>
      <span className='flex text-xs text-slate-500 space-x-2 mt-2 mb-2'>
        <p
          onClick={() => router.push('/dashboard/trainings')}
          className='cursor-pointer hover:text-primary'
        >
          Records
        </p>
        <p>/</p>
        <p
          onClick={() => router.push(`/dashboard/trainings/${params.trainingId}`)}
          className='cursor-pointer hover:text-primary'
        >
          {trainingData?.title || ''}
        </p>
      </span>
      <div className='mb-4'>
        <Heading
          title={trainingData?.title || ''}
          description='view training details'
        />
      </div>
      <Separator />
      <div className='mt-4 mb-4'>
        <div className='flex items-center space-x-4 justify-end'>
          <Badge variant='secondary'>
            <CalendarIcon className='font-bold' />
            <span className='ml-2'>start: {startDate}</span>
          </Badge>
          <Badge variant='secondary'>
            <CalendarIcon className='font-bold' />
            <span className='ml-2'>end: {endDate}</span>
          </Badge>
        </div>
        <div className="space-y-4">
          <h3 className='font-semibold'>Trainer:</h3>
          <p>{trainingData?.trainer}</p>
          <h3 className='font-semibold'>Description: </h3>
          <p>{trainingData?.description}</p>
        </div>
      </div>
      <Separator />
    </div>

  )
}

export default TrainingData