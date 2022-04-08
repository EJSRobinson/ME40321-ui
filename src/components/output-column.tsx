import { useState } from 'react';
import OutputCard from './output-card';
import { useGetFinishedResultQuery } from '../api-client';
import React, { useEffect } from 'react';

function reviver(key: any, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

type Props = {
  finished: any;
};
const outputColumn: React.FC<Props> = ({ finished }) => {
  const [results, setResultsList] = useState<Array<any>>([]);
  const { data: rawResults, refetch } = useGetFinishedResultQuery(null);

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
      setResultsList(newResults);
      console.log(newResults);
    }
  }, [rawResults]);

  return (
    <>
      {results?.map((result) => {
        return (
          <OutputCard
            key={result.name}
            propName={result.name}
            propType={result.value.typeName}
            units={'Tst'}
            quantValue={result.value}
          />
        );
      })}
    </>
  );
};

export default outputColumn;
