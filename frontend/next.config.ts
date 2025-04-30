import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		NEXT_PUBLIC_API_URL: "https://project-dashboard-django.onrender.com/api",
	},
};

export default nextConfig;
