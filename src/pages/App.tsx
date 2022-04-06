import { useState } from 'react';
import Elliot from '../components/Elliot';
import InputCard from '../components/input-card';
import inputCard from '../components/input-card';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Elliot dog={12} cat={'Brian'} />
      <InputCard propName={'Static Stability Margin'} propType={'quant'} />
    </>
  );
}

export default App;
