import { useEffect, useMemo, useRef, useState } from 'react';

type TMode = 'am' | 'pm';

interface IProps {
  initialDate: Date;
}

const useClock = ({ initialDate }: IProps) => {
  const [time, setTime] = useState<[number, number]>([
    initialDate.getHours(),
    initialDate.getMinutes(),
  ]);
  const clockRef = useRef<NodeJS.Timer>();

  const memoizedValue = useMemo(() => {
    const [hour, min] = time;
    const hourToString = String(hour).padStart(2, '0');
    const minToString = String(min).padStart(2, '0');

    const mode: TMode = hour >= 12 ? 'pm' : 'am';
    const modeHour = hour ? (hour > 12 ? hour - 12 : hour) : 12;
    const modeHourToString = String(modeHour).padStart(2, '0');

    return { mode, hourToString, minToString, modeHourToString };
  }, [time]);

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

  return memoizedValue;
};

export default useClock;
