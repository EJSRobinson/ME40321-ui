import { useState } from 'react';
import InputCard from '../components/input-card';
import OutputCard from '../components/output-card';
import AddConstraintDialog from '../components/add-constraint-dialog';
import Button from '@mui/material/Button';
import InputColumn from '../components/input-column';
import MainAppBar from '../components/MainAppBar';

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
      <OutputCard propName={'Lift Force'} propType={'quant'} units={'N'} quantValue={testValue} />
      <OutputCard propName={'Material'} propType={'quant'} units={'None'} qualValue={testValue2} />
      <InputColumn />
    </>
  );
}

export default App;
