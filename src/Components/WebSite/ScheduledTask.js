import { useEffect } from 'react';
import useInterval from './UseInterval'

function ScheduledTask() {
  
    const apiUrl = '/api/topic/list';

    const getCurrentTimestamp = () => {
      const now = new Date();
      return now.toLocaleString();
    };
  
  
    const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          if (response.ok) {
            console.log(`Scheduled task was executed at [${getCurrentTimestamp()}]`);
          } else {
            console.error('Failed executing scheduled task');
          }
        } catch (error) {
            console.error('Failed executing scheduled task');
        }
    };
  
    useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useInterval(() => {
      fetchData();
    }, 300000);
  
    return null;
  }
  
  export default ScheduledTask;
  