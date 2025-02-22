"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
	const router = useRouter();

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (!storedToken) {
			router.push("/login"); // Redirect to login if no token
		} else {
			router.push("/dashboard");
		}
	}, []);
	return <div></div>;
}
