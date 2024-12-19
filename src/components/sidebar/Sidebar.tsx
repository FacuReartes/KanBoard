import { Box, List, ListItemButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import BoardItem from './BoardItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

interface ISidebar {
  handleBoardChange: (id: string) => void;
  activeBoardId: string;
}

const Sidebar: FC<ISidebar> = (props) => {
  const boards = useSelector((state: RootState) => state.kanban.boards);

  const renderBoardItems = boards.map((board) => (
    <BoardItem
      key={board.id}
      name={board.name}
      id={board.id}
      handleBoardChange={props.handleBoardChange}
      active={props.activeBoardId === board.id}
    />
  ));

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
        {renderBoardItems}
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
