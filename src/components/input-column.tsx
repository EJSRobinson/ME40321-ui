import { useState } from 'react';
import InputCard from '../components/input-card';
import AddConstraintDialog from '../components/add-constraint-dialog';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import AddContextDialog from './add-constext-dialog';

import { useCheckReadyToFinishQuery, useFinishMutation } from '../api-client';

type Props = {
  setFinished: Function;
};

const inputColumn: React.FC<Props> = ({ setFinished }) => {
  const [finish] = useFinishMutation();

  const [addConstOpenFlag, setAddConstOpenFlag] = useState(false);
  const [constraints, setConstraintsInList] = useState<Array<string>>([]);

  const [addContextOpenFlag, setAddContextOpenFlag] = useState(false);
  const [contexts, setContextsInList] = useState<Array<string>>([]);

  const addConstraint = (propName: string) => {
    if (!constraints.includes(propName)) {
      const tempConstraints: Array<string> = [...constraints];
      tempConstraints.push(propName);
      setConstraintsInList(tempConstraints);
    }
  };

  const removeConstraint = (propName: string) => {
    const tempConstraints: Array<string> = [...constraints];
    tempConstraints.splice(tempConstraints.indexOf(propName), 1);
    setConstraintsInList(tempConstraints);
  };

  const addContext = (propName: string) => {
    if (!contexts.includes(propName)) {
      const tempContexts: Array<string> = [...contexts];
      tempContexts.push(propName);
      setContextsInList(tempContexts);
    }
  };

  const removeContext = (propName: string) => {
    const tempContexts: Array<string> = [...contexts];
    tempContexts.splice(tempContexts.indexOf(propName), 1);
    setContextsInList(tempContexts);
  };

  return (
    <>
      {contexts?.map((context) => {
        return (
          <InputCard
            key={context}
            propName={context}
            propType={'quant'}
            units={'kg'}
            remover={removeContext}
          />
        );
      })}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          width: 275,
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant='outlined'
          endIcon={<AddIcon />}
          sx={{ fontSize: 12 }}
          onClick={() => {
            setAddConstOpenFlag(true);
          }}
        >
          Constraint
        </Button>
        <Button
          variant='outlined'
          endIcon={<AddIcon />}
          sx={{ fontSize: 12 }}
          onClick={() => {
            setAddContextOpenFlag(true);
          }}
        >
          Context
        </Button>
      </Box>
      <Button
        variant='outlined'
        endIcon={<SendIcon />}
        sx={{ fontSize: 12, p: 1, m: 1, width: 275 }}
        onClick={async () => {
          const result = (await finish(null)) as any;
          if (result.data.status === 'Ok') {
            setFinished(true);
          } else {
            setFinished(false);
          }
        }}
      >
        Finish
      </Button>
      <AddConstraintDialog
        open={addConstOpenFlag}
        onClose={addConstraint}
        openFlagSetter={setAddConstOpenFlag}
      />
      <AddContextDialog
        open={addContextOpenFlag}
        onClose={addContext}
        openFlagSetter={setAddContextOpenFlag}
      />
    </>
  );
};

export default inputColumn;
