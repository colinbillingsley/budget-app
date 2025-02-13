"use client";
import AddCategory from "@/app/components/budget/AddCategory";
import BudgetCard from "@/app/components/budget/BudgetCard";
import PageContainer from "@/app/components/PageContainer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { displayReadableAmount } from "@/lib/utils";
import { Progress } from "@radix-ui/react-progress";
import React, { useEffect, useState } from "react";

interface BudgetProps {
	title: string;
	budgetAmount: number;
	currentAmountUsed: number;
	color: string;
}

const budgets: BudgetProps[] = [
	{
		title: "Groceries",
		budgetAmount: 300,
		currentAmountUsed: 100,
		color: "#4F46E5",
	},
	{
		title: "Rent",
		budgetAmount: 1300,
		currentAmountUsed: 1100.23,
		color: "#10B981",
	},
	{
		title: "Subscriptions",
		budgetAmount: 20,
		currentAmountUsed: 20,
		color: "#F59E0B",
	},
	{
		title: "Restaurants",
		budgetAmount: 200,
		currentAmountUsed: 100,
		color: "#F23E0B",
	},
];

const Budget = () => {
	const [totalBudetSpent, setTotalBudgetSpent] = useState(0);
	const totalBudget = 2000;
	const remaining = totalBudget - totalBudetSpent;
	const percentageUsed = Math.round((totalBudetSpent / totalBudget) * 100);

	function calculateBudgetRemaining() {
		let tempBudget = totalBudget;
		budgets.forEach((budget) => {
			tempBudget -= budget.budgetAmount;
		});

		return tempBudget;
	}

	function getTotalBudgetSpent() {
		budgets.forEach((budget) => {
			setTotalBudgetSpent((prev) => prev + budget.currentAmountUsed);
		});
	}

	useEffect(() => {
		getTotalBudgetSpent();
	}, []);

	return (
		<PageContainer>
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-3xl font-semibold text-primary">Budget Overview</h1>
				<p className="text-gray-400 text-sm">
					Manage your budget for better spending control.
				</p>
			</div>

			{/* Grid Layout */}
			<div className="grid grid-cols-1 gap-6">
				<div>
					<Card className="p-4">
						<CardTitle>Overall Budget</CardTitle>
						<CardContent>
							<p className="text-lg font-semibold">
								${displayReadableAmount(totalBudetSpent)} / $
								{displayReadableAmount(totalBudget)}
							</p>
							<Progress value={percentageUsed} className="w-full mt-2" />
							<p
								className={`text-sm ${
									remaining < 0 ? "text-red-500" : "text-green-600"
								}`}
							>
								{remaining >= 0
									? `Remaining: $${remaining.toLocaleString()}`
									: `Over budget by $${Math.abs(remaining).toLocaleString()}`}
							</p>
						</CardContent>
					</Card>
					<div>
						<h2 className="text-xl font-semibold">Total Budget</h2>
						<p>${displayReadableAmount(totalBudget)}</p>
					</div>

					<div></div>
				</div>
				<div className="flex flex-col gap-4">
					<div className="w-full">
						<ul className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
							{budgets.length > 0 ? (
								<>
									{budgets.map((budget, index) => (
										<li key={`budgetCard-${index}`}>
											<BudgetCard
												title={budget.title}
												budgetAmount={budget.budgetAmount}
												currentAmountUsed={budget.currentAmountUsed}
												color={budget.color}
											/>
										</li>
									))}
								</>
							) : (
								""
							)}
						</ul>
					</div>
					<AddCategory budgetRemaining={calculateBudgetRemaining()} />
				</div>
			</div>
		</PageContainer>
	);
};

export default Budget;
