import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import { apiSlice } from "./slices/apiSlice";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] 
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({
                serializableCheck: {
                  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(apiSlice.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;