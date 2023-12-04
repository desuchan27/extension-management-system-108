"use client"

import LoginForm from '@/components/forms/auth/admin/LoginForm'

import { useRouter } from 'next/navigation'
import { FC} from 'react'

interface PageProps {
}

const Page: FC<PageProps> = ({
}) => {

  const router = useRouter()
  
  return <div> <LoginForm /></div>
}

export default Page