'use client'
import { Box, Button, List, ListItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import Column from './Column'

interface ITask {
  name: string,
  id: number
}

interface IColumn {
  id: number,
  name: string,
  taskList: ITask[]
}

const Board = () => {

  const boardStateMock: IColumn[] = [
    {
      id: 1,
      name: 'To Do',
      taskList: [
        {
          id: 1,
          name: 'task 1'
        },
        {
          id: 2,
          name: 'task 2'
        },
        {
          id: 3,
          name: 'task 3'
        },
        {
          id: 4,
          name: 'task 4'
        },
      ]
    },
    {
      id: 2,
      name: 'In Progress',
      taskList: [
        {
          id: 5,
          name: 'task 5'
        },
        {
          id: 6,
          name: 'task 6'
        },
        {
          id: 7,
          name: 'task 7'
        },
      ]
    },
    {
      id: 3,
      name: 'In Review',
      taskList: [
        {
          id: 8,
          name: 'task 8'
        },
      ]
    },
    {
      id: 4,
      name: 'Done',
      taskList: [
        {
          id: 9,
          name: 'task 9'
        },
        {
          id: 10,
          name: 'task 10'
        },
        {
          id: 11,
          name: 'task 11'
        },
        {
          id: 12,
          name: 'task 12'
        },
        {
          id: 13,
          name: 'task 13'
        },
      ]
    }
  ]

  const [ boardState, setBoardState ] = useState<IColumn[] | null[]>(boardStateMock)

  const renderColumnList = boardState.map((column: any) => (
    <Column name={column.name} taskList={column.taskList}/>
  ))

  return (
    <Box sx={{ 
      width: '100%', 
      pt: 3,
      px: 5,
      display: 'flex',
      flexDirection: 'column',
      bgcolor:'common.white'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography 
          variant='h5' 
          component='h2'
          color='common.black'
        >
          Board Name
        </Typography>
        <Button
          variant='contained'
          sx={{ 
            textTransform: 'none',
            color: 'common.white',
            bgcolor: 'primary.main',
          }}
        >
          New Task
        </Button>
      </Box>

      {/* HACER BIEN EL FLEX/GRID DE ESTO */}
      <Box sx={{ 
        display: 'flex', 
        flex: 1, 
        py: 4, 
        gap: 4 
      }}>
        {renderColumnList}
      </Box>
    </Box>
  )
}

export default Board