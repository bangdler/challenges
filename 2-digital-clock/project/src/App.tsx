import styled, { css } from 'styled-components';
import FourDigitClock from '@/components/FourDigitClock';
import useClock from '@/hooks/useClock';
import { useState } from 'react';
import Flex from '@/components/common/Flex';
import Toggle from '@/components/common/Toggle';
import COLORS from '@/constants/colors';

function App() {
  const { mode, hourToString, minToString, modeHourToString } = useClock();

  const timeNums = [...hourToString.split(''), ...minToString.split('')].map(
    Number,
  );

  const modeTimeNums = [
    ...modeHourToString.split(''),
    ...minToString.split(''),
  ].map(Number);

  const [isMode, setIsMode] = useState(false);

  return (
    <Layout>
      <OuterBox $column $justifyCenter $alignCenter>
        <InnerBox $justifyCenter $alignCenter>
          <FourDigitClock fourNum={isMode ? modeTimeNums : timeNums} />
          {isMode && <Mode>{mode}</Mode>}
        </InnerBox>
        <Wrapper>
          <Toggle onToggle={() => console.log('ontoggle')}>
            <Toggle.Switch onTitle={'Timer'} offTitle={'Clock'} />
          </Toggle>
          <ButtonBox>
            <Button $active={isMode} onClick={() => setIsMode(true)}>
              12
            </Button>
            <Button $active={!isMode} onClick={() => setIsMode(false)}>
              24
            </Button>
          </ButtonBox>
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
  width: 120px;
  height: 60px;
  padding: 2px;
  gap: 2px;
  background-color: ${COLORS.white};
`;

const Button = styled.button<{ $active: boolean }>`
  width: 50%;
  height: 100%;
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
