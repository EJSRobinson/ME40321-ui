import { useState } from 'react';
import InputCard from '../components/input-card';
import OutputCard from '../components/output-card';
import AddConstraintDialog from '../components/add-constraint-dialog';
import Button from '@mui/material/Button';

function inputColumn() {
  const [addConstOpenFlag, setAddConstOpenFlag] = useState(false);
  const [constraints, setConstraintsInList] = useState<Array<string>>([]);

  const addConstraint = (propName: string) => {
    const tempConstraints: Array<string> = [...constraints];
    tempConstraints.push(propName);
    setConstraintsInList(tempConstraints);
  };

  const removeConstraint = (propName: string) => {
    const tempConstraints: Array<string> = [...constraints];
    tempConstraints.splice(tempConstraints.indexOf(propName), 1);
    setConstraintsInList(tempConstraints);
  };

  return (
    <>
      {constraints?.map((constraint) => {
        return (
          <InputCard
            key={constraint}
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

export default inputColumn;
