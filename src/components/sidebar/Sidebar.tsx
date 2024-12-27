import { Box, List, ListItemButton, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import BoardItem from './BoardItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import BoardModal from '../modals/BoardModal';
import { DashboardCustomize } from '@mui/icons-material';
import { useModal } from '@/hooks/useModal';

const Sidebar: FC = () => {
  const { openModal, handleCloseModal, handleOpenModal } = useModal();

  const boards = useSelector((state: RootState) => state.kanban.boards);

  const renderBoardItems = boards.map((board) => (
    <BoardItem key={board.id} name={board.name} id={board.id} />
  ));

  return (
    <Box
      sx={{
        px: 5,
        width: 300,
        pt: 3,
        bgcolor: 'primary.main',
      }}
    >
      <Typography variant="h4" component="h1" color="common.white">
        KanBoard
      </Typography>

      <List
        sx={{
          gap: 3,
          pt: 4,
        }}
      >
        {renderBoardItems}
        <ListItemButton
          onClick={handleOpenModal}
          sx={{
            border: 2,
            borderRadius: 3,
            justifyContent: 'flex-start',
            fontSize: 20,
            mb: 2,
            borderStyle: 'dashed',
            borderColor: 'common.white',
            color: 'common.white',
          }}
        >
          <DashboardCustomize sx={{ mr: 1 }} />
          <Typography>New Board</Typography>
        </ListItemButton>
      </List>

      <BoardModal
        open={openModal}
        handleClose={handleCloseModal}
        modalAction="add"
      />
    </Box>
  );
};

export default Sidebar;
