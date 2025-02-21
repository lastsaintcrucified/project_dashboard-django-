"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectStatusChart() {
	const [projectData, setProjectData] = useState<{
		active: number;
		completed: number;
	}>({
		active: 0,
		completed: 0,
	});

	useEffect(() => {
		const fetchProjectData = async () => {
			try {
				const response = await api.get("/projects/");
				const projects = response.data;
				const active = projects.filter(
					(project: any) => project.status === "Active"
				).length;
				const completed = projects.filter(
					(project: any) => project.status === "Completed"
				).length;
				setProjectData({ active, completed });
			} catch (error) {
				console.error("Error fetching project data:", error);
			}
		};

		fetchProjectData();
	}, []);

	const data = {
		labels: ["Active", "Completed"],
		datasets: [
			{
				data: [projectData.active, projectData.completed],
				backgroundColor: ["#4CAF50", "#FF7043"],
				hoverBackgroundColor: ["#66BB6A", "#FF8A65"],
			},
		],
	};

	return (
		<div className='p-6'>
			<h2 className='text-xl font-semibold mb-4'>
				Project Status Distribution
			</h2>
			<div className='max-w-[400px] mx-auto'>
				<Pie data={data} />
			</div>
		</div>
	);
}
