import {
	ChartNoAxesCombined,
	HandCoins,
	LayoutDashboard,
	PiggyBank,
	ReceiptText,
	Wallet,
} from "lucide-react";
import React, { ReactNode } from "react";
import NavLink from "./NavLink";

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
		url: "/budgeting",
		title: "Budgeting",
		icon: <PiggyBank size={LINKICONSIZE} strokeWidth={LINKSTROKEWIDTH} />,
	},
];

const Navbar = () => {
	return (
		<nav className="bg-white text-black border-b border-gray-200">
			<div className="flex items-center gap-4 h-20 w-full p-4">
				<div className="flex items-center gap-1 text-primary">
					<HandCoins size={20} strokeWidth={2} />
					<a href="/" className="font-bold">
						BudgetWise
					</a>
				</div>
				<ul className="hidden md:flex items-center gap-2 h-full">
					{linkItems.map((link, index) => (
						<li key={index}>
							<NavLink url={link.url} title={link.title} icon={link.icon} />
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
