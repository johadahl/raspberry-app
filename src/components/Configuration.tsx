import { useEffect, useState } from "react" 
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { IOSSwitch } from './Switch';
import { AlarmConfig, getAlarm, setAlarm } from '../clients/Alarm'
import { useMutation, useQuery } from "react-query";

export const Configuration = () => {
  const [time, setTime] = useState(new Date())
  const [config, setConfig] = useState<AlarmConfig | null>(null);

  const { isLoading } = useQuery('alarm', getAlarm, {
    onSuccess: (data) => {
      setConfig(data)
    }
  });

  const { mutate } = useMutation(setAlarm)
  
  useEffect(() => {
    config && mutate(config)
    setTime(config && config.timestamp.setHours(parseInt(config.time.split(':')[0]), parseInt(config.time.split(':')[1])) as any)
  }, [config, mutate])

  return (
    <>
      { isLoading || !config ? <div>Loading...</div> : <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Alarm"
            value={time}
            ampm={false}
            onChange={(date: string | null) => {
              setConfig({
                ...config,
                timestamp: new Date(),
                time: (date as any).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
              })
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <IOSSwitch 
          checked={config.active} 
          onClick={() => {
            setConfig({ ...config, active: !config.active })
          }}/>
        </> 
      }
    </>
  );
}
