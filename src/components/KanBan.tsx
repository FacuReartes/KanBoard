import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { initializeState } from '@/state/kanban/kanbanSlice';

const KanBan = () => {
  const boards = useSelector((state: RootState) => state.kanban.boards);

  const activeBoardId = useSelector(
    (state: RootState) => state.kanban.activeBoard
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initialState = localStorage.getItem('kanban');
    if (initialState) dispatch(initializeState(initialState));
    setIsLoading(false);
  }, []);

  const activeBoard = boards.find((board) => board.id === activeBoardId)!;

  if (isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <CircularProgress disableShrink size={80} sx={{ mb: 2 }} />
        <Typography variant="h5">Loading</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Sidebar />
      {activeBoard && (
        <Board
          id={activeBoard.id}
          name={activeBoard.name}
          statusIds={activeBoard.statusIds}
        />
      )}
    </Box>
  );
};

export default KanBan;
