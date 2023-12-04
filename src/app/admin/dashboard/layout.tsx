import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'


const Layout = async ({ children }: { children: React.ReactNode }) => {

    const session = await getServerSession()
    if (!session || !session.user) {
        redirect('/login');
    }

    return (
        <>
            <Navbar />
            <div className='"flex-col"'>
                <div className='"flex-1 space-y-4 p-8 pt-6"'>
                        {children}
                </div>
            </div>
        </>
    )
}

export default Layout