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
import { Edit } from '@mui/icons-material';
import BoardModal from './modals/BoardModal';
import { useModal } from '@/hooks/useModal';

const Board: FC<IBoards> = (props) => {
  const statuses = useSelector((state: RootState) => state.kanban.statuses);
  const dispatch = useDispatch<AppDispatch>();

  const {
    openModal: openCardModal,
    handleCloseModal: handleCloseCardModal,
    handleOpenModal: handleOpenCardModal,
  } = useModal();

  const {
    openModal: openStatusModal,
    handleCloseModal: handleCloseStatusModal,
    handleOpenModal: handleOpenStatusModal,
  } = useModal();

  const {
    openModal: openBoardModal,
    handleCloseModal: handleCloseBoardModal,
    handleOpenModal: handleOpenBoardModal,
  } = useModal();

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('');

  const [shake, setShake] = useState<boolean>(false);

  const handleOpenAlert = (alertMsg: string) => {
    setAlertMsg(alertMsg);
    setOpenAlert(true);
  };

  const handleAddNewCard = () => {
    if (props.statusIds.length) {
      handleOpenCardModal();
    } else {
      setShake(true);
      handleOpenAlert('You need to have at least one status to add a card');
    }
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
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" component="h2" color="common.black">
            {props.name}
          </Typography>
          <IconButton
            onClick={handleOpenBoardModal}
            sx={{ p: 0.5, alignSelf: 'baseline' }}
          >
            <Edit sx={{ color: 'common.black', fontSize: '15px' }} />
          </IconButton>
        </Box>
        <Box>
          <Button
            onClick={handleAddNewCard}
            variant="contained"
            sx={{
              mr: 2,
              textTransform: 'none',
              color: 'common.white',
              bgcolor: 'primary.main',
              ':hover': {
                bgcolor: 'primary.light',
              },
              '@keyframes status-shake': {
                '0%': { transform: 'translateY(0)' },
                '25%': { transform: 'translateY(5px)' },
                '50%': { transform: 'translateY(-5px)' },
                '75%': { transform: 'translateY(5px)' },
                '100%': { transform: 'translateY(0)' },
              },
              animation: shake ? 'status-shake 0.4s linear' : 'unset',
            }}
            onAnimationEnd={() => setShake(false)}
          >
            New Card
          </Button>

          <Button
            onClick={handleOpenStatusModal}
            variant="contained"
            sx={{
              textTransform: 'none',
              color: 'common.white',
              bgcolor: 'primary.main',
              ':hover': {
                bgcolor: 'primary.light',
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
        boardId={props.id}
      />
      <StatusModal
        open={openStatusModal}
        handleClose={handleCloseStatusModal}
        modalAction="add"
        boardId={props.id}
      />
      <BoardModal
        open={openBoardModal}
        handleClose={handleCloseBoardModal}
        name={props.name}
        boardId={props.id}
        modalAction="edit"
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
          {alertMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Board;
