import styles from '@/style/bottom/TabMenu.module.css';
import useQueryAllOrderList from '../../lib/hook/useQuery/useQueryAllOrderList';

import { useEffect, useState } from 'react';

export default function TabMenuOrderAlert({ tab }) {
  // useState
  const [isUnDoneList, setUndDoneList] = useState(false);
  // hook
  const { data } = useQueryAllOrderList();

  // 하단 탭, 완료되지 않은 주문 여부 알림 띄우기
  useEffect(() => {
    if (!data) return;
    if (tab.title !== '주문') return;
    // 완료 되지 않은 주문 여부
    const isUnDoneOrderList = data.data ? data.data.some((list) => !list.isDone) : false;
    setUndDoneList(isUnDoneOrderList);
  }, [data, tab]);

  return <>{isUnDoneList && <div className={`${styles.alertStatus}`}></div>}</>;
}
