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

import { useAddRole } from "@/server/actions/role-permission-action";
import { AddRoleSchema, AddRoleSchemaType } from "@/server/data/validations/role-permission";

import InputText from "@/components/common/form/input-text";

export const AddRole = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const form = useForm<AddRoleSchemaType>({ resolver: zodResolver(AddRoleSchema) })

    const doAddRole = useAddRole()
    const onSubmit = form.handleSubmit((data) => {
        doAddRole.mutate(data)
    })

    return (
        <div>
            <>
                <Button onPress={onOpen} color="primary" className="absolute top-0 right-0">
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
                                    Tạo mới vai trò
                                </ModalHeader>
                                <ModalBody>
                                    <InputText form={form} name="name" label="Tên" placeholder="Vai trò A" />
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
