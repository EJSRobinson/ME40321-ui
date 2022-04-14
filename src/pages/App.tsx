import { useState } from 'react';
import OutputColumn from '../components/output-column';
import InputColumn from '../components/input-column';
import MiddleColumn from '../components/middle-column';
import MainAppBar from '../components/MainAppBar';
import Box, { BoxProps } from '@mui/material/Box';
import * as React from 'react';

function App() {
  const [finished, setFinishedFlag] = useState(false);
  function setFinished(result: boolean) {
    setFinishedFlag(result);
  }
  return (
    <>
      <MainAppBar />
      <div style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', borderRadius: 1, mt: 1 }}>
          <Box sx={{ width: 290 }}>
            <Box
              sx={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              Constraints and Context
            </Box>
            {<InputColumn setFinished={setFinished} />}
          </Box>
          <Box sx={{ width: '90%', flexShrink: 1, height: '100vh', mt: 0 }}>
            <Box
              sx={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              Design Viewer
            </Box>
            {
              <Box sx={{ width: '100%', height: '100vh', mt: -30 }}>
                <MiddleColumn finished={finished} />
              </Box>
            }
          </Box>
          <Box sx={{ width: 300 }}>
            {' '}
            <Box
              sx={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              Results
            </Box>{' '}
            {<OutputColumn finished={finished} />}
          </Box>
        </Box>
      </div>
    </>
  );
}

export default App;
