"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Home, Users, FolderKanban, LogOut } from "lucide-react";

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
		<NavigationMenu className='w-[100%] p-2 bg-slate-100 justify-between fixed'>
			<NavigationMenuList>
				<NavigationMenuItem>
					<p className='font-bold text-xl'>Project Dashboard</p>
				</NavigationMenuItem>
			</NavigationMenuList>
			<NavigationMenuList className='flex justify-end'>
				<NavigationMenuItem>
					<Button
						onClick={() => handleLink("/dashboard")}
						className='bg-gray-100 hover:bg-gray-200 text-black'
					>
						<NavigationMenuLink className='flex items-center justify-center'>
							<Home className='mr-1 h-4 w-4' />
							Dashboard
						</NavigationMenuLink>
					</Button>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Button
						onClick={() => handleLink("/projects")}
						className='bg-gray-100 hover:bg-gray-200 text-black'
					>
						<NavigationMenuLink className='flex items-center justify-center'>
							<FolderKanban className='mr-1 h-4 w-4' />
							Projects
						</NavigationMenuLink>
					</Button>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Button
						onClick={handleLogout}
						className='bg-red-500 hover:bg-red-700 '
					>
						Logout
					</Button>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
