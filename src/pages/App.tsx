import { useState } from 'react';
import InputCard from '../components/input-card';
import OutputCard from '../components/output-card';

function App() {
  const [count, setCount] = useState(0);

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
      <InputCard propName={'Static Stability Margin'} propType={'quant'} units={'kg'} />
      <InputCard propName={'Material'} propType={'list'} units={'kg'} />
      <InputCard propName={'Reference Area'} propType={'qual'} units={'m²'} />
      <OutputCard propName={'Lift Force'} propType={'quant'} units={'N'} quantValue={testValue} />
      <OutputCard propName={'Material'} propType={'quant'} units={'None'} qualValue={testValue2} />
    </>
  );
}

export default App;
