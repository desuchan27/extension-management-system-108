
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast"

export default async function RegistrationLayout({
    children,
} : {
    children: React.ReactNode
}) {

    const session = await getServerSession()
    
    if (session && session.user) {
        redirect('/dashboard');
    }
    return (
        <>
            <Toaster 
                position="top-center"
                reverseOrder={false}
            />
            {children}       
        </>
    )
}