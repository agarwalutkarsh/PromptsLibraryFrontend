'use client'

import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Login from './Login'
import { MainContext } from './ContextApi/MainContext'

const Nav = () => {

    const [formOpen, setFormOpen] = useState(false)
    const mainContext = useContext(MainContext)
    const isUserLoggedIn = mainContext.isLoggedIn ?? false

    // Form Handlers
    const handleOpenForm = () => {
        setFormOpen(true)
    }

    const handleFormClose = () => {
        setFormOpen(false)
    }

    return (
        <div className='mt-20'>
            {/* Navbar */}
            <AppBar elevation={0} className='bg-transparent '>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link href='/' className='flex gap-3'>
                            <Image src='/assets/images/logo.svg' alt='Logo' width={30} height={30} className='ml-8 object-contain' />
                            <Typography className='logo_text'>Prompts Library</Typography>
                        </Link>
                    </Box>
                    {/* Options showing on the basis of login status of the user */}
                    {
                        !isUserLoggedIn
                            ? <>
                                <span className='black_btn mx-2 hover:cursor-pointer' onClick={handleOpenForm}>Login</span>
                            </>
                            : <>
                                <Link href='/create-post' className='black_btn mr-8' >
                                    Create Post
                                </Link>
                                <Link href='/my-posts' className='black_btn mr-8'>
                                    My Posts
                                </Link>
                            </>
                    }
                </Toolbar>
            </AppBar>
            <Login formOpen={formOpen} setFormOpen={handleOpenForm} handleFormClose={handleFormClose} />
        </div>
    )
}

export default Nav