'use client'
import { useState } from 'react';

import { formatDateBasic, formatDateOriginal } from '@/shared/utils/helpers/date';
import { useGetListPaginationCustomer } from '@/server/actions/customers-action';

import { AddCustomer } from '@/components/customers/add-customer';
import { UpdateUser } from '@/components/users/update-user';
import DataTable from '@/components/common/table/data-table';
import ViewUser from '@/components/users/view-user';
import { useGetListPaginationChemical } from '@/server/actions/chemical-action';

const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Tên", uid: "name", sortable: true },
    { name: "Mô tả", uid: "description" },
    { name: "Số CAS", uid: "cas_number", sortable: true },
    { name: "Điểm chớp cháy", uid: "flash_point" },
    { name: "Phạm vi nhiệt độ lưu trữ", uid: "storage_temperature_range" },
    { name: "Điều kiện lưu trữ", uid: "storage_conditions" },
    { name: "Loại", uid: "type" },
    { name: "Đơn vị đo lường", uid: "unit_of_measure" },
    { name: "Ngày tạo", uid: "created_at", sortable: true },
    { name: "Ngày cập nhật", uid: "updated_at", sortable: true },
    { name: "Hành động", uid: "actions" },
];

const ChemicalPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: chemicals, tableConfig } = useGetListPaginationChemical();

    const convertData = chemicals && chemicals.data.map(chemical => ({
        id: chemical.id,
        name: chemical.name,
        description: chemical.description,
        cas_number: chemical.cas_number,
        adflash_pointdress: chemical.flash_point,
        storage_temperature_range: chemical.storage_temperature_range,
        storage_conditions: chemical.storage_conditions,
        type: chemical.type,
        unit_of_measure: chemical.unit_of_measure,
        created_at: formatDateBasic(chemical.created_at),
        updated_at: formatDateBasic(chemical.updated_at),
    }));

    const quickFilters = chemicals && chemicals.data.map(chemical => ({
        name: String(chemical.cas_number),
        uid: String(chemical.cas_number),
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
                Array.from(quickFilter).includes((data.cas_number))
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
                    fieldName: 'Số CAS',
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

export default ChemicalPage;