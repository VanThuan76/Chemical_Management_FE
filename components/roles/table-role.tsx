import React, { useEffect, useState } from "react";
import { Tabs, Tab, Skeleton, Button } from "@nextui-org/react";
import { useGetAllRole } from "@/server/actions/role-permission-action";
import OriginTable from "@/components/common/table/origin-table";
import useBreakpoint from "@/shared/hooks/use-breakpoint";
import { Edit3, Trash } from "lucide-react";

const columns = [
    { name: "Tên quyền hạn", uid: "table_key", sortable: true },
    { name: "Xem", uid: "is_read" },
    { name: "Thêm mới", uid: "is_create" },
    { name: "Chỉnh sửa", uid: "is_update" },
    { name: "Xoá", uid: "is_delete" },
    { name: "Tất cả", uid: "is_manage" },
];

const TableRole = () => {
    const { data: roles, isLoading } = useGetAllRole();
    const currentBreakpoint = useBreakpoint();

    const [selected, setSelected] = useState<any>(roles && roles.data[0].id);
    const [currentRole, setCurrentRole] = useState<any[]>([]);
    const [hasChanges, setHasChanges] = useState(false);  // State to track changes

    useEffect(() => {
        if (roles && roles.data.length > 0 && !selected) {
            setSelected(String(roles.data[0].id));
        }
    }, [roles, selected]);

    useEffect(() => {
        if (roles && selected) {
            const role = roles.data.find(role => role.id === +selected);
            if (role) {
                const permissions = role.permissions.map(permission => ({
                    id: permission.id,
                    table_key: permission.table_key,
                    is_read: permission.is_read,
                    is_create: permission.is_create,
                    is_update: permission.is_update,
                    is_delete: permission.is_delete,
                    is_manage: permission.is_manage,
                }));
                setCurrentRole(permissions);
            }
        }
    }, [roles, selected]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-start items-start gap-3">
                <Skeleton className="h-5 w-1/3 rounded-lg" />
                <Skeleton className="h-5 w-1/3 rounded-lg" />
                <Skeleton className="h-5 w-1/3 rounded-lg" />
            </div>
        );
    }

    const handleCheckboxChange = (itemId: string | number, columnKey: string, value: boolean) => {
        setCurrentRole(prevData =>
            prevData.map(item =>
                item.id === itemId ? { ...item, [columnKey]: value } : item
            )
        );
        setHasChanges(true);  // Set changes flag to true when a checkbox changes
    };

    return (
        <div className="flex w-full flex-col">
            <Tabs
                selectedKey={selected}
                onSelectionChange={setSelected}
                aria-label="Options"
                isVertical={currentBreakpoint === "sm" ? false : true}
            >
                {roles && roles.data ? roles.data.map(role => {
                    return (
                        <Tab
                            className="w-full space-y-2"
                            key={String(role.id)}
                            title={
                                <div className="flex items-center justify-center space-x-2">
                                    <span>{role.name}</span>
                                    <Edit3 className="w-[14px] h-[14px]" />
                                    <Trash className="w-[14px] h-[14px]" />
                                </div>
                            }
                        >
                            <OriginTable data={currentRole} columns={columns} onCheckboxChange={handleCheckboxChange} />
                            {hasChanges && (
                                <div className="w-full flex justify-end items-end">
                                    <Button color="primary">
                                        Cập nhật
                                    </Button>
                                </div>
                            )}
                        </Tab>
                    )
                }) : null}
            </Tabs>
        </div>
    );
}

export default TableRole;
