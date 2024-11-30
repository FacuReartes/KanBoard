import { useDraggable } from '@dnd-kit/core'
import { ListItem, Typography } from '@mui/material'
import React, { FC } from 'react'
import {CSS} from '@dnd-kit/utilities';

interface ITask {
  name: string,
  id: number
}

const Task: FC<ITask> = (props) => {

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id
  })

  const transformStyle = {
    transform: CSS.Translate.toString(transform)
  }

  return (
    <ListItem sx={{ 
      borderRadius: 3, 
      py: 4, 
      justifyContent: 'center', 
      mb: 2,
      bgcolor: 'common.white',
      zIndex: 99
    }}
      key={props.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={transformStyle}
    >
      <Typography 
        variant='h6' 
        component='h4'
        color='common.black'
      >
        {props.name}
      </Typography>
    </ListItem>
  )
}

export default Task