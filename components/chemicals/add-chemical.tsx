import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { useAddCustomer } from "@/server/actions/customers-action";
import { AddCustomerSchema, AddCustomerSchemaType } from "@/server/data/validations/customer";

import InputEmail from "@/components/common/form/input-email";
import InputText from "@/components/common/form/input-text";
import InputSelect from "@/components/common/form/input-select";
import InputNumber from "@/components/common/form/input-number";
import InputDate from "@/components/common/form/input-date";

export const AddCustomer = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const form = useForm<AddCustomerSchemaType>({ resolver: zodResolver(AddCustomerSchema) })

    const doAddCustomer = useAddCustomer()

    const onSubmit = form.handleSubmit((data) => {
        doAddCustomer.mutate(data)
    })

    return (
        <div>
            <>
                <Button onPress={onOpen} color="primary">
                    Thêm mới
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <form onSubmit={onSubmit}
                                onError={e => {
                                    new Error(`Error ${e}`);
                                }}
                                className='w-full h-full'
                            >
                                <ModalHeader className="flex flex-col gap-1">
                                    Tạo mới sản phẩm hoá học
                                </ModalHeader>
                                <ModalBody>
                                    <InputText form={form} name="name" label="Tên" placeholder="Khách hàng A" />
                                    <InputEmail form={form} />
                                    <InputDate form={form} name="birthday" label="Ngày sinh" placeholder="Đây là ngày sinh nhật" />
                                    <InputNumber form={form} name="phone_number" label="Số điện thoại" placeholder="0936xxxx" />
                                    <InputText form={form} name="address" label="Địa chỉ" placeholder="Số nhà..." />
                                    <InputSelect form={form} name="type" label="Loại KH" placeholder="Không có" options={[{ key: 0, label: "Đặc biệt" }, { key: 1, label: "Bình thường" }]} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="button" color="danger" variant="flat" onClick={() => {
                                        onClose()
                                        form.reset()
                                    }}>
                                        Đóng
                                    </Button>
                                    <Button type="submit" color="primary">
                                        Thêm mới
                                    </Button>
                                </ModalFooter>
                            </form>
                        )}
                    </ModalContent>
                </Modal>
            </>
        </div >
    );
};
