import { useDraggable } from '@dnd-kit/core';
import { Box, IconButton, ListItem, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { deleteCard, ICard } from '@/state/kanban/kanbanSlice';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import CardModal from '@/components/modals/CardModal';

const Card: FC<ICard> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
          px: 2,
          py: props.description ? 1 : 2,
          width: '100%',
        }}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <Typography
          variant="h6"
          component="h4"
          color="common.black"
          sx={{ wordBreak: 'break-word', hyphens: 'auto' }}
        >
          {props.name}
        </Typography>
        {props.description && (
          <Typography sx={{ wordBreak: 'break-word', hyphens: 'auto' }}>
            {props.description}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 3,
          right: 3,
          padding: 0,
        }}
      >
        <IconButton
          sx={{
            padding: 0.5,
          }}
          onClick={handleOpenModal}
        >
          <Edit
            sx={{
              color: 'primary.light',
              fontSize: 20,
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            padding: 0.5,
          }}
          onClick={() => dispatch(deleteCard(props.id))}
        >
          <Delete
            sx={{
              color: 'primary.light',
              fontSize: 20,
            }}
          />
        </IconButton>
      </Box>

      <CardModal
        open={openModal}
        handleClose={handleCloseModal}
        modalAction="edit"
        name={props.name}
        cardId={props.id}
        description={props.description}
      />
    </ListItem>
  );
};

export default Card;
