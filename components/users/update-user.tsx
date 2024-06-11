import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { Edit3 } from "lucide-react";
import { useForm } from "react-hook-form";
import { AddUserSchema, AddUserSchemaType } from "@/server/data/validations/users";
import { useGetAllRole } from "@/server/actions/role-permission-action";
import InputEmail from "@/components/common/form/input-email";
import InputText from "@/components/common/form/input-text";
import InputPassword from "@/components/common/form/input-password";
import InputSelect from "@/components//common/form/input-select";

export function UpdateUser() {
    const { data: roles } = useGetAllRole()

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const form = useForm<AddUserSchemaType>({ resolver: zodResolver(AddUserSchema) })
    const onSubmit = form.handleSubmit((data) => {
        console.log(data)
    })

    return (
        <div>
            <>
                <button type="button" onClick={onOpen}>
                    <Edit3 size={20} color="#979797" />
                </button>
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
                                    Tạo mới người dùng
                                </ModalHeader>
                                <ModalBody>
                                    <InputText form={form} name="name" label="Tên" placeholder="Austin Vu" />
                                    <InputEmail form={form} />
                                    <InputPassword form={form} />
                                    <InputSelect form={form} name="gender" label="Giới tính" placeholder="Không có" options={[{ key: 0, label: "Nữ" }, { key: 1, label: "Nam" }]} />
                                    <InputSelect form={form} name="roleId" label="Vai trò" placeholder="Không có" options={roles && roles.data.map(role => ({ key: role.id, label: role.name })) || []} />
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
