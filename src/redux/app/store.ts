import { configureStore } from "@reduxjs/toolkit";
import UiReducer from "./features/uiSlice";
import authReducer from "@/redux/app/features/authSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			ui: UiReducer,
			auth: authReducer,
		},
	});
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
