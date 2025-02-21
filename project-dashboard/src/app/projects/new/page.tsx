"use client";
import { useState } from "react";
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
	const [dueDate, setDueDate] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await api.post("/projects/", {
				title,
				description,
				status,
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
