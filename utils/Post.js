import { apiUrl } from '@/Env'
import axios from 'axios'

export const createPostApi = async (body) => {
    try {
        const response = await axios.post(`${apiUrl}api/post/`, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (err) {
        return err
    }
}

export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${apiUrl}api/allPosts`)
        return response
    } catch (err) {
        return err
    }
}

export const getPostsByCategory = async (category) => {
    try {
        const response = await axios.get(`${apiUrl}api/allPosts/${category}`)
        return response
    } catch (err) {
        return err
    }
}

export const getPostByPostId = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}api/post/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (err) {
        return err
    }
}

export const getPostByUser = async () => {
    try {
        const response = await axios.get(`${apiUrl}api/post/myposts`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (err) {
        return err
    }
}

export const deletePost = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}api/post`, {
            params: {
                id
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (err) {
        return err
    }
}

export const updatePost = async (id, body) => {
    try {
        const response = await axios.patch(`${apiUrl}api/post/${id}`, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (err) {
        return err
    }
}