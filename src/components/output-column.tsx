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
import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import AddExportDialog from './export-dialog';
import { cadExporter } from '../cad-export';

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

let mappedResults = new Map<string, any>();

const outputColumn: React.FC<Props> = ({ finished }) => {
  const [results, setResultsList] = useState<Array<any>>([]);
  const { data: rawResults, refetch } = useGetFinishedResultQuery(null);
  const [groups, setGroupsList] = useState<Array<any>>([]);
  const [exportOpenFlag, setExportOpenFlag] = useState(false);

  const groupTotals = new Map<string, number>();
  results.forEach((result) => {
    if (!groupTotals.has(result.group)) {
      groupTotals.set(result.group, 1);
    } else {
      groupTotals.set(result.group, groupTotals.get(result.group) + 1);
    }
  });

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
      mappedResults = JSON.parse(rawResults.data, reviver);
      for (const [key, value] of mappedResults.entries()) {
        newResults.push(value);
      }
      setResultsList(cleanResults(newResults));
      populateGroup(newResults);
    }
  }, [rawResults]);

  function handleExport(selection: string) {
    switch (selection) {
      case 'cad':
        if (mappedResults.has('cr')) {
          cadExporter(
            mappedResults.get('cr').value.max,
            mappedResults.get('S').value.max,
            mappedResults.get('t').value.max,
            mappedResults.get('TEsw').value.max,
            mappedResults.get('LEsw').value.max
          );
        }
        break;
    }
  }

  return (
    <Box boxShadow={1} sx={{ bgcolor: 'background.paper', borderRadius: 1, width: 308 }}>
      {groups?.map((group) => {
        if (group !== 'Context') {
          return (
            <Accordion key={`${Math.random()}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>{`${group} (${groupTotals.get(group)})`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {results?.map((result) => {
                  if (result.group === group) {
                    return (
                      <OutputCard
                        key={`${Math.random()}`}
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
        }
      })}
      <Button
        variant='outlined'
        endIcon={<GetAppIcon />}
        sx={{ fontSize: 12, p: 1, ml: 1, mt: 2, mb: 1, width: 284 }}
        onClick={() => {
          setExportOpenFlag(true);
        }}
      >
        Export
      </Button>
      <AddExportDialog
        open={exportOpenFlag}
        onClose={handleExport}
        openFlagSetter={setExportOpenFlag}
      />
    </Box>
  );
};

export default outputColumn;
