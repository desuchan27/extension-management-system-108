"use client"

import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Document, Training } from '@prisma/client'
import { File, Paperclip, Upload } from 'lucide-react'
import { FC, useState } from 'react'
import { ClientColumn, Columns } from './Columns'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Modal from '@/components/ui/modal'
import DocumentForm from './DocumentForm'

interface DocumentDataProps {

  documentData: Document[]
  data: ClientColumn[]
  training: Training[]
}

const DocumentData: FC<DocumentDataProps> = ({
  documentData, data, training
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
    <div className='mt-10'>
      <div className="mb-4 flex justify-between">
        <Heading
          title={`Documents (${data.length})`}
          description='view and manage training documents'
        />
        <Button onClick={handleModalOpen}>
          <Upload className='mr-4 h-4 w-4' />
          Upload
        </Button>
      </div>
      <Modal title="Upload Document" description="Upload a new document" isOpen={isModalOpen} onClose={handleModalClose}>
        <DocumentForm trainings={training} onSuccess={handleModalClose} />
      </Modal>

      <Separator />
      <DataTable columns={Columns} data={data} searchKey='title' />
    </div>
  )
}

export default DocumentData