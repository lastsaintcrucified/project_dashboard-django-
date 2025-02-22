"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { use } from "react";

interface Project {
	id: number;
	title: string;
	description: string;
	status: string;
	assigned_users_data: any[];
	due_date: string;
}

export default function ProjectDetails({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { id } = use(params);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const response = await api.get(`/projects/${id}/`);
				console.log("Project:", response.data);
				setProject(response.data);
			} catch (error) {
				console.error("Error fetching project:", error);
				router.push("/projects");
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [id]);

	if (loading) return <p>Loading...</p>;

	return (
		<>
			<Navbar />
			<div className='p-6'>
				<Card className='m-20 p-4 flex-col items-center justify-around shadow-md'>
					<h1 className='text-2xl font-bold'>{project?.title}</h1>
					<p>{project?.description}</p>
					<p>
						<span className='font-bold'>Status:</span> {project?.status}
					</p>
					<p>
						<span className='font-bold'>Due Date: </span>
						{project?.due_date}
					</p>
					<p className='font-bold'>Assigned Users:</p>
					<ul className='list-disc pl-4'>
						{project?.assigned_users_data.map((user) => (
							<li
								key={user.id}
								className='font-semibold text-green-600'
							>
								{user.email}
							</li>
						))}
					</ul>
				</Card>
			</div>
		</>
	);
}
