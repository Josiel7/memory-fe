import { request } from 'umi';

export const fetchList = () => {
  return request('api/list', {});
};
