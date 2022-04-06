import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { SettingsOutlined } from '@mui/icons-material';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: void) => void;
}

function AddDialog(props: SimpleDialogProps) {
  const [group, setGroup] = useState('');
  const [prop, setProp] = useState('');
  const { onClose, open } = props;

  const handleClose = () => {
    setGroup('');
    setProp('');
    onClose();
  };

  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id='alert-dialog-title'>Add Constraint</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <FormControl variant='standard' sx={{ width: 208, mr: 1 }}>
            <InputLabel id='group-select-label'>Select Group</InputLabel>
            <Select
              labelId='group-select-label'
              id='group-select'
              label='Choose Option'
              defaultValue={''}
              onChange={(event) => setGroup(event.target.value)}
            >
              <MenuItem value={'Group0'}>Group 0</MenuItem>
              <MenuItem value={'Group1'}>Group 1</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {group !== '' && (
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <FormControl variant='standard' sx={{ width: 208, mr: 1 }}>
              <InputLabel id='prop-select-label'>Select Constraint</InputLabel>
              <Select
                labelId='prop-select-label'
                id='prop-select'
                label='Choose Option'
                defaultValue={''}
                onChange={(event) => setProp(event.target.value)}
              >
                <MenuItem value={'Kn'}>Kn</MenuItem>
                <MenuItem value={'M'}>Mach Number</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          size='small'
          color='error'
          sx={{ width: 90, mr: 2 }}
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
        <Button
          variant='outlined'
          size='small'
          color='success'
          sx={{ width: 90, m: 2 }}
          onClick={() => handleClose()}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const addConstraint: React.FC = () => {
  const [openFlag, setOpenFlag] = useState(false);
  const [selectedProp, setselectedProp] = useState('');

  const handleOpen = () => {
    setOpenFlag(true);
  };

  const handleClose = () => {
    setOpenFlag(false);
  };

  return (
    <>
      <Button variant='outlined' onClick={handleOpen}>
        Add new constraint
      </Button>
      <AddDialog open={openFlag} onClose={handleClose} />
    </>
  );
};

export default addConstraint;
