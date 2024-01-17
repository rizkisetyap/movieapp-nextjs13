import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
	icon: ReactNode;
	text: string;
	href: string;
}

const ListItemMenu = (props: Props) => {
	const { icon, text, href } = props;
	return (
		<Link style={{ textDecoration: "none", color: "inherit" }} passHref href={href}>
			<ListItem disablePadding>
				<ListItemButton LinkComponent="a">
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText primary={text} />
				</ListItemButton>
			</ListItem>
		</Link>
	);
};

export default ListItemMenu;
