import { useState } from 'react';
import Elliot from '../components/Elliot';
import InputCard from '../components/input-card';
import inputCard from '../components/input-card';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <InputCard propName={'Static Stability Margin'} propType={'quant'} units={'kg'} />
      <InputCard propName={'Material'} propType={'list'} units={'kg'} />
    </>
  );
}

export default App;
