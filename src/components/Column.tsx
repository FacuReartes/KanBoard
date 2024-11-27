import { Box, List, ListItem, Typography } from '@mui/material'
import React from 'react'

const Column = () => {
  return (
    <Box sx={{ 
      px: 4, 
      py: 2, 
      height: '100%', 
      width: '25%', 
      border: 2, 
      borderRadius: 3 
    }}>
      <Typography 
        variant='h6' 
        component='h3'
      >
        Status
      </Typography>
      <List>
        <ListItem sx={{ 
          border: 2, 
          borderRadius: 3, 
          py: 4, 
          justifyContent: 'center', 
          mb: 2 
        }}>
          <Typography 
            variant='h6' 
            component='h4'
          >
            Task
          </Typography>
        </ListItem>
        <ListItem sx={{ 
          border: 2, 
          borderRadius: 3, 
          py: 4, 
          justifyContent: 'center', 
          mb: 2 
        }}>
          <Typography 
            variant='h6' 
            component='h4'
          >
            Task
          </Typography>
        </ListItem>
        <ListItem sx={{ 
          border: 2, 
          borderRadius: 3, 
          py: 4, 
          justifyContent: 'center', 
          mb: 2 
        }}>
          <Typography 
            variant='h6' 
            component='h4'
          >
            Task
          </Typography>
        </ListItem>
      </List>
    </Box>
  )
}

export default Column