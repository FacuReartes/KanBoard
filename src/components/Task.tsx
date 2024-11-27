import { ListItem, Typography } from '@mui/material'
import React, { FC } from 'react'

interface ITask {
  name: string,
  id: number
}

const Task: FC<ITask> = (props) => {
  return (
    <ListItem sx={{ 
      borderRadius: 3, 
      py: 4, 
      justifyContent: 'center', 
      mb: 2,
      bgcolor: 'common.white',
    }}
      key={props.id}
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