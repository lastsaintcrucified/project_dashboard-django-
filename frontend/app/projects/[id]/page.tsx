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
				<Card className='m-20 p-4'>
					<h1 className='text-2xl font-bold'>{project?.title}</h1>
					<p>{project?.description}</p>
					<p>Status: {project?.status}</p>
					<p>Due Date: {project?.due_date}</p>
				</Card>
			</div>
		</>
	);
}
