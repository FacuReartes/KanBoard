import { DragEndEvent } from '@dnd-kit/core';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICard {
  name: string;
  id: string;
}

export interface IStatus {
  id: string;
  name: string;
  cardIds: string[];
}

export interface KanbanState {
  statuses: IStatus[];
  cards: ICard[];
}

const initialState: KanbanState = {
  // Y si uso hashmap aca?
  statuses: [
    {
      id: 'status1',
      name: 'To Do',
      cardIds: ['card1', 'card2', 'card3', 'card4'],
    },
    { id: 'status2', name: 'In Progress', cardIds: ['card5', 'card6'] },
    {
      id: 'status3',
      name: 'In Review',
      cardIds: ['card7', 'card8', 'card9', 'card10'],
    },
    { id: 'status4', name: 'Done', cardIds: ['card11', 'card12', 'card13'] },
  ],

  cards: [
    { id: 'card1', name: 'card 1' },
    { id: 'card2', name: 'card 2' },
    { id: 'card3', name: 'card 3' },
    { id: 'card4', name: 'card 4' },
    { id: 'card5', name: 'card 5' },
    { id: 'card6', name: 'card 6' },
    { id: 'card7', name: 'card 7' },
    { id: 'card8', name: 'card 8' },
    { id: 'card9', name: 'card 9' },
    { id: 'card10', name: 'card 10' },
    { id: 'card11', name: 'card 11' },
    { id: 'card12', name: 'card 12' },
    { id: 'card13', name: 'card 13' },
  ],
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    dropCard: (state, action: PayloadAction<DragEndEvent>) => {
      const { active, over } = action.payload;

      if (!over) return;

      const cardId = active.id as string;
      const statusId = over.id as string;

      const oldStatus = state.statuses.find((x) => x.cardIds.includes(cardId));

      if (oldStatus && statusId !== oldStatus.id) {
        state.statuses.forEach((status) => {
          if (status.id === oldStatus.id)
            status.cardIds.splice(status.cardIds.indexOf(cardId), 1);

          if (status.id === statusId) status.cardIds.push(cardId);
        });
      }
    },

    deleteCard: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;

      state.statuses.forEach(
        (status) =>
          (status.cardIds = status.cardIds.filter((id) => cardId !== id))
      );

      state.cards = state.cards.filter((card) => card.id !== cardId);
    },

    addCard: (state, action: PayloadAction<string>) => {
      const name: string = action.payload;

      const maxId: number = Math.max(
        ...state.cards
          .map((card) => card.id)
          .map((cardId) => Number(cardId.split('card')[1]))
      );

      const cardId = `card${maxId + 1}`;

      state.cards.push({ id: cardId, name });

      state.statuses[0].cardIds.push(cardId);
    },
  },
});

export const { dropCard, deleteCard, addCard } = kanbanSlice.actions;

export default kanbanSlice.reducer;
