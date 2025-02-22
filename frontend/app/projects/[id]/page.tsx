"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { use } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getToken, getUserRole } from "@/lib/auth";

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
	const [userRole, setUserRole] = useState<string | null>(null);

	const router = useRouter();
	const { id } = use(params);

	//Get user role
	useEffect(() => {
		const token = getToken();
		if (token) {
			setUserRole(getUserRole(token));
		}
	}, []);

	//Fetch project details
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
			<div className='py-20 px-5'>
				<div className='flex justify-between items-center'>
					<h1 className='text-3xl font-bold'>{project?.title}</h1>
					{userRole === "admin" && (
						<Button
							asChild
							className='bg-green-500 hover:bg-green-700 text-white'
						>
							<Link href={`/projects/${id}/edit`}>Edit Project</Link>
						</Button>
					)}
				</div>
				<Card className='mt-4 shadow-md'>
					<CardHeader>
						<CardTitle>Project Details</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2'>
						<p>
							<strong>Description:</strong> {project?.description}
						</p>
						<p>
							<strong>Status:</strong>{" "}
							<Badge
								variant={project?.status === "active" ? "default" : "secondary"}
							>
								{project?.status}
							</Badge>
						</p>
						<p>
							<strong>Due Date:</strong> {project?.due_date}
						</p>
						<div>
							<strong>Assigned Users:</strong>{" "}
							{project?.assigned_users_data.map((user) => (
								<div key={user.email}>{user.email}</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
