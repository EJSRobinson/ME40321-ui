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
import Typography from '@mui/material/Typography';

type quantVal = {
  typeName: string;
  max: number;
  min: number;
};

type rangeVal = {
  typeName: string;
  max: Array<number>;
  min: Array<number>;
};

type listVal = {
  typeName: string;
  options: Array<string>;
  val: string;
};

type qualVal = {
  typeName: string;
  val: string;
};

type Props = {
  propName: string;
  propType: string;
  units: string;
  quantValue?: quantVal;
  rangeValue?: rangeVal;
  listValue?: listVal;
  qualValue?: qualVal;
};

const OuputCard: React.FC<Props> = ({
  propName,
  units,
  quantValue,
  rangeValue,
  listValue,
  qualValue,
}) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: 1,
        borderColor: '#BBB',
        boxShadow: 1,
        borderRadius: 1,
        p: 1,
        mb: 1,
        ml: -1,
        width: 275,
      }}
    >
      <Box sx={{ color: 'text.primary', fontWeight: 600 }}>{propName}</Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', color: 'text.secondary', fontSize: 12 }}>
        {quantValue && (
          <>
            <Box sx={{ width: 100, mr: 1 }}>Maximum</Box>
            <Box sx={{ width: 100, mr: 1 }}>Minimum</Box>
          </>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {quantValue && (
          <>
            <Box sx={{ width: 100, mr: 1 }}>{quantValue.max}</Box>
            <Box sx={{ width: 100, mr: 1 }}>{quantValue.min}</Box>
          </>
        )}
        {qualValue && <Box sx={{ textAlign: 'right', width: 200, mr: 2 }}>{qualValue.val}</Box>}
        <Box
          sx={{
            color: 'text.secondary',
            flexGrow: 1,
            textAlign: 'left',
          }}
        >
          {units}
        </Box>
      </Box>
    </Box>
  );
};

export default OuputCard;
