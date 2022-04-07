import { useState } from 'react';
import OutputColumn from '../components/output-column';
import InputColumn from '../components/input-column';
import MainAppBar from '../components/MainAppBar';
import Box, { BoxProps } from '@mui/material/Box';

function App() {
  const testValue = {
    typeName: 'quant',
    max: 12345,
    min: 1,
  };

  const testValue2 = {
    typeName: 'quant',
    val: 'Aluminium',
  };

  return (
    <>
      <MainAppBar />
      <div style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', borderRadius: 1 }}>
          <Box sx={{ width: 290 }}>Constraints and Context{<InputColumn />}</Box>
          <Box sx={{ flexGrow: 1 }}>Design Viewer</Box>
          <Box sx={{ width: 290 }}>Results {<OutputColumn />}</Box>
        </Box>
      </div>
    </>
  );
}

export default App;
