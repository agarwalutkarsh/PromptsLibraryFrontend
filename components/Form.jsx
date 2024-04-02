'use client'
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import React from 'react'

const Form = ({ post, mode, setPost, createPost }) => {

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPost((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <Box className='w-full max-w-full flex flex-start flex-col' >
            <Typography className='head_text text-left blue_gradient'>{mode} Post</Typography>
            <Typography className='desc'>{mode} and share the interesting AI prompts that could make a difference</Typography>
            <form onSubmit={createPost} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
                <FormLabel className='font-satoshi font-semibold text-gray-700'>Enter Your Prompt</FormLabel>
                <TextField required placeholder='Generate a photo of a bike moving with 3 people sitting on it on indian roads...'
                    name='prompt'
                    className='p-3'
                    onChange={handleChange}
                    multiline={true}
                    rows={10}
                    value={post?.prompt} />

                <FormLabel className='font-satoshi font-semibold text-gray-700'>Enter Categories seperated by comma(,)</FormLabel>
                <TextField
                    required
                    name='category'
                    className='p-3'
                    onChange={handleChange}
                    placeholder='Photo, Roads, Bike'
                    multiline={true}
                    value={post?.category} />

                <div className='flex flex-end gap-4'>
                    <Button className='black_btn' type='submit'>Publish</Button>
                    <Button className='outline_btn' onClick={() => setPost((prev) => ({prompt: '', category: ''}))}>Reset</Button>
                </div>
            </form>
        </Box>
    )
}

export default Form