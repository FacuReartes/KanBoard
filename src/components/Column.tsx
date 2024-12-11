import { Box, List, Typography } from '@mui/material'
import React, { FC } from 'react'
import Task from './Task'
import { useDroppable } from '@dnd-kit/core'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { IStatus, ITask } from '@/state/kanban/kanbanSlice'

const Column: FC<IStatus> = (props) => {

  const tasks = useSelector((state: RootState) => state.kanban.tasks)

  const { setNodeRef, isOver } = useDroppable({
    id: props.id
  })

  const renderTaskList: JSX.Element[] = props.taskIds.map((id: string) => tasks.find(task => task.id === id)!).map((task: ITask) => (
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