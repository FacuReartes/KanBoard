import { DragEndEvent } from '@dnd-kit/core';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICard {
  name: string;
  id: string;
  description: string;
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

interface EditCardPayload {
  id?: string;
  name: string;
  description: string;
}

interface DropCardPayload {
  cardId: string;
  statusId: string;
}

interface AddCardPayload {
  name: string;
  description: string;
}

interface EditStatusPayload {
  id?: string;
  name: string;
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
    {
      id: 'card1',
      name: 'card 1',
      description: 'This is the card description that depicts its purpose',
    },
    {
      id: 'card2',
      name: 'card 2',
      description: 'This is the card description that depicts its purpose',
    },
    { id: 'card3', name: 'card 3', description: '' },
    {
      id: 'card4',
      name: 'card 4',
      description: 'This is the card description that depicts its purpose',
    },
    { id: 'card5', name: 'card 5', description: '' },
    { id: 'card6', name: 'card 6', description: '' },
    {
      id: 'card7',
      name: 'card 7',
      description: 'This is the card description that depicts its purpose',
    },
    {
      id: 'card8',
      name: 'card 8',
      description: 'This is the card description that depicts its purpose',
    },
    {
      id: 'card9',
      name: 'card 9',
      description: 'This is the card description that depicts its purpose',
    },
    {
      id: 'card10',
      name: 'card 10',
      description: 'This is the card description that depicts its purpose',
    },
    {
      id: 'card11',
      name: 'card 11',
      description: 'This is the card description that depicts its purpose',
    },
    { id: 'card12', name: 'card 12', description: '' },
    {
      id: 'card13',
      name: 'card 13',
      description: 'This is the card description that depicts its purpose',
    },
  ],
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    dropCard: (state, action: PayloadAction<DropCardPayload>) => {
      const { cardId, statusId } = action.payload;

      if (!statusId) return;

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

    addCard: (state, action: PayloadAction<AddCardPayload>) => {
      const { name, description } = action.payload;

      const maxId: number = Math.max(
        ...state.cards
          .map((card) => card.id)
          .map((cardId) => Number(cardId.split('card')[1]))
      );

      const cardId = `card${maxId + 1}`;

      state.cards.push({ id: cardId, name, description });

      state.statuses[0].cardIds.push(cardId);
    },

    editCard: (state, action: PayloadAction<EditCardPayload>) => {
      const { id, name, description } = action.payload;

      state.cards = state.cards.map((card) =>
        card.id === id ? { ...card, name, description } : card
      );
    },

    addStatus: (state, action: PayloadAction<string>) => {
      const name: string = action.payload;

      const maxId: number = Math.max(
        ...state.statuses
          .map((status) => status.id)
          .map((statusId) => Number(statusId.split('card')[1]))
      );

      state.statuses.push({ id: `status${maxId + 1}`, name, cardIds: [] });
    },

    editStatus: (state, action: PayloadAction<EditStatusPayload>) => {
      const { id, name } = action.payload;

      state.statuses = state.statuses.map((status) =>
        status.id === id ? { ...status, name } : status
      );
    },

    deleteStatus: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const actualStatus = state.statuses.find((status) => status.id === id);

      if (actualStatus && !actualStatus.cardIds.length) {
        state.statuses = state.statuses.filter((status) => status.id !== id);
      }
    },
  },
});

export const {
  dropCard,
  deleteCard,
  addCard,
  editCard,
  addStatus,
  editStatus,
  deleteStatus,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
