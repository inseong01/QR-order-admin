import { useBoundStore } from '../../../lib/store/useBoundStore';
import TableLayer from './TableLayer';
import TableEditRange from './TableEditRange';

import { Layer, Stage } from 'react-konva';
import { useRef, useState } from 'react';

export default function TableDraw({ stageSize, clientTableList, setClientTableList }) {
  // store
  const konvaEditIsAble = useBoundStore((state) => state.konva.isAble);
  // useRef
  const stageRef = useRef(null);
  // useState
  const [currentPos, setCurrentPos] = useState({
    x: 0,
    y: 0,
  });

  // 초기 위치 화면 이동
  function backToInitPos() {
    if (konvaEditIsAble) return;
    if (currentPos.x === 0 && currentPos.y === 0) return;
    setCurrentPos({ x: 0, y: 0 });
  }

  // 드래그 위치 화면 이동
  function getLastPos() {
    const lastPos = stageRef.current.position();
    setCurrentPos({ x: lastPos.x, y: lastPos.y });
  }

  return (
    <Stage
      ref={stageRef}
      x={konvaEditIsAble ? 0 : currentPos.x}
      y={konvaEditIsAble ? 0 : currentPos.y}
      width={stageSize.stageWidth}
      height={stageSize.stageHeight}
      onDblClick={backToInitPos}
      onDblTap={backToInitPos}
      onDragEnd={getLastPos}
      draggable
    >
      <TableEditRange stageSize={stageSize} />
      <Layer>
        {clientTableList.map((table) => {
          return (
            <TableLayer
              key={table.tableNum}
              table={table}
              stage={stageRef}
              clientTableList={clientTableList}
              setClientTableList={setClientTableList}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}
