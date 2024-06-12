'use client'
import { useState } from 'react';

import { formatDateBasic, formatDateOriginal } from '@/shared/utils/helpers/date';
import { useGetListPaginationCustomer } from '@/server/actions/customers-action';

import { AddCustomer } from '@/components/customers/add-customer';
import { UpdateUser } from '@/components/users/update-user';
import DataTable from '@/components/common/table/data-table';
import ViewUser from '@/components/users/view-user';

const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Tên", uid: "name", sortable: true },
    { name: "Email", uid: "email" },
    { name: "Số điện thoại", uid: "phone_number", sortable: true },
    { name: "Sinh nhật", uid: "birthday" },
    { name: "Địa chỉ", uid: "address" },
    { name: "Loại KH", uid: "type" },
    { name: "Ngày tạo", uid: "created_at", sortable: true },
    { name: "Ngày cập nhật", uid: "updated_at", sortable: true },
    { name: "Hành động", uid: "actions" },
];

const CustomersPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: customers, tableConfig } = useGetListPaginationCustomer();

    const convertData = customers && customers.data.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone_number: customer.phone_number,
        birthday: formatDateOriginal(customer.birthday),
        address: customer.address,
        type: customer.type,
        created_at: formatDateBasic(customer.created_at),
        updated_at: formatDateBasic(customer.updated_at),
    }));

    const quickFilters = customers && customers.data.map(customer => ({
        name: String(customer.phone_number),
        uid: String(customer.phone_number),
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
            filteredData = filteredData.filter(data =>
                Array.from(quickFilter).includes((data.phone_number))
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
                    fieldName: 'Số điện thoại',
                    data: quickFilters
                }}
                modalUpdate={<UpdateUser />}
                modalCreate={<AddCustomer />}
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

export default CustomersPage;