'use-client'

import { Tooltip } from '@mui/material'
import React, { useMemo } from 'react'

const CategoryTags = ({ category }) => {
    // Category Tags
    const tagsArr = useMemo(() => {
        const categorySplit = category?.split(',')
        return categorySplit?.filter(elem => elem !== '')
    })
    return (
        <div className='flex flex-wrap'>
            {
                tagsArr?.map((tag, index) => (
                    <Tooltip title={tag} arrow ><span key={index} className='bg-gray-400 text-white mr-1 my-1 p-1 rounded-md w-max h-8 cursor-default '>{tag}</span></Tooltip>
                ))
            }
        </div>
    )
}

export default CategoryTags
