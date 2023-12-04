"use client"

import { useRouter } from 'next/navigation';
import { FC } from 'react'
import { Button } from '../ui/button'

interface LogoutButtonProps {}

const LogoutButton: FC<LogoutButtonProps> = ({}) => {
  const router = useRouter();


  return <Button > Sign Out</Button>
}

export default LogoutButton;
