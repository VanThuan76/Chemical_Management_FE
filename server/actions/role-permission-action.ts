import { axiosInstance } from '@/shared/config/axios';
import { useQuery } from '@tanstack/react-query';
import { IBaseResponse } from '@/server/data/types/base-type';
import { ENDPOINT_API_URLS } from '@/shared/constant/endpoint';
import { IRole } from '@/server/data/types/role-permission-type';

export const useGetAllRole = () => {
    return useQuery({
        queryKey: ['GET_LIST_ROLE'],
        queryFn: () => axiosInstance.get<IBaseResponse<IRole[]>>(ENDPOINT_API_URLS.ROLE_ALL),
    });
};