import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Document } from '@prisma/client'
import { FC } from 'react'

interface DocumentDataProps {
  documentData: Document[]
}

const DocumentData: FC<DocumentDataProps> = ({
  documentData
}) => {
  return (
    <div className='mt-10'>
      <div className='mb-4'>
        <h1 className='text-xl font-bold '>{`Documents (${documentData.length})`}</h1>
      </div>
      <Separator />
      <div className='mt-4'>
        {documentData.length > 0 ? (
          documentData.map((document) => (
            <div key={document.id}>
              <h3>{document.title}</h3>
            </div>
          ))
        ) : (
          <p>No documents available</p>
        )}
      </div>
    </div>
  )
}

export default DocumentData