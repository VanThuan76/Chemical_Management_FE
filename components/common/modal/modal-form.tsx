'use client'

import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";

interface ModalFormProps {
    ModalTrigger: React.ReactNode
    Form: React.ReactNode
    titleModal: string
    fomrType: 'create' | 'update'
}

const ModalForm = ({ ModalTrigger, Form, titleModal, fomrType }: ModalFormProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <div onClick={onOpen}>
                {ModalTrigger}
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {titleModal}
                            </ModalHeader>
                            <ModalBody>
                                {Form}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={onClose}>
                                    Đóng
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    {fomrType === 'create' ? 'Thêm mới' : 'Chỉnh sửa'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ModalForm;