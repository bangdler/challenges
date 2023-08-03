import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import COLORS from '@/constants/colors';

interface IContext {
  on: boolean;
  toggle: () => void;
}

interface IProps {
  onToggle: (on: boolean) => void;
  children: ReactNode;
}

const ToggleContext = createContext<IContext | null>(null);

const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error(
      `Toggle compound components should be rendered in the Toggle component`,
    );
  }
  return context;
};

const Toggle = ({ onToggle, children }: IProps) => {
  const [on, setOn] = useState(false);
  const firstMount = useRef(true);

  const toggle = () => {
    setOn(prev => !prev);
  };

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    onToggle(on);
  }, [on]);

  const value = useMemo(() => ({ on, toggle }), [on]);

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};

// UI Part
interface ISwitchProps {
  onTitle: string;
  offTitle: string;
}

Toggle.Switch = ({ onTitle, offTitle }: ISwitchProps) => {
  const { on, toggle } = useToggleContext();

  return (
    <Box>
      <SpanWrapper>
        <span>{offTitle}</span>
        <span>{onTitle}</span>
      </SpanWrapper>
      <BtnWrapper>
        <Button $on={on} onClick={() => toggle()} />
      </BtnWrapper>
    </Box>
  );
};

const Box = styled.div``;

const SpanWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90px;
  font-size: 1.4rem;
  color: ${COLORS.white};
  padding: 2px 5px;
`;

const BtnWrapper = styled.div`
  display: flex;
  width: 90px;
  height: 40px;
  border: 1px solid ${COLORS.black};
  background-color: ${COLORS.white};
  border-radius: 5px;
  padding: 2px;
`;

const Button = styled.button`
  width: 50%;
  height: 100%;
  border-radius: 5px;
  background-color: ${COLORS.darkGray};
  transition: transform 0.5s;
  ${({ $on }) => {
    if ($on) {
      return css`
        transform: translateX(100%);
      `;
    }
    return css`
      transform: translateX(0);
    `;
  }}
`;

export default Toggle;
