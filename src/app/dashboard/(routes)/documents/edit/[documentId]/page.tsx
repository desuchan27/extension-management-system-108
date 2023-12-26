import db from '@/lib/db'
import DocumentForm from './components/DocumentForm'

const page = async ({
    params   
}: {
    params: {documentId: string, trainingId: string}
}) => {

    const document = await db.document.findUnique({
        where: {
            id: params.documentId
        }
    })

    const training = await db.training.findMany({
        where: {
            id: params.trainingId
        }
    })

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <DocumentForm initialData={document} trainings={training} />
        </div>
    </div>
  )
}

export default page