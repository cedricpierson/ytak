import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Gender() {
  return (
    <FormControl style={{ marginTop: '1rem' }}>
      <FormLabel id="demo-radio-buttons-group-label">Sexe</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="femme"
        name="radio-buttons-group"
        sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <FormControlLabel value="femme" control={<Radio />} label="Femme" />
        <FormControlLabel value="homme" control={<Radio />} label="Homme" />
        <FormControlLabel value="autre" control={<Radio />} label="Autre" />
      </RadioGroup>
    </FormControl>
  );
}
