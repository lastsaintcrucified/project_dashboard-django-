"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUserRole } from "@/lib/auth";

interface PrivateRouteProps {
	children: React.ReactNode;
	role: string; // Role required to access this route
}

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
	const [userRole, setUserRole] = useState<string | null>(null);
	const router = useRouter();
	const token = getToken();

	useEffect(() => {
		if (!token) {
			router.push("/login");
		} else {
			const decodedRole = getUserRole(token);
			if (!decodedRole || decodedRole !== role) {
				router.push("/unauthorized");
			} else {
				setUserRole(decodedRole);
			}
		}
	}, [token, router, role]);

	if (!userRole) return <p>Loading...</p>;

	return <>{children}</>;
}
