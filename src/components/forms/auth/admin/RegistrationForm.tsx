"use client"

import toast from "react-hot-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface RegistrationFormProps {

}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(8, { message: "Username minimum of 8 characters" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string()
    .min(8, { message: "Password minimum of 8 characters" })
    .refine(password => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter" }),
})

const RegistrationForm: FC<RegistrationFormProps> = ({

}) => {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
      const data = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

      if (!data) {
        console.log(data)
        toast.error("Server error")
      } else {
        console.log(data)
        router.push('/login')
        toast.success("Registration successful")
      }

    } catch (error) {
      console.log("error", error)
      toast.error("Server error")
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>

      <div className="w-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Dela Cruz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="MangJuan143" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder="juandela.cruz@carsu.edu.ph" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="P*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='min-w-full min-h-[3rem]'
              type="submit"
            >
              Register
            </Button>
            <p className="text-[0.8rem] text-muted-foreground text-center">
              existing user? {" "}
              <span>
                <Link
                  className="font-semibold text-[#13a34b] hover:text-[#5cc484] transition-colors"
                  href={"/login"}
                >
                  Login
                </Link>
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default RegistrationForm