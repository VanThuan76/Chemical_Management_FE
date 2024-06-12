import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ConditionItem, IBaseResponse, IBaseResponseWithCount } from '@/server/data/types/base-type';
import { IAddChemical, IChemical } from '@/server/data/types/chemical-type';

import { ENDPOINT_API_URLS } from '@/shared/constant/endpoint';
import { axiosInstance } from '@/shared/config/axios';
import usePagination from '@/shared/hooks/use-pagination';
import { queryClient } from '@/shared/providers/query';

export const useGetListPaginationChemical = (defaultFilter?: ConditionItem[]) => {
    return usePagination<IBaseResponseWithCount<IChemical[]>>({
        queryKey: ['GET_LIST_PAGINATION_CHEMICAL'],
        apiFn: params =>
            axiosInstance.post<IBaseResponseWithCount<IChemical[]>>(ENDPOINT_API_URLS.CHEMICAL_SEARCH, { ...params }),
        defaultParams: {
            page: 0,
            size: 5,
            filters: defaultFilter,
            sorts: [{ field: 'created_at', direction: 'ASC' }],
        },
    });
};

export const useAddChemical = () => {
    return useMutation({
        mutationFn: (body: IAddChemical) =>
            axiosInstance.post<IBaseResponse<any>>(ENDPOINT_API_URLS.CHEMICAL_ADD, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ["CHEMICAL_ADD"] });
            toast.success('Thêm sản phẩm hoá học mới thành công')
        },
        onError(error, variables, context) {
            console.log(error);
            toast.error('Thêm sản phẩm hoá học mới thất bại(Vui lòng kiểm tra lại thông tin sản phẩm hoá học')
        },
    });
};