import {
  Box,
  IconButton,
  List,
  ListItem,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { FC, useState } from 'react';
import Card from './cards/Card';
import { useDroppable } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { IStatus, ICard, deleteStatus } from '@/state/kanban/kanbanSlice';
import { Menu as MenuIcon } from '@mui/icons-material';
import StatusModal from '../modals/StatusModal';

const Status: FC<IStatus> = (props) => {
  const cards = useSelector((state: RootState) => state.kanban.cards);

  const dispatch = useDispatch<AppDispatch>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [shake, setShake] = useState<boolean>(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    handleCloseMenu();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log(cardList)
    if (!cardList.length) {
      dispatch(deleteStatus(props.id));
    } else {
      setShake(true);
      props.handleOpenAlert && props.handleOpenAlert('The status needs to be empty in order to be deleted')
    }
  };

  const { setNodeRef, isOver, active } = useDroppable({
    id: props.id,
  });

  const cardList: ICard[] = props.cardIds.map(
    (id: string) => cards.find((card) => card.id === id)!
  );

  const renderCardList: JSX.Element[] = cardList.map((card: ICard) => (
    <Card
      name={card.name}
      description={card.description}
      id={card.id}
      key={card.id}
    />
  ));

  return (
    <ListItem
      key={props.id}
      sx={{
        px: 4,
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        height: '100%',
        width: '25%',
        borderRadius: 3,
        bgcolor: isOver ? 'primary.light' : 'grey.500',
        "@keyframes status-shake": {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
          '100%': { transform: 'translateX(0)' }
        },
        animation: shake ? "status-shake 0.4s linear" : 'unset',
      }}
      onAnimationEnd={() => setShake(false)}
      ref={setNodeRef}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography variant="h6" component="h3" color={ isOver ? 'common.white' : 'common.black' }>
          {props.name}
        </Typography>
        <IconButton onClick={handleOpenMenu}>
          <MenuIcon sx={{ color: isOver ? 'common.white' : 'common.black' }} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleOpenModal}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <List sx={{ width: '100%' }}>
        {renderCardList}
        {isOver && !cardList.find((card) => card.id === active?.id) && (
          <ListItem
            sx={{
              border: 2,
              borderColor: 'common.white',
              borderRadius: 3,
              py: 4,
              justifyContent: 'center',
              mb: 2,
              borderStyle: 'dashed',
            }}
            key="placeholder"
          >
            <Typography variant="h6" component="h4" color="common.white">
              {active?.data?.current?.name}
            </Typography>
          </ListItem>
        )}
      </List>

      <StatusModal
        open={openModal}
        handleClose={handleCloseModal}
        modalAction="edit"
        name={props.name}
        statusId={props.id}
      />
    </ListItem>
  );
};

export default Status;
