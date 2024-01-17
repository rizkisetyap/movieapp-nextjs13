import { collection, addDoc, WithFieldValue, DocumentData, DocumentReference } from "firebase/firestore";
import { firestoreDB } from "@/config/firebaseConfig";

// export interface FirestoreDocumentData<T extends DocumentData> {
//     id: string;
//     data:T
// }
interface ResponseAction<T> {
	isSuccess: boolean;
	message?: string;
	data: T;
}

export const insertData = async <T extends DocumentData>(
	data: T,
	path: string,
	...pathSegment: string[]
): Promise<ResponseAction<string | null>> => {
	const res: ResponseAction<string | null> = {
		isSuccess: false,
		data: null,
		message: undefined,
	};
	try {
		const query = collection(firestoreDB, path, ...pathSegment);
		const docRef = await addDoc(query, data);
		res.isSuccess = true;
		res.data = docRef.id;
		res.message = "Saved success";
	} catch (error) {
		console.error(error);
		res.isSuccess = false;
		res.message = "Save error";
	}
	return res;
};
