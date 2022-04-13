import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  propName: string;
  propType: string;
  units: string;
  options: string[];
  remover: (value: string) => void;
};

const InputCard: React.FC<Props> = ({ propName, propType, units, options, remover }) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: '#BBB',
        boxShadow: 1,
        borderRadius: 1,
        p: 1,
        m: 1,
        width: 275,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ color: 'text.primary', fontWeight: 600, width: 205, mt: 1 }}>{propName}</Box>
        <IconButton
          aria-label='delete'
          sx={{ mr: 1 }}
          onClick={() => {
            remover(propName);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {(propType === 'quant' || propType === 'range') && (
        <>
          <TextField
            id='max'
            label='Maximum'
            variant='standard'
            type='number'
            sx={{
              color: 'text.primary',
              width: 100,
              mr: 1,
            }}
          />
          <TextField
            id='min'
            label='Minimum'
            variant='standard'
            type='number'
            sx={{
              color: 'text.primary',
              width: 100,
              mr: 1,
            }}
          />
        </>
      )}
      {propType === 'list' && (
        <>
          <FormControl variant='standard' sx={{ width: 208, mr: 1 }}>
            <InputLabel id='select-label'>Selection</InputLabel>
            <Select labelId='select-label' id='list-select' label='Choose Option'>
              {options?.map((option) => {
                return <MenuItem value={option}>{option}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </>
      )}
      {propType === 'qual' && (
        <>
          <TextField
            id='val'
            label='Value'
            variant='standard'
            type='number'
            sx={{
              color: 'text.primary',
              width: 208,
              mr: 1,
            }}
          />
        </>
      )}
      <Box
        sx={{
          color: 'text.secondary',
          mt: 3,
          display: 'inline-flex',
        }}
      >
        {units}
      </Box>
    </Box>
  );
};

export default InputCard;
