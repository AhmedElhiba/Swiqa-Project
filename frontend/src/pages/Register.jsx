import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import logoswiqa from "../images/swiqa.png"; // Add logo import

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For success message
  const [redirecting, setRedirecting] = useState(false); // To control redirect timing

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage(""); // Reset success message before submitting

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword, 
      });

      if (response.status === 204) {
        setSuccessMessage("Registration successful!"); 
        setRedirecting(true);
      }
    } catch (error) {
      console.error(error.response?.data || "Registration failed");
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (redirecting) {
      const timer = setTimeout(() => {
        navigate("/login"); 
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [redirecting, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Logo */}
      <img src={logoswiqa} alt="Logo" className="w-40 h-auto mb-6" />

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Create an Account</h1>
        {/* Success message */}
        {successMessage && (
          <p className="text-green-500 text-sm text-center mt-2">{successMessage}</p>
        )}
        {/* Error message */}
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <Input {...form.register("name")} type="text" placeholder="Enter your name" />
            <p className="text-red-500 text-xs">{form.formState.errors.name?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input {...form.register("email")} type="email" placeholder="Enter your email" />
            <p className="text-red-500 text-xs">{form.formState.errors.email?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input {...form.register("password")} type="password" placeholder="Enter your password" />
            <p className="text-red-500 text-xs">{form.formState.errors.password?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <Input {...form.register("confirmPassword")} type="password" placeholder="Confirm your password" />
            <p className="text-red-500 text-xs">{form.formState.errors.confirmPassword?.message}</p>
          </div>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-[rgb(62,123,39)] text-white font-semibold rounded-md hover:bg-[rgb(18,53,36)] transition duration-200"
          >
            {isSubmitting ? <Loader className="mr-2 animate-spin" /> : "Sign Up"}
          </Button>

          {/* Already have an account? */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account? <a href="/login" className="text-[rgb(62,123,39)] hover:underline">Log in</a>
          </p>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 w-full max-w-sm text-center text-xs text-gray-500">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
        </div>
        <p>© {new Date().getFullYear()} Swiqa. All rights reserved.</p>
      </footer>
    </div>
  );
}
