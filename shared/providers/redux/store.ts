import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { appReducer } from "./slices/app-slice";
import { modalReducer } from "./slices/modal-slice";

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storageFallback = typeof window !== 'undefined' ? storage : createNoopStorage();

const appPersistConfig = {
    key: "app",
    storage: storageFallback,
};

const persistedAppReducer = persistReducer(appPersistConfig, appReducer);
const persisteModaldReducer = persistReducer(appPersistConfig, modalReducer);

const rootReducer = combineReducers({
    app: persistedAppReducer,
    modal: persisteModaldReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
