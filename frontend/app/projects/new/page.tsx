"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function NewProjectPage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("active");
	const [users, setUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
	const [dueDate, setDueDate] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	// useEffect(() => {
	// 	fetch("http://localhost:8000/api/users/") // 👈 Fetch users from backend
	// 		.then((res) => res.json())
	// 		.then((data) => setUsers(data))
	// 		.catch((error) => console.error("Error fetching users:", error));
	// }, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await api.post("/projects/", {
				title,
				description,
				status,
				assigned_users: selectedUsers,
				due_date: dueDate,
			});

			router.push("/projects");
		} catch (err) {
			setError("Failed to create project. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Create New Project</h1>
			<Card className='p-6 max-w-lg'>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-4'
				>
					<Input
						type='text'
						placeholder='Project Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<Textarea
						placeholder='Project Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					<Input
						type='date'
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						required
					/>
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						className='p-2 border rounded'
					>
						<option value='active'>Active</option>
						<option value='completed'>Completed</option>
					</select>
					{/* <select
						multiple
						className='border p-2 w-full'
						onChange={(e) =>
							setSelectedUsers(
								Array.from(e.target.selectedOptions, (option) => option.value)
							)
						}
					>
						{users.map((user: any) => (
							<option
								key={user.id}
								value={user.id}
							>
								{user.email}
							</option>
						))}
					</select> */}
					{error && <p className='text-red-500'>{error}</p>}
					<Button
						type='submit'
						disabled={loading}
					>
						{loading ? "Creating..." : "Create Project"}
					</Button>
				</form>
			</Card>
		</div>
	);
}
