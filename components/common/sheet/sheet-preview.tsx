'use client'
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useOnClickOutside } from 'usehooks-ts';
import { cn } from "@/shared/utils/tw"
import { Sheet, SheetClose, SheetContent, SheetDescription } from '@/components/common/sheet';

interface Props {
    isOpen: boolean;
    hasSheetAnother?: boolean;
    onClose?: () => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    className?: string;
    type?: string;
}
const SheetDataView = ({ isOpen, hasSheetAnother = false, setIsOpen, onClose, className, children }: Props) => {
    const sheetRef = useRef(null);
    const [showCloseButton, setShowCloseButton] = useState(false);

    const handleClickOutside = (event: any) => {
        if (sheetRef.current) {
            // @ts-ignore
            const { left, right } = sheetRef.current.getBoundingClientRect();

            const clickX = event.clientX;
            if (clickX < left || clickX > right) {
                !hasSheetAnother && setIsOpen(false);
                !hasSheetAnother && removeViewQuery();
                onClose && onClose();
            }
        }
    };

    useOnClickOutside(sheetRef, handleClickOutside);

    const removeViewQuery = () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete('view');
        const queryString = searchParams.toString();
        const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
        window.history.replaceState('', '', newUrl);
    };

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                if (sheetRef.current) {
                    setShowCloseButton(true);
                }
            }, 1200);
        } else {
            setShowCloseButton(false);
        }
    }, [isOpen]);

    return (
        <Sheet open={isOpen}>
            <SheetContent
                ref={sheetRef}
                onOpenAutoFocus={e => e.preventDefault()}
                className={cn('h-full min-w-[85%] rounded-l-xl bg-[#F5F6FA]', className)}
                side={'right'}
            >
                <SheetDescription>{children}</SheetDescription>
                <SheetClose
                    onClick={() => {
                        removeViewQuery();
                        setIsOpen(false);
                        onClose && onClose();
                    }}
                    className={cn(
                        'fixed left-[calc(100%-88%)] top-5 z-10 rounded-full border border-black bg-[#EBECF1] p-1 transition-all duration-300 ease-in-out hover:scale-110',
                        showCloseButton ? 'visible' : 'hidden',
                    )}
                >
                    <X className='h-[16px] w-[16px]' />
                </SheetClose>
            </SheetContent>
        </Sheet>
    );
};

export default SheetDataView;
