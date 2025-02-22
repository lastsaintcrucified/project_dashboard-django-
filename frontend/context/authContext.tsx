"use client"; // For Next.js App Router

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const router = useRouter();

	// Check token on initial load
	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (!storedToken) {
			router.push("/login"); // Redirect to login if no token
		} else {
			setToken(storedToken);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
}

// Custom hook to use auth
export function useAuth() {
	return useContext(AuthContext);
}
