"use client"

import * as z from "zod"
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Training } from '@prisma/client'
import { Trash } from 'lucide-react'
import { FC, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import AlertModal from "@/components/modals/AlertModal"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"

const formSchema = z.object({
  title: z.string().min(1),
  trainer: z.string().min(1),
  description: z.string().min(20),
  startDate: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
    message: 'Invalid date'
  }),
  endDate: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
    message: 'Invalid date'
  }),
  createdBy: z.string().min(1),
  updatedBy: z.string().min(1),
})

interface TrainingFormProps {
  initialData: Training | null
}

type TrainingFormValues = z.infer<typeof formSchema>

const TrainingForm: FC<TrainingFormProps> = ({
  initialData,

}) => {
  const params = useParams()
  const router = useRouter()

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const { data: session } = useSession();
  const name = session?.user?.name


  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit Training' : 'New Training'
  const description = initialData ? 'Edit your Training' : 'Create a new Training'
  const toastMessage = initialData ? 'Training updated succesfully' : 'Training created succesfully'
  const action = initialData ? 'Save Changes' : 'Create'

  const form = useForm<TrainingFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: initialData 
    ? {
        ...initialData,
        startDate: initialData.startDate.toISOString().split('T')[0],
        endDate: initialData.endDate.toISOString().split('T')[0],
      }
    : {
        title: '',
        trainer: '',
        description: '',
        startDate: currentDate.toString().split('T')[0],
        endDate: currentDate.toString().split('T')[0],
        createdBy: name || '',
        updatedBy: name || '',
      }
})

  const onSubmit = async (data: TrainingFormValues) => {
    try {
      setLoading(true)

      
      if (initialData) {
        console.log(data)
        await axios.patch(`/api/records/training/${params.trainingId}`, data)
      } else {
        await axios.post(`/api/records/training`, data)
      }
      router.refresh()
      router.push(`/admin/dashboard/trainings`)
      toast.success(toastMessage)
      console.log('test')
    } catch (error) {
      console.log(data)
      console.log(error)
      toast.error("Something went wrong while saving your changes")
    } finally {
      console.log('test2')
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/records/training/${params.trainingId}`)
      router.refresh()
      router.push(`/admin/dashboard/trainings`)
      toast.success("Training deleted.")
      console.log('test')
    } catch (error) {
      console.log(error)
      toast.error("Server Error")
    } finally {
      console.log('test2')
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
      <div className='flex items-center justify-between'>
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button

            disabled={loading}
            variant='destructive'
            size='icon'
            onClick={() => {
              setOpen(true)
            }}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >

          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Training title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='trainer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trainer</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Trainer under"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={loading}
                      placeholder="Start Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={loading}
                      placeholder="Start Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Training description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className='ml-auto' type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  )
}

export default TrainingForm