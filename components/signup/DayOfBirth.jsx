import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Box } from '@mui/material';

export default function DayOfBirth({ value, setValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <Stack spacing={3}>
        <Box sx={{ display: { xs: 'block', sm: 'none' }, marginTop: '1rem' }}>
          <MobileDatePicker
            disableFuture
            label="Date de naissance"
            value={value}
            onChange={(newValue) => {
              setValue(dayjs(newValue).format('DD/MM/YYYY'));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <DesktopDatePicker
            disableFuture
            label="Date de naissance"
            value={value}
            minDate={dayjs('1900-01-01')}
            maxDate={dayjs()}
            onChange={(newValue) => {
              setValue(dayjs(newValue).format('DD/MM/YYYY'));
              console.log(dayjs(newValue).format('DD/MM/YY'));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </Stack>
    </LocalizationProvider>
  );
}
