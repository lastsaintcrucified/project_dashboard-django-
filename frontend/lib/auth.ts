import { jwtDecode } from "jwt-decode";

export const isAuthenticated = (): boolean => {
	if (typeof window !== "undefined") {
		return !!localStorage.getItem("token");
	}
	return false;
};
export const getUserRole = (token: string | null): string | null => {
	if (!token) return null;
	try {
		const decoded: any = jwtDecode(token);
		return decoded.role; // Extract role from token
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
};

export const getToken = (): string | null => {
	return localStorage.getItem("token"); // Assuming the token is stored in localStorage
};
