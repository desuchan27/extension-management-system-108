'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathName = usePathname()
    const params = useParams()

    const routes = [
        {
            href: '/admin/dashboard',
            label: 'Feed',
            active: pathName === '/admin/dashboard'
        },
        {
            href: `/admin/dashboard/trainings`,
            label: 'Records',
            active: pathName === `/admin/dashboard/trainings`
        },
        {
            href: `/null3`,
            label: 'Documents',
            active: pathName === `/null3`
        },
    ]
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        route.active ? "text.black dark:text-white" : "text-muted-foreground"
                    )}    
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}