import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ConditionItem, IBaseResponse, IBaseResponseWithCount } from '@/server/data/types/base-type';
import { IAddUser, IUser } from '@/server/data/types/user-type';

import { ENDPOINT_API_URLS } from '@/shared/constant/endpoint';
import { axiosInstance } from '@/shared/config/axios';
import { auth, logout } from '@/shared/providers/redux/slices/app-slice';
import { useAppDispatch } from '@/shared/hooks/use-redux';
import usePagination from '@/shared/hooks/use-pagination';
import { queryClient } from '@/shared/providers/query';

export const useGetListPaginationUser = (defaultFilter?: ConditionItem[]) => {
  return usePagination<IBaseResponseWithCount<IUser[]>>({
    queryKey: ['GET_LIST_PAGINATION_USER'],
    apiFn: params =>
      axiosInstance.post<IBaseResponseWithCount<IUser[]>>(ENDPOINT_API_URLS.USER_SEARCH, { ...params }),
    defaultParams: {
      page: 0,
      size: 5,
      filters: defaultFilter,
      sorts: [{ field: 'created_at', direction: 'ASC' }],
    },
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ['GET_LIST_USER'],
    queryFn: () => axiosInstance.get<IBaseResponse<IUser[]>>(ENDPOINT_API_URLS.USER_COMMON),
    select(data) {
      return data.data.map(item => ({
        label: item.name,
        value: item.id,
      }));
    },
  });
};

export const useGetCurrentUser = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useQuery({
    queryKey: ["USER_PROFILE"],
    queryFn: () => axiosInstance.get<IBaseResponse<IUser>>(ENDPOINT_API_URLS.CURRENT_USER),
    select: data => {
      if (data.status_code === 401 && data === null) {
        router.push('/login');
        dispatch(logout());
      } else {
        dispatch(auth(data.data));
      }
    },
  });
};
export const useAddUser = () => {
  return useMutation({
    mutationFn: (body: IAddUser) =>
      axiosInstance.post<IBaseResponse<any>>(ENDPOINT_API_URLS.USER_ADD, body),
    onSuccess: async data => {
      if (!data.data) return;
      queryClient.invalidateQueries({ queryKey: ["USER_ADD"] });
      toast.success('Thêm tài khoản mới thành công')
    },
    onError(error, variables, context) {
      console.log(error);
      toast.error('Thêm tài khoản mới thất bại(Vui lòng kiểm tra lại thông tin tài khoản')
    },
  });
};