import { useModal } from '@/hooks/useModal';
import { addBoard, deleteBoard, editBoard } from '@/state/kanban/kanbanSlice';
import { AppDispatch } from '@/state/store';
import { Close, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IBoardModal {
  open: boolean;
  handleClose: () => void;
  modalAction: 'add' | 'edit';
  name?: string;
  boardId?: string;
}

const BoardModal: FC<IBoardModal> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>(props.name ?? '');

  useEffect(() => {
    setName(props.name ?? '');
  }, [props.name]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCloseModal = () => {
    setName(props.name ?? '');
    props.handleClose();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (props.modalAction === 'add') {
      dispatch(addBoard(name));
      setName('');
    } else if (props.modalAction === 'edit') {
      dispatch(editBoard({ name, id: props.boardId }));
    }
    props.handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteBoard(props.boardId!));
    props.handleClose();
  };

  return (
    <Modal
      open={props.open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            translate: '-50% -50%',
            backgroundColor: 'white',
            borderColor: 'secondary.main',
            borderRadius: 3,
            px: 4,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Edit Board
          </Typography>
          <TextField
            label="Board name..."
            variant="standard"
            required
            value={name}
            onChange={handleNameChange}
            sx={{ mb: 2 }}
            slotProps={{
              htmlInput: {
                maxLength: 14,
              },
            }}
          />
          <Button
            sx={{
              textTransform: 'none',
              color: 'common.white',
              bgcolor: 'primary.light',
              ':hover': {
                bgcolor: 'primary.main',
              },
              alignSelf: 'end',
            }}
            type="submit"
          >
            Save
          </Button>

          {props.modalAction === 'edit' && (
            <>
              <Typography sx={{ opacity: 1, my: 0.5 }}>Danger Zone</Typography>
              <Box
                sx={{
                  bgcolor: 'grey.500',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 1,
                }}
              >
                <Typography>Delete Board</Typography>
                <IconButton
                  sx={{ bgcolor: 'warning.main', borderRadius: 1 }}
                  size="small"
                  onClick={handleDelete}
                >
                  <Delete sx={{ color: 'common.white' }} />
                </IconButton>
              </Box>
            </>
          )}

          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 5,
              right: 5,
              padding: 0.5,
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </form>
    </Modal>
  );
};

export default BoardModal;
