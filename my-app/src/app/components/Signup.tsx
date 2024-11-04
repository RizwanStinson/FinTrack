'use client'
import React, { useState } from 'react'
import { ISignup } from '../interfaces/interfaces'
import { signup } from '../services/signupService'

type Props = {}

function Signup({}: Props) {
    const [formData, setFormData ] = useState<ISignup>({
        userName:"",
        email:"",
        password:""
    })

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
        localStorage.setItem("userId", userId)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input name='userName' value={formData.userName} onChange={handleChange}/>
            <label>Email</label>
            <input name='email' value={formData.email} onChange={handleChange}/>
            <label>Password</label>
            <input name='password' value={formData.password} onChange={handleChange}/>
            <button type='submit'> Sign Up</button>
        </form>
    </div>
  )
}

export default Signup