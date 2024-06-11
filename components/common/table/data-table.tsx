'use client'
import React from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    SortDescriptor,
    Select,
    SelectItem,
    Spinner,
} from "@nextui-org/react";
import { capitalize } from "@/shared/utils/table";
import { buildQueryStringActionTable, encrypt } from "@/shared/utils/helpers/url";
import { RenderCell } from "./render-cell";
import DataTablePagination from "./data-table-pagination";


interface DataTableProps<TData> {
    data: TData[] | undefined;
    filterData: (data: TData[], hasSearchFilter: boolean, filterValue: string, quickFilter: string | "all") => TData[];
    isLoading: boolean
    columns: { name: string, uid: string, sortable?: boolean }[]
    pageSize: number;
    pageIndex: number;
    pageCount: number
    handChangePagination: (value: any, type: 'Page_change' | 'Size_change') => void;
    quickFilters: { fieldName: string, data: { name: string, uid: string }[] | undefined }
    modalCreate?: React.ReactNode
    modalUpdate?: React.ReactNode
    triggerView?: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }
}
export default function DataTable<TData>({
    data,
    filterData,
    isLoading,
    pageSize,
    pageCount,
    pageIndex,
    handChangePagination,
    columns,
    quickFilters,
    modalCreate,
    modalUpdate,
    triggerView
}: DataTableProps<TData>) {
    const pathname = usePathname()
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<string | any>("all");
    const [quickFilter, setQuickFilter] = React.useState("all");
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(pageIndex === 0 ? pageIndex + 1 : pageIndex);
    const pages = pageCount;

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        if (!data) return [];
        const filteredData = filterData(data, hasSearchFilter, filterValue, quickFilter)
        return filteredData;
    }, [data, filterValue, quickFilter, quickFilters]);

    const sortedItems = React.useMemo(() => {
        if (sortDescriptor.column && columns.find(col => col.uid === sortDescriptor.column)) {
            return [...filteredItems].sort((a: any, b: any) => {
                const first = a[sortDescriptor.column!];
                const second = b[sortDescriptor.column!];
                const cmp = first < second ? -1 : first > second ? 1 : 0;

                return sortDescriptor.direction === "descending" ? -cmp : cmp;
            });
        } else {
            return filteredItems;
        }
    }, [sortDescriptor, filteredItems, columns]);

    const onpageSizeChange = React.useCallback((e: any) => {
        handChangePagination(Number(e.target.value), "Size_change")
    }, []);

    const onSearchChange = React.useCallback((value: any) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<Search />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDown className="text-small" />} variant="flat">
                                    {quickFilters.fieldName}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Bảng cột"
                                closeOnSelect={false}
                                selectedKeys={quickFilter}
                                selectionMode="multiple"
                                onSelectionChange={(keys) => setQuickFilter(keys as string)}
                            >
                                {(quickFilters.data || []).map((filter) => (
                                    <DropdownItem key={filter.uid} className="capitalize">
                                        {capitalize(filter.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDown className="text-small" />} variant="flat">
                                    Cột
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Bảng cột"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        {modalCreate && modalCreate}
                    </div>
                </div>
                <div className="w-full flex justify-between items-center">
                    <span className="text-default-400 text-small">Tổng {pageSize} bản ghi</span>
                    <div className="min-w-[200px] grid grid-cols-5 items-center text-default-400 text-small gap-5">
                        <label className="col-span-3">Số lượng mỗi trang:</label>
                        <Select
                            items={[{ key: "5", label: "5" }, { key: "10", label: "10" }, { key: "15", label: "15" }]}
                            placeholder={String(pageSize)}
                            className="col-span-2 bg-transparent outline-none text-default-400 text-small"
                            onChange={onpageSizeChange}
                        >
                            {(item: any) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        quickFilter,
        visibleColumns,
        onpageSizeChange,
        data?.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const paginationContent = React.useMemo(() => {
        return (
            <DataTablePagination
                isLoading={isLoading}
                selectedKeys={selectedKeys}
                filteredItems={filteredItems}
                currentPage={page}
                totalPage={pages}
                setPage={setPage}
                handChangePagination={handChangePagination}
            />
        );
    }, [selectedKeys, filteredItems.length, page, pages, hasSearchFilter]);

    const handleSheetViewOpen = (id: any) => {
        if (!triggerView) return
        const queryString = buildQueryStringActionTable(window.location.search, [
            { field: 'view', value: encrypt(id) },
        ]);
        const newUrl = `${pathname}?${queryString}`;
        window.history.replaceState('', '', newUrl);
        triggerView && triggerView.setIsOpen(!triggerView.isOpen);
    };

    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[500px]", "w-full"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                "group-data-[middle=true]:before:rounded-none",
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <Table
            aria-label="Table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={paginationContent}
            bottomContentPlacement="outside"
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            // @ts-ignore
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody isLoading={isLoading} loadingContent={<Spinner label="Loading..." />} emptyContent={"No users found"} items={sortedItems}>
                {(item) => (
                    // @ts-ignore
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell className="min-w-[200px]"> {RenderCell({ item, columnKey: columnKey, modalUpdate, handleSheetViewOpen })}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
