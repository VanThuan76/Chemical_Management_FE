import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { Accordion, AccordionItem } from "@nextui-org/react";

import { checkPathUrl, IAppMenu } from "@/shared/config/app";

import { SidebarItem } from "./sidebar-item";
interface Props {
  icon: React.ReactNode;
  title: string;
  items: IAppMenu[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  const pathname = usePathname();
  return (
    <div className="flex gap-2 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronUp />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",
            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row justify-center items-center gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-6">
            {items.map((item, index) => (
              <span
                key={index}
                className="w-full flex text-sm text-default-500 hover:text-default-900 transition-colors"
              >
                <SidebarItem
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  isActive={checkPathUrl(pathname, item.href)}
                  href={item.href}
                />
              </span>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
