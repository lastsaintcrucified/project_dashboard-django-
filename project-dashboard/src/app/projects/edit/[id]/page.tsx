"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function EditProjectPage({
	params,
}: {
	params: { id: string };
}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("Active");
	const [dueDate, setDueDate] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const router = useRouter();

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const response = await api.get(`/projects/${params.id}/`);
				const project = response.data;
				setTitle(project.title);
				setDescription(project.description);
				setStatus(project.status);
				setDueDate(project.due_date);
			} catch (error) {
				setError("Failed to fetch project details.");
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [params.id]);

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await api.put(`/projects/${params.id}/`, {
				title,
				description,
				status,
				due_date: dueDate,
			});

			router.push("/projects");
		} catch (err) {
			setError("Failed to update project. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Edit Project</h1>
			<Card className='p-6 max-w-lg'>
				<form
					onSubmit={handleUpdate}
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
						<option value='Active'>Active</option>
						<option value='Completed'>Completed</option>
					</select>
					{error && <p className='text-red-500'>{error}</p>}
					<Button
						type='submit'
						disabled={loading}
					>
						{loading ? "Updating..." : "Update Project"}
					</Button>
				</form>
			</Card>
		</div>
	);
}
