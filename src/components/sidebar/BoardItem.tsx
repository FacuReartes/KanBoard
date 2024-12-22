import { setActiveBoard } from '@/state/kanban/kanbanSlice';
import { AppDispatch, RootState } from '@/state/store';
import { Dashboard } from '@mui/icons-material';
import { ListItemButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IBoardItem {
  name: string;
  id: string;
}

const BoardItem: FC<IBoardItem> = (props) => {
  const activeBoard = useSelector(
    (state: RootState) => state.kanban.activeBoard
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ListItemButton
      onClick={() => dispatch(setActiveBoard(props.id))}
      sx={{
        justifyContent: 'flex-start',
        borderRadius: 3,
        fontSize: 20,
        mb: 2,
        bgcolor: activeBoard === props.id ? 'primary.light' : 'unset',
        color: 'common.white',
        borderColor: 'common.white',
      }}
    >
      <Dashboard sx={{ mr: 1 }}/>
      <Typography>{props.name}</Typography>
    </ListItemButton>
  );
};

export default BoardItem;
