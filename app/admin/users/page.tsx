'use client'
import { useState } from 'react';

import { useGetAllRole } from '@/server/actions/role-permission-action';
import { useGetListPaginationUser } from '@/server/actions/users-action';

import { GENDER } from '@/shared/constant';
import { formatDateBasic } from '@/shared/utils/helpers/date';
import { IUser } from '@/server/data/types/user-type';

import { AddUser } from '@/components/users/add-user';
import { UpdateUser } from '@/components/users/update-user';
import DataTable from '@/components/common/table/data-table';
import ViewUser from '@/components/users/view-user';

const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Tên", uid: "name", sortable: true },
    { name: "Email", uid: "email" },
    { name: "Giới tính", uid: "gender", sortable: true },
    { name: "Vai trò", uid: "role" },
    { name: "Ngày tạo", uid: "created_at", sortable: true },
    { name: "Ngày cập nhật", uid: "updated_at", sortable: true },
    { name: "Hành động", uid: "actions" },
];

const UsersPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: users, tableConfig } = useGetListPaginationUser();
    const { data: roles } = useGetAllRole()

    const convertData = users && users.data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        gender: GENDER[user.gender],
        role: user.role.name,
        created_at: formatDateBasic(user.created_at),
        updated_at: formatDateBasic(user.updated_at),
    }));

    const quickFilters = roles && roles.data.map(role => ({
        name: role.name,
        uid: String(role.name.toLowerCase()),
    }))

    function filterData(data: any[], hasSearchFilter: boolean, filterValue: string, quickFilter: string | "all"): any[] {
        if (!data) return [];
        let filteredData = [...data];

        if (hasSearchFilter) {
            filteredData = filteredData.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (quickFilter !== "all" && Array.from(quickFilter).length !== quickFilters?.length) {
            filteredData = filteredData.filter(user =>
                Array.from(quickFilter).includes((user.role).toLowerCase())
            );
        }
        return filteredData;
    }


    return (
        <div className='p-5'>
            <DataTable
                columns={columns}
                data={convertData}
                filterData={filterData}
                quickFilters={{
                    fieldName: 'Vai trò',
                    data: quickFilters
                }}
                modalUpdate={<UpdateUser />}
                modalCreate={<AddUser />}
                triggerView={{
                    setIsOpen,
                    isOpen
                }}
                {...tableConfig}
            />
            <ViewUser setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
    );
}

export default UsersPage;