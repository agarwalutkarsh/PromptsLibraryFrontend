'use client'
import { MainContext } from '@/components/ContextApi/MainContext';
import Form from '@/components/Form';
import { createPostApi } from '@/utils/Post';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

const CreatePrompt = () => {
  const mainContext = useContext(MainContext)
    const [post, setPost] = useState({
        prompt: '',
        category: ''
    })

    const router = useRouter()

    const mode = 'Add'

    // Create Post Api call
    const createPost = (e) => {
        e.preventDefault()
        const postBody = {
          prompt: post?.prompt?.trim(),
          category: post?.category?.trim(),
          userEmail: mainContext?.userDetails?.email ?? ''
        }
        const createResponse = createPostApi(postBody)
        createResponse.then((resp) => {
          // redirecting to dashboard after successfull creaton
          if (resp?.status === 201) {
            router.push('/')
          }
        }).catch(err => console.error(err))
    }

  return (
    <Form post={post} mode={mode} setPost={setPost} createPost={createPost} />
  )
}

export default CreatePrompt
