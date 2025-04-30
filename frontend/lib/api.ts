import axios from "axios";

// const API_BASE_URL = "http://localhost:8000/api";
const API_BASE_URL = "https://project-dashboard-django.onrender.com/api";

export const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Attach token to requests if available
api.interceptors.request.use((config) => {
	if (typeof window !== "undefined") {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
	return config;
});
