import { useState } from 'react';
import InputCard from '../components/input-card';
import AddConstraintDialog from '../components/add-constraint-dialog';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import AddContextDialog from './add-context-dialog';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Provider } from 'react-redux';
import { store } from '../store';
import { getAll } from 'me40321-database';

import {
  useCheckReadyToFinishQuery,
  useFinishMutation,
  useSetConstraintsMutation,
  useSetContextMutation,
} from '../api-client';

type Props = {
  setFinished: Function;
};

export type property = {
  name: string;
  group: string;
  type: string;
  unit: string;
  options: string[];
  value?: any;
};

let rawProperties: any = {};
const allProperties: property[] = [];
const allGroups: string[] = [];
const namesMap = new Map<string, any>();

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
    namesMap.set(value.name, { shortName: value.shortName, mult: value.units.siMultiplier });
  }
}
(async () => {
  rawProperties = await getAll();
  sortProps();
})();

const inputColumn: React.FC<Props> = ({ setFinished }) => {
  const { data: ready, refetch } = useCheckReadyToFinishQuery(null, {
    pollingInterval: 3000,
  });
  const [finish] = useFinishMutation();
  const [sendConstraintsSet] = useSetConstraintsMutation();
  const [sendContextSet] = useSetContextMutation();

  const [addConstOpenFlag, setAddConstOpenFlag] = useState(false);
  const [constraints, setConstraintsInList] = useState<Array<property>>([]);
  const [constraintsExpanded, setConstraintsExpanded] = useState(false);

  const [addContextOpenFlag, setAddContextOpenFlag] = useState(false);
  const [contexts, setContextsInList] = useState<Array<property>>([]);
  const [contextExpanded, setContextExpanded] = useState(false);

  const prepareAndSend = (list: Array<property>, restraintType: string) => {
    const result: any[] = [];
    for (let i = 0; i < list.length; i++) {
      const mult = namesMap.get(list[i].name).mult;
      switch (list[i].type) {
        case 'quant':
        case 'range':
          if (list[i].value.max !== null && list[i].value.min !== null) {
            result.push({
              propKey: namesMap.get(list[i].name).shortName,
              value: {
                max: parseFloat(list[i].value.max) / mult,
                min: parseFloat(list[i].value.min) / mult,
              },
            });
          }
          break;
        case 'list':
        case 'qual':
          if (list[i].value.val !== null) {
            result.push({
              propKey: namesMap.get(list[i].name).shortName,
              value: {
                val: (() => {
                  if (isNaN(list[i].value.val)) {
                    return list[i].value.val;
                  } else {
                    return parseFloat(list[i].value.val) / mult;
                  }
                })(),
              },
            });
          }
          break;
      }
    }
    if (result.length > 0) {
      if (restraintType === 'constraint') {
        sendConstraintsSet({ value: result });
      }
      if (restraintType === 'context') {
        sendContextSet({ value: result });
      }
    }
  };

  const updateConstraintValue = (propName: string, limit: string, value: number | string) => {
    const tempConstraints: Array<property> = [];
    for (let i = 0; i < constraints.length; i++) {
      tempConstraints.push(JSON.parse(JSON.stringify(constraints[i])));
      if (constraints[i].name === propName) {
        tempConstraints[i].value[limit] = value;
      }
    }
    setConstraintsInList(tempConstraints);
    prepareAndSend(contexts, 'context');
    prepareAndSend(constraints, 'constraint');
  };

  const updateContextValue = (propName: string, limit: string, value: number | string) => {
    const tempContext: Array<property> = [];
    for (let i = 0; i < contexts.length; i++) {
      tempContext.push(JSON.parse(JSON.stringify(contexts[i])));
      if (contexts[i].name === propName) {
        tempContext[i].value[limit] = value;
      }
    }
    setContextsInList(tempContext);
    prepareAndSend(contexts, 'context');
    prepareAndSend(constraints, 'constraint');
  };

  const addConstraint = (prop: property) => {
    setConstraintsExpanded(true);
    if (!constraints.includes(prop)) {
      const tempConstraints: Array<property> = [...constraints];
      tempConstraints.unshift(prop);
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

  const addContext = (prop: property) => {
    setContextExpanded(true);
    if (!contexts.includes(prop)) {
      const tempContexts: Array<property> = [...contexts];
      tempContexts.push(prop);
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
    <Box
      boxShadow={1}
      sx={{
        ml: 1,
        p: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        width: 308,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          ml: -1,
          mt: -1,
          width: 308,
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant='outlined'
          endIcon={<AddIcon />}
          sx={{ fontSize: 12, width: 142 }}
          onClick={() => {
            setAddConstOpenFlag(true);
          }}
        >
          Constraint
        </Button>
        <Button
          variant='outlined'
          endIcon={<AddIcon />}
          sx={{ fontSize: 12, width: 142 }}
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
        disabled={(() => {
          if (ready === undefined) {
            return false;
          } else {
            return !ready.data;
          }
        })()}
        sx={{ fontSize: 12, p: 1, ml: 0, mt: -1, width: 292 }}
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
      <Box sx={{ ml: -1 }}>
        <Box
          sx={{
            ml: 1,
            width: 292,
            mt: 1,
            mb: 0,
            border: 1,
            borderColor: '#DDD',
            boxShadow: 1,
            borderRadius: 1,
          }}
        >
          <Accordion expanded={constraintsExpanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              onClick={() => {
                setConstraintsExpanded(!constraintsExpanded);
              }}
            >
              <Typography>{`View Constraints (${constraints.length})`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ ml: -2, mt: -4, mb: -2 }}>
                {constraints?.map((constraint) => {
                  return (
                    <InputCard
                      key={constraint.name}
                      propName={constraint.name}
                      propType={constraint.type}
                      units={constraint.unit}
                      options={constraint.options}
                      remover={removeConstraint}
                      valueSetter={updateConstraintValue}
                      currentValue={constraint.value}
                    />
                  );
                })}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={contextExpanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              onClick={() => {
                setContextExpanded(!contextExpanded);
              }}
            >
              <Typography>{`View Context (${contexts.length})`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ ml: -2, mt: -4, mb: -2 }}>
                {contexts?.map((context) => {
                  return (
                    <InputCard
                      key={context.name}
                      propName={context.name}
                      propType={context.type}
                      units={context.unit}
                      options={context.options}
                      remover={removeContext}
                      valueSetter={updateContextValue}
                      currentValue={context.value}
                    />
                  );
                })}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
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
      </Box>
    </Box>
  );
};

export default inputColumn;
