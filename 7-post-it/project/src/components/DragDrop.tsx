import React, {
  createContext,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';

interface IDraggableData {
  id: number;
  element: HTMLDivElement;
  position: [number, number];
  startMousePosition: [number, number];
}
interface IContext {
  curDraggable: IDraggableData | null;
  setCurDraggable: Dispatch<SetStateAction<IDraggableData | null>>;
}
interface IDragDropProviderProps {
  children: ReactNode;
}

const DragDropContext = createContext<IContext | null>(null);

const useDragDropContext = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error(
      `DND compound components should be rendered in the DND component`,
    );
  }
  return context;
};

export const DragDropProvider = ({ children }: IDragDropProviderProps) => {
  const [curDraggable, setCurDraggable] = useState<IDraggableData | null>(null);

  const value = {
    curDraggable,
    setCurDraggable,
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};

interface IDroppableProps {
  children: ReactNode;
  onMouseup?: (
    e: React.MouseEvent,
    curDraggableId: number,
    nextPosition: [number, number],
  ) => void;
  onMousemove?: (e: React.MouseEvent) => void;
}

export const Droppable = ({
  children,
  onMouseup,
  onMousemove,
}: IDroppableProps) => {
  const { curDraggable, setCurDraggable } = useDragDropContext();
  const droppableRef = useRef<HTMLDivElement | null>(null);

  const dragEnd = (e: React.MouseEvent) => {
    if (!droppableRef.current) return;
    if (!curDraggable) return;

    curDraggable.element.style.transform = `translateX(0px) translateY(0px)`;
    const dX = e.clientX - curDraggable.startMousePosition[0];
    const dY = e.clientY - curDraggable.startMousePosition[1];
    const nextPosition: [number, number] = [
      curDraggable.position[0] + dX,
      curDraggable.position[1] + dY,
    ];
    const curDraggableId = curDraggable.id;

    if (onMouseup) {
      onMouseup(e, curDraggableId, nextPosition);
    }
    setCurDraggable(null);
  };
  const mouseupHandler: MouseEventHandler = e => {
    dragEnd(e);
  };

  const mousemoveHandler: MouseEventHandler = e => {
    if (!droppableRef.current) return;
    if (!curDraggable) return;

    const dX = e.clientX - curDraggable.startMousePosition[0];
    const dY = e.clientY - curDraggable.startMousePosition[1];

    // const [nextX, nextY] = [
    //   curDraggable.position[0] + dX,
    //   curDraggable.position[1] + dY,
    // ];
    // const { top, left, bottom, right } =
    //   droppableRef.current.getBoundingClientRect();
    // if (
    //   nextX <= left ||
    //   nextX + left + curDraggable.element.offsetWidth >= right ||
    //   nextY <= top ||
    //   nextY + top + curDraggable.element.offsetHeight >= bottom
    // ) {
    //   dragEnd(e, true);
    //   return;
    // }

    curDraggable.element.style.transform = `translateX(${dX}px) translateY(${dY}px)`;

    if (onMousemove) {
      onMousemove(e);
    }
  };

  return (
    <div
      className={'relative inline-block'}
      ref={droppableRef}
      onMouseUp={mouseupHandler}
      onMouseMove={mousemoveHandler}
    >
      {children}
    </div>
  );
};

interface IDraggableProps {
  draggableId: number;
  initPosition: [number, number];
  onMousedown?: (e: React.MouseEvent) => void;
  children: ReactNode;
}

export const Draggable = ({
  draggableId,
  children,
  initPosition,
  onMousedown,
}: IDraggableProps) => {
  const { setCurDraggable } = useDragDropContext();
  const dragRef = useRef<HTMLDivElement | null>(null);

  const mousedownHandler: MouseEventHandler = e => {
    if (!dragRef.current) return;

    setCurDraggable({
      id: draggableId,
      element: dragRef.current,
      position: initPosition,
      startMousePosition: [e.clientX, e.clientY],
    });

    if (onMousedown) {
      onMousedown(e);
    }
  };

  return (
    <div
      ref={dragRef}
      className={'absolute'}
      style={{
        left: `${initPosition[0]}px`,
        top: `${initPosition[1]}px`,
      }}
      onMouseDown={mousedownHandler}
    >
      {children}
    </div>
  );
};
