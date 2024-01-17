import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
	displayName: string;
	id: string;
	// accessToken: string;
	email: string;
	emailVerified: boolean;
	photoURL: string;
}

interface IAuthUser {
	isAuthenticated: boolean;
	user: IUser | null;
}

const initialState: IAuthUser = {
	isAuthenticated: false,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		doLogin(state, actions: PayloadAction<IUser>) {
			state.isAuthenticated = true;
			state.user = actions.payload;
		},
		doLogout(state) {
			state.isAuthenticated = false;
			state.user = null;
		},
	},
});

export const { doLogin, doLogout } = authSlice.actions;
export default authSlice.reducer;
