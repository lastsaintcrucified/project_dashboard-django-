"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getToken, getUserRole } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Project {
	id: number;
	title: string;
	status: string;
	due_date: string;
	assigned_users_data: any[];
}

export default function ProjectsPage({ params }: { params: { id: string } }) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("All");
	const [loading, setLoading] = useState(true);
	const [userRole, setUserRole] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const token = getToken();
		if (token) {
			setUserRole(getUserRole(token));
		}
	}, []);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await api.get("/projects/");
				console.log("Projects:", response.data);
				setProjects(response.data);
				setFilteredProjects(response.data);
			} catch (error) {
				console.error("Error fetching projects:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	// Handle search and filter changes
	useEffect(() => {
		let updatedProjects = projects;

		if (search) {
			updatedProjects = updatedProjects.filter((project) =>
				project.title.toLowerCase().includes(search.toLowerCase())
			);
		}

		if (filter !== "All") {
			updatedProjects = updatedProjects.filter(
				(project) => project.status === filter
			);
		}

		setFilteredProjects(updatedProjects);
	}, [search, filter, projects]);

	const handleEdit = (id: number) => {
		router.push(`/projects/edit/${id}`);
	};
	const handleDelete = async (id: number) => {
		if (!confirm("Are you sure you want to delete this project?")) return;

		try {
			await api.delete(`/projects/${id}/`);
			setProjects(projects.filter((project) => project.id !== id));
			setFilteredProjects(
				filteredProjects.filter((project) => project.id !== id)
			);
		} catch (error) {
			console.error("Error deleting project:", error);
		}
	};

	return (
		<>
			<Navbar />
			<div className='py-20 px-5'>
				<div className='flex justify-between items-center'>
					<h1 className='text-3xl font-bold'>Projects</h1>
					{userRole === "admin" && (
						<Link href='/projects/new'>
							<Button className=' bg-green-500 hover:bg-green-900 '>
								Create New Project
							</Button>
						</Link>
					)}
				</div>
				{/* Search and Filter */}
				<div className='flex gap-4 my-4'>
					<Input
						type='text'
						placeholder='Search projects...'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Select
						value={filter}
						onValueChange={setFilter}
					>
						<SelectTrigger className='w-[200px]'>
							<SelectValue placeholder='Filter by status' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='All'>All</SelectItem>
							<SelectItem value='active'>Active</SelectItem>
							<SelectItem value='completed'>Completed</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{loading ? (
					<p>Loading...</p>
				) : filteredProjects.length > 0 ? (
					<Table className='mt-5'>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Due Date</TableHead>
								<TableHead>Assigned Users</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredProjects.map((project) => (
								<TableRow key={project.id}>
									<TableCell className='font-medium'>{project.title}</TableCell>
									<TableCell>
										<Badge
											variant={
												project.status === "active" ? "default" : "secondary"
											}
										>
											{project.status}
										</Badge>
									</TableCell>
									<TableCell>{project.due_date}</TableCell>
									<TableCell>
										{project.assigned_users_data.map((user) => (
											<div key={user.email}>{user.email}</div>
										))}
									</TableCell>
									<TableCell>
										<div className='flex gap-2 my-3'>
											{userRole === "admin" && (
												<>
													<Link href={`/projects/edit/${project.id}`}>
														<Button
															onClick={() => handleEdit(project.id)}
															className='w-12 h-8 text-xs bg-green-500 hover:bg-green-600'
														>
															Edit
														</Button>
													</Link>
													<Button
														variant='destructive'
														onClick={() => handleDelete(project.id)}
														className='w-12 h-8 text-xs'
													>
														Delete
													</Button>
												</>
											)}
											<Button
												variant='outline'
												className='w-12 h-8 text-xs bg-slate-100 hover:bg-slate-300 hover:text-black text-black'
											>
												<Link href={`/projects/${project.id}`}>View</Link>
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<div className='flex flex-col items-center gap-4'>
						<p>No projects found.</p>
						{userRole === "admin" && (
							<Link href='/projects/new'>
								<Button className=' bg-green-500 hover:bg-green-900 '>
									Create New Project
								</Button>
							</Link>
						)}
					</div>
				)}
			</div>
		</>
	);
}
