import { DragEndEvent } from '@dnd-kit/core';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITask {
  name: string;
  id: string;
}

export interface IStatus {
  id: string;
  name: string;
  taskIds: string[];
}

export interface KanbanState {
  statuses: IStatus[];
  tasks: ITask[];
}

const initialState: KanbanState = {
  // Y si uso hashmap aca?
  statuses: [
    {
      id: 'status1',
      name: 'To Do',
      taskIds: ['task1', 'task2', 'task3', 'task4'],
    },
    { id: 'status2', name: 'In Progress', taskIds: ['task5', 'task6'] },
    {
      id: 'status3',
      name: 'In Review',
      taskIds: ['task7', 'task8', 'task9', 'task10'],
    },
    { id: 'status4', name: 'Done', taskIds: ['task11', 'task12', 'task13'] },
  ],

  tasks: [
    { id: 'task1', name: 'task 1' },
    { id: 'task2', name: 'task 2' },
    { id: 'task3', name: 'task 3' },
    { id: 'task4', name: 'task 4' },
    { id: 'task5', name: 'task 5' },
    { id: 'task6', name: 'task 6' },
    { id: 'task7', name: 'task 7' },
    { id: 'task8', name: 'task 8' },
    { id: 'task9', name: 'task 9' },
    { id: 'task10', name: 'task 10' },
    { id: 'task11', name: 'task 11' },
    { id: 'task12', name: 'task 12' },
    { id: 'task13', name: 'task 13' },
  ],
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    dropTask: (state, action: PayloadAction<DragEndEvent>) => {
      const { active, over } = action.payload;

      if (!over) return;

      const taskId = active.id as string;
      const statusId = over.id as string;

      const oldStatus = state.statuses.find((x) => x.taskIds.includes(taskId));

      if (oldStatus && statusId !== oldStatus.id) {
        state.statuses.forEach((status) => {
          if (status.id === oldStatus.id)
            status.taskIds.splice(status.taskIds.indexOf(taskId), 1);

          if (status.id === statusId) status.taskIds.push(taskId);
        });
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;

      state.statuses.forEach(
        (status) =>
          (status.taskIds = status.taskIds.filter((id) => taskId !== id))
      );

      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },

    addCard: (state, action: PayloadAction<string>) => {
      const name: string = action.payload;

      const maxId: number = Math.max(
        ...state.tasks
          .map((task) => task.id)
          .map((taskId) => Number(taskId.split('task')[1]))
      );

      const taskId = `task${maxId + 1}`;

      state.tasks.push({ id: taskId, name });

      state.statuses[0].taskIds.push(taskId);
    },
  },
});

export const { dropTask, deleteTask, addCard } = kanbanSlice.actions;

export default kanbanSlice.reducer;
