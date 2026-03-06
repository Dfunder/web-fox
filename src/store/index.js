import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches these actions internally — without ignoring
        // then RTK would throw serialization warnings in the console
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistor is exported so PersistGate in main.jsx can use it
export const persistor = persistStore(store);
