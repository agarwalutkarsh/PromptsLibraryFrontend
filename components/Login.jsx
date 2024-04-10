'use client'

import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { loginUser, signupUser } from '@/utils/Auth'
import { MainContext } from './ContextApi/MainContext'
import Image from 'next/image';

const Login = ({ formOpen, handleFormClose }) => {

    const [isLoginForm, setIsLoginForm] = useState(true)
    const [formBody, setFormBody] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const mainContext = useContext(MainContext)

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setFormBody(prevState => ({ ...prevState, [name]: value }))
    }

    useEffect(() => {
        setFormBody({})
    }, [setIsLoginForm, formOpen])

    const loginText = useMemo(() => isLoginForm ? 'Login' : 'Signup', [isLoginForm])

    const submitHandler = () => {
        setLoading(true)
        const isLogin = loginText === 'Login'
        // Depending on the mode, call the function
        const apiFunc = isLogin ? loginUser : signupUser
        const response = apiFunc(formBody)
        response.then((resp) => {
            if (resp?.status === 200) {
                localStorage.setItem('token', resp?.data?.data?.token ?? resp?.data?.token)
                const userObj = {
                    firstName: resp?.data?.data?.firstName,
                    lastName: resp?.data?.data?.lastName,
                    email: resp?.data?.data?.email
                }
                // Setting Local storage on successfull login
                localStorage.setItem('firstName', userObj?.firstName)
                localStorage.setItem('lastName', userObj?.lastName)
                localStorage.setItem('email', userObj?.email)
                mainContext.setUserDetails({ ...userObj })
                mainContext.setIsLoggedIn(true)
                // Close the form
                handleFormClose()
            }
        }).catch(err => console.error(err)).finally(() => setLoading(false))
    }

    const helperTextFunction = () => {
        return (
            <p className='text-xs text-blue-400 hover:cursor-pointer hover:text-blue-500' onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'} Password</p>
        )
    }

    return (
        // Form
        <>
            {
                loading && <Dialog fullWidth={true} maxWidth='xs' open={loading} PaperProps={{
                    style: {  height:  '12rem', background: 'transparent', boxShadow: 'none' }
                }}>
                    <DialogContent className='m-auto'>
                    <Image src='/assets/icons/loader.svg' alt='Logo' width={100} height={100} />
                    </DialogContent>
                </Dialog>
            }
            <Dialog
                fullWidth={true}
                maxWidth='xs'
                open={formOpen}
                PaperProps={{
                    style: { borderRadius: 15, height: isLoginForm ? '22rem' : '30rem' }
                }}
            >
                <DialogTitle>
                    <p className='text-center font-semibold text-xl'>{loginText}</p>
                </DialogTitle>
                <Divider className='bg-gray-600 border-b-1' />
                <DialogContent className='flex flex-col justify-center'>
                    {
                        !isLoginForm && <>
                            <TextField label='First Name' name='firstName' onChange={handleChange} className='w-full' type='text' required />
                            <span className='my-1'></span>
                            <TextField label='Last Name' name='lastName' onChange={handleChange} className='w-full' type='text' required />
                        </>
                    }
                    <span className='my-1'></span>
                    <TextField label='Email' name='email' onChange={handleChange} className='w-full' type='eamil' required />
                    <span className='my-1'></span>
                    <TextField label='Password' name='password' onChange={handleChange} className='w-full' type={showPassword ? 'text' : 'password'} required helperText={helperTextFunction()} />
                </DialogContent>
                {/* Action Buttons */}
                <DialogActions className='flex flex-col'>
                    <div className='w-[90%] mx-auto mb-4 flex justify-between'>
                        <button className='text-white rounded-lg mx-2 bg-red-500 hover:bg-red-700 w-1/2 py-1' onClick={() => handleFormClose()}>Cancel</button>
                        <button className='text-white rounded-lg mx-2 bg-blue-500 w-1/2 hover:bg-blue-600 py-1' onClick={submitHandler}>{loginText}</button>
                    </div>
                    <Typography className='text-sm text-[#849dfc] hover:cursor-pointer hover:text-[#607deb]' onClick={() => setIsLoginForm(prevState => !prevState)}>{isLoginForm ? 'Create New Account' : 'Login Now'}</Typography>
                </DialogActions>
            </Dialog>
        </>
    )
}

Login.propTypes = {
    formOpen: PropTypes.bool,
    loginMode: PropTypes.bool,
    handleFormClose: PropTypes.func
}

export default Login