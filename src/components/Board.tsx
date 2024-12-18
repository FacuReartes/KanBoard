'use client';
import { Alert, Box, Button, List, Snackbar, Typography } from '@mui/material';
import Status from './statuses/Status';
import { DndContext } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { dropCard, IBoards, IStatus } from '@/state/kanban/kanbanSlice';
import { FC, useState } from 'react';
import CardModal from './modals/CardModal';
import StatusModal from './modals/StatusModal';

const Board: FC<IBoards> = (props) => {
  const statuses = useSelector((state: RootState) => state.kanban.statuses);
  const dispatch = useDispatch<AppDispatch>();

  const [openCardModal, setOpenCardModal] = useState<boolean>(false);
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);

  const [openAlert, setOpenAlert] = useState<boolean>(false);

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

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const statusList: IStatus[] = props.statusIds.map(
    (id: string) => statuses.find((status) => status.id === id)!
  );

  const renderStatusList = statusList.map((status: IStatus) => (
    <Status
      name={status.name}
      id={status.id}
      cardIds={status.cardIds}
      key={status.id}
      handleOpenAlert={handleOpenAlert}
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
          {props.name}
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

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="info"
          variant='standard'
          sx={{ width: '100%' }}
        >
          The status needs to be empty in order to be deleted
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Board;
