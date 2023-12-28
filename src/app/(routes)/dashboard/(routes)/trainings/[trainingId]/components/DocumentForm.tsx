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
    title: z.string().min(1),
    url: z.string().min(1),
    trainingId: z.string().min(1),
    createdBy: z.string().min(1),
})

interface DocumentFormProps {
    trainings: Training[]
    onSuccess: () => void
}

type UploadFileResponse = {
    url: string; // Add this line if 'url' is a property in your response
    // Add other properties if they exist in your actual response
    uploadedBy?: string;
};

type DocumentFormValues = z.infer<typeof formSchema>

const DocumentForm: FC<DocumentFormProps> = ({
    trainings,
    onSuccess
}) => {


    const params = useParams()
    const router = useRouter()

    const { data: session } = useSession();
    const name = session?.user?.name;


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<DocumentFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            url: '',
            trainingId: '',
            createdBy: name || '',
        }
    })

    const onSubmit = async (data: DocumentFormValues) => {

        try {
            setLoading(true)

            const { trainingId } = params

            data.trainingId = trainingId as string;


            /*    const updateMessage = initialData
            ? `${initialData.createdBy} added a new document to ${training?.title} named ${initialData.title}`
            : `${form.getValues('createdBy')} added a new file to ${form.getValues('title')}`;
                */


            await axios.post(`/api/records/document`, data)
            router.refresh()
            router.push(`/dashboard/training/${params.trainingId}`)
            toast.success('Document Added Succesfully')
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
            await axios.delete(`/api/records/document/${params.documentId}`)
            router.refresh()
            router.push(`/dashboard/training/${params.trainingId}`)
            toast.success("Document deleted.")
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
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {form.getValues('title') && (
                        <FormField
                            control={form.control}
                            name='url'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PDF Document</FormLabel>
                                    <FormControl>
                                        <UploadDropzone
                                            endpoint="pdfUploader"
                                            onClientUploadComplete={(res: UploadFileResponse[]) => {
                                                // Do something with the response
                                                console.log("Files: ", res);

                                                // Assuming `title` is required
                                                if (form.getValues('title')) {
                                                    const name = session?.user?.name;
                                                    // You can now make a POST request with title, trainingId, and url
                                                    const postData = {
                                                        title: form.getValues('title'),
                                                        trainingId: params.trainingId, // Automatically include the trainingId
                                                        url: res[0].url, // Assuming you want the first file's URL
                                                        createdBy: name || '', // Include the createdBy field
                                                    };

                                                    axios.post('/api/records/document', postData)
                                                        .then((response) => {
                                                            console.log('Upload successful:', response);
                                                            toast.success('Uploaded successfully');
                                                            router.push(`/dashboard/trainings/${params.trainingId}`);
                                                        })
                                                        .catch((error) => {
                                                            console.error('Error during upload:', error);
                                                        });
                                                } else {
                                                    console.warn('Title is required before uploading.');
                                                }
                                            }}
                                            onUploadError={(error: Error) => {
                                                // Do something with the error.
                                                toast.error(`ERROR! ${error.message}`);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}


                </form>
            </Form>
            <Separator />
        </>
    )
}

export default DocumentForm