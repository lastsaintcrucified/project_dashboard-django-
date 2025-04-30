"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("user");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password, role }),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.detail || "Signup failed");
			}

			router.push("/login");
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<div className='max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-md'>
			<h1 className='text-xl font-bold mb-4'>Create Account</h1>
			<form
				onSubmit={handleSubmit}
				className='space-y-4'
			>
				<div>
					<Label>Email</Label>
					<Input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<Label>Password</Label>
					<Input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div>
					<Label>Role</Label>
					<select
						value={role}
						onChange={(e) => setRole(e.target.value)}
						className='w-full p-2 border rounded-md'
					>
						<option value='user'>User</option>
						<option value='admin'>Admin</option>
					</select>
				</div>
				{error && <p className='text-red-500'>{error}</p>}
				<Button
					type='submit'
					className='w-full'
				>
					Sign Up
				</Button>
			</form>
		</div>
	);
}
