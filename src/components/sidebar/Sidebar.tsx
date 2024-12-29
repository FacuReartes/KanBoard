import {
  Alert,
  Box,
  IconButton,
  List,
  ListItemButton,
  Snackbar,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, FC, useRef, useState } from 'react';
import BoardItem from './BoardItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '@/state/store';
import BoardModal from '../modals/BoardModal';
import { DashboardCustomize, Download, Upload } from '@mui/icons-material';
import { useModal } from '@/hooks/useModal';
import { importState } from '@/state/kanban/kanbanSlice';

const Sidebar: FC = () => {
  const { openModal, handleCloseModal, handleOpenModal } = useModal();

  const boards = useSelector((state: RootState) => state.kanban.boards);
  const dispatch = useDispatch<AppDispatch>();

  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const renderBoardItems = boards.map((board) => (
    <BoardItem key={board.id} name={board.name} id={board.id} />
  ));

  const inputFile = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = JSON.stringify(store.getState().kanban);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'kanboard.json';
    a.click();
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    event.target.value = '';
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && typeof e.target.result === 'string') {
        try {
          let jsonData = JSON.parse(e.target.result);
          dispatch(importState(jsonData));
        } catch (err) {
          setOpenAlert(true);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <Box
      sx={{
        px: 5,
        width: 300,
        pt: 3,
        bgcolor: 'primary.main',
        position: 'relative',
      }}
    >
      <Typography variant="h4" component="h1" color="common.white">
        KanBoard
      </Typography>

      <List
        sx={{
          gap: 3,
          pt: 4,
        }}
      >
        {renderBoardItems}
        <ListItemButton
          onClick={handleOpenModal}
          sx={{
            border: 2,
            borderRadius: 3,
            justifyContent: 'flex-start',
            fontSize: 20,
            mb: 2,
            borderStyle: 'dashed',
            borderColor: 'common.white',
            color: 'common.white',
          }}
        >
          <DashboardCustomize sx={{ mr: 1 }} />
          <Typography>New Board</Typography>
        </ListItemButton>
      </List>

      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          display: 'flex',
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <IconButton onClick={handleExport}>
            <Download sx={{ color: 'common.white' }} />
          </IconButton>
          <Typography sx={{ color: 'common.white', lineHeight: 0.2 }}>
            Export
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <IconButton onClick={() => inputFile.current?.click()}>
            <Upload sx={{ color: 'common.white' }} />
          </IconButton>
          <Typography sx={{ color: 'common.white', lineHeight: 0.2 }}>
            Import
          </Typography>
        </Box>
      </Box>

      <input
        accept="application/JSON"
        type="file"
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={handleImport}
      />

      <BoardModal
        open={openModal}
        handleClose={handleCloseModal}
        modalAction="add"
      />

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="error"
          variant="standard"
          sx={{ width: '100%' }}
        >
          'Invalid file type, JSON required'
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Sidebar;
