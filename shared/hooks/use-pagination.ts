'use client'

import queryString from 'query-string';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { ConditionItem, ISearchParams } from '@/server/data/types/base-type';

import { parseURLSearch, stringifyArrayObj } from '@/shared/utils/pagination';
import { PAGINATION } from '@/shared/constant';
import { useState } from 'react';

type Props<T> = {
    apiFn: (_params?: ISearchParams) => Promise<T>;
    defaultParams?: Partial<ISearchParams>;
    queryKey?: any;
};

const pageKey = PAGINATION.PAGEKEY;
const sizeKey = PAGINATION.SIZEKEY;

export default function usePagination<T>({ queryKey, apiFn, defaultParams }: Props<T>) {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const search = searchParams.get('search')
    const queryParams = queryString.parse(search as string);

    const pageIndexStatic = parseInt(searchParams.get(pageKey) as string) || defaultParams?.page || 0;
    const [pageIndex, setPageIndex] = useState<any>(pageIndexStatic);

    const pageSizeStatic = parseInt(searchParams.get(sizeKey) as string) || defaultParams?.size || PAGINATION.DEFAULT_PAGE_SIZE;
    const [pageSize, setPageSize] = useState<any>(pageSizeStatic);

    const sorts: ISearchParams['sorts'] = defaultParams?.sorts || [];
    const filters: ISearchParams['filters'] = parseURLSearch(search as string);

    /**
     *
     * @param key : propertyName to search
     * @returns an array | null
     */
    function getFieldValueOnSearchParam(key: string) {
        let oldFilterArr = [];
        try {
            oldFilterArr = parseURLSearch(queryParams.search as string);
        } catch (e) {
            console.log(e);
        }
        return oldFilterArr.find(item => item.field === key) ? [oldFilterArr.find(item => item.field === key).value] : null;
    }

    function onChangeParams(param: (any & 'page') | 'size', value: any) {
        const oldQuery = queryParams;
        if (value === undefined) {
            delete oldQuery[param];
        } else {
            oldQuery[param] = value;
        }
        if (param !== 'page') {
            oldQuery.page = '1';
        }
        const queryStringFormatted = queryString.stringify(oldQuery);
        const url = `${pathName}?${queryStringFormatted}`;
        router.push(url);
        param === "page" && setPageIndex(value)
        param === "size" && setPageSize(value)
    }

    function onChangeParamsObj(paramsToUpdate: { [key: string]: any }) {
        const oldQuery = queryParams;

        for (const param in paramsToUpdate) {
            const value = paramsToUpdate[param];
            if (value === undefined) {
                delete oldQuery[param];
            } else {
                oldQuery[param] = value;
            }
        }
        const url = `${pathName}?${oldQuery}`
        router.push(url);
    }
    /**
     * @description parse from filters to URL then if filters already exist it will replace old value
     * @param filters: ConditionItem[]
     * @return void
     *
     */
    function onChangeMultiSearchParams(filters: ConditionItem[], type: string) {
        const oldQuery = queryParams;
        const oldFilterArr = parseURLSearch(oldQuery.search as string);

        let newFilterArr: ConditionItem[] = [];

        filters.forEach(newFilter => {
            const existingFilterIndex = oldFilterArr.findIndex(oldFilter => oldFilter.property === newFilter.property);

            if (existingFilterIndex !== -1) {
                if (newFilter.value !== undefined && newFilter.value !== null && newFilter.value !== '') {
                    newFilterArr.push({ ...newFilter, value: newFilter.value });
                }
                oldFilterArr.splice(existingFilterIndex, 1);
            } else if (newFilter.value !== undefined && newFilter.value !== null && newFilter.value !== '') {
                newFilterArr.push(newFilter);
            }
        });

        newFilterArr = type === 'individual' ? [...newFilterArr, ...oldFilterArr] : [...newFilterArr];

        const newFilterArrJson = stringifyArrayObj(newFilterArr.filter(item => item.value !== undefined));

        const newQuery = { ...oldQuery, search: newFilterArrJson, typeSearch: type };
        const url = `${pathName}?${newQuery}`
        router.push(url);
    }

    const finalFilter = defaultParams?.filters ? [...filters, ...defaultParams.filters] : filters;
    const { data, isLoading, refetch } = useQuery({
        queryKey: [...queryKey, router, pageIndex, pageSize],
        queryFn: () =>
            apiFn({ ...defaultParams, ...queryParams, page: pageIndex === 0 ? pageIndex : pageIndex - 1, size: pageSize, filters: finalFilter, sorts: sorts }),
        enabled: router ? true : false,
    });

    function onChangePageAll() {
        onChangeParams('page', 'all');
        refetch();
    }

    const tableConfig = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        isLoading,
        // @ts-ignore
        pageCount: data?.total_pages,
        handChangePagination: (value: number, type: 'Page_change' | 'Size_change') => {
            if (type === 'Page_change') {
                onChangeParams(PAGINATION.PAGEKEY, value);
            } else {
                onChangeParams(PAGINATION.SIZEKEY, value);
            }
        },
    };

    return {
        data,
        tableConfig,
        isLoading,
        refetch,
        pageIndex,
        pageSize,
        filters,
        sorts,
        params: queryParams,
        defaultParams,
        onChangeParams,
        onChangeParamsObj,
        getFieldValueOnSearchParam,
        onChangeMultiSearchParams,
        onChangePageAll,
    };
}
