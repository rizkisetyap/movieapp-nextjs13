import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IUiState {
	isDrawerOpen: boolean;
}
const initialUiState: IUiState = {
	isDrawerOpen: false,
};

export const UISlice = createSlice({
	name: "UI",
	initialState: initialUiState,
	reducers: {
		toggleDrawer(state) {
			state.isDrawerOpen = !state.isDrawerOpen;
		},
	},
});
export const { toggleDrawer } = UISlice.actions;

export default UISlice.reducer;
