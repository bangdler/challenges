import React from 'react';
import styled from 'styled-components';
import SevenSegment from '@/components/SevenSegment';

interface IProps {
  fourNum: [number, number, number, number];
}

const FourDigitClock: React.FC<IProps> = ({ fourNum }) => {
  const [num1, num2, num3, num4] = fourNum;

  return (
    <Box>
      <SevenSegment num={num1} />
      <SevenSegment num={num2} />
      <Wrapper>
        <Dot />
        <Dot />
      </Wrapper>
      <SevenSegment num={num3} />
      <SevenSegment num={num4} />
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: lightgray;
  animation: dot-flashing 1s infinite alternate;
  @keyframes dot-flashing {
    0% {
      background-color: lightgray;
    }
    100% {
      background-color: orangered;
    }
`;

export default FourDigitClock;
