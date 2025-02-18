import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const PageContainer = ({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				`min-h-screen w-full p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] ${className}`
			)}
		>
			{children}
		</div>
	);
};

export default PageContainer;
