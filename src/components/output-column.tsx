import { useState } from 'react';
import OutputCard from './output-card';
import { useGetFinishedResultQuery } from '../api-client';
import React, { useEffect } from 'react';
import { valueToPercent } from '@mui/base';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

function reviver(key: any, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

function cleanResults(results: any) {
  const sf = 3;
  for (let i = 0; i < results.length; i++) {
    const result: any = results[i];
    switch (result.value.typeName) {
      case 'quant':
      case 'range':
        result.value.max = (result.value.max * result.units.siMultiplier).toPrecision(sf);
        result.value.min = (result.value.min * result.units.siMultiplier).toPrecision(sf);
        break;
      case 'qual':
        result.value.val = (result.value.val * result.units.siMultiplier).toPrecision(sf);
        break;
    }
  }
  return results;
}

type Props = {
  finished: any;
};
const outputColumn: React.FC<Props> = ({ finished }) => {
  const [results, setResultsList] = useState<Array<any>>([]);
  const { data: rawResults, refetch } = useGetFinishedResultQuery(null);
  const [groups, setGroupsList] = useState<Array<any>>([]);

  function populateGroup(results1: any[]) {
    const newGroups: any = [];
    for (let i = 0; i < results1.length; i++) {
      const result: any = results1[i];
      if (!newGroups.includes(result.group)) {
        newGroups.push(result.group);
      }
    }
    setGroupsList(newGroups);
  }

  useEffect(() => {
    if (finished) {
      refetch();
    }
  }, [finished]);

  useEffect(() => {
    if (rawResults) {
      const newResults: any[] = [];
      const mappedResults = JSON.parse(rawResults.data, reviver);
      for (const [key, value] of mappedResults.entries()) {
        newResults.push(value);
      }
      setResultsList(cleanResults(newResults));
      populateGroup(newResults);
    }
  }, [rawResults]);

  return (
    <Box sx={{ mr: 1 }}>
      {groups?.map((group) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>{group}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {results?.map((result) => {
                if (result.group === group) {
                  return (
                    <OutputCard
                      key={result.name}
                      propName={result.name}
                      propType={result.value.typeName}
                      units={result.units.displayUnits}
                      quantValue={result.value}
                    />
                  );
                }
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default outputColumn;
