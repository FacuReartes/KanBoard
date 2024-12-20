import { setActiveBoard } from '@/state/kanban/kanbanSlice';
import { AppDispatch, RootState } from '@/state/store';
import { ListItemButton } from '@mui/material';
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
        border: 2,
        borderRadius: 3,
        justifyContent: 'center',
        fontSize: 20,
        mb: 2,
        bgcolor: activeBoard === props.id ? 'primary.main' : 'primary.light',
        color: 'common.white',
        borderColor: 'common.white',
      }}
    >
      {props.name}
    </ListItemButton>
  );
};

export default BoardItem;
