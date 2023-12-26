
"use client"
import LogoutButton from '@/components/buttons/LogoutButton'
import Updates from '@/components/ui/Updates'
import { Update } from '@prisma/client'
import { FC } from 'react'

interface UpdateProps {
    update: Update[]
}

const Page: FC<UpdateProps> = ({update}) => {

  return (
    <>
      <div>admin dashboard work in progress...</div>
      <Updates updates={update} />
    </>

  )
}

export default Page