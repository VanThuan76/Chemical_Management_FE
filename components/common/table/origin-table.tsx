'use client'

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Checkbox } from "@nextui-org/react";
import { Edit3, Eye, Trash } from "lucide-react";

interface OriginTableProps<TData> {
    data: TData[] | undefined;
    columns: { name: string, uid: string, sortable?: boolean }[]
    onCheckboxChange?: (itemId: string | number, columnKey: string, value: boolean) => void; //For checkBox cell
}
export default function OriginTable<TData>({
    data,
    columns,
    onCheckboxChange
}: OriginTableProps<TData>) {
    const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof TData];
        const columnKeyStr = columnKey.toString();
        if (columnKeyStr.startsWith('is_')) {
            return (
                <div className="relative flex justify-start items-start gap-2">
                    <Checkbox
                        isSelected={cellValue}
                        onChange={(e) => onCheckboxChange && onCheckboxChange(item['id'], columnKeyStr, e.target.checked)}
                    />
                </div>
            )
        }
        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Eye />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Edit3 />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <Trash />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

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
            aria-label="Table with custom cells"
            classNames={classNames}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={data}>
                {(item) => (
                    // @ts-ignore
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
