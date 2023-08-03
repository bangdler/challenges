import { useCallback, useMemo, useRef, useState } from 'react';

const TIMER_MAX = 60 * 60;

const useTimer = () => {
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timer>();

  const startTimer = useCallback(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          const next = prev + 1;
          if (next === TIMER_MAX) {
            return 0;
          }
          return next;
        });
      }, 1000);
    }
  }, []);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
    setTimer(0);
  }, []);

  const memoizedValue = useMemo(() => {
    const minToString = String(Math.floor(timer / 60)).padStart(2, '0');
    const secToString = String(Math.floor(timer % 60)).padStart(2, '0');
    return { minToString, secToString };
  }, [timer]);

  return {
    startTimer,
    pauseTimer,
    resetTimer,
    ...memoizedValue,
  };
};

export default useTimer;
