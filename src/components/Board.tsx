'use client'
import { Box, Button, Typography } from '@mui/material'
import Column from './Column'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { IStatus } from '@/state/kanban/kanbanSlice'

const Board = () => {

  const statuses = useSelector((state: RootState) => state.kanban.statuses)
  const tasks = useSelector((state: RootState) => state.kanban.tasks)

  const renderStatusList = statuses.map((status: IStatus) => (
    <Column name={status.name} id={status.id} taskIds={status.taskIds}/>
  ))

  // Implementar esto pero en reducer
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return;

    const taskId = active.id as string
    const newColumnId = over.id as number

    const newTaskStatus = tasks.map((task) => 
      task.id === taskId ? 
      { ...task, columnId: newColumnId } : task
    )

    //setTaskList(newTaskStatus)
    
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
          {renderStatusList}
        </DndContext>
      </Box>
    </Box>
  )
}

export default Board