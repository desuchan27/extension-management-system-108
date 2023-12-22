
import TrainingForm from './components/TrainingForm'
import db from '@/lib/db'


const page = async ({
  params
}: {
  params: { trainingId: string }
}) => {

  const training = await db.training.findUnique({
    where: {
      id: params.trainingId
    },
  })
  return (
    <div>
      <TrainingForm initialData={training}  />
    </div>
  )
}

export default page