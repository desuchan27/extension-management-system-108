"use client"

import * as z from "zod"
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Document, Training } from '@prisma/client'
import { Trash, Upload } from 'lucide-react'
import { FC, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import AlertModal from "@/components/modals/AlertModal"
import { useSession } from "next-auth/react"
import { UploadButton, UploadDropzone } from "@/utils/uploadthing"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



const formSchema = z.object({
    name: z.string().min(1),
    age: z.coerce.number().min(1),
    email: z.string().optional(),
    gender: z.string().min(1),
    trainingId: z.string().min(1),
    addedBy: z.string().min(1),
})

interface ParticipantFormProps {
    onSuccess: () => void
    trainingData: Training | null
}

type ParticipantFormValues = z.infer<typeof formSchema>

const ParticipantForm: FC<ParticipantFormProps> = ({
    onSuccess
}) => {

    const params = useParams()
    const router = useRouter()
    const getTrainingId = params.trainingId as string;

    const { data: session } = useSession();
    const name = session?.user?.name;

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<ParticipantFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            age: 0,
            email: '',
            gender: '',
            trainingId: getTrainingId || '',
            addedBy: name || '',
        }
    })

    const onSubmit = async (data: ParticipantFormValues) => {
        try {
            setLoading(true)

            
            /*    const updateMessage = initialData
            ? `${initialData.createdBy} added a new document to ${training?.title} named ${initialData.title}`
            : `${form.getValues('createdBy')} added a new file to ${form.getValues('title')}`;
                */


            await axios.post(`/api/records/participant`, data)
            router.refresh()
            router.push(`/dashboard/trainings/${params.trainingId}`)
            toast.success('Participant added succesfully')
            onSuccess()
        } catch (error) {


            toast.error("Something went wrong while saving your changes")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/records/participant/${params.participantId}`)
            router.refresh()
            router.push(`/dashboard/trainings/${params.trainingId}`)
            toast.success("Participant removed.")
        } catch (error) {
            toast.error("Something is wrong. Please try again later.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <Separator />
            <div className="mb-2 mt-2" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email (opt)</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-x-2">
                        <FormField
                            control={form.control}
                            name='age'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='gender'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select Gender"
                                                />
                                            </ SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectContent>
                                    </ Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Separator />
                    <Button disabled={loading} className='ml-auto w-full' type="submit">
                        Save
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default ParticipantForm