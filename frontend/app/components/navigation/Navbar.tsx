import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	ChartNoAxesCombined,
	ChevronUp,
	CircleDollarSign,
	HandCoins,
	LayoutDashboard,
	PiggyBank,
	ReceiptText,
	User2,
	Wallet,
} from "lucide-react";
import React, { ReactNode } from "react";
import NavLink from "./NavLink";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LINKICONSIZE = 20;
const LINKSTROKEWIDTH = 1;

interface LinkProps {
	url: string;
	title: string;
	icon?: ReactNode;
}

const linkItems: LinkProps[] = [
	{
		url: "/",
		title: "Dashboard",
		icon: <LayoutDashboard size={LINKICONSIZE} strokeWidth={LINKSTROKEWIDTH} />,
	},
	{
		url: "/analytics",
		title: "Analytics",
		icon: (
			<ChartNoAxesCombined size={LINKICONSIZE} strokeWidth={LINKSTROKEWIDTH} />
		),
	},
	{
		url: "/expenses",
		title: "Expenses",
		icon: <Wallet size={LINKICONSIZE} strokeWidth={LINKSTROKEWIDTH} />,
	},
	{
		url: "/transactions",
		title: "Transactions",
		icon: <ReceiptText size={LINKICONSIZE} strokeWidth={LINKSTROKEWIDTH} />,
	},
	{
		url: "/budget",
		title: "Budget",
		icon: <PiggyBank size={LINKICONSIZE} strokeWidth={LINKSTROKEWIDTH} />,
	},
	{
		url: "/income",
		title: "Income",
		icon: (
			<CircleDollarSign size={LINKICONSIZE} strokeWidth={LINKSTROKEWIDTH} />
		),
	},
];

const Navbar = () => {
	return (
		<Sidebar>
			<SidebarHeader className="w-full p-4">
				<div className="flex items-center gap-1 text-primary justify-center">
					<HandCoins size={20} strokeWidth={2} />
					<a href="/" className="font-bold">
						BudgetWise
					</a>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{linkItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<NavLink
											url={item.url}
											title={item.title}
											icon={item.icon}
										/>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="text-base h-12 py-1 px-4 hover:bg-primary/20 hover:text-primary content-center transition-all rounded-md">
									<User2 size={LINKICONSIZE} strokeWidth={LINKSTROKEWIDTH} />{" "}
									Username
									<ChevronUp
										size={LINKICONSIZE}
										strokeWidth={LINKSTROKEWIDTH}
										className="ml-auto"
									/>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuItem>
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
	// return (
	// 	<nav className="bg-white text-black border-b border-gray-200">
	// 		<div className="flex items-center gap-4 h-20 w-full p-4">
	// 			<div className="flex items-center gap-1 text-primary">
	// 				<HandCoins size={20} strokeWidth={2} />
	// 				<a href="/" className="font-bold">
	// 					BudgetWise
	// 				</a>
	// 			</div>
	// 			<ul className="hidden md:flex items-center gap-2 h-full">
	// 				{linkItems.map((link, index) => (
	// 					<li key={index}>
	// 						<NavLink url={link.url} title={link.title} icon={link.icon} />
	// 					</li>
	// 				))}
	// 			</ul>
	// 		</div>
	// 	</nav>
	// );
};

export default Navbar;
