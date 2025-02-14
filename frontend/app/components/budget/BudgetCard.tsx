import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateBudgetUsed, cn, displayReadableAmount } from "@/lib/utils";
import { AlertTriangle, BellRing, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BudgetCardProps {
	title: string;
	budgetAmount: number;
	currentAmountUsed: number;
	color: string;
}

const BudgetCard = ({
	title,
	budgetAmount,
	currentAmountUsed,
	color,
}: BudgetCardProps) => {
	return (
		<Link href={`/budget/${title.toLocaleLowerCase()}`}>
			<Card
				style={{ backgroundColor: color }}
				className={cn(
					`flex flex-col flex-shrink-0 p-4 w-full h-[12rem] text-white transition-all hover:cursor-pointer hover:-translate-x-1 shadow-transparent hover:-translate-y-1 hover:shadow-md`
				)}
			>
				<div>
					<CardTitle className="font-normal text-base">{title}</CardTitle>
				</div>
				<CardContent className="p-0 flex flex-col justify-between items-stretch gap-3 h-full">
					<span className="text-3xl font-semibold">
						<span className={cn("w-fit rounded-lg text-white")}>
							{calculateBudgetUsed(budgetAmount, currentAmountUsed)}%
						</span>
					</span>
					<div className="flex flex-col gap-2 bg-black/10 px-2 py-3 rounded-lg">
						<div className="flex items-center justify-between w-full">
							${displayReadableAmount(currentAmountUsed)}
							<span className="">${displayReadableAmount(budgetAmount)}</span>
						</div>

						<Progress
							value={calculateBudgetUsed(budgetAmount, currentAmountUsed)}
							progressColor="bg-white"
							barColor="bg-black/20"
						/>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default BudgetCard;
