'use client'

import CategoryTags from '@/components/CategoryTags'
import { MainContext } from '@/components/ContextApi/MainContext'
import PromptCard from '@/components/PromptCard'
import { deletePost, getPostByUser } from '@/utils/Post'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useContext, useEffect, useMemo, useState } from 'react'

const MyPosts = () => {
    const [userPosts, setUserPosts] = useState([])
    const mainContext = useContext(MainContext)
    const user = useMemo(() => ({ ...mainContext.userDetails }), [mainContext])

    // Api call to fetch post by email
    const fetchPostByUser = () => {
        const response = getPostByUser()
        response.then((resp) => {
            setUserPosts([...resp?.data])
        }).catch(err => console.error(err))
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
            <Typography className='head_text text-left blue_gradient'>Hi, {user?.firstName} {user?.lastName}</Typography>
            <Typography className='desc'>Edit or Delete your AI Prompts</Typography>
            <div className='grid grid-cols-3 gap-4 mt-12'>

                {
                    userPosts?.map(item => (
                        <PromptCard item={item} cardActions={<div className='flex justify-center mx-auto w-full'>
                            {/* Actions */}
                            <Link href={`update-post/${item?._id}`}><Button variant='contained' size='small' className=' mx-1 bg-blue-400 hover:bg-blue-500 text-white'>Edit</Button></Link>
                            <Button variant='contained' size='small' className=' mx-1 bg-red-400 hover:bg-red-500 text-white' onClick={() => deleteUserPost(item?._id)}>Delete</Button>
                        </div>} />
                    ))
                }
            </div>
        </Box>
    )
}

export default MyPosts
