"use client";
import PageContainer from "@/app/components/PageContainer";
import React from "react";
import { usePathname } from "next/navigation";
import H1 from "@/app/components/H1";

const BudgetItem = () => {
	const pathname = usePathname();
	return (
		<PageContainer>
			<H1>{pathname}</H1>
		</PageContainer>
	);
};

export default BudgetItem;
