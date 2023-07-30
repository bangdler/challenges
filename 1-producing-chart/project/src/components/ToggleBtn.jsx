import styled, { css } from 'styled-components';
import { useState } from 'react';

const ToggleBtn = ({ onTitle, offTitle, onToggle }) => {
  const [on, setOn] = useState(false);

  const handleClickBtn = () => {
    setOn(prev => !prev);
    onToggle();
  };

  return (
    <BtnWrapper>
      <Btn onClick={handleClickBtn} $on={on}>
        {on ? onTitle : offTitle}
      </Btn>
    </BtnWrapper>
  );
};

const BtnWrapper = styled.div`
  width: 60px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px;
`;

const Btn = styled.button`
  width: 30px;
  height: 100%;
  border-radius: 5px;
  background-color: #7cdddd;
  font-size: 14px;
  padding: 0;
  transition: transform 0.5s;
  ${({ $on }) => {
    if ($on) {
      return css`
        transform: translateX(30px);
      `;
    }
    return css`
      transform: translateX(0);
    `;
  }}
`;

export default ToggleBtn;
