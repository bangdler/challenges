import styled, { css } from 'styled-components';
import FourDigitClock from '@/components/FourDigitClock';
import useClock from '@/hooks/useClock';
import { useState } from 'react';
import Flex from '@/components/common/Flex';
import Toggle from '@/components/common/Toggle';
import COLORS from '@/constants/colors';
import useTimer from '@/hooks/useTimer';

const TIMER_MODE = {
  start: 'start',
  pause: 'pause',
  reset: 'reset',
} as const;

type TTimerMode = (typeof TIMER_MODE)[keyof typeof TIMER_MODE];

function App() {
  const {
    mode: meridiem,
    hourToString: clockHour,
    minToString: clockMin,
    modeHourToString: clockMeridiumHour,
  } = useClock({ initialDate: new Date() });

  const {
    startTimer,
    pauseTimer,
    resetTimer,
    minToString: timerMin,
    secToString: timerSec,
  } = useTimer();

  const [isTimer, setIsTimer] = useState(false);
  const [isMeridiemClock, setIsMeridiemClock] = useState(false);
  const [timerMode, setTimerMode] = useState<TTimerMode>(TIMER_MODE.pause);

  const clockNums = [...clockHour.split(''), ...clockMin.split('')].map(Number);

  const clockMeridiemNums = [
    ...clockMeridiumHour.split(''),
    ...clockMin.split(''),
  ].map(Number);

  const timerNums = [...timerMin.split(''), ...timerSec.split('')].map(Number);

  const renderedNums = isTimer
    ? timerNums
    : isMeridiemClock
    ? clockMeridiemNums
    : clockNums;

  const handleClickClockBtn = (meridiem: boolean) => () => {
    if (meridiem) {
      setIsMeridiemClock(true);
    } else {
      setIsMeridiemClock(false);
    }
  };

  const handleClickTimerBtn = (mode: TTimerMode) => () => {
    if (mode === TIMER_MODE.start) {
      startTimer();
    } else if (mode === TIMER_MODE.pause) {
      pauseTimer();
    } else {
      resetTimer();
    }
    setTimerMode(mode);
  };

  const clockButtons = (
    <>
      <Button $active={isMeridiemClock} onClick={handleClickClockBtn(true)}>
        12
      </Button>
      <Button $active={!isMeridiemClock} onClick={handleClickClockBtn(false)}>
        24
      </Button>
    </>
  );

  const timerButtons = (
    <>
      <Button
        $active={timerMode === TIMER_MODE.start}
        onClick={handleClickTimerBtn(TIMER_MODE.start)}
      >
        start
      </Button>
      <Button
        $active={timerMode === TIMER_MODE.pause}
        onClick={handleClickTimerBtn(TIMER_MODE.pause)}
      >
        pause
      </Button>
      <Button
        $active={timerMode === TIMER_MODE.reset}
        onClick={handleClickTimerBtn(TIMER_MODE.reset)}
      >
        reset
      </Button>
    </>
  );

  return (
    <Layout>
      <OuterBox $column $justifyCenter $alignCenter>
        <InnerBox $justifyCenter $alignCenter>
          <FourDigitClock fourNum={renderedNums} />
          {isMeridiemClock && <Mode>{meridiem}</Mode>}
        </InnerBox>
        <Wrapper>
          <Toggle onToggle={() => setIsTimer(prev => !prev)}>
            <Toggle.Switch onTitle={'Timer'} offTitle={'Clock'} />
          </Toggle>
          <ButtonBox>{isTimer ? timerButtons : clockButtons}</ButtonBox>
        </Wrapper>
      </OuterBox>
    </Layout>
  );
}

const Layout = styled.div`
  height: 100vh;
  border: 1px solid ${COLORS.black};
`;

const Box = styled(Flex)`
  border: 1px solid ${COLORS.black};
  border-radius: 14px;
`;

const OuterBox = styled(Box)`
  position: relative;
  margin: 100px auto;
  width: 650px;
  height: 420px;
  gap: 30px;
  background-color: ${COLORS.blue};
`;

const InnerBox = styled(Box)`
  position: relative;
  width: 480px;
  height: 220px;
  background-color: ${COLORS.white};
`;

const Mode = styled.p`
  position: absolute;
  right: 14px;
  bottom: 30px;
  font-size: 3rem;
  color: ${COLORS.red};
`;

const Wrapper = styled(Flex)`
  width: 480px;
  justify-content: space-between;
  align-items: center;
`;

const ButtonBox = styled(Box)`
  padding: 2px;
  gap: 5px;
  background-color: ${COLORS.white};
`;

const Button = styled.button<{ $active: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  background-color: ${COLORS.gray};
  &:hover {
    background-color: ${COLORS.darkGray};
    color: ${COLORS.white};
  }
  ${({ $active }) => {
    if ($active) {
      return css`
        background-color: ${COLORS.darkGray};
        color: ${COLORS.white};
      `;
    }
  }}
`;

export default App;
