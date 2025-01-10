import styles from '@/style/Widget.module.css';
import {
  firstSpanVariant,
  iconBoxVariant,
  lastSpanVariant,
  middleSpanVariant,
} from '../../lib/motion/motion_widget';
import { resetItemState } from '../../lib/features/itemState/itemSlice';
import { resetKonvaState } from '../../lib/features/konvaState/konvaSlice';
import { setWidgetEditState, setWidgetState } from '../../lib/features/widgetState/widgetSlice';
import { changeSubmitStatus } from '../../lib/features/submitState/submitSlice';

import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';

export default function WidgetBtn() {
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const editTableType = useSelector((state) => state.konvaState.type);
  const clicked = useSelector((state) => state.widgetState.isWidgetOpen);
  // useDispatch
  const dispatch = useDispatch();

  // 위젯 열기/닫기
  function onClickOpenWidgetList() {
    if (isModalOpen) return;
    // 수정 중 취소하기
    if (editTableType) {
      dispatch(resetItemState());
      dispatch(resetKonvaState());
      dispatch(setWidgetEditState({ isEdit: false }));
      // 데이터 패치 가능하도록 초기 상태로 전환
      dispatch(changeSubmitStatus({ status: 'initial' }));
      return;
    }
    dispatch(setWidgetState());
  }

  return (
    <div className={styles.widget} onClick={onClickOpenWidgetList}>
      <motion.div
        className={styles.iconBox}
        variants={iconBoxVariant}
        initial={clicked ? 'notClicked' : 'notClicked'}
        animate={clicked ? 'clicked' : 'notClicked'}
      >
        <motion.span variants={firstSpanVariant}></motion.span>
        <motion.span variants={middleSpanVariant}></motion.span>
        <motion.span variants={lastSpanVariant}></motion.span>
      </motion.div>
    </div>
  );
}
