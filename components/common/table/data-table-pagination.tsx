'use client'
import React from "react";
import {
    Button,
    Pagination,
    Skeleton
} from "@nextui-org/react";

interface DataTablePaginationProps {
    isLoading: boolean;
    selectedKeys: any;
    filteredItems: any
    currentPage: number;
    totalPage: number
    setPage: any
    handChangePagination: (value: any, type: 'Page_change' | 'Size_change') => void;
}
const DataTablePagination = ({ currentPage, totalPage, isLoading, selectedKeys, filteredItems, setPage, handChangePagination }: DataTablePaginationProps) => {
    const onNextPage = React.useCallback(() => {
        if (currentPage < totalPage) {
            setPage(currentPage + 1);
            handChangePagination(currentPage + 1, 'Page_change')
        }
    }, [currentPage, totalPage]);

    const onPreviousPage = React.useCallback(() => {
        if (currentPage > 1) {
            setPage(currentPage - 1);
            handChangePagination(currentPage - 1, 'Page_change')
        }
    }, [currentPage]);
    
    return (
        <>
            {
                isLoading ?
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    :
                    <div className="py-2 px-2 flex justify-end items-center gap-3">
                        <span className="max-w-sm text-small text-default-400">
                            {String(selectedKeys) === "all"
                                ? "Tất cả bản ghi được chọn"
                                : `${selectedKeys.size} trên ${filteredItems.length} được chọn`}
                        </span>
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={currentPage}
                            total={totalPage}
                            onChange={(e) => {
                                handChangePagination(Number(e), "Page_change")
                                setPage(e)
                            }}
                        />
                        <div className="hidden sm:flex max-w-sm justify-end gap-2">
                            <Button isDisabled={currentPage === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                                Trước
                            </Button>
                            <Button isDisabled={currentPage >= totalPage} size="sm" variant="flat" onPress={onNextPage}>
                                Tiếp
                            </Button>
                        </div>
                    </div>
            }
        </>
    );
}

export default DataTablePagination;