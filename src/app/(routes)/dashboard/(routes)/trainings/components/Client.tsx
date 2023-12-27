"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ClientColumn, Columns } from './Columns'
import { FC } from 'react'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { useParams, useRouter } from 'next/navigation'

interface ClientProps {
  data: ClientColumn[] 
}

const Client: FC<ClientProps> = ({
  data
}) => {
  const router = useRouter()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Training Record (${data.length})`}
          description='view and manage training records'
        />
        <Button onClick={() => router.push('/dashboard/trainings/edit/new')} >
          <Plus className='mr-4 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey='title' />
    </>
  )
}

export default Client