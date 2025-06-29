import { motion, AnimatePresence } from 'motion/react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RequestList } from '../../../types/common';

import styles from './alert-index.module.css';

export default function DisplayedAlertMessage({
  list,
  onClickReadMsg,
}: {
  list: RequestList[];
  onClickReadMsg: (list: RequestList) => () => void;
}) {
  const msgList = [...list].slice(0, 4);

  return (
    <motion.ul className={`${styles.reqeustMsg}`}>
      <AnimatePresence mode='popLayout'>
        {msgList.map((list) => {
          const { id, tableNum, requestList } = list;
          return (
            <motion.li
              key={id}
              className={styles.msg}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              layout
            >
              {/* 상단 */}
              <div className={styles.top}>
                <div className={styles.title}>테이블 {tableNum}</div>

                <div className={styles.closeBtn} onClick={onClickReadMsg(list)}>
                  <FontAwesomeIcon icon={faXmark} size='lg' />
                </div>
              </div>

              {/* 하단 */}
              <div className={styles.bottom}>
                <div>
                  <span className={styles.cate}>요청</span>
                </div>

                <span>{requestList}</span>
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </motion.ul>
  );
}
