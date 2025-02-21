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

interface Project {
	id: number;
	title: string;
	status: string;
}

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("All");
	const [loading, setLoading] = useState(true);
	const [userRole, setUserRole] = useState<string | null>(null);

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
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Projects</h1>
			{/* Search and Filter */}
			<div className='flex gap-4 mb-4'>
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
						<SelectItem value='Active'>Active</SelectItem>
						<SelectItem value='Completed'>Completed</SelectItem>
					</SelectContent>
				</Select>
			</div>
			{/* Project List */}
			{loading ? (
				<p>Loading...</p>
			) : filteredProjects.length > 0 ? (
				<div className='flex flex-col gap-4'>
					<div className='grid gap-4'>
						{filteredProjects.map((project) => (
							<Card
								key={project.id}
								className='p-4'
							>
								<h2 className='text-lg font-semibold'>{project.title}</h2>
								<p>Status: {project.status}</p>
								{userRole === "Admin" && (
									<div className='flex gap-2'>
										<Link href={`/projects/edit/${project.id}`}>
											<Button>Edit</Button>
										</Link>
										<Button
											variant='destructive'
											onClick={() => handleDelete(project.id)}
										>
											Delete
										</Button>
									</div>
								)}
							</Card>
						))}
					</div>
					<Link href='/projects/new'>
						<Button>Create New Project</Button>
					</Link>
				</div>
			) : (
				<div className='flex flex-col items-center gap-4'>
					<p>No projects found.</p>
					<Link href='/projects/new'>
						<Button>Create New Project</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
