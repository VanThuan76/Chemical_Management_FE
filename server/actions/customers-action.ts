import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ConditionItem, IBaseResponse, IBaseResponseWithCount } from '@/server/data/types/base-type';
import { IAddCustomer, ICustomer } from '@/server/data/types/customer-type';

import { ENDPOINT_API_URLS } from '@/shared/constant/endpoint';
import { axiosInstance } from '@/shared/config/axios';
import usePagination from '@/shared/hooks/use-pagination';
import { queryClient } from '@/shared/providers/query';

export const useGetListPaginationCustomer = (defaultFilter?: ConditionItem[]) => {
    return usePagination<IBaseResponseWithCount<ICustomer[]>>({
        queryKey: ['GET_LIST_PAGINATION_CUSTOMER'],
        apiFn: params =>
            axiosInstance.post<IBaseResponseWithCount<ICustomer[]>>(ENDPOINT_API_URLS.CUSTOMER_SEARCH, { ...params }),
        defaultParams: {
            page: 0,
            size: 5,
            filters: defaultFilter,
            sorts: [{ field: 'created_at', direction: 'ASC' }],
        },
    });
};

export const useAddCustomer = () => {
    return useMutation({
      mutationFn: (body: IAddCustomer) =>
        axiosInstance.post<IBaseResponse<any>>(ENDPOINT_API_URLS.USER_ADD, body),
      onSuccess: async data => {
        if (!data.data) return;
        queryClient.invalidateQueries({ queryKey: ["CUSTOMER_ADD"] });
        toast.success('Thêm khách hàng mới thành công')
      },
      onError(error, variables, context) {
        console.log(error);
        toast.error('Thêm khách hàng mới thất bại(Vui lòng kiểm tra lại thông tin khách hàng')
      },
    });
  };