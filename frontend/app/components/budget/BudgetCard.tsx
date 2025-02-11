import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface BudgetCardProps {
	title: string;
	budget: number;
	amountUsed: number;
	color: string;
}

const BudgetCard = ({ title, budget, amountUsed, color }: BudgetCardProps) => {
	function calculateBudgetUsed(): number {
		return Math.round((amountUsed / budget) * 100);
	}

	function displayReadableAmount(num: number): string {
		return num.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	}
	return (
		<Card
			className={cn(
				`flex flex-col p-4 min-w-[10rem] h-[10rem] bg-white text-primary border border-primary w-full`
			)}
		>
			<CardTitle className="font-normal text-lg">{title}</CardTitle>
			<CardContent className="p-0 flex flex-col justify-between items-stretch gap-3 h-full">
				<span className="text-2xl font-semibold">
					${displayReadableAmount(amountUsed)}
				</span>
				<span className={`text-sm w-fit bg-primary/10 rounded-lg py-1 px-2`}>
					{calculateBudgetUsed()}%
				</span>
			</CardContent>
		</Card>
	);
};

export default BudgetCard;
