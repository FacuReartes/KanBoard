import { useDraggable } from '@dnd-kit/core';
import { Box, IconButton, ListItem, Typography } from '@mui/material';
import React, { FC } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { deleteTask, ITask } from '@/state/kanban/kanbanSlice';
import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';

const Task: FC<ITask> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
      data: {
        name: props.name,
      },
    });

  const transformStyle = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <ListItem
      sx={{
        border: 2,
        borderColor: 'secondary.main',
        borderRadius: 3,
        p: 0,
        mb: 2,
        bgcolor: 'common.white',
        zIndex: isDragging ? 99 : 9,
        ':hover': {
          cursor: 'grab',
        },
        ':active': {
          cursor: 'grabbing',
        },
      }}
      key={props.id}
      style={transformStyle}
    >
      <Box
        sx={{
          py: 4,
          width: '100%',
          textAlign: 'center',
        }}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <Typography variant="h6" component="h4" color="common.black">
          {props.name}
        </Typography>
      </Box>
      <IconButton
        onClick={() => dispatch(deleteTask(props.id))}
        sx={{ 
          position: 'absolute', 
          top: 3, 
          right: 3, 
          padding: 0.5 
        }}
      >
        <Delete sx={{ 
          color: 'primary.light' 
          }} 
        />
      </IconButton>
    </ListItem>
  );
};

export default Task;
