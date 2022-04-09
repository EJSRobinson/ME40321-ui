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
  allGroups: string[];
  openFlagSetter: (value: boolean) => void;
  onClose: (value: property) => void;
}

const addConstraintDialog: React.FC<SimpleDialogProps> = (props) => {
  const [group, setGroup] = useState('');
  const [prop, setProp] = useState<any>({});
  const { onClose, open, openFlagSetter, allProperties, allGroups } = props;

  const handleCancel = () => {
    openFlagSetter(false);
    setGroup('');
    setProp({});
  };

  const handleConfirm = () => {
    onClose(prop);
    openFlagSetter(false);
    setGroup('');
    setProp({});
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
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
              {allGroups?.map((groupName) => {
                if (groupName !== 'Context') {
                  return (
                    <MenuItem key={`${Math.random()}`} value={groupName}>
                      {groupName}
                    </MenuItem>
                  );
                }
              })}
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
                {allProperties?.map((property) => {
                  if (group === property.group) {
                    return (
                      <MenuItem key={`${Math.random()}`} value={property}>
                        {property.name}
                      </MenuItem>
                    );
                  }
                })}
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
          disabled={prop === ''}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default addConstraintDialog;
