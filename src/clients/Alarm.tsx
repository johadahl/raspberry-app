import axios from 'axios';

export interface AlarmConfig {
  time: string
  active: boolean
  id: number
  timestamp: Date
}

export const getAlarm = async (): Promise<AlarmConfig> => {
  const { data } = await axios.get(`${process.env.REACT_APP_CONFIG_URL}/v1/alarm/`);
  const response = {
    ...data,
    timestamp: new Date(data.timestamp),
    time: data.time.split(':')[0] + ':' + data.time.split(':')[1]
  }
  return response;
};

export const setAlarm = async (alarmConfig: AlarmConfig): Promise<AlarmConfig> => {
  const { data } = await axios.post(`${process.env.REACT_APP_CONFIG_URL}/v1/alarm/`, alarmConfig);
  return data;
};
