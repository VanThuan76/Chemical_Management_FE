'use client'
import { QueryClient } from '@tanstack/react-query';

export const defaultQueryOptions = {
    queries: {
        staleTime: 1000 * 60 * 1,
        refetchOnWindowFocus: false,
        retry: 1,
    },
}

export const queryClient = new QueryClient({
    defaultOptions: defaultQueryOptions,
});
