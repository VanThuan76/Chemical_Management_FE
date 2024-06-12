'use client'
import { getCookie } from 'cookies-next';
import { useMemo } from 'react';
import { Boxes, Container, Factory, Home, Key, Package2, Shield, Users, UsersRound } from 'lucide-react';

import { APP_SAVE_KEY } from "@/shared/constant"

export interface IAppMenu {
    title: string;
    icon: React.ReactNode;
    href: string;
    items?: IAppMenu[];
}

export const APP_MENUS = [
    {
        title: "Trang chủ",
        icon: <Home className="w-[18px] h-[18px]" />,
        href: "/admin",
        roleId: [167, 2, 3]
    },
    {
        title: "Quản lý khách hàng",
        icon: <UsersRound className="w-[18px] h-[18px]" />,
        href: "/admin/customers",
        roleId: [167, 2, 3]
    },
    {
        title: "Quản lý người dùng",
        icon: <Users className="w-[18px] h-[18px]" />,
        href: "/admin/users",
        roleId: [167, 2, 3]
    },
    {
        title: "Quản lý vai trò",
        icon: <Key className="w-[18px] h-[18px]" />,
        href: "/admin/roles",
        roleId: [167, 2, 3]
    },
    {
        title: "Quản lý SP",
        icon: <Package2 className="w-[18px] h-[18px]" />,
        href: "#",
        roleId: [167, 2, 3],
        items: [
            {
                title: "Quản lý hàng hoá",
                icon: <Package2 className="w-[18px] h-[18px]" />,
                href: "/admin/chemicals",
                roleId: [167, 2, 3]
            },
            {
                title: "Quản lý nơi sản xuất",
                icon: <Factory className="w-[18px] h-[18px]" />,
                href: "/admin/manufacturers",
                roleId: [167, 2, 3]
            },
            {
                title: "Quản lý nhà cung cấp",
                icon: <Container className="w-[18px] h-[18px]" />,
                href: "/admin/suppliers",
                roleId: [167, 2, 3]
            },
            {
                title: "Quản lý thể loại",
                icon: <Boxes className="w-[18px] h-[18px]" />,
                href: "/admin/categories",
                roleId: [167, 2, 3]
            }
        ],
    },
]

export function ValidMenus() {
    const userRole = getCookie(APP_SAVE_KEY.ROLE);
    const currentMenu = useMemo(() => {
        if (userRole) {
            return APP_MENUS.filter(item => item.roleId?.includes(Number(userRole)));
        } else {
            return APP_MENUS;
        }
    }, [userRole, APP_MENUS]);

    return currentMenu;
}

export function checkPathUrl(pathUrl: string, href: string): boolean {
    if (href === '/admin' && pathUrl === '/admin') {
        return true;
    }
    if (href === '/admin' && pathUrl !== '/admin') {
        return false;
    }
    return pathUrl.startsWith(href);
}
