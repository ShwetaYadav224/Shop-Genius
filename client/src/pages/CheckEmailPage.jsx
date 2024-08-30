import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import { 
  Button,
  Typography,
  Avatar,
  Input
 } from "@material-tailwind/react";

const CheckEmailPage = () => {
  const [data,setData] = useState({
    email : "",
  })
  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.VITE_SERVER_API}/api/email`

    try {
        const response = await axios.post(URL,data)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              email : "",
            })
            navigate('/password',{
              state : response?.data?.data
            })
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
  }

  const googlelogin = () => {

  }

  const switchpage = () => {
    navigate("/register")
  }

  return (
    <>
    <div className='mx-auto mt-4 md:mt-6 lg:mt-0 mb-8 p-2 md:p-4 lg:p-8 mt-10 mb-10'>
    <div className='flex flex-col md:flex-row justify-between items-center'>
    <div className='flex-1 md:w-1/2 rounded-lg p-1 ml-0 md:ml-0 lg:ml-9 '>
        
        <Typography 
        color="gray" 
        variant="paragraph" 
        className="mb-6 text-left text-lg md:text-base lg:text-lg">

            Hello Again!
        
        </Typography>

        <div className='w-fit mx-auto mb-2'>
                <PiUserCircle
                  size={80}
                />
            </div>

        <Input 
        type='email'
        id='email'
        name='email'
        size='lg'
        label="Input Large"
        value={data.email}
        onChange={handleOnChange}
        required 
        />
        <Button 
          size='lg'
          onClick={handleSubmit}
        >
          Continue
        </Button>

        <Button onClick={googlelogin}>Login With Google</Button>
        
        <Typography variant='small' className='mt-4 flex justify-center'>
          <p>Already have an account?</p>
          <Typography variant='small' className='ml-1 font-bold cursor-pointer' onClick={switchpage}>Log In</Typography>
        </Typography>

    </div>
    </div>
  </div>
    </>
  )
}

export default CheckEmailPage
