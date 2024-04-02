
'use client'
import Form from '@/components/Form'
import { getPostByPostId, updatePost } from '@/utils/Post'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UpdateForm = ({ params }) => {
  const router = useRouter()
  const [post, setPost] = useState({
    prompt: '',
    category: ''
})

// On Successfull update
const editPost = (e) => {
  e.preventDefault()
  const response = updatePost(params?.postId, post)
  response.then(resp => {
    if (resp?.status === 201) {
      router.push('/my-posts')
    }
  })
}

// Getting post by post id
useEffect(() => {
  if (params.postId) {
    // Accessing the post id from params
    const response = getPostByPostId(params.postId)
    response.then((resp) => {
      setPost(() => ({
        prompt: resp?.data?.prompt,
        category: resp?.data?.category
      }))
    })
  }
}, [params.postId])
  const mode = 'Edit'
  return (
      <Form mode={mode} post={post} setPost={setPost} createPost={editPost}></Form>
  )
}

export default UpdateForm