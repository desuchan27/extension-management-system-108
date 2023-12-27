"use client"

import { FC, useState } from 'react'
import { ClientColumn } from './Columns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { AppWindow, Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import AlertModal from '@/components/modals/AlertModal'
interface CellActionProps {
    data: ClientColumn
}

const CellAction: FC<CellActionProps> = ({
    data,
}) => {

    const router = useRouter()
    const params = useParams()

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const onOpen = (id: string) => {
        router.push(`/dashboard/trainings/${id}`);
    }

    const onDelete = async () => {
    try {
        setLoading(true);
        await axios.delete(`/api/records/training/${data.id}`);
        router.refresh();
        toast.success("Training deleted.");
    } catch (error) {
        toast.error("Something is wrong. Please try again later.");
    } finally {
        setLoading(false);
        setOpen(false);
    }
};


    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        className='h-8 w-8 p-0'
                    >
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onOpen(data.id)}>
                        <AppWindow className='mr-2 h-4 w-4' />
                        Open Training
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/trainings/edit/${data.id}`)}>
                        <Edit className='mr-2 h-4 w-4' />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className='text-red-600'
                        onClick={() => setOpen(true)}
                    >
                        <Trash className='mr-2 h-4 w-4' />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction