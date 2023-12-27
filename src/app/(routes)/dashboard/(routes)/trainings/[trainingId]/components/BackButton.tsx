'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface BackButtonProps {
  
}

const BackButton: FC<BackButtonProps> = ({}) => {

    const router = useRouter()
    
  return <Button onClick={() => router.push('/dashboard/trainings')}><ArrowLeftSquare /></Button>
}

export default BackButton