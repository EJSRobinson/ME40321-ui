import { useState } from 'react';
import OutputCard from './output-card';
function outputColumn() {
  const [results, setResultsList] = useState<Array<string>>(['Output1', 'Output2']);

  return (
    <>
      {results?.map((result) => {
        return (
          <OutputCard
            key={result}
            propName={result}
            propType={'quant'}
            units={'kg'}
            quantValue={{ typeName: 'quant', max: 100, min: 0 }}
          />
        );
      })}
    </>
  );
}

export default outputColumn;
