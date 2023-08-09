import styled, { css } from 'styled-components';
import React from 'react';
import COLORS from '@/constants/colors';
import { SLIDE_IMG_SIZE } from '@/constants/slide';

interface IProps {
  title: string;
  src: string;
  selected: boolean;
  onClick: () => void;
}

const SmallImg: React.FC<IProps> = ({ title, src, selected, onClick }) => {
  return <Img src={src} alt={title} $selected={selected} onClick={onClick} />;
};

const Img = styled.img`
  width: ${SLIDE_IMG_SIZE}px;
  height: ${SLIDE_IMG_SIZE}px;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 ${COLORS.darkGray};
  flex-shrink: 0;
  ${({ $selected }) => {
    if ($selected) {
      return css`
        box-shadow: 0 0 5px 2px ${COLORS.red};
      `;
    }
  }}}
`;

export default SmallImg;
