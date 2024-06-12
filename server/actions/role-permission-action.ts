import { axiosInstance } from '@/shared/config/axios';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';

import { IBaseResponse } from '@/server/data/types/base-type';
import { ENDPOINT_API_URLS } from '@/shared/constant/endpoint';
import { IAddRole, IRole } from '@/server/data/types/role-permission-type';
import { queryClient } from '@/shared/providers/query';

export const useGetAllRole = () => {
    return useQuery({
        queryKey: ['GET_LIST_ROLE'],
        queryFn: () => axiosInstance.get<IBaseResponse<IRole[]>>(ENDPOINT_API_URLS.ROLE_ALL),
    });
};
export const useAddRole = () => {
    return useMutation({
        mutationFn: (body: IAddRole) =>
            axiosInstance.post<IBaseResponse<any>>(ENDPOINT_API_URLS.ROLE_ADD, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ["ROLE_ADD"] });
            toast.success('Thêm vai trò mới thành công')
        },
        onError(error, variables, context) {
            console.log(error);
            toast.error('Thêm vai trò mới thất bại(Vui lòng kiểm tra lại thông tin tài khoản')
        },
    });
};