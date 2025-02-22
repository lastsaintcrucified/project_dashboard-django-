"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API_BASE_URL = "http://localhost:8000/api";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await axios.post(`${API_BASE_URL}/login/`, {
				email: email,
				password,
			});

			localStorage.setItem("token", response.data.access);
			router.push("/dashboard");
			setLoading(false);
			setError("");
			router.refresh();
		} catch (err) {
			setError("Invalid credentials. Please try again.");
			setLoading(false);
		}
	};

	return (
		<div className='flex items-center justify-center h-screen'>
			<form
				onSubmit={handleLogin}
				className='w-[30%] p-6 shadow-lg rounded-lg '
			>
				<h2 className='text-xl font-semibold '>Login</h2>
				<Input
					className='mt-2'
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
					{loading ? "Logging in..." : "Login"}
				</Button>
			</form>
		</div>
	);
}
