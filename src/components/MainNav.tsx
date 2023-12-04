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
            href: '/null1',
            label: 'Overview',
            active: pathName === '/null1'
        },
        {
            href: `/null2`,
            label: 'New Extension',
            active: pathName === `/null2`
        },
        {
            href: `/null3`,
            label: 'Logs',
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