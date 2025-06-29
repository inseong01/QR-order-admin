import Konva from 'konva';
import { RefObject } from 'react';

import { useBoundStore } from '../../../../../lib/store/use-bound-store';

import { TableList } from '../../../../../types/common';

export default function useOnMouseChangeCursor(stageRef: RefObject<Konva.Stage>, table: TableList) {
  const konvaEditTableIdArr = useBoundStore((state) => state.konva.target.id);
  const konvaEditType = useBoundStore((state) => state.konva.type);

  const { id } = table;
  const isTransformerAble = id === konvaEditTableIdArr[0] && konvaEditType !== 'delete';

  // 커서 테이블 아웃
  function onMouseLeaveChangePointer() {
    if (!stageRef.current) return;
    stageRef.current.container().style.cursor = 'default';
  }

  // 커서 테이블 인
  function onMouseEnterChangePointer() {
    if (!stageRef.current) return;

    // 좌석 편집 활성화
    if (isTransformerAble) {
      stageRef.current.container().style.cursor = 'move';
      return;
    }

    // 기본 커서
    stageRef.current.container().style.cursor = 'pointer';
  }

  return { onMouseLeaveChangePointer, onMouseEnterChangePointer };
}
