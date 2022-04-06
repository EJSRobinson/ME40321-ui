import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { width } from '@mui/system';
import AddCircle from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

type Props = {
  propName: string;
  propType: string;
  units: string;
};

const InputCard: React.FC<Props> = ({ propName, propType, units }) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        p: 1,
        m: 1,
        width: 275,
      }}
    >
      <Box sx={{ color: 'text.primary', fontWeight: 600 }}>{propName}</Box>
      {(propType === 'quant' || propType === 'range') && (
        <>
          <TextField
            id='max'
            label='Maximum'
            variant='standard'
            type='number'
            sx={{
              color: 'text.primary',
              width: 100,
              mr: 1,
            }}
          />
          <TextField
            id='min'
            label='Minimum'
            variant='standard'
            type='number'
            sx={{
              color: 'text.primary',
              width: 100,
              mr: 1,
            }}
          />
        </>
      )}
      {propType === 'list' && (
        <>
          <FormControl variant='standard' sx={{ width: 208, mr: 1 }}>
            <InputLabel id='select-label'>Selection</InputLabel>
            <Select labelId='select-label' id='list-select' label='Choose Option'>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
      {propType === 'qual' && (
        <>
          <TextField
            id='val'
            label='Value'
            variant='standard'
            type='number'
            sx={{
              color: 'text.primary',
              width: 208,
              mr: 1,
            }}
          />
        </>
      )}
      <Box
        sx={{
          color: 'text.secondary',
          mt: 3,
          display: 'inline-flex',
        }}
      >
        {units}
      </Box>
    </Box>
  );
};

export default InputCard;
