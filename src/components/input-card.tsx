import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { width } from '@mui/system';
import AddCircle from '@mui/icons-material/AddCircle';

type Props = {
  propName: string;
  propType: string;
};

const InputCard: React.FC<Props> = ({ propName, propType }) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        width: 300,
      }}
    >
      <Box sx={{ color: 'text.secondary' }}>{propName}</Box>
      <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>98.3 K</Box>
      <Box
        component={AddCircle}
        sx={{ color: 'success.dark', fontSize: 16, verticalAlign: 'sub' }}
      />
      <Box
        sx={{
          color: 'success.dark',
          display: 'inline',
          fontWeight: 'medium',
          mx: 0.5,
        }}
      >
        18.77%
      </Box>
      <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>vs. last week</Box>
    </Box>
  );
};

export default InputCard;
