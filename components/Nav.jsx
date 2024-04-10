'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Login from './Login'
import { MainContext } from './ContextApi/MainContext'
import { useRouter } from 'next/navigation'

const Nav = () => {

    const [formOpen, setFormOpen] = useState(false)
    const mainContext = useContext(MainContext)
    const isUserLoggedIn = mainContext.isLoggedIn ?? false
    const router = useRouter()

    // Form Handlers
    const handleOpenForm = () => {
        setFormOpen(true)
    }

    const handleFormClose = () => {
        setFormOpen(false)
    }

    const logoutHandler = () => {
        localStorage.clear()
        mainContext.setIsLoggedIn(false)
        router.push('/')
    }

    return (
        <>
            <nav className='flex-between w-full mb-16 mt-4'>
                <Link href='/' className='flex gap-3'>
                    <Image src='/assets/images/logo.svg' alt='Logo' width={30} height={30} className='ml-8 object-contain' />
                    <p className='logo_text'>Prompts Library</p>
                </Link>
                {
                        !isUserLoggedIn
                            ? <>
                                <span className='black_btn mx-2 hover:cursor-pointer' onClick={handleOpenForm}>Login / Signup</span>
                            </>
                            : <div className='flex'>
                                <Link href='/create-post' className='black_btn mr-8' >
                                    Create Post
                                </Link>
                                <Link href='/my-posts' className='black_btn mr-8'>
                                    My Posts
                                </Link>
                                <span onClick={logoutHandler} className='outline_btn mr-8 hover: cursor-pointer'>Logout</span>
                            </div>
                    }
            </nav>
            <Login formOpen={formOpen} setFormOpen={handleOpenForm} handleFormClose={handleFormClose} />
        </>
    )
}

export default Nav