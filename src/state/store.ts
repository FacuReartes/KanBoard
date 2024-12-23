import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './kanban/kanbanSlice';

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('kanban', JSON.stringify(store.getState().kanban));
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
