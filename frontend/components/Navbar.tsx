"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/login";
	};
	const handleLink = (link: string) => {
		if (!localStorage.getItem("token")) {
			router.push("/login");
		} else {
			router.push(`${link}`);
		}
	};

	return (
		<NavigationMenu className='min-w-[100%] p-2 bg-gray-100 justify-start fixed'>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Button
						onClick={() => handleLink("/dashboard")}
						className='bg-gray-100 hover:bg-gray-200 text-black'
					>
						<NavigationMenuLink>Dashboard</NavigationMenuLink>
					</Button>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Button
						onClick={() => handleLink("/projects")}
						className='bg-gray-100 hover:bg-gray-200 text-black'
					>
						<NavigationMenuLink>Projects</NavigationMenuLink>
					</Button>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Button
						onClick={handleLogout}
						className='bg-red-500 hover:bg-red-700 fixed top-2 right-2'
					>
						Logout
					</Button>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
