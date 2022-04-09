import { useState } from 'react';
import InputCard from '../components/input-card';
import AddConstraintDialog from '../components/add-constraint-dialog';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import AddContextDialog from './add-context-dialog';

import { Provider } from 'react-redux';
import { store } from '../store';
import { getAll } from 'me40321-database';

import { useCheckReadyToFinishQuery, useFinishMutation } from '../api-client';

type Props = {
  setFinished: Function;
};

export type property = {
  name: string;
  group: string;
  type: string;
  unit: string;
  options: string[];
};

let rawProperties: any = {};
const allProperties: property[] = [];
const allGroups: string[] = [];

function sortProps() {
  for (const [key, value] of rawProperties.entries()) {
    allProperties.push({
      name: value.name,
      group: value.group,
      type: value.value.typeName,
      unit: value.units.displayUnits,
      options: (() => {
        if (value.value.typeName === 'list') {
          return value.value.options;
        } else {
          return [];
        }
      })(),
    });
    if (!allGroups.includes(value.group)) {
      allGroups.push(value.group);
    }
  }
}
(async () => {
  rawProperties = await getAll();
  sortProps();
})();

const inputColumn: React.FC<Props> = ({ setFinished }) => {
  const [finish] = useFinishMutation();

  const [addConstOpenFlag, setAddConstOpenFlag] = useState(false);
  const [constraints, setConstraintsInList] = useState<Array<property>>([]);

  const [addContextOpenFlag, setAddContextOpenFlag] = useState(false);
  const [contexts, setContextsInList] = useState<Array<property>>([]);

  const addConstraint = (propName: property) => {
    if (!constraints.includes(propName)) {
      const tempConstraints: Array<property> = [...constraints];
      tempConstraints.push(propName);
      setConstraintsInList(tempConstraints);
    }
  };

  const removeConstraint = (propName: string) => {
    const tempConstraints: Array<property> = [];
    for (let i = 0; i < constraints.length; i++) {
      if (constraints[i].name !== propName) {
        tempConstraints.push(constraints[i]);
      }
    }
    setConstraintsInList(tempConstraints);
  };

  const addContext = (propName: property) => {
    if (!contexts.includes(propName)) {
      const tempContexts: Array<property> = [...contexts];
      tempContexts.push(propName);
      setContextsInList(tempContexts);
    }
  };

  const removeContext = (propName: string) => {
    const tempContext: Array<property> = [];
    for (let i = 0; i < contexts.length; i++) {
      if (contexts[i].name !== propName) {
        tempContext.push(contexts[i]);
      }
    }
    setContextsInList(tempContext);
  };

  return (
    <Provider store={store}>
      {contexts?.map((context) => {
        return (
          <InputCard
            key={`${Math.random()}`}
            propName={context.name}
            propType={context.type}
            units={context.unit}
            options={context.options}
            remover={removeContext}
          />
        );
      })}
      {constraints?.map((constraint) => {
        return (
          <InputCard
            key={`${Math.random()}`}
            propName={constraint.name}
            propType={constraint.type}
            units={constraint.unit}
            options={constraint.options}
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
        sx={{ fontSize: 12, p: 1, ml: 2, mt: -1, width: 258 }}
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
        allProperties={allProperties}
        allGroups={allGroups}
      />
      <AddContextDialog
        open={addContextOpenFlag}
        onClose={addContext}
        openFlagSetter={setAddContextOpenFlag}
        allProperties={allProperties}
      />
    </Provider>
  );
};

export default inputColumn;
