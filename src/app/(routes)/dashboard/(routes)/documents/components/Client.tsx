"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ClientColumn, Columns } from './Columns'
import { FC, useState } from 'react'
import { Plus, Upload } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { useParams, useRouter } from 'next/navigation'
import Modal from '@/components/ui/modal'
import DocumentForm from './DocumentForm'
import { Document, Training } from '@prisma/client'

interface ClientProps {
  data: ClientColumn[]
  initialData: Document | null
  training: Training[]
}

const Client: FC<ClientProps> = ({
  data,
  training
}) => {
  const router = useRouter()
   const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Reload the client page here
    router.refresh();
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Document Management (${data.length})`}
          description='view and manage training documents'
        />
        <Button onClick={handleModalOpen}>
          <Upload className='mr-4 h-4 w-4' />
          Upload
        </Button>
      </div>
      <Separator />
      <Modal title="Upload Document" description="Upload a new document" isOpen={isModalOpen} onClose={handleModalClose}>
        <DocumentForm trainings={training} onSuccess={handleModalClose} />
      </Modal>
      <div className='mb-0 py-0 px-0'>
        <p className='text-xs text-slate-600'>search by training title</p>
      </div>
      <DataTable columns={Columns} data={data} searchKey='training' />
    </>
  )
}

export default Client