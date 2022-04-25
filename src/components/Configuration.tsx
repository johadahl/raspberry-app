import { useEffect, useState } from "react" 
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { IOSSwitch } from './Switch';
import { AlarmConfig, getAlarm, setAlarm } from '../clients/Alarm'
import { useQuery } from "react-query";

export const Configuration = () => {
  const [config, setConfig] = useState<AlarmConfig | null>(null);

  const { isLoading } = useQuery('alarm', getAlarm, {
    onSuccess: (data) => {
      setConfig(data)
    }
  });

  useEffect(() => {
    console.log('NEW CONFIG', config)
    // useQuery('alarm', setAlarm(config))
    // store to server
  }, [config])

  return (
    <>
    { isLoading || !config ? <div>Loading...</div> : <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label="Alarm"
          value={config.timestamp.setHours(parseInt(config.time.split(':')[0]), parseInt(config.time.split(':')[1]))}
          ampm={false}
          onChange={(date: string | null) => {
            setConfig({
              ...config,
              time: (date as any).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
            })
          }}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <IOSSwitch 
        checked={config.active} 
        onClick={() => {
          config.active ? setConfig({ ...config, active: false }) : setConfig({ ...config, active: true })
        }}/>
    </> }
    
    </>
  );
}
