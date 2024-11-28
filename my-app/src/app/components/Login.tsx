"use client";
import React, { useState } from "react";
import { ILogin } from "../interfaces/interfaces";
import { login } from "../services/signupService";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";

type Props = {};
function Login({}: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const getData = await login(formData);

      if (getData.message === "Email does not exist. Please sign up first.") {
        toast.error(getData.message); 
      } else if (getData.message === "Incorrect password. Please try again.") {
        toast.error(getData.message); 
      } else if (getData.message === "Login successful") {
        toast.success("Login successful! Redirecting..."); 
        const userId = getData.user.userId;
        localStorage.setItem("userId", userId);
        setTimeout(() => router.push("/landing"), 1500); 
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-4 sm:p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-blue-600">
            FinTracker
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">Log in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
                className="w-full"
              />
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Log In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/" className="text-blue-600 hover:underline font-semibold">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
