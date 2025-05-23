import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { property } from './input-column';

export interface SimpleDialogProps {
  open: boolean;
  allProperties: property[];
  openFlagSetter: (value: boolean) => void;
  onClose: (value: property) => void;
}

const AddContextDialog: React.FC<SimpleDialogProps> = (props) => {
  const [prop, setProp] = useState<any>(null);
  const { onClose, open, openFlagSetter, allProperties } = props;

  const handleCancel = () => {
    openFlagSetter(false);
    setProp({});
  };

  const handleConfirm = () => {
    onClose(prop);
    openFlagSetter(false);
    setProp({});
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle id='alert-dialog-title'>Add Context</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <FormControl variant='standard' sx={{ width: 208, mr: 1 }}>
            <InputLabel id='group-select-label'>Select Context</InputLabel>
            <Select
              labelId='group-select-label'
              id='group-select'
              label='Choose Option'
              defaultValue={''}
              onChange={(event) => setProp(event.target.value)}
            >
              {allProperties?.map((property1) => {
                if (property1.group === 'Context') {
                  property1.value = { max: null, min: null, val: null };
                  return (
                    // @ts-ignore
                    <MenuItem key={`${Math.random()}`} value={property1}>
                      {property1.name}
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          size='small'
          color='error'
          sx={{ width: 90, mr: 2 }}
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
        <Button
          variant='outlined'
          size='small'
          color='success'
          sx={{ width: 90, m: 2 }}
          onClick={() => handleConfirm()}
          disabled={prop === null}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddContextDialog;
