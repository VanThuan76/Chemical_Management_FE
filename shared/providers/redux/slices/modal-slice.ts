import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalType = 'create';

interface ModalState<T = any> {
    type: ModalType | null;
    data: T | null;
    isOpen: boolean;
}

const initialState: ModalState = {
    type: null,
    data: null,
    isOpen: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: <T>(state: ModalState<T>, action: PayloadAction<{ type: ModalType; data?: T }>) => {
            state.type = action.payload.type;
            state.data = action.payload.data || null;
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.type = null;
            state.isOpen = false;
            state.data = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;

