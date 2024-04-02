'use client'

import { getAllPosts, getPostsByCategory } from '@/utils/Post'
import { Box, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from './ContextApi/MainContext'
import PromptCard from './PromptCard'

const Feed = () => {
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])
  const mainContext = useContext(MainContext)
  const isLoggedIn = mainContext.isLoggedIn


  // Fetching all posts and posts by criteria/ Tags
  const fetchPostsFunc = () => {
    if (search === '') {
      const postsResponse = getAllPosts()
      postsResponse?.then((response) => {
        if (response?.status === 200)
        setPosts([...response?.data])
      })
    } else {
      const postsByCat = getPostsByCategory(search)
      postsByCat.then((resp) => {
        if (resp?.status === 200) {
          setPosts([...resp?.data])
        }
      })
    }
  }

  // Debouncer function for calling fetch post
  useEffect(() => {
    const debounceTimeout = setTimeout(fetchPostsFunc, 800)
    return () => clearTimeout(debounceTimeout)
  }, [search, isLoggedIn])

  return (
    <>
    {/* Search Bar */}
    <Box className='feed' >
      <form className='w-full max-w-2xl flex flex-col backdrop-blur-md border-gray-200 '>
        <TextField
          required
          name='tagSearch'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search For Tags'
          multiline={true}
          value={search} />
      </form>
    </Box>

    <div className='mt-12 p-3 grid grid-cols-3 gap-4'>
      {
        posts?.map(item => (
          <PromptCard item={item} />
        ))
      }
    </div>

    </>
  )
}

export default Feed