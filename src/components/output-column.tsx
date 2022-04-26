import { useState } from 'react';
import OutputCard from './output-card';
import { useGetFinishedResultQuery, useGetPlotQuery, useGetPlotDataQuery } from '../api-client';
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
import { saveAs } from 'file-saver';
import { convertArrayToCSV } from 'convert-array-to-csv';

function plotSaver(data: any, name: string) {
  const blob = new Blob([new Uint8Array(data, 0, data.length)]);
  saveAs(blob, `plot_${name}.png`);
}

function csvSaver(data: any, name: string) {
  const rows: any[] = [];
  const header: any[] = ['Span', name];
  for (let i = 0; i < data[0].length; i++) {
    rows.push([data[0][i], data[1][i]]);
  }
  const csvFromArrayOfArrays = convertArrayToCSV(rows, {
    header,
    separator: ',',
  });
  const blob = new Blob([csvFromArrayOfArrays], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `data_${name}.csv`);
}

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
  const { data: plot_Fn_V, refetch: fetchPlot_Fn_V } = useGetPlotQuery('Fn_V');
  const { data: plot_Fn_M, refetch: fetchPlot_Fn_M } = useGetPlotQuery('Fn_M');
  const { data: plot_Fn_AoA, refetch: fetchPlot_Fn_AoA } = useGetPlotQuery('Fn_AoA');
  const { data: plot_Fn_S, refetch: fetchPlot_Fn_S } = useGetPlotQuery('Fn_S');
  const { data: plot_BM_S, refetch: fetchPlot_BM_S } = useGetPlotQuery('BM_S');
  const { data: plot_Ang_S, refetch: fetchPlot_Ang_S } = useGetPlotQuery('Ang_S');
  const { data: plot_Defl_S, refetch: fetchPlot_Defl_S } = useGetPlotQuery('Defl_S');
  const { data: plot_Fn_V_data, refetch: fetchPlot_Fn_V_data } = useGetPlotDataQuery('Fn_V_data');
  const { data: plot_Fn_M_data, refetch: fetchPlot_Fn_M_data } = useGetPlotDataQuery('Fn_M_data');
  const { data: plot_Fn_AoA_data, refetch: fetchPlot_Fn_AoA_data } =
    useGetPlotDataQuery('Fn_AoA_data');
  const { data: plot_Fn_S_data, refetch: fetchPlot_Fn_S_data } = useGetPlotDataQuery('Fn_S_data');
  const { data: plot_BM_S_data, refetch: fetchPlot_BM_S_data } = useGetPlotDataQuery('BM_S_data');
  const { data: plot_Ang_S_data, refetch: fetchPlot_Ang_S_data } =
    useGetPlotDataQuery('Ang_S_data');
  const { data: plot_Defl_S_data, refetch: fetchPlot_Defl_S_data } = useGetPlotQuery('Defl_S_data');

  useEffect(() => {
    if (finished) {
      fetchPlot_Fn_M();
      fetchPlot_Fn_V();
      fetchPlot_Fn_AoA();
      fetchPlot_Fn_S();
    }
  }, [finished]);

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
      case 'Fn_V':
        fetchPlot_Fn_V();
        setTimeout(() => {
          plotSaver(plot_Fn_V.raw.data, 'Fn_V');
        }, 1000);
        break;
      case 'Fn_M':
        fetchPlot_Fn_M();
        setTimeout(() => {
          plotSaver(plot_Fn_M.raw.data, 'Fn_M');
        }, 1000);
        break;
      case 'Fn_AoA':
        fetchPlot_Fn_AoA();
        setTimeout(() => {
          plotSaver(plot_Fn_AoA.raw.data, 'Fn_AoA');
        }, 1000);
        break;
      case 'Fn_S':
        fetchPlot_Fn_S();
        setTimeout(() => {
          plotSaver(plot_Fn_S.raw.data, 'Fn_S');
        }, 1000);
        break;
      case 'Fn_BM':
        fetchPlot_BM_S();
        setTimeout(() => {
          plotSaver(plot_BM_S.raw.data, 'BM_S');
        }, 1000);
        break;
      case 'Fn_Ang':
        fetchPlot_Ang_S();
        setTimeout(() => {
          plotSaver(plot_Ang_S.raw.data, 'Ang_S');
        }, 1000);
        break;
      case 'Fn_Defl':
        fetchPlot_Defl_S();
        setTimeout(() => {
          plotSaver(plot_Defl_S.raw.data, 'Defl_S');
        }, 1000);
        break;
      case 'Fn_V_data':
        fetchPlot_Fn_V_data();
        setTimeout(() => {
          csvSaver(plot_Fn_V_data.raw.val, 'Fn_V_data');
        }, 1000);
        break;
      case 'Fn_M_data':
        fetchPlot_Fn_M_data();
        setTimeout(() => {
          csvSaver(plot_Fn_M_data.raw.val, 'Fn_M_data');
        }, 1000);
        break;
      case 'Fn_AoA_data':
        fetchPlot_Fn_AoA_data();
        setTimeout(() => {
          csvSaver(plot_Fn_AoA_data.raw.val, 'Fn_AoA_data');
        }, 1000);
        break;
      case 'Fn_S_data':
        fetchPlot_Fn_S_data();
        setTimeout(() => {
          csvSaver(plot_Fn_S_data.raw.val, 'Fn_S_data');
        }, 1000);
        break;
      case 'Fn_BM_data':
        fetchPlot_BM_S_data();
        setTimeout(() => {
          csvSaver(plot_BM_S_data.raw.val, 'BM_S_data');
        }, 1000);
        break;
      case 'Fn_Ang_data':
        fetchPlot_Ang_S_data();
        setTimeout(() => {
          csvSaver(plot_Ang_S_data.raw.val, 'Ang_S_data');
        }, 1000);
        break;
      case 'Fn_Defl_data':
        fetchPlot_Defl_S_data();
        setTimeout(() => {
          csvSaver(plot_Defl_S_data.raw.val, 'Defl_S_data');
        }, 1000);
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
