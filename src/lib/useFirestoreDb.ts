import { firestoreDB } from "@/config/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export const useFireStoreDb = () => {
	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		onSnapshot(collection(firestoreDB, "todos"), (snapshot) => {
			// console.log(snapshot.docs.)
			const datas = snapshot.docs.map((d) => ({
				id: d.id,
				...d.data(),
			}));
			setData(datas);
		});

		return () => {};
	}, []);
	return { data };
};
