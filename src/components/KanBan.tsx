import { Box } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'
import Board from './Board'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'

const KanBan = () => {

  const boards = useSelector((state: RootState) => state.kanban.boards)

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      overflow: 'hidden' 
    }}>
      <Sidebar/>
      <Board id={boards[0].id} name={boards[0].name} statusIds={boards[0].statusIds}/>
    </Box>
  )
}

export default KanBan