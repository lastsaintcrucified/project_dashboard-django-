"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const response = await axios.post("http://localhost:8000/api/login/", {
				username: userName,
				password,
			});

			localStorage.setItem("token", response.data.access);
			router.push("/dashboard");
		} catch (err) {
			setError("Invalid credentials. Please try again.");
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<form
				onSubmit={handleLogin}
				className='w-96 p-6 shadow-lg rounded-lg'
			>
				<h2 className='text-xl font-semibold mb-4'>Login</h2>
				<Input
					type='text'
					placeholder='Email'
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					required
				/>
				<Input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className='mt-2'
				/>
				{error && <p className='text-red-500 mt-2'>{error}</p>}
				<Button
					type='submit'
					className='w-full mt-4'
				>
					Login
				</Button>
			</form>
		</div>
	);
}
