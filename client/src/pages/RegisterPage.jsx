import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';

import { 
  Button,
  Typography,
  Input
 } from "@material-tailwind/react";

const RegisterPage = () => {
  const [ isRegisterOpen, setRegisterOpen ] = useState(true);
  const [ isFullNameOpen, setFullNameOpen ] = useState(false);
  const [ isEmailOpen, setEmailOpen ] = useState(false);
  const [ isPhoneOpen, setPhoneOpen ] = useState(false);
  const [ isPasswordOpen, setPasswordOpen ] = useState(false);
  
  const [data,setData] = useState({
    name : "",
    email : "",
    password : "",
    profile_pic : ""
  })
  const [uploadPhoto,setUploadPhoto] = useState("")
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

  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)

    setUploadPhoto(file)

    setData((preve)=>{
      return{
        ...preve,
        profile_pic : uploadPhoto?.url
      }
    })
  }
  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.VITE_SERVER_API}/api/register`

    try {
        const response = await axios.post(URL,data)
        console.log("response",response)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              name : "",
              email : "",
              password : "",
              profile_pic : ""
            })

            navigate('/email')

        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    console.log('data',data)
  }

  const googlelogin = () => {

  }

  const switchpage = () => {
    navigate("/email")
  }

  const moveNext = () => {
      if(isRegisterOpen) {
          setFullNameOpen(!isFullNameOpen);
          setRegisterOpen(!isRegisterOpen);
      }
      else if(isFullNameOpen) {
          setFullNameOpen(!isFullNameOpen);
          setEmailOpen(!isEmailOpen);
      }
      else if(isEmailOpen) {
          setEmailOpen(!isEmailOpen);
          setPhoneOpen(!isPhoneOpen);
      }
      else if(isPhoneOpen) {
          setPhoneOpen(!isPhoneOpen);
          setPasswordOpen(!isPasswordOpen);
      }
  };

  const moveBack = () => {
      if(isPasswordOpen) {
          setPasswordOpen(!isPasswordOpen);
          setPhoneOpen(!isPhoneOpen);
      }
      else if(isPhoneOpen) {
          setPhoneOpen(!isPhoneOpen);
          setEmailOpen(!isEmailOpen);
      }
      else if(isEmailOpen) {
          setEmailOpen(!isEmailOpen);
          setFullNameOpen(!isFullNameOpen);
      }
      else if(isFullNameOpen) {
        setFullNameOpen(!isFullNameOpen);
        setRegisterOpen(!isRegisterOpen);
    }
  };

  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

            {
              isRegisterOpen && (
                <div>
                  <Button 
                    onClick={moveNext}
                  >Create An Account</Button>
                  <Button onClick={googlelogin}>Sign Up With Google</Button>
                  <Typography variant='small' className='mt-4 flex justify-center'>
                    <p>Already have an account?</p>
                    <Typography variant='small' className='ml-1 font-bold cursor-pointer' onClick={switchpage}>Log In</Typography>
                  </Typography>
                </div>
              )
            }

            {
              isFullNameOpen && (
                  <div>
                    <Input 
                      type='text'
                      id='name'
                      name='name'
                      size='lg'
                      label="Full "
                      value={data.name}
                      onChange={handleOnChange}
                      required
                    />
                    <div>
                      <Button
                        size='lg'
                        variant='outlined'
                        onClick={moveBack}
                      >
                        Back
                      </Button>
                      <Button 
                        size='lg'
                        onClick={moveNext}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
              )
            }

            {
              isEmailOpen && (
                  <div>
                    <Input 
                      type='email'
                      id='email'
                      name='email'
                      size='lg'
                      label="Email"
                      value={data.email}
                      onChange={handleOnChange}
                      required
                    />
                    <div>
                      <Button
                        size='lg'
                        variant='outlined'
                        onClick={moveBack}
                      >
                        Back
                      </Button>
                      <Button
                        size='lg'
                        onClick={moveNext} 
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
              )
            }

            { 
              isPhoneOpen && (
                  <div>
                    <Input 
                      type='phone'
                      id='phone'
                      name='phone'
                      size='lg'
                      label="Phone"
                      value={data.phone}
                      onChange={handleOnChange}
                      required
                    />
                    <div>
                      <Button
                        size='lg'
                        variant='outlined'
                        onClick={moveBack}
                      >
                        Back
                      </Button>
                      <Button
                        size='lg'
                        onClick={moveNext} 
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
              )
            }

            {
              isPasswordOpen && (
                  <div>
                      <Input 
                        type='password'
                        id='password'
                        name='createdspassword'
                        size='lg'
                        label="Create Password"
                        value={data.createdpassword}
                        onChange={handleOnChange}
                        required
                      />
                      
                      <Input 
                        type='password'
                        id='password'
                        name='password'
                        size='lg'
                        label="Confirm Password"
                        value={data.password}
                        onChange={handleOnChange}
                        required
                      />
                      <div>
                        <Button
                          size='lg'
                          variant='outlined'
                          onClick={moveBack}
                        >
                          Back
                        </Button>
                        <Button
                          size='lg'
                          onClick={handleSubmit}
                        >
                          Sign Up
                        </Button>
                      </div>
                  </div>
              )
            }
        </div>
    </div>
  )
}

export default RegisterPage
