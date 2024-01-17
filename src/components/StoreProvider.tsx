"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/redux/app/store";

interface Props {
	children: ReactNode;
}

const StoreProvider = ({ children }: Props) => {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
