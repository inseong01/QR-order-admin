import { MenuList } from '../../../types/common';
import { Method, Table } from '../../store/useFetchSlice';
import supabase from '../supabaseConfig';

export default async function fetchMenuItem({
  method,
  itemInfo,
  table,
}: {
  method: Method;
  itemInfo: MenuList;
  table: Table;
}) {
  let response;

  switch (method) {
    case 'insert': {
      response = await supabase.from(`qr-order-${table}`).insert([itemInfo]).select();
      break;
    }
    case 'update': {
      const id = itemInfo.id;
      // 동작하지 않는다면 [itemInfo] 문제
      response = await supabase.from(`qr-order-${table}`).update(itemInfo).eq('id', id).select();
      break;
    }
    case 'delete': {
      // itemInfo type:  메뉴 -> 객체
      const idArr = [itemInfo].map((item) => item.id);
      response = await supabase.from(`qr-order-${table}`).delete().in('id', idArr).select();
      break;
    }
    default: {
      console.error(`Method: ${method.toUpperCase()} is not defined`);
      return null;
    }
  }

  const isNoneData = response.data?.length === 0;

  if (response.error || isNoneData) {
    const deleteDenyMsg = isNoneData && ': The request for deletion has been denied';

    console.error(response.error?.message ?? `${method.toUpperCase()} Error ${deleteDenyMsg}`);

    return null;
  }

  return response;
}
