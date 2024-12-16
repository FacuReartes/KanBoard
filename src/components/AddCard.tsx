import { addCard } from '@/state/kanban/kanbanSlice';
import { AppDispatch } from '@/state/store';
import { Close } from '@mui/icons-material';
import { Box, Button, IconButton, Input, Modal, Typography } from '@mui/material';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IAddCard {
  open: boolean;
  handleClose: () => void;
}

const AddCard: FC<IAddCard> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(addCard(name));
    handleAddClose();
  };

  const handleAddClose = () => {
    setName('');
    props.handleClose()
  }

  return (
    <Modal
      open={props.open}
      onClose={handleAddClose}
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
            border: 2,
            borderColor: 'secondary.main',
            borderRadius: 3,
            px: 4,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Add a Card
          </Typography>
          <Input
            placeholder="Card name..."
            sx={{ mb: 2 }}
            required
            value={name}
            onChange={handleNameChange}
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
            Add Card
          </Button>
          <IconButton 
            onClick={handleAddClose}
            sx={{
              position: 'absolute',
              top: 5,
              right: 5,
              padding: 0.5
            }}
          >
            <Close/>
          </IconButton>
        </Box>
      </form>
    </Modal>
  );
};

export default AddCard;
