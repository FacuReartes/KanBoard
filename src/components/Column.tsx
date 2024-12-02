import { Box, List, Typography } from '@mui/material'
import React, { FC } from 'react'
import Task from './Task'
import { useDroppable } from '@dnd-kit/core'

interface ITask {
  name: string
  id: number
}

interface IColumn {
  name: string,
  taskList: ITask[],
  id: number
}

const Column: FC<IColumn> = (props) => {

  const { setNodeRef, isOver } = useDroppable({
    id: props.id
  })

  const renderTaskList = props.taskList.map((task: ITask) => (
    <Task name={task.name} id={task.id}/>
  ))

  return (
    <Box sx={{ 
      px: 4, 
      py: 2, 
      height: '100%', 
      width: '25%', 
      borderRadius: 3,
      bgcolor: isOver ? 'primary.main' : 'primary.light'
    }}
      ref={setNodeRef}
    >
      <Typography 
        variant='h6' 
        component='h3'
        color='common.white'
      >
        {props.name}
      </Typography>
      <List>
        {renderTaskList}
      </List>
    </Box>
  )
}

export default Column