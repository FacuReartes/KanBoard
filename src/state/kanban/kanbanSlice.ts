'use client'
import { createSlice } from "@reduxjs/toolkit"

export interface ITask {
  name: string,
  id: number,
  statusId: number
}

export interface IStatus {
  id: number,
  name: string
}

export interface KanbanState {
  statuses: IStatus[]
  tasks: ITask[]
}

// Probablemente sea mejor que los statuses tengan los taskId y no visceversa
const initialState: KanbanState = {

  statuses: [
    { id: 1, name: 'To Do' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'In Review' },
    { id: 4, name: 'Done' }
  ],

  tasks: [
    { id: 1, name: 'task 1', statusId: 1 },
    { id: 2, name: 'task 2', statusId: 1 },
    { id: 3, name: 'task 3', statusId: 1 },
    { id: 4, name: 'task 4', statusId: 1 },
    { id: 5, name: 'task 5', statusId: 2 },
    { id: 6, name: 'task 6', statusId: 2 },
    { id: 7, name: 'task 7', statusId: 3 },
    { id: 8, name: 'task 8', statusId: 3 },
    { id: 9, name: 'task 9', statusId: 3 },
    { id: 10, name: 'task 10', statusId: 3 },
    { id: 11, name: 'task 11', statusId: 4 },
    { id: 12, name: 'task 12', statusId: 4 },
    { id: 13, name: 'task 13', statusId: 4 },
  ]

}

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {

  }
})

export const {} = kanbanSlice.actions

export default kanbanSlice.reducer