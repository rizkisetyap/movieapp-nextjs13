"use client";

import { Box, Button, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useAppDispatch, useAppSelector } from "@/redux";
import { doLogin, type IUser } from "@/redux/app/features/authSlice";
import { useRouter } from "next/navigation";
import { insertData } from "@/lib/database_trans";
import { DocumentData } from "firebase/firestore";
import { useFireStoreDb } from "@/lib/useFirestoreDb";
interface LoginForm {
	email: string;
	password: string;
}

const Login = () => {
	const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
	const authUser = useAppSelector((s) => s.auth);
	const [todo, setTodo] = useState("");
	const router = useRouter();
	const dispath = useAppDispatch();
	const googleProvider = new GoogleAuthProvider();
	const { data: todos } = useFireStoreDb();
	const doLoginWithEmail = () => {
		signInWithEmailAndPassword(auth, form.email, form.password)
			.then((cred) => {})
			.catch((e) => {
				console.error(e);
			});
	};
	const doLoginWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log(result);
			const user: IUser = {
				id: result.user.uid,
				displayName: result.user.displayName!,
				email: result.user.email!,
				emailVerified: result.user.emailVerified,
				photoURL: result.user.photoURL!,
			};
			dispath(doLogin(user));
		} catch (error) {
			console.error(error);
		}
	};
	const doInsert = async () => {
		try {
			const data: DocumentData = {
				todo,
				createdAt: new Date(),
				userId: authUser.user?.id,
			};
			const result = await insertData(data, "todos");
			console.log(result.message);
		} catch (error) {
			alert("error");
		}
	};
	// useEffect(() => {
	// 	if (authUser.isAuthenticated && authUser.user) {
	// 		router.push("/");
	// 	}
	// }, [authUser.isAuthenticated, authUser.user]);
	if (authUser.isAuthenticated) {
		// console.log(todos);
		return (
			<Box
				sx={{
					width: "100%",
					height: "100vh",
					overflow: "hidden",
					padding: 0,
					display: "grid",
					placeItems: "center",
				}}
			>
				<Paper
					sx={{
						maxWidth: 400,
						padding: 3,
					}}
					elevation={2}
				>
					<Typography>{authUser.user?.email}</Typography>
					<Typography>Todolist</Typography>
					<Box component="form" autoComplete="off">
						<TextField
							value={todo}
							onChange={(e) => setTodo(e.target.value)}
							size="small"
							fullWidth
							label="Todo"
							autoComplete="off"
						/>
						<Button onClick={doInsert} variant="contained" color="primary" sx={{ mt: 1 }}>
							save
						</Button>

						<List>
							{todos.map((d) => (
								<ListItem key={d.id} disablePadding>
									<ListItemText>{d.todo}</ListItemText>
								</ListItem>
							))}
						</List>
					</Box>
				</Paper>
			</Box>
		);
	}
	return (
		<Box
			sx={{
				width: "100%",
				height: "100vh",
				overflow: "hidden",
				padding: 0,
				display: "grid",
				placeItems: "center",
			}}
		>
			<Paper
				sx={{
					maxWidth: 400,
					padding: 3,
				}}
				elevation={2}
			>
				<Typography>Login</Typography>
				<Box component="form">
					<TextField
						value={form.email}
						onChange={(e) => setForm((fd) => ({ ...fd, email: e.target.value }))}
						label="Email"
						type="email"
						fullWidth
						margin="dense"
						variant="outlined"
						size="small"
					/>
					<TextField
						value={form.password}
						onChange={(e) => setForm((fd) => ({ ...fd, password: e.target.value }))}
						label="Password"
						type="password"
						fullWidth
						margin="dense"
						variant="outlined"
						size="small"
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						marginTop: 3,
						gap: 1,
					}}
				>
					<Button onClick={doLoginWithEmail} type="button" variant="contained" color="primary">
						Login
					</Button>
					<Button onClick={doLoginWithGoogle} variant="outlined" startIcon={<GoogleIcon />}>
						Login with google
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};

export default Login;
