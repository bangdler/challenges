import styled, { css } from 'styled-components';
import FourDigitClock from '@/components/FourDigitClock';
import useClock from '@/hooks/useClock';
import { useState } from 'react';
import Flex from '@/components/common/Flex';

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
      <OuterBox column justifyCenter alignCenter>
        <InnerBox justifyCenter alignCenter>
          <FourDigitClock fourNum={isMode ? modeTimeNums : timeNums} />
          {isMode && <Mode>{mode}</Mode>}
        </InnerBox>
        <Wrapper>
          <div>toggle</div>
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
  border: 1px solid black;
`;

const Box = styled(Flex)`
  border: 1px solid black;
  border-radius: 14px;
`;

const OuterBox = styled(Box)`
  position: relative;
  margin: 100px auto;
  width: 650px;
  height: 420px;
  gap: 30px;
`;

const InnerBox = styled(Box)`
  position: relative;
  width: 480px;
  height: 220px;
`;

const Mode = styled.p`
  position: absolute;
  right: 14px;
  bottom: 30px;
  font-size: 3rem;
  color: orangered;
`;

const Wrapper = styled(Flex)`
  width: 480px;
  justify-content: space-between;
`;

const ButtonBox = styled(Box)`
  padding: 2px;
  gap: 2px;
`;

const Button = styled.button<{ $active: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background-color: gainsboro;
  &:hover {
    background-color: palegoldenrod;
  }
  ${({ $active }) => {
    if ($active) {
      return css`
        background-color: palegoldenrod;
      `;
    }
  }}
`;

export default App;
