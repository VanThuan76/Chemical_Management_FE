import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/server/data/types/user-type";
import { deleteCookie } from "cookies-next";
import { APP_SAVE_KEY } from "@/shared/constant";

export interface IDefaultState {
    user: IUser | undefined;
    isLogined: boolean;
    showNavbarMenu: boolean;
    hasFullScreen: boolean;
}

const initialState: IDefaultState = {
    showNavbarMenu: false,
    hasFullScreen: true,
    user: undefined,
    isLogined: false,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setShowNavBarMenu: (state, action: PayloadAction<boolean>) => {
            state.showNavbarMenu = action.payload;
        },
        setHasFullScreen: (state, action: PayloadAction<boolean>) => {
            state.hasFullScreen = action.payload;
        },
        auth: (state, action: PayloadAction<any | undefined>) => {
            state.user = action.payload;
        },
        login: (state, action: PayloadAction<any | undefined>) => {
            state.user = action.payload;
            state.isLogined = true;
        },
        logout: state => {
            state.user = undefined;
            state.isLogined = false;
            deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
            deleteCookie(APP_SAVE_KEY.LOGIN_STATUS);
        },
    },
});

export const { setShowNavBarMenu, setHasFullScreen, auth, login, logout } = appSlice.actions;
export const appReducer = appSlice.reducer;
