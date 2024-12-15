import { Box, List, ListItemButton, Typography } from '@mui/material';
import React from 'react';

const Sidebar = () => {
  return (
    <Box
      sx={{
        px: 5,
        width: 300,
        pt: 3,
        bgcolor: 'primary.light',
      }}
    >
      <Typography variant="h4" component="h1" color="common.white">
        KanBoard
      </Typography>

      <List
        sx={{
          gap: 3,
          pt: 6,
        }}
      >
        <ListItemButton
          sx={{
            border: 2,
            borderRadius: 3,
            justifyContent: 'center',
            fontSize: 20,
            mb: 2,
            bgcolor: 'secondary.main',
            color: 'common.white',
            borderColor: 'secondary.main',
          }}
        >
          Board Item
        </ListItemButton>
        <ListItemButton
          sx={{
            border: 2,
            borderRadius: 3,
            justifyContent: 'center',
            fontSize: 20,
            mb: 2,
            color: 'common.white',
          }}
        >
          Board Item
        </ListItemButton>
        <ListItemButton
          sx={{
            border: 2,
            borderRadius: 3,
            justifyContent: 'center',
            fontSize: 20,
            mb: 2,
            color: 'common.white',
          }}
        >
          Board Item
        </ListItemButton>
        <ListItemButton
          sx={{
            border: 2,
            borderRadius: 3,
            justifyContent: 'center',
            fontSize: 20,
            mb: 2,
            borderStyle: 'dashed',
            borderColor: 'common.white',
            color: 'common.white',
          }}
        >
          + New Board
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
