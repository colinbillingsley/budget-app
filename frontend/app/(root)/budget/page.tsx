"use client";
import AddCategory from "@/app/components/budget/AddCategory";
import BudgetCard from "@/app/components/budget/BudgetCard";
import BudgetsPieChart from "@/app/components/budget/BudgetsPieChart";
import PageContainer from "@/app/components/PageContainer";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateBudgetUsed, displayReadableAmount } from "@/lib/utils";
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

	function getTotalBudgetSpent() {
		budgets.forEach((budget) => {
			setTotalBudgetSpent((prev) => prev + budget.currentAmountUsed);
		});
	}

	function determineLargestCategory() {
		let largestCategory = {
			spent: 0,
			title: "",
		};

		budgets.forEach((budget) => {
			if (largestCategory.spent < budget.currentAmountUsed) {
				largestCategory.spent = budget.currentAmountUsed;
				largestCategory.title = budget.title;
			}
		});

		return largestCategory;
	}

	const largestCategory = determineLargestCategory();

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
				<Card className="h-full flex flex-col justify-between gap-4">
					<CardHeader>
						<CardTitle className="text-xl">Overall Budget</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<p>Total Budget</p>
							<p>${displayReadableAmount(totalBudget)}</p>
						</div>

						<div className="flex items-center justify-between">
							<p>Current Budget Spent</p>
							<p>${displayReadableAmount(totalBudetSpent)}</p>
						</div>

						<Progress
							value={calculateBudgetUsed(totalBudget, totalBudetSpent)}
							progressColor="bg-primary"
							barColor="bg-black/20"
						/>

						<div
							className="flex items-center gap-1
									"
						>
							<p>Budget Remaining: </p>
							<p>${displayReadableAmount(totalBudget - totalBudetSpent)}</p>
						</div>
					</CardContent>
					<CardFooter className="mt-auto p-2 text-sm">
						<p className="w-full bg-black/5 rounded-md p-3">
							Most of your budget has been used in {largestCategory.title}, with
							${largestCategory.spent} being spent so far.
						</p>
					</CardFooter>
				</Card>

				<div className="w-full space-y-4">
					<h2 className="text-xl font-semibold">Categories</h2>
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
					<AddCategory />
				</div>
			</div>
		</PageContainer>
	);
};

export default Budget;
