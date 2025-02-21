"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";

interface Project {
	id: number;
	title: string;
	description: string;
	status: string;
	due_date: string;
}

export default function ProjectDetails({ params }: { params: { id: string } }) {
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const response = await api.get(`/projects/${params.id}/`);
				setProject(response.data);
			} catch (error) {
				console.error("Error fetching project:", error);
				router.push("/projects");
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [params.id]);

	if (loading) return <p>Loading...</p>;

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold'>{project?.title}</h1>
			<Card className='p-4'>
				<p>{project?.description}</p>
				<p>Status: {project?.status}</p>
				<p>Due Date: {project?.due_date}</p>
			</Card>
		</div>
	);
}
