import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../router";
import { HttpStatusCode } from "axios";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useUserContext } from "../../context/ClientContext";
import logoswiqa from "../../images/swiqa.png";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(50),
});

export default function ClientLogin() {
  const { login, setAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");  // State to hold the error message
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    setErrorMessage("");

    try {
      const value = await login(values.email, values.password);

      if (value.status === 204 || value.status === HttpStatusCode.Ok) {
        setAuthenticated(true);
        navigate(HOME_ROUTE);
      } else {

        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {

      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link to={HOME_ROUTE}>
        <img src={logoswiqa} alt="Swiqa Logo" className="w-40 h-auto mb-6 cursor-pointer" />
      </Link>

      {/* Login Box */}
      <div className="w-full max-w-sm bg-white p-8 border border-gray-300 rounded-lg shadow-xl">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-4">Sign in</h1>

        {/* Error message */}
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
        )}

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...form.register("email")}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[rgb(62,123,39)] focus:border-[rgb(62,123,39)]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              {...form.register("password")}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[rgb(62,123,39)] focus:border-[rgb(62,123,39)]"
            />
          </div>

          {/* Sign-in button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 text-white font-semibold bg-[rgb(62,123,39)] rounded-md hover:bg-[rgb(18,53,36)] transition duration-200"
          >
            {isSubmitting && <Loader className="mr-2 animate-spin" />}
            Sign in
          </Button>
        </form>

        {/* Forgot Password */}
        <div className="mt-3 text-sm text-center">
          <a href="#" className="text-[rgb(62,123,39)] hover:underline">
            Forgot your password?
          </a>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">New to Swiqa ?</span>
          </div>
        </div>

        {/* Create account */}
        <Button
          variant="outline"
          className="w-full py-2 text-[rgb(18,53,36)] border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200"
        >
          <a href="/register">Create an account</a>
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-8 w-full max-w-sm text-center text-xs text-gray-500">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
        <p>© {new Date().getFullYear()} Swiqa. All rights reserved.</p>
      </footer>
    </div>
  );
}
