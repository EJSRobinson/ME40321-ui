import { useState } from 'react';
import InputCard from '../components/input-card';
import OutputCard from '../components/output-card';
import AddConstraintDialog from '../components/add-constraint-dialog';
import Button from '@mui/material/Button';

const constraints: Array<string> = [];

const addConstraint = (propName: string) => {
  constraints.push(propName);
  console.log(constraints);
};

const removeConstraint = (propName: string) => {
  constraints.splice(constraints.indexOf(propName), 1);
  console.log(constraints);
};

function App() {
  const [addConstOpenFlag, setAddConstOpenFlag] = useState(false);

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
      <InputCard
        propName={'Static Stability Margin'}
        propType={'quant'}
        units={'kg'}
        remover={removeConstraint}
      />
      <OutputCard propName={'Lift Force'} propType={'quant'} units={'N'} quantValue={testValue} />
      <OutputCard propName={'Material'} propType={'quant'} units={'None'} qualValue={testValue2} />
      {constraints?.map((constraint) => {
        return (
          <InputCard
            propName={constraint}
            propType={'quant'}
            units={'kg'}
            remover={removeConstraint}
          />
        );
      })}
      <Button
        variant='outlined'
        onClick={() => {
          setAddConstOpenFlag(true);
        }}
      >
        Add new constraint
      </Button>
      <AddConstraintDialog
        open={addConstOpenFlag}
        onClose={addConstraint}
        openFlagSetter={setAddConstOpenFlag}
      />
    </>
  );
}

export default App;
