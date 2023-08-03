import { useRef, useState } from 'react';

const useTimer = () => {
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timer>();

  const max = 60 * 60;

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          const next = prev + 1;
          if (next === max) {
            return 0;
          }
          return next;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
    setTimer(0);
  };

  const minToString = String(Math.floor(timer / 60)).padStart(2, '0');
  const secToString = String(Math.floor(timer % 60)).padStart(2, '0');

  return {
    startTimer,
    pauseTimer,
    resetTimer,
    minToString,
    secToString,
  };
};

export default useTimer;
