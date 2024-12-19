'use client';
import {
  Alert,
  Box,
  Button,
  IconButton,
  List,
  Snackbar,
  Typography,
} from '@mui/material';
import Status from './statuses/Status';
import { DndContext } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { dropCard, IBoards, IStatus } from '@/state/kanban/kanbanSlice';
import { FC, useState } from 'react';
import CardModal from './modals/CardModal';
import StatusModal from './modals/StatusModal';
import { Tune } from '@mui/icons-material';
import BoardModal from './modals/BoardModal';

const Board: FC<IBoards> = (props) => {
  const statuses = useSelector((state: RootState) => state.kanban.statuses);
  const dispatch = useDispatch<AppDispatch>();

  const [openCardModal, setOpenCardModal] = useState<boolean>(false);
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);
  const [openBoardModal, setOpenBoardModal] = useState<boolean>(false);

  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleCloseCardModal = () => {
    setOpenCardModal(false);
  };

  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseBoardModal = () => {
    setOpenBoardModal(false);
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
            onClick={() => setOpenCardModal(true)}
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
            onClick={() => setOpenStatusModal(true)}
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
          <IconButton onClick={() => setOpenBoardModal(true)}>
            <Tune color="secondary" />
          </IconButton>
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
      <BoardModal
        open={openBoardModal}
        handleClose={handleCloseBoardModal}
        name={props.name}
        boardId={props.id}
        modalAction='edit'
      />

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="info"
          variant="standard"
          sx={{ width: '100%' }}
        >
          The status needs to be empty in order to be deleted
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Board;
