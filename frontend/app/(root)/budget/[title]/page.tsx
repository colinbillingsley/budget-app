"use client";
import PageContainer from "@/app/components/PageContainer";
import React from "react";
import { useParams } from "next/navigation";
import H1 from "@/app/components/H1";
import { displayTitle } from "@/app/components/budget/CategoryCard";

const BudgetItem = () => {
	const { title } = useParams() as { title: string }; // Get the dynamic route parameter
	return (
		<PageContainer>
			<H1>{title ? displayTitle(title) : "Unknown Title"}</H1>
		</PageContainer>
	);
};

export default BudgetItem;
