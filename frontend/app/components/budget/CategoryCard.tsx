import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateBudgetUsed, cn, displayReadableAmount } from "@/lib/utils";
import { AlertTriangle, BellRing, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CategoryCardProps {
	title: string;
	budgetAmount: number;
	currentAmountUsed: number;
	color: string;
}

export function displayTitle(title: string) {
	if (title.includes("_")) {
		if (title === "rent_mortgage") {
			return "Rent/Mortgage";
		} else {
			return title
				.split("_") // Split at underscores
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
				.join(" "); // Join words with a space
		}
	} else {
		return title.charAt(0).toUpperCase() + title.slice(1);
	}
}

const CategoryCard = ({
	title,
	budgetAmount,
	currentAmountUsed,
	color,
}: CategoryCardProps) => {
	return (
		<Link href={`/budget/${title.toLocaleLowerCase()}`}>
			<Card
				className={cn(
					`bg-gradient-to-br from-white to-primary/20 flex flex-col flex-shrink-0 p-4 w-full h-[12rem] text-black transition-all hover:cursor-pointer hover:-translate-x-1 shadow-transparent hover:-translate-y-1 hover:shadow-md`
				)}
			>
				<div className="flex items-center gap-2">
					<CardTitle className="font-normal text-base">
						{displayTitle(title)}
					</CardTitle>
					<div
						style={{ backgroundColor: color }}
						className="size-2 rounded-full"
					></div>
				</div>
				<CardContent className="p-0 flex flex-col justify-between items-stretch gap-3 h-full">
					<span className="text-3xl font-semibold">
						<span className={cn("w-fit rounded-lg")}>
							{calculateBudgetUsed(budgetAmount, currentAmountUsed)}%
						</span>
					</span>
					<div className="flex flex-col gap-2 bg-accent/20 px-2 py-3 rounded-lg">
						<div className="text-sm sm:text-base flex items-center justify-between w-full">
							${displayReadableAmount(currentAmountUsed)}
							<span className="">${displayReadableAmount(budgetAmount)}</span>
						</div>

						<Progress
							value={calculateBudgetUsed(budgetAmount, currentAmountUsed)}
							progressColor="bg-primary"
							barColor="bg-primary/20"
						/>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default CategoryCard;
