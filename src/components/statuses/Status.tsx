import { Box, List, ListItem, Typography } from '@mui/material';
import React, { FC } from 'react';
import Card from './cards/Card';
import { useDroppable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { IStatus, ICard } from '@/state/kanban/kanbanSlice';

const Status: FC<IStatus> = (props) => {
  const cards = useSelector((state: RootState) => state.kanban.cards);

  const { setNodeRef, isOver, active } = useDroppable({
    id: props.id,
  });

  const cardList: ICard[] = props.cardIds.map(
    (id: string) => cards.find((card) => card.id === id)!
  );

  const renderCardList: JSX.Element[] = cardList.map((card: ICard) => (
    <Card name={card.name} description={card.description} id={card.id} key={card.id}/>
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
        bgcolor: isOver ? 'primary.main' : 'primary.light',
      }}
      ref={setNodeRef}
    >
      <Typography variant="h6" component="h3" color="common.white">
        {props.name}
      </Typography>
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
    </ListItem>
  );
};

export default Status;
