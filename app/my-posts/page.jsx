'use client'

import { MainContext } from '@/components/ContextApi/MainContext'
import PromptCard from '@/components/PromptCard'
import { deletePost, getPostByUser } from '@/utils/Post'
import { Box } from '@mui/material'
import Link from 'next/link'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Image from 'next/image';

const MyPosts = () => {
    const [userPosts, setUserPosts] = useState([])
    const mainContext = useContext(MainContext)
    const [loading, setLoading] = useState(false)
    const user = useMemo(() => ({ ...mainContext.userDetails }), [mainContext])

    // Api call to fetch post by email
    const fetchPostByUser = () => {
        setLoading(true)
        const response = getPostByUser()
        response.then((resp) => {
            setUserPosts([...resp?.data])
        }).catch(err => console.error(err)).finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchPostByUser()
    }, [])

    // Delete Post Api call
    const deleteUserPost = (id) => {
        const response = deletePost(id)
        response?.then((resp) => {
            fetchPostByUser()
        }).catch(err => console.error(err))
    }

    return (
        <Box className='max-w-full w-full flex flex-col flex-start' >
            <p className='head_text text-left blue_gradient'>Hi, {user?.firstName} {user?.lastName}</p>
            <p className='desc'>Edit or Delete your AI Prompts</p>
            {
                loading
                    ? <Image src='/assets/icons/loader.svg' alt='Logo' width={100} height={100} className='m-auto' />
                    : <div className='grid grid-cols-3 gap-4 mt-12'>
                        {
                            userPosts?.map(item => (
                                <PromptCard item={item} cardActions={
                                    <div className='flex justify-center mx-auto w-full '>
                                        {/* Actions */}
                                        <Link className='w-1/2 mx-2' href={`update-post/${item?._id}`}><button className='rounded-md px-2 py-1 w-full bg-blue-400 hover:bg-blue-500 text-white'>Edit</button></Link>
                                        <button className='rounded-md px-2 py-1 w-1/2 mx-2 bg-red-400 hover:bg-red-500 text-white' onClick={() => deleteUserPost(item?._id)}>Delete</button>
                                    </div>} />
                            ))
                        }
                    </div>
            }

        </Box>
    )
}

export default MyPosts
