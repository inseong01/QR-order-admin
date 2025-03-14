import styles from '@/style/Widget.module.css';
import { useBoundStore } from '../lib/store/useBoundStore';
import WidgetMenuWrap from './widget/WidgetOptionWrap';
import WidgetBtn from './widget/WidgetBtn';

import { useEffect, useRef } from 'react';

export default function Widget() {
  // useRef
  const widgetRef = useRef(null);
  // store
  const tab = useBoundStore((state) => state.tab.id);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const isWidgetOpen = useBoundStore((state) => state.widget.isOpen);
  const isTableEditAble = useBoundStore((state) => state.konva.isAble);
  const resetWidgetState = useBoundStore((state) => state.resetWidgetState);

  // 외부 선택으로 위젯 닫기
  useEffect(() => {
    function onClickWindowToCloseWidget(e: MouseEvent) {
      // e.target 타입 가드
      if (!e.target) return;
      const target = e.target as HTMLElement;
      // 모달 열려 있을 때 클릭 방지
      if (isModalOpen) return;
      // icon(path) 클릭 시 닫기 방지
      const isNodePath = target.tagName === 'path' || target.tagName === 'svg';
      if (isNodePath) return;
      const isWindowClicked = target.offsetParent !== widgetRef.current; // offsetParent = widgetWrap
      if (isWidgetOpen && isWindowClicked && !isTableEditAble) {
        resetWidgetState();
      }
    }
    window.addEventListener('click', onClickWindowToCloseWidget);

    return () => window.removeEventListener('click', onClickWindowToCloseWidget);
  }, [isWidgetOpen, isTableEditAble, isModalOpen]);

  // tab 전환될 때
  useEffect(() => {
    resetWidgetState();
  }, [tab]);

  return (
    <div className={styles.widgetWrap} ref={widgetRef}>
      <WidgetBtn />
      <WidgetMenuWrap />
    </div>
  );
}
