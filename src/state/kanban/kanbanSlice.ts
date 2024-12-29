import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICard {
  name: string;
  id: string;
  description: string;
  listWidth?: any
}

export interface IStatus {
  id: string;
  name: string;
  cardIds: string[];
  handleOpenAlert?: (alertMsg: string) => void;
  listWidth?: any
}

export interface IBoards {
  id: string;
  name: string;
  statusIds: string[];
}

export interface KanbanState {
  statuses: IStatus[];
  cards: ICard[];
  boards: IBoards[];
  activeBoard: string;
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
  boardId?: string;
}

interface EditStatusPayload {
  id?: string;
  name: string;
}

interface EditBoardPayload {
  id?: string;
  name: string;
}

interface AddStatusPayload {
  name: string;
  boardId?: string;
}

let initialState: KanbanState = {
  
  activeBoard: 'board1',

  boards: [
    {
      id: 'board1',
      name: 'First Board',
      statusIds: ['status1', 'status2', 'status3', 'status4'],
    },
  ],

  statuses: [
    {
      id: 'status1',
      name: 'To Do',
      cardIds: ['card1', 'card2', 'card3'],
    },
    { id: 'status2', name: 'In Progress', cardIds: ['card4', 'card5'] },
    {
      id: 'status3',
      name: 'In Review',
      cardIds: [],
    },
    { id: 'status4', name: 'Done', cardIds: ['card6'] },
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
    {
      id: 'card3',
      name: 'card 3',
      description: 'This is the card description that depicts its purpose',
    },
    {
      id: 'card4',
      name: 'card 4',
      description: 'This is the card description that depicts its purpose',
    },
    {
      id: 'card5',
      name: 'card 5',
      description: 'This is the card description that depicts its purpose',
    },
    {
      id: 'card6',
      name: 'card 6',
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
      const { name, description, boardId } = action.payload;

      const cardIdList = state.cards.map((card) => card.id);

      const maxId: number = cardIdList.length
        ? Math.max(
            ...cardIdList.map((cardId) => Number(cardId.split('card')[1]))
          )
        : 0;

      const cardId = `card${maxId + 1}`;

      state.cards.push({ id: cardId, name, description });

      const initialStatusId = state.boards.find((board) => board.id === boardId)
        ?.statusIds[0];

      initialStatusId &&
        state.statuses
          .find((status) => status.id === initialStatusId)
          ?.cardIds.push(cardId);
    },

    editCard: (state, action: PayloadAction<EditCardPayload>) => {
      const { id, name, description } = action.payload;

      state.cards = state.cards.map((card) =>
        card.id === id ? { ...card, name, description } : card
      );
    },

    addStatus: (state, action: PayloadAction<AddStatusPayload>) => {
      const { name, boardId } = action.payload;

      const statusIdList = state.statuses.map((status) => status.id);

      const maxId: number = statusIdList.length
        ? Math.max(
            ...statusIdList.map((statusId) =>
              Number(statusId.split('status')[1])
            )
          )
        : 0;

      state.statuses.push({ id: `status${maxId + 1}`, name, cardIds: [] });

      state.boards.forEach((board) => {
        if (board.id === boardId) {
          board.statusIds.push(`status${maxId + 1}`);
        }
      });
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

      state.boards.forEach((board) => {
        board.statusIds = board.statusIds.filter((statusId) => statusId !== id);
      });
    },

    editBoard: (state, action: PayloadAction<EditBoardPayload>) => {
      const { id, name } = action.payload;

      state.boards = state.boards.map((board) =>
        board.id === id ? { ...board, name } : board
      );
    },

    addBoard: (state, action: PayloadAction<string>) => {
      const name: string = action.payload;

      const boardIdList = state.boards.map((board) => board.id);

      const maxId: number = boardIdList.length
        ? Math.max(
            ...boardIdList.map((boardId) => Number(boardId.split('board')[1]))
          )
        : 0;

      const newBoardId = `board${maxId + 1}`;

      state.boards.push({ id: newBoardId, name, statusIds: [] });
      state.activeBoard = newBoardId;
    },

    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.activeBoard = action.payload;
    },

    initializeState: (state, action: PayloadAction<string>) => {
      const newState = JSON.parse(action.payload);
      Object.assign(state, newState);
    },

    importState: (state, action: PayloadAction<KanbanState>) => {

      const newState = action.payload;

      Object.entries(newState).forEach(([key, value]) => {
        if (state.hasOwnProperty(key)) {
          state[key as keyof KanbanState] = value;
        }
      })

    }
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
  editBoard,
  addBoard,
  setActiveBoard,
  initializeState,
  importState
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
