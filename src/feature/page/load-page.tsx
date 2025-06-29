import { lazy, Suspense, useState } from 'react';
import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/supabase-js';

import { useSubscribeTable } from '../../hook/use-subscribe-table';

import StartUpScreen from '../load/start/start-up-screen';

const LazyMainPage = lazy(() => import('./page-index'));

export default function LoadPage() {
  const [isCompleted, setLoadComplete] = useState(false);
  const [isMounted, setMount] = useState(false);

  const { initialLoadstatus, isLoading, isError } = useSubscribeTable(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL);

  const state = {
    isCompleted,
    isError,
    isLoading,
    isMounted,
    initialLoadstatus,
  };

  return (
    <>
      {/* 로드 전 화면 */}
      <StartUpScreen state={state} setLoadComplete={setLoadComplete} />

      {/* 로드 후 페이지 */}
      <Suspense fallback={null}>
        <LazyMainPage state={state} setMount={setMount} />
      </Suspense>
    </>
  );
}
