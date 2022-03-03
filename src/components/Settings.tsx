import React from "react"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import StaticTimePicker from '@mui/lab/StaticTimePicker';

export const Settings = () => {
  const [value, setValue] = React.useState(new Date());

  // fetch settings from the server
  // some props on the selected time

  return (
  <>   
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        displayStaticWrapperAs="mobile"
        value={value}
        onChange={(newValue) => {
          setValue(newValue ?? new Date());
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  </>
  )
}
