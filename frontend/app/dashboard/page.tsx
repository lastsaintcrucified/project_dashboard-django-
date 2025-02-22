"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
			//Checking if token is present
			router.push("/login");
		}
		const fetchProjects = async () => {
			//Fetching projects
			try {
				const response = await api.get("/projects/");
				console.log(response.data);
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
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						<Card className='shadow-md'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-xl font-medium'>
									Total Projects:
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{projects.length}</div>
							</CardContent>
						</Card>
						<Card className='shadow-md'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-xl font-medium'>
									Completed:
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{
										projects.filter(
											(project: any) => project.status === "completed"
										).length
									}
								</div>
							</CardContent>
						</Card>
						<Card className='shadow-md'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-xl font-medium'>Active:</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{
										projects.filter(
											(project: any) => project.status === "active"
										).length
									}
								</div>
							</CardContent>
						</Card>
					</div>
				)}
				{/* Project Status Distribution Chart */}
				<ProjectStatusChart />
			</div>
		</>
	);
}
