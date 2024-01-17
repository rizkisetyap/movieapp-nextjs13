"use client";

import { Box, List, ListItem, SwipeableDrawer } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux";
import { toggleDrawer } from "@/redux/app/features/uiSlice";
import HomeIcon from "@mui/icons-material/Home";
import ListItemMenu from "./ListItemMenu";

const MainDrawer = () => {
	const isDrawerOpen = useAppSelector((s) => s.ui.isDrawerOpen);
	const dispatch = useAppDispatch();
	return (
		<SwipeableDrawer
			onClose={() => dispatch(toggleDrawer())}
			onOpen={() => dispatch(toggleDrawer())}
			anchor="left"
			open={isDrawerOpen}
		>
			<Box
				sx={{
					width: 250,
				}}
				role="presentation"
			>
				<List>
					<ListItemMenu icon={<HomeIcon />} text="Home" href="/" />
				</List>
			</Box>
		</SwipeableDrawer>
	);
};

export default MainDrawer;
