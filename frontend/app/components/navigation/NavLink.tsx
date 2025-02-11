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
				isActive(url) ? "text-primary bg-primary/15 font-semibold" : ""
			} flex items-center gap-2 text-sm py-1 px-4 hover:bg-primary/20 hover:text-primary content-center transition-all rounded-md`}
		>
			<i>{icon}</i>
			{title}
		</Link>
	);
};

export default NavLink;
