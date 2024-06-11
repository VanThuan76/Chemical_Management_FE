import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import { toast } from 'sonner';

import { IBaseResponse } from '@/server/data/types/base-type';
import { IAuthentication } from '@/server/data/types/auth-type';

import { ENDPOINT_API_URLS } from '@/shared/constant/endpoint';
import { queryClient } from '@/shared/providers/query';
import { APP_SAVE_KEY } from '@/shared/constant';
import { axiosInstance } from '@/shared/config/axios';
import { login } from '@/shared/providers/redux/slices/app-slice';
import { useAppDispatch } from '@/shared/hooks/use-redux';



export const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (auth: { email: string; password: string }) =>
      axiosInstance.post<IBaseResponse<IAuthentication>>(ENDPOINT_API_URLS.AUTH, auth),
    onSuccess: async data => {
      if (!data.data) return;
      queryClient.invalidateQueries({ queryKey: ["AUTH_USER"] });
      if (!data.data.token) return;
      setCookie(APP_SAVE_KEY.TOKEN_KEY, data.data.token);
      setCookie(APP_SAVE_KEY.REFRESH_TOKEN_KEY, data.data.refresh_token);
      setCookie(APP_SAVE_KEY.ROLE, data.data.user.role.id);
      dispatch(login(data.data.user));
      router.push("/admin")
      toast.success('Đăng nhập thành công')
    },
    onError(error, variables, context) {
      console.log(error);
      toast.error('Đăng nhập thất bại(Vui lòng kiểm tra lại thông tin đăng nhập và mật khẩu')
    },
  });
};