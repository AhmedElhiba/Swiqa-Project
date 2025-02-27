
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { axiosClient } from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { STUDENT_DASHBOARD_ROUTE } from "../../router"
import { HttpStatusCode } from "axios"
import { Loader, Loader2 } from "lucide-react";


const formSchema = z.object({

  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(50),

})
export default function StudentLogin() {
  const navigate = useNavigate()
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'Ahmed@example.com',
      password: '123456789'
    },
  })
  const { setError, fromstate: isSubmitting } = form
  // 2. Define a submite  handler.
  const onSubmit = async values => {
    await axiosClient.get("/sanctum/csrf-cookie", {
       baseURL: import.meta.env.VITE_BACKEND_URL
    })
    const data = await axiosClient.post('/login', values).then(
      (value) => {
        if (value.status === 204 || value.status == HttpStatusCode.Ok) {
          window.localStorage.setItem('ACCESS_TOKEN','test')
          navigate(STUDENT_DASHBOARD_ROUTE)
        }
      }
    ).catch(({ response }) => {
      setError('email', {
        message: response.data.errors.email.join()
      })
    })
  }
  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email :</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
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
              <FormLabel>Password : </FormLabel>
              <FormControl>
                <Input type='password' placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader className={''} />}
          Submit 
        </Button>
      </form>
    </Form>
  </>

}