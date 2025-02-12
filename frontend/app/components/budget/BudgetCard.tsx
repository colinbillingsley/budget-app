import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
	function calculateBudgetUsed(): number {
		return Math.round((currentAmountUsed / budgetAmount) * 100);
	}

	function displayReadableAmount(num: number): string {
		return num.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	}

	function getBudgetStatus() {
		const percentage: number = Math.round(
			(currentAmountUsed / budgetAmount) * 100
		);

		if (percentage < 50) {
			return (
				<>
					<i>
						<CheckCircle size={15} />
					</i>
					<p>You're doing great! Keep up the good work and stay on track!</p>
				</>
			);
		} else if (percentage >= 50 && percentage < 80) {
			return (
				<>
					<i>
						<BellRing size={15} />
					</i>
					<p>
						You're halfway there! Consider reviewing your spending to stay
						within budget.
					</p>
				</>
			);
		} else if (percentage >= 80 && percentage < 100) {
			return (
				<>
					<i>
						<AlertTriangle size={15} />
					</i>
					<p>You're close to your limit! Be mindful of further expenses.</p>
				</>
			);
		} else if (percentage === 100) {
			return (
				<>
					<i>
						<XCircle size={15} />
					</i>
					<p>
						Looks like you've reached your budget. Try not to spend any more!
					</p>
				</>
			);
		} else {
			return (
				<>
					<i>
						<XCircle size={15} />
					</i>
					<p>Budget exceeded! Take immediate action to adjust your spending</p>
				</>
			);
		}
	}

	function getTextColor(bgColor: string): string {
		// Convert hex to RGB
		const hex = bgColor.replace("#", "");
		const r = parseInt(hex.substring(0, 2), 16) / 255;
		const g = parseInt(hex.substring(2, 4), 16) / 255;
		const b = parseInt(hex.substring(4, 6), 16) / 255;

		// Calculate luminance
		const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

		// Return black for light backgrounds, white for dark
		return luminance > 0.5 ? "black" : "white";
	}
	return (
		<Link href={`/budget/${title.toLocaleLowerCase()}`}>
			<Card
				style={{ backgroundColor: color, color: getTextColor(color) }}
				className={cn(
					`flex flex-col flex-shrink-0 p-4 w-full h-[12rem] border border-transparent transition-all hover:cursor-pointer hover:-translate-x-1 shadow-transparent hover:-translate-y-1 hover:shadow-md`
				)}
			>
				<CardTitle className="font-normal text-base">{title}</CardTitle>
				<CardContent className="p-0 flex flex-col justify-between items-stretch gap-3 h-full">
					<span className="text-3xl font-semibold">
						${displayReadableAmount(currentAmountUsed)}
						<span className="text-xs font-normal">
							/${displayReadableAmount(budgetAmount)}
						</span>
					</span>
					<div className="flex flex-col gap-2">
						<span
							className={cn(
								"text-sm w-fit rounded-lg py-1 px-2",
								getTextColor(color) === "black" ? "bg-black/10" : "bg-white/10"
							)}
						>
							{calculateBudgetUsed()}%
						</span>
						<div className="flex items-center gap-2 text-xs">
							{getBudgetStatus()}
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default BudgetCard;
