import { configureStore } from "@reduxjs/toolkit";
import combineReducers from "./combineReducers";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'login',
    storage,
    whitelist: ['login'],
}

const persistedReducer = persistReducer(persistConfig, combineReducers)

const store = configureStore({
    reducer: persistedReducer,
    // reducer: combineReducers,
})

let persistor = persistStore(store)

export {store, persistor}