import { useState } from 'react';
import OutputColumn from '../components/output-column';
import InputColumn from '../components/input-column';
import MiddleColumn from '../components/middle-column';
import MainAppBar from '../components/MainAppBar';
import Box, { BoxProps } from '@mui/material/Box';
import * as React from 'react';

function App() {
  // const { data: ready, refetch } = useCheckReadyToFinishQuery(null, {
  //   pollingInterval: 3000,
  // });
  const [finished, setFinishedFlag] = useState(false);
  function setFinished(result: boolean) {
    setFinishedFlag(result);
    setTimeout(() => {
      setFinishedFlag(false);
    }, 5000);
  }
  return (
    <>
      <MainAppBar />
      <div style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', borderRadius: 1, mt: 1 }}>
          <Box sx={{ width: 290 }}>
            Constraints and Context{<InputColumn setFinished={setFinished} />}
          </Box>
          <Box sx={{ width: '90%', flexShrink: 1, height: '100vh', mt: 0 }}>
            Design Viewer
            {
              <Box sx={{ width: '100%', height: '100vh', mt: -15 }}>
                <MiddleColumn />
              </Box>
            }
          </Box>
          <Box sx={{ width: 290 }}>Results {<OutputColumn finished={finished} />}</Box>
        </Box>
      </div>
    </>
  );
}

export default App;
