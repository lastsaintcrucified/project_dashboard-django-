"use client";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className='bg-gray-800 text-white p-4 flex gap-4'>
			<Link
				href='/dashboard'
				className='hover:underline'
			>
				Dashboard
			</Link>
			<Link
				href='/projects'
				className='hover:underline'
			>
				Projects
			</Link>
			<button
				onClick={() => {
					localStorage.removeItem("token");
					window.location.href = "/login";
				}}
				className='ml-auto bg-red-500 px-4 py-2 rounded'
			>
				Logout
			</button>
		</nav>
	);
}
