import { Card, CardActions, CardContent } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import CategoryTags from './CategoryTags'

const PromptCard = ({ item, cardActions }) => {
  // Post Card
  return (
    <Card key={item?._id} className='w-full backdrop-blur-md bg-white/20 relative'>
      <CardContent className='overflow-y-auto max-h-[30vh] mb-10'>
        <p className='font-satoshi min-h-max font-semibold text-gray-700 text-lg'>{item?.prompt}</p>
        <CategoryTags category={item?.category} />
      </CardContent>
      {cardActions && <CardActions className='absolute bottom-0 w-full h-max '>
        {cardActions}
      </CardActions>}
    </Card>
  )
}

PromptCard.propTypes = {
  item: PropTypes.object,
  cardActions: PropTypes.element
}


export default PromptCard