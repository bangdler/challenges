import React from 'react';
import styled from 'styled-components';
import COLORS from '@/constants/colors';

interface IProps {
  title: string;
  src: string;
}

const BigImg: React.FC<IProps> = ({ title, src }) => {
  return <Img src={src} alt={title} />;
};

const Img = styled.img`
  width: 500px;
  height: 500px;
  border: 1px solid ${COLORS.blue};
  border-radius: 5px;
  box-shadow: 2px 2px 10px 2px ${COLORS.black};
`;

export default BigImg;
