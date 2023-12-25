"use client"

import Link from 'next/link'
import { MainNav } from './MainNav'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'


const Navbar = ({ }) => {
    const { data: session, status: loading } = useSession();

    const handleSignOut = async () => {
        try{
            await signOut({ callbackUrl: `${window.location.origin}/login` });
        redirect('/login');
        } catch(error) {
            console.log(error)
        }
    
    }

    return (
        <div className='border-b'>
            <div className="flex h-16 items-center px-4 justify-between">
                <Link href={'/dashboard'}>
                    <h1 className='font-semibold text-lg'>ADMIN DASHBOARD</h1>
                </Link>
                <MainNav className='m-6' />
                <div className="space-x-4">
                    <span className='text-sm'>{session?.user?.name}</span>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar