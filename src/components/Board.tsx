'use client'
import { Box, Button, List, ListItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import Column from './Column'
import { DndContext, DragEndEvent } from '@dnd-kit/core'

interface ITask {
  name: string,
  id: number,
  columnId: number
}

interface IColumn {
  id: number,
  name: string
}

const Board = () => {

  const taskListMock: ITask[] = [
    {
      id: 1,
      name: 'task 1',
      columnId: 1
    },
    {
      id: 2,
      name: 'task 2',
      columnId: 1
    },
    {
      id: 3,
      name: 'task 3',
      columnId: 1
    },
    {
      id: 4,
      name: 'task 4',
      columnId: 1
    },
    {
      id: 5,
      name: 'task 5',
      columnId: 2
    },
    {
      id: 6,
      name: 'task 6',
      columnId: 2
    },
    {
      id: 7,
      name: 'task 7',
      columnId: 3
    },
    {
      id: 8,
      name: 'task 8',
      columnId: 3
    },
    {
      id: 9,
      name: 'task 9',
      columnId: 3
    },
    {
      id: 10,
      name: 'task 10',
      columnId: 3
    },
    {
      id: 11,
      name: 'task 11',
      columnId: 4
    },
    {
      id: 12,
      name: 'task 12',
      columnId: 4
    },
    {
      id: 13,
      name: 'task 13',
      columnId: 4
    },
  ]

  const boardStateMock: IColumn[] = [
    {
      id: 1,
      name: 'To Do',
    },
    {
      id: 2,
      name: 'In Progress',
    },
    {
      id: 3,
      name: 'In Review',
    },
    {
      id: 4,
      name: 'Done'
    }
  ]

  const [ boardState, setBoardState ] = useState<IColumn[]>(boardStateMock)
  const [ taskList, setTaskList ] = useState<ITask[]>(taskListMock)

  const renderColumnList = boardState.map((column: IColumn) => (
    <Column name={column.name} id={column.id} taskList={taskList.filter(x => x.columnId === column.id)}/>
  ))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return;

    const taskId = active.id as number
    const newColumnId = over.id as number

    const newTaskStatus = taskList.map((task) => 
      task.id === taskId ? 
      { ...task, columnId: newColumnId } : task
    )

    setTaskList(newTaskStatus)
    
  }

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
          color='primary.light'
        >
          Board Name
        </Typography>
        <Button
          variant='contained'
          sx={{ 
            textTransform: 'none',
            color: 'common.white',
            bgcolor: 'primary.light',
            ':hover': {
              bgcolor: 'primary.main'
            }
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
        <DndContext onDragEnd={handleDragEnd}>
          {renderColumnList}
        </DndContext>
      </Box>
    </Box>
  )
}

export default Board