"use client"

import { FC } from 'react'

import toast from "react-hot-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
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
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react';

interface LoginFormProps {

}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter your email" }),
  password: z.string()
    .min(8, { message: "Password minimum of 8 characters" })
    .refine(password => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter" }),
})

const LoginForm: FC<LoginFormProps> = ({ }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (data && data.error) {
      console.error('Error during signIn:');
      toast.error('something is wrong while signing in');
    } else {
      toast.success('Logged in successfully!');
      router.push('/admin/dashboard');
    }
  } catch (error) {
    console.error('Error during signIn:', error);
    toast.error("Server error");
  }
  
};


  return (
    <div className='flex min-h-screen items-center justify-center'>

      <div className="w-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder="enter your email" {...field} />
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
              className='min-w-full'
              type="submit"
            >
              Login
            </Button>
            <p className="text-[0.8rem] text-muted-foreground text-center">
              existing user? {" "}
              <span>
                <Link
                  className="font-semibold text-[#13a34b] hover:text-[#5cc484] transition-colors"
                  href={"/registration"}
                >
                  Register
                </Link>
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default LoginForm