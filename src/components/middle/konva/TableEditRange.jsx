import { useEffect, useRef } from 'react';
import { Group, Layer, Rect, Text } from 'react-konva';
import { useSelector } from 'react-redux';

export default function TableEditRange({ stageSize }) {
  // useSelector
  const konvaEditIsAble = useSelector((state) => state.konvaState.isAble);
  // useRef
  const tableRangeRef = useRef(null);

  // 배경 애니메이션
  useEffect(() => {
    if (!tableRangeRef.current) return;
    if (konvaEditIsAble) {
      tableRangeRef.current.to({
        opacity: 1,
        duration: 0.3,
      });
      return;
    }
    tableRangeRef.current.to({
      opacity: 0,
      duration: 0.3,
    });
  }, [tableRangeRef, konvaEditIsAble]);

  return (
    <Layer ref={tableRangeRef} opacity={0}>
      <Group>
        <Rect width={stageSize.stageWidth} height={stageSize.stageHeight} cornerRadius={15} fill="#b4b4b4" />
        <Text
          text="배경 내에서 좌석을 수정할 수 있습니다"
          width={stageSize.stageWidth}
          height={stageSize.stageHeight}
          offsetX={-stageSize.stageWidth / 2 + 75}
          offsetY={-stageSize.stageHeight / 2 + 50}
        />
      </Group>
    </Layer>
  );
}