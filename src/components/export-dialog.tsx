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
  openFlagSetter: (value: boolean) => void;
  onClose: (value: string) => void;
}

const AddExportDialog: React.FC<SimpleDialogProps> = (props) => {
  const [selection, setSelection] = useState<string>('');
  const { onClose, open, openFlagSetter } = props;

  const handleCancel = () => {
    openFlagSetter(false);
    setSelection('');
  };

  const handleConfirm = () => {
    onClose(selection);
    openFlagSetter(false);
    setSelection('');
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle id='alert-dialog-title'>Export Type</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <FormControl variant='standard' sx={{ width: 208, mr: 1 }}>
            <InputLabel id='group-select-label'>Select</InputLabel>
            <Select
              labelId='group-select-label'
              id='group-select'
              label='Choose Option'
              defaultValue={''}
              onChange={(event) => setSelection(event.target.value)}
            >
              <MenuItem key={`${Math.random()}`} value='cad'>
                CAD File (.stl)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Fn_V'>
                Normal Force vs Velocity (plot)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Fn_M'>
                Normal Force vs Mach Number (plot)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Fn_AoA'>
                Normal Force vs Angle of Attack (plot)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Fn_S'>
                Normal Force vs Span (plot)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='BM_S'>
                Bending Moment vs Span (plot)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Ang_S'>
                Deflection Angle vs Span (plot)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Defl_S'>
                Deflection vs Span (plot)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Fn_V_data'>
                Normal Force vs Velocity (.csv)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Fn_M_data'>
                Normal Force vs Mach Number (.csv)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Fn_AoA_data'>
                Normal Force vs Angle of Attack (.csv)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Fn_S_data'>
                Normal Force vs Span (.csv)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='BM_S_data'>
                Bending Moment vs Span (.csv)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Ang_S_data'>
                Deflection Angle vs Span (.csv)
              </MenuItem>
              <MenuItem key={`${Math.random()}`} value='Defl_S_data'>
                Deflection vs Span (.csv)
              </MenuItem>
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
          disabled={selection === ''}
          autoFocus
        >
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExportDialog;
