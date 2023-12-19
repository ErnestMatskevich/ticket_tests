import { combineReducers, configureStore } from "@reduxjs/toolkit";

import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "../services/Users";
import { ticketsApi } from "../services/Tickets";
import authSlice from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import { authApi } from "../services/auth/api";

const rootReducer = combineReducers({
  authSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: {
    persistedReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(usersApi.middleware, ticketsApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
