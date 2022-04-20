import { useEffect, useState } from "react" 
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { IOSSwitch } from './Switch';

interface AlarmConfig {
  time: string
  active: boolean
  id: number
  timestamp: Date
}

export const Configuration = () => {
  const [time, setTime] = useState<Date>(new Date())
  const [config, setConfig] = useState<AlarmConfig>({
    time: '22:11',
    active: false,
    id: 1,
    timestamp: new Date()
  });

  // TODO: fetch config from server

  useEffect (() => {
    time.setHours(parseInt(config.time.split(':')[0]), parseInt(config.time.split(':')[1]))
    console.log("CONFIG: ", config)
    // TODO: save config to server
  }, [config])

  useEffect (() => {
    setConfig({
      ...config,
      time: time.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
    })
  }, [time])

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label="Alarm"
          value={time}
          ampm={false}
          onChange={(date: string | null) => {
            setTime(new Date(date ?? ''))
          }}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <IOSSwitch 
        checked={config.active} 
        onClick={() => {
          config.active ? setConfig({ ...config, active: false }) : setConfig({ ...config, active: true })
        }}/>
    </>
  );
}
