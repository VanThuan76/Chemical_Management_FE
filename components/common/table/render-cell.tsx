import React from "react";
import { Eye, Trash } from "lucide-react";
import { Tooltip } from "@nextui-org/react";

interface Props {
  item: any;
  columnKey: string | React.Key;
  modalUpdate?: React.ReactNode
  handleSheetViewOpen?: any
}

export const RenderCell = ({ item, columnKey, modalUpdate, handleSheetViewOpen }: Props) => {
  const cellValue = item[columnKey];
  switch (columnKey) {
    case "actions":
      return (
        <div className="fixed right-0 flex items-center gap-4 ">
          <div>
            <Tooltip content="Chi tiết">
              <button type="button" onClick={() => handleSheetViewOpen && handleSheetViewOpen(item.id)}>
                <Eye size={20} color="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Cập nhật" color="secondary">
              {modalUpdate && modalUpdate}
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Xoá"
              color="danger"
              onClick={() => console.log("Delete user", item.id)}
            >
              <button type="button">
                <Trash size={20} color="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
