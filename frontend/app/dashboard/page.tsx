"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import ProjectStatusChart from "@/components/ProjectStatusChart";
import Navbar from "@/components/Navbar";

interface Project {
	id: number;
	title: string;
	status: string;
}

export default function DashboardPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			router.push("/login");
		}
		const fetchProjects = async () => {
			try {
				const response = await api.get("/projects");
				// console.log(response.data);
				setProjects(response.data);
			} catch (error) {
				console.error("Error fetching projects:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	return (
		<>
			<Navbar />
			<div className='p-6'>
				<h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
				{loading ? (
					<p>...loading</p>
				) : (
					<div className='grid grid-cols-2 gap-4'>
						<Card className='p-4'>Total Projects: {projects.length}</Card>
						<Card className='p-4'>
							Completed:{" "}
							{
								projects.filter(
									(project: any) => project.status === "completed"
								).length
							}
						</Card>
						<Card className='p-4'>
							Active:{" "}
							{
								projects.filter((project: any) => project.status === "active")
									.length
							}
						</Card>
					</div>
				)}
				{/* Project Status Distribution Chart */}
				<ProjectStatusChart />
			</div>
		</>
	);
}
