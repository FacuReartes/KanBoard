import { useDraggable } from '@dnd-kit/core'
import { ListItem, Typography } from '@mui/material'
import React, { FC } from 'react'
import {CSS} from '@dnd-kit/utilities';
import { ITask } from '@/state/kanban/kanbanSlice';

const Task: FC<ITask> = (props) => {

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id
  })

  const transformStyle = {
    transform: CSS.Translate.toString(transform)
  }

  return (
    <ListItem sx={{ 
      border: 2,
      borderColor: 'secondary.main',
      borderRadius: 3, 
      py: 4, 
      justifyContent: 'center', 
      mb: 2,
      bgcolor: 'common.white',
      zIndex: isDragging ? 99 : 9,
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