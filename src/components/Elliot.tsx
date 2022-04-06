import { useState } from 'react';
import Button from '@mui/material/Button';
import AddCircle from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import { width } from '@mui/system';

type Props = {
  dog: number;
  cat: string;
};

const Elliot: React.FC<Props> = ({ dog, cat }) => {
  const [counter, setCounter] = useState(dog);

  const handleButton = () => {
    setCounter(counter + 1);
  };
  return (
    <Box sx={{ backgroundColor: '#FF00FF', maxWidth: '1000px' }}>
      {`I am a cat called ${cat} and I am ${dog} old and my counter is ${counter}`}
      <Button variant='outlined' startIcon={<AddCircle />} onClick={() => setCounter(counter + 1)}>
        PIGGY
      </Button>

      {counter > 15 && <div>YAY</div>}
    </Box>
  );
};

export default Elliot;
