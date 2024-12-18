'use client';
import { Box, Button, List, Typography } from '@mui/material';
import Status from './statuses/Status';
import { DndContext } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { dropCard, IStatus } from '@/state/kanban/kanbanSlice';
import { useState } from 'react';
import CardModal from './modals/CardModal';
import StatusModal from './modals/StatusModal';

const Board = () => {
  const statuses = useSelector((state: RootState) => state.kanban.statuses);
  const dispatch = useDispatch<AppDispatch>();

  const [openCardModal, setOpenCardModal] = useState<boolean>(false);
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);

  const handleOpenCardModal = () => {
    setOpenCardModal(true);
  };

  const handleCloseCardModal = () => {
    setOpenCardModal(false);
  };

  const handleOpenStatusModal = () => {
    setOpenStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
  };

  const renderStatusList = statuses.map((status: IStatus) => (
    <Status
      name={status.name}
      id={status.id}
      cardIds={status.cardIds}
      key={status.id}
    />
  ));

  return (
    <Box
      sx={{
        width: '100%',
        pt: 3,
        px: 5,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'common.white',
        overflowX: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="h2" color="primary.light">
          Board Name
        </Typography>
        <Box>
          <Button
            onClick={handleOpenCardModal}
            variant="contained"
            sx={{
              mr: 2,
              textTransform: 'none',
              color: 'common.white',
              bgcolor: 'primary.light',
              ':hover': {
                bgcolor: 'primary.main',
              },
            }}
          >
            New Card
          </Button>
          <Button
            onClick={handleOpenStatusModal}
            variant="contained"
            sx={{
              textTransform: 'none',
              color: 'common.white',
              bgcolor: 'primary.light',
              ':hover': {
                bgcolor: 'primary.main',
              },
            }}
          >
            New Status
          </Button>
        </Box>
      </Box>

      <DndContext
        onDragEnd={(event) =>
          dispatch(
            dropCard({
              cardId: event.active.id as string,
              statusId: event?.over?.id as string,
            })
          )
        }
      >
        <List
          sx={{
            display: 'flex',
            flex: 1,
            py: 4,
            gap: 4,
          }}
        >
          {renderStatusList}
        </List>
      </DndContext>

      <CardModal
        open={openCardModal}
        handleClose={handleCloseCardModal}
        modalAction="add"
      />
      <StatusModal
        open={openStatusModal}
        handleClose={handleCloseStatusModal}
        modalAction="add"
      />
    </Box>
  );
};

export default Board;
