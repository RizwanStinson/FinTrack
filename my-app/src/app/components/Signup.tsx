'use client'
import React, { useState } from 'react'
import { ISignup } from '../interfaces/interfaces'
import { signup } from '../services/signupService'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {}

function Signup({}: Props) {
     const router = useRouter();
    const [formData, setFormData ] = useState<ISignup>({
        userName:"",
        email:"",
        password:""
    })
     const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Form Data: ", formData)
        const getData = await signup(formData)
        const userId = getData.userId
        console.log("From Service: ", userId)
        // localStorage.setItem("userId", userId)
        if (getData) {
          router.push("/login");
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Signing up...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* <form onSubmit={handleSubmit}>
        <label>User Name</label>
        <input
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        <label>Password</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit"> Sign Up</button>
      </form> */}
    </div>
  );
}

export default Signup