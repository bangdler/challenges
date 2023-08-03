import React from 'react';
import styled, { css } from 'styled-components';
import COLORS from '@/constants/colors';

interface IProps {
  num: number;
}

const SevenSegment: React.FC<IProps> = ({ num }) => {
  const topSegmentOnList = [0, 2, 3, 5, 6, 7, 8, 9];
  const leftTopSegmentOnList = [0, 4, 5, 6, 8, 9];
  const rightTopSegmentOnList = [0, 1, 2, 3, 4, 7, 8, 9];
  const leftBottomSegmentOnList = [0, 2, 6, 8];
  const rightBottomSegmentOnList = [0, 1, 3, 4, 5, 6, 7, 8, 9];
  const middleSegmentOnList = [2, 3, 4, 5, 6, 8, 9];
  const bottomSegmentOnList = [0, 2, 3, 5, 6, 8, 9];
  return (
    <Box>
      <Segment $on={topSegmentOnList.includes(num)} />
      <Wrapper>
        <Segment $on={leftTopSegmentOnList.includes(num)} $vertical />
        <Segment $on={rightTopSegmentOnList.includes(num)} $vertical />
      </Wrapper>
      <Segment $on={middleSegmentOnList.includes(num)} />
      <Wrapper>
        <Segment $on={leftBottomSegmentOnList.includes(num)} $vertical />
        <Segment $on={rightBottomSegmentOnList.includes(num)} $vertical />
      </Wrapper>
      <Segment $on={bottomSegmentOnList.includes(num)} />
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
`;

const Segment = styled.div<{ $on: boolean; $vertical?: boolean }>`
  transition: background-color 0.1ms;
  ${({ $on }) => {
    if ($on) {
      return css`
        background-color: ${COLORS.red};
      `;
    }
    return css`
      background-color: ${COLORS.gray};
      opacity: 0.3;
    `;
  }}
  ${({ $vertical }) => {
    if ($vertical) {
      return css`
        width: 8px;
        height: 60px;
      `;
    }
    return css`
      width: 60px;
      height: 8px;
    `;
  }}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default SevenSegment;
