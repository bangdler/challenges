import { useEffect, useRef, useState } from 'react';

type TMode = 'am' | 'pm';

const useClock = () => {
  const curDate = new Date();
  const curHours = curDate.getHours();
  const curMinutes = curDate.getMinutes();
  const [time, setTime] = useState<[number, number]>([curHours, curMinutes]);
  const clockRef = useRef<NodeJS.Timer>();

  const [hour, min] = time;
  const hourToString = String(hour).padStart(2, '0');
  const minToString = String(min).padStart(2, '0');

  const mode: TMode = hour >= 12 ? 'pm' : 'am';
  const modeHour = hour ? (hour > 12 ? hour - 12 : hour) : 12;
  const modeHourToString = String(modeHour).padStart(2, '0');

  useEffect(() => {
    clockRef.current = setInterval(() => {
      setTime(([prevHour, prevMin]) => {
        let newHour;
        let newMin;
        if (prevMin === 59) {
          newHour = prevHour + 1;
          newMin = 0;
        } else {
          newHour = prevHour;
          newMin = prevMin + 1;
        }
        if (newHour === 24) {
          newHour = 0;
        }
        return [newHour, newMin];
      });
    }, 60000);
    return () => {
      clearInterval(clockRef.current);
    };
  }, []);

  return {
    mode,
    hourToString,
    minToString,
    modeHourToString,
  };
};

export default useClock;
