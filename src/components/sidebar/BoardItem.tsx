import { ListItemButton } from '@mui/material'
import React, { FC } from 'react'

interface IBoardItem {
  name: string;
  id: string;
  handleBoardChange: (id: string) => void;
  active: boolean;
}

const BoardItem: FC<IBoardItem> = (props) => {
  return (
    <ListItemButton
      onClick={() => props.handleBoardChange(props.id)}
      sx={{
        border: 2,
        borderRadius: 3,
        justifyContent: 'center',
        fontSize: 20,
        mb: 2,
        bgcolor: props.active ? 'primary.main' : 'primary.light',
        color: 'common.white',
        borderColor: 'common.white',
      }}
    >
      {props.name}
    </ListItemButton>
  )
}

export default BoardItem