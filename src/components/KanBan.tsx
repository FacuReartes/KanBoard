import { Box } from '@mui/material';
import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Board from './Board';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

const KanBan = () => {
  const boards = useSelector((state: RootState) => state.kanban.boards);

  const [activeBoardId, setActiveBoardId] = useState(boards[0].id);

  const handleBoardChange = (id: string) => {
    setActiveBoardId(id);
  };

  const activeBoard = boards.find((board) => board.id === activeBoardId)!;

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Sidebar
        handleBoardChange={handleBoardChange}
        activeBoardId={activeBoardId}
      />
      <Board
        id={activeBoard.id}
        name={activeBoard.name}
        statusIds={activeBoard.statusIds}
      />
    </Box>
  );
};

export default KanBan;
