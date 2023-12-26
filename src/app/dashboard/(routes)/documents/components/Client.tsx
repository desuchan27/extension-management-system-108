"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ClientColumn, Columns } from './Columns'
import { FC } from 'react'
import { Plus, Upload } from 'lucide-react'
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
          title={`Document Management (${data.length})`}
          description='view and manage training documents'
        />
        <Button onClick={() => router.push('/dashboard/documents/edit/new')} >
          <Upload className='mr-4 h-4 w-4' />
          Upload
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey='title' />
    </>
  )
}

export default Client