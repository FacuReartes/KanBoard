import { Box, List, ListItemButton, Typography } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <Box sx={{ 
      px: 5, 
      width: 300,
      pt: 3,
      borderRight: 1
    }}>

      <Typography 
        variant='h4' 
        component='h1'
      >
        KanBoard
      </Typography>

      <List sx={{ 
        gap: 3, 
        pt: 6 
      }}>
        <ListItemButton sx={{ 
          border: 2, 
          borderRadius: 3, 
          justifyContent: 'center', 
          fontSize: 20, 
          mb: 2 
        }}>
          Board Item
        </ListItemButton>
        <ListItemButton sx={{ 
          border: 2, 
          borderRadius: 3, 
          justifyContent: 'center', 
          fontSize: 20, 
          mb: 2 
        }}>
          Board Item
        </ListItemButton>
        <ListItemButton sx={{ 
          border: 2, 
          borderRadius: 3, 
          justifyContent: 'center', 
          fontSize: 20, 
          mb: 2 
        }}>
          Board Item
        </ListItemButton>
        <ListItemButton sx={{ 
          border: 2, 
          borderRadius: 3, 
          justifyContent: 'center', 
          fontSize: 20, 
          mb: 2, 
          borderStyle: 'dashed' 
        }}>
          + Add New Board
        </ListItemButton>
      </List>
    </Box>
  )
}

export default Sidebar