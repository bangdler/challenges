import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import COLORS from '@/constants/colors';

interface IContext {
  moveLeft: () => void;
  moveRight: () => void;
}

interface ISliderProps {
  numOfTotalSlide: number;
  numOfDisplayedSlide: number;
  viewportWidth: number;
  slideDistance: number;
  children: ReactNode;
}

interface ISlidingBoxProps {
  children: ReactNode;
}

export enum ButtonType {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

interface ISliderButtonProps {
  type: ButtonType;
}

const SliderContext = createContext<IContext | null>(null);

const useSliderContext = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error(
      `Slider compound components should be rendered in the Slider component`,
    );
  }
  return context;
};

const Slider = ({
  numOfTotalSlide,
  numOfDisplayedSlide,
  viewportWidth,
  slideDistance,
  children,
}: ISliderProps) => {
  const [curPosition, setCurPosition] = useState([0, numOfDisplayedSlide - 1]);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitionEnd, setIsTransitionEnd] = useState(true);

  const moveLeft = () => {
    if (!isTransitionEnd) return;
    setIsTransitionEnd(false);
    setCurPosition(([prevLeft, prevRight]) => [prevLeft - 1, prevRight - 1]);
    setTranslateX(prev => prev + slideDistance);
  };

  const moveRight = () => {
    if (!isTransitionEnd) return;
    setIsTransitionEnd(false);
    setCurPosition(([prevLeft, prevRight]) => [prevLeft + 1, prevRight + 1]);
    setTranslateX(prev => prev - slideDistance);
  };

  const onTransitionEnd = () => {
    setIsTransitionEnd(true);
  };

  useEffect(() => {
    if (
      curPosition[1] > numOfDisplayedSlide - 1 &&
      numOfTotalSlide - 1 < curPosition[1]
    ) {
      moveLeft();
    }
  }, [numOfTotalSlide]);

  const value = {
    numOfTotalSlide,
    viewportWidth,
    curPosition,
    translateX,
    moveLeft,
    moveRight,
    onTransitionEnd,
  };

  return (
    <SliderContext.Provider value={value}>{children}</SliderContext.Provider>
  );
};

Slider.SlidingBox = ({ children }: ISlidingBoxProps) => {
  const { translateX, viewportWidth, onTransitionEnd } = useSliderContext();

  return (
    <Viewport width={viewportWidth}>
      <SlidingPart $translateX={translateX} onTransitionEnd={onTransitionEnd}>
        {children}
      </SlidingPart>
    </Viewport>
  );
};

Slider.Button = ({ type }: ISliderButtonProps) => {
  const { numOfTotalSlide, curPosition, moveLeft, moveRight } =
    useSliderContext();

  const onClick = type === ButtonType.LEFT ? moveLeft : moveRight;

  const disabled =
    type === ButtonType.LEFT
      ? curPosition[0] === 0
      : curPosition[1] >= numOfTotalSlide - 1;

  return <Button $type={type} disabled={disabled} onClick={onClick}></Button>;
};

const Viewport = styled.div<{ width: number }>`
  overflow-x: hidden;
  ${({ width }) => css`
    width: ${width}px;
  `}
`;

const SlidingPart = styled.div<{ $translateX: number }>`
  transition: transform 0.3s ease-in;
  ${({ $translateX }) => css`
    transform: translate(${$translateX}px);
  `}
`;

const Button = styled.button<{ $type: ButtonType }>`
  width: 50px;
  height: 50px;
  background-color: ${COLORS.blue};
  &:hover {
    background-color: ${COLORS.darkGray};
  }
  ${({ $type }) => {
    if ($type === ButtonType.LEFT) {
      return css`
        clip-path: polygon(55% 0, 30% 50%, 55% 100%, 25% 100%, 0% 50%, 25% 0%);
      `;
    }
    return css`
      clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 45% 100%, 70% 50%, 45% 0);
    `;
  }}
  &:disabled {
    background-color: ${COLORS.white};
    cursor: default;
  }
`;

export default Slider;
