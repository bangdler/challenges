import { DragDropProvider, Draggable, Droppable } from '@/components/DragDrop';
import { useState } from 'react';

function App() {
  const [postItList, setPostItList] = useState([
    { position: [0, 0] },
    { position: [30, 30] },
  ]);

  return (
    <div>
      App
      <DragDropProvider>
        <Droppable
          onMouseup={(_, curDraggableId, nextPosition) => {
            const newPostItList = postItList.map((it, idx) => {
              if (idx === curDraggableId) {
                it.position = nextPosition;
              }
              return it;
            });
            setPostItList(newPostItList);
          }}
        >
          <div className={'w-[400px] h-[400px] border border-black'}>
            {postItList.map((postIt, idx) => (
              <Draggable
                key={idx}
                draggableId={idx}
                initPosition={postIt.position as [number, number]}
              >
                <div className={'w-[100px] border border-black select-none'}>
                  draggable {idx}
                </div>
              </Draggable>
            ))}
          </div>
        </Droppable>
      </DragDropProvider>
    </div>
  );
}

export default App;
