"use client"
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { Key, Shield } from "lucide-react";
import TableRole from "@/components/roles/table-role";
import { AddRole } from "@/components/roles/add-role";

const RolePage = () => {
    const [selected, setSelected] = React.useState<any>("roles");

    return (
        <div className="p-5">
            <div className="relative flex w-full flex-col">
                <Tabs
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                    aria-label="Options"
                    color="primary"
                    variant="bordered">
                    <Tab
                        key="roles"
                        title={
                            <div className="flex items-center space-x-2">
                                <Key />
                                <span>Vai trò</span>
                            </div>
                        }
                    >
                        <TableRole />
                    </Tab>
                    <Tab
                        key="permissions"
                        title={
                            <div className="flex items-center space-x-2">
                                <Shield />
                                <span>Phân quyền</span>
                            </div>
                        }
                    />
                </Tabs>
                <AddRole />
            </div>
        </div>
    );
}

export default RolePage;