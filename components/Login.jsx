'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { loginUser, signupUser } from '@/utils/Auth'
import { MainContext } from './ContextApi/MainContext'

const Login = ({ formOpen, setFormOpen, handleFormClose}) => {

    const [isLoginForm, setIsLoginForm] = useState(true)
    const [formBody, setFormBody] = useState({})
    const mainContext = useContext(MainContext)

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setFormBody(prevState => ({...prevState, [name]: value}))
    }

    useEffect(() => {
        setFormBody({})
    }, [setIsLoginForm, formOpen])

    const loginText = useMemo(() => isLoginForm ? 'Login' : 'Signup', [isLoginForm])

    const submitHandler = () => {
        const isLogin = loginText === 'Login'
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
            localStorage.setItem('firstName', userObj?.firstName)
            localStorage.setItem('lastName', userObj?.lastName)
            localStorage.setItem('email', userObj?.email)
            mainContext.setUserDetails({...userObj})
            mainContext.setIsLoggedIn(true)
            handleFormClose()
        }
        }).catch(err => console.error(err))
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth='xs'
            open={formOpen}
            PaperProps={{
                style: { borderRadius: 15, height: isLoginForm ? '22rem' : '30rem' }
            }}
        >
            <DialogTitle>
                <Typography className='text-center font-semibold text-2xl'>{loginText}</Typography>
            </DialogTitle>
            <Divider className='bg-gray-600 border-b-1' />
            <DialogContent className='flex flex-col justify-center'>
                {
                    !isLoginForm && <>
                        <TextField label='First Name' name='firstName' onChange={handleChange} className='w-full my-2' type='text' required />
                        <TextField label='Last Name' name='lastName' onChange={handleChange} className='w-full my-2' type='text' required />
                    </>
                }
                <TextField label='Email' name='email' onChange={handleChange} className='w-full my-2' type='eamil' required />
                <TextField label='Password' name='password' onChange={handleChange} className='w-full my-2' type='password' required />
            </DialogContent>
            <DialogActions className='flex flex-col'>
                <div className='w-[90%] mx-auto mb-4 flex justify-between'>
                    <Button className='text-white rounded-lg mx-2 bg-red-500 hover:bg-red-700 w-1/2' onClick={() => handleFormClose()}>Cancel</Button>
                    <Button className='text-white rounded-lg mx-2 bg-blue-500 w-1/2 hover:bg-blue-600' onClick={submitHandler}>{loginText}</Button>
                </div>
                <Typography className='text-sm text-[#849dfc] hover:cursor-pointer hover:text-[#607deb]' onClick={() => setIsLoginForm(prevState => !prevState)}>{isLoginForm ? 'Create New Account' : 'Login Now'}</Typography>
            </DialogActions>
        </Dialog>
    )
}

Login.propTypes = {
    formOpen: PropTypes.bool,
    setFormOpen: PropTypes.func,
    loginMode: PropTypes.bool,
    handleFormClose: PropTypes.func
}

export default Login