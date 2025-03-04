
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { axiosClient } from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { HOME_ROUTE,} from "../../router"
import { HttpStatusCode } from "axios"
import { Loader, Loader2 } from "lucide-react";
import React from "react";
import { useUserContext } from "../../context/ClientContext"


const formSchema = z.object({

  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(50),

})  
export default function ClientLogin() {
  // 1. Define your form.
  const {login,setAuthenticated} =useUserContext()
  const navigate= useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'Ahmed@example.com',
      password: '123456789'
    },
  })
  
  const { formState: { isSubmitting }, setError } = form;


  const onSubmit = async values => {
    await  login(values.email , values.password).then(
                  (value) => {
                    if (value.status === 204 || value.status == HttpStatusCode.Ok) {
                        setAuthenticated(true)
                      navigate(HOME_ROUTE)
                    }
                })
    // setError('email', {
    //   message: response.data.errors.email.join()
    // })
  }
  return <>
 <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold text-gray-700">Email :</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                {...field}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m8 8h4m0-4h-4m0-8h4m4 0a9 9 0 11-9 9 9 9 0 019-9z" />
                </svg>
              </div>
            </div>
          </FormControl>
          <FormMessage className="text-sm text-red-500 mt-2" />
        </FormItem>
      )}
    />
    
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold text-gray-700">Password :</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter your password"
                {...field}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12l-3 3-3-3M12 9V4m0 0a9 9 0 1118 0h-2a7 7 0 10-14 0h-2a9 9 0 1118 0z" />
                </svg>
              </div>
            </div>
          </FormControl>
          <FormMessage className="text-sm text-red-500 mt-2" />
        </FormItem>
      )}
    />
    
    <div className="flex justify-between items-center">
      <div className="flex items-center text-sm text-gray-600">
        <input type="checkbox" className="mr-2" />
        Remember me
      </div>
      <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
    </div>
    
    <Button
      disabled={isSubmitting}
      type="submit"
      className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition duration-200"
    >
      {isSubmitting && <Loader className="mr-2" />}
      Submit
    </Button>
  </form>
</Form>

  </>

}