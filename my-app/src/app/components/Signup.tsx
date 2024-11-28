"use client";
import React, { useEffect, useState } from "react";
import { ISignup } from "../interfaces/interfaces";
import { signup } from "../services/signupService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

type Props = {};
function Signup({}: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<ISignup>({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Form Data: ", formData);
      const getData = await signup(formData);
      const userId = getData.userId;
      console.log("From Service: ", userId);

      if (getData.message === "Email already exists. Please log in.") {
        toast.error(getData.message); 
      } else {
        toast.success("Signup successful! Redirecting to login..."); 
        setTimeout(() => router.push("/login"), 1500); 
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred. Please try again."); 
    }
  };

   useEffect(() => {
     if (typeof window !== "undefined" && "serviceWorker" in navigator) {
       navigator.serviceWorker
         .register("/service-worker.js")
         .then(() => {
           console.log("Service Worker registered");
         })
         .catch((err) => {
           console.error("Service Worker registration failed:", err);
         });
     }
   }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-4 sm:p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-blue-600">
            Fin_Track
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">Sign up to get started</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                className="w-full"
              />
            </div>

            <Button className="w-full" type="submit">
              <span className="flex items-center justify-center">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </span>
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Log in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
