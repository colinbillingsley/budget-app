"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavLinkProps {
	url: string;
	icon: ReactNode;
	title: string;
}

const NavLink = ({ url, icon, title }: NavLinkProps) => {
	const pathname = usePathname();
	const isActive: (path: string) => boolean = (path) => pathname === path;

	return (
		<Link
			href={url}
			className={`${
				isActive(url)
					? "text-primary bg-gradient-to-l from-primary/20 to-white border-primary/30"
					: "border-transparent"
			} flex items-center gap-2 border font-bold py-2 px-4 hover:bg-primary/10 hover:text-primary content-center transition-all rounded-full`}
		>
			<i>{icon}</i>
			{title}
		</Link>
	);
};

export default NavLink;
