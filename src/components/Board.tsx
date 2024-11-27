import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Column from './Column'

const Board = () => {
  return (
    <Box sx={{ 
      width: '100%', 
      pt: 3,
      px: 5,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography 
          variant='h5' 
          component='h2'
        >
          Board Name
        </Typography>
        <Button
          variant='outlined'
          sx={{ 
            textTransform: 'none' 
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
        <Column/>
        <Column/>
        <Column/>
        <Column/>
      </Box>
    </Box>
  )
}

export default Board