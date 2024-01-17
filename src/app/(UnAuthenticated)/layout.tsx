import type { Metadata } from "next";

import StoreProvider from "@/components/StoreProvider";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body style={{ margin: 0, padding: 0, overflow: "hidden" }}>
				<StoreProvider>
					{/* <AppBar />
					<MainDrawer /> */}
					{children}
				</StoreProvider>
			</body>
		</html>
	);
}
