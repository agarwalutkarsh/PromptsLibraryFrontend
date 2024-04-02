'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useEffect, useMemo, useState } from 'react'

export const MainContext = createContext()

const MainContextWrapper = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            console.log(localStorage.getItem('email') ?? '')
            setUserDetails({
                firstName: localStorage.getItem('firstName') ?? '',
                lastName: localStorage.getItem('lastName') ?? '',
                email: localStorage.getItem('email') ?? ''
            })
            setIsLoggedIn(true)
        }
    }, [])

    const unprotectedRoutes = ['/']

    const isUnProtectedRoute = useMemo(() => unprotectedRoutes?.includes(pathname), [pathname])

    useEffect(() => {
        console.log(isUnProtectedRoute)
        if (!isUnProtectedRoute && !isLoggedIn) {
            console.log(isLoggedIn)
            router.push('/')
        } else {
            console.log('Else')
            console.log(pathname)
            router.push(pathname)
        }
    }, [isLoggedIn, isUnProtectedRoute])

    const state = useMemo(() => ({
        isLoggedIn,
        userDetails,
        setIsLoggedIn,
        setUserDetails
    }), [isLoggedIn])

    return (
        <MainContext.Provider value={state}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextWrapper