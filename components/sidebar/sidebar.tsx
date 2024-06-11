'use client'
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";

import { useSidebarContext } from "@/components/layout/layout-context";
import { checkPathUrl, IAppMenu, ValidMenus } from "@/shared/config/app";

import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CompaniesDropdown } from "./companies-dropdown";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const menus = ValidMenus()
  const { collapsed, setCollapsed } = useSidebarContext();
  const [validMenus, setValidMenus] = useState<IAppMenu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setValidMenus(menus);
      setLoading(false);
    }, 2000);
  }, [menus]);

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {loading ? (
              <>
                <Skeleton className="h-5 w-full rounded-lg" />
                <Skeleton className="h-5 w-full rounded-lg" />
                <Skeleton className="h-5 w-full rounded-lg" />
                <Skeleton className="h-5 w-full rounded-lg" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </>
            ) : (
              <>
                <SidebarMenu title="Main Menu">
                  {validMenus.map((menu, index) => (
                    <SidebarItem
                      key={index}
                      title={menu.title}
                      icon={menu.icon}
                      isActive={checkPathUrl(pathname, menu.href)}
                      href={menu.href}
                    />
                  ))}
                </SidebarMenu>
                <SidebarMenu title="Security">
                  <SidebarItem
                    isActive={pathname === "/settings"}
                    title="Cài đặt"
                    icon={<Settings />}
                  />
                </SidebarMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
