import { useState } from 'react';
import OutputColumn from '../components/output-column';
import InputColumn from '../components/input-column';
import MiddleColumn from '../components/middle-column';
import MainAppBar from '../components/MainAppBar';
import Box, { BoxProps } from '@mui/material/Box';
import * as React from 'react';

function App() {
  return (
    <>
      <MainAppBar />
      <div style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', borderRadius: 1 }}>
          <Box sx={{ width: 290 }}>Constraints and Context{<InputColumn />}</Box>
          <Box sx={{ width: '90%', flexShrink: 1, height: '100vh', mt: -20 }}>
            Design Viewer {<MiddleColumn />}
          </Box>
          <Box sx={{ width: 290 }}>Results {<OutputColumn />}</Box>
        </Box>
      </div>
    </>
  );
}

export default App;
