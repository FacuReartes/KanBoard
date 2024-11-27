import { Box, List, Typography } from '@mui/material'
import React, { FC } from 'react'
import Task from './Task'

interface ITask {
  name: string
  id: number
}

interface IColumn {
  name: string,
  taskList: ITask[]
}

const Column: FC<IColumn> = (props) => {

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
      bgcolor: 'primary.main'
    }}>
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