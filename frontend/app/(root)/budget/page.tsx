"use client";
import AddCategory from "@/app/components/budget/AddCategory";
import PageContainer from "@/app/components/PageContainer";
import { Category, useCategoryContext } from "@/app/context/CategoriesContext";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateBudgetUsed, displayReadableAmount } from "@/lib/utils";
import { Frown } from "lucide-react";
import React, { useEffect, useState } from "react";
import CategoryCard from "@/app/components/budget/CategoryCard";

const Budget = () => {
	const { categories, getNumberOfCategories } = useCategoryContext();
	const [overallBudget, setOverallBudget] = useState<number>(0);
	const [totalBudgetSpent, setTotalBudgetSpent] = useState<number>(0);
	const [remainingBudget, setRemainingBudget] = useState<number>(0);

	// get the overall budget data information
	async function getBudgetData(): Promise<void> {
		const overall = await calculateOverallBudget();
		const spent = await calculateTotalBudgetSpent();
		await calculateRemainingBudget(overall, spent);
	}

	// calculate overall budget by adding all the budgets from all categories
	async function calculateOverallBudget(): Promise<number> {
		let totalBudget: number = 0;
		if (categories.length > 0) {
			categories.forEach((category) => {
				totalBudget += category.budget;
			});
			setOverallBudget(totalBudget);
		} else setOverallBudget(totalBudget);
		return totalBudget;
	}

	// get the total budget used in the overall budget from all categories combined
	async function calculateTotalBudgetSpent(): Promise<number> {
		let totalSpent: number = 0;
		if (categories.length > 0) {
			categories.forEach((category) => {
				totalSpent += category.budgetUsed;
			});
			setTotalBudgetSpent(totalSpent);
		} else setTotalBudgetSpent(totalSpent);
		return totalSpent;
	}

	// calculate the remaining overall budget from the amount used from all categories
	async function calculateRemainingBudget(
		total: number,
		spent: number
	): Promise<void> {
		setRemainingBudget(total - spent);
	}

	// determine if any of the bugdet has been spent, true if it has, and false otherwise
	function hasBugetBeenSpent() {
		return totalBudgetSpent === 0 ? false : true;
	}

	function getCategoriesSpent() {
		return categories.filter((cat) => cat.budgetUsed !== 0);
	}

	// get the category that has spent most of the budget so far
	function determineLargestCategory(): { spent: number; title: string } {
		let largestCategory = {
			spent: 0,
			title: "",
		};

		const categoriesSpent: Category[] = getCategoriesSpent();

		categoriesSpent.forEach((category) => {
			if (largestCategory.spent < category.budgetUsed) {
				largestCategory.spent = category.budgetUsed;
				largestCategory.title = category.title;
			}
		});

		return largestCategory;
	}

	const largestCategory = determineLargestCategory();

	useEffect(() => {
		getBudgetData();
	}, [categories]);

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
						<div className="text-sm sm:text-base flex items-center justify-between">
							<p>Total Budget</p>
							<p>${displayReadableAmount(overallBudget)}</p>
						</div>

						<div className="text-sm sm:text-base flex items-center justify-between">
							<p>Current Budget Spent</p>
							<p>${displayReadableAmount(totalBudgetSpent)}</p>
						</div>

						<Progress
							value={calculateBudgetUsed(overallBudget, totalBudgetSpent)}
							progressColor="bg-primary"
							barColor="bg-black/20"
						/>

						<div className="flex items-center gap-1 text-sm sm:text-base">
							<p>Budget Remaining: </p>
							<p>${displayReadableAmount(remainingBudget)}</p>
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-4 mt-auto p-2 text-sm">
						{getNumberOfCategories() !== 0 ? (
							<>
								{hasBugetBeenSpent() ? (
									<p className="text-xs w-full bg-black/10 rounded-md p-3 text-center">
										Most of your budget has been used in {largestCategory.title}
										, with ${largestCategory.spent} being spent so far.
									</p>
								) : (
									<p className="text-xs w-full bg-black/10 rounded-md p-3 text-center">
										Nice! Looks like you are adding categories to your budget!
										Now you can begin adding expenses to your categories!
									</p>
								)}
							</>
						) : (
							<div className="flex flex-col items-center gap-2 border border-gray-200 rounded-lg p-4 w-full bg-black/10 text-center text-xs">
								<p>Oh no your budget is empty! Start by adding a category.</p>
								<div>
									<AddCategory />
								</div>
							</div>
						)}
					</CardFooter>
				</Card>

				<div className="w-full space-y-4">
					<h2 className="text-xl font-semibold">Categories</h2>
					<div className="w-full">
						{categories.length > 0 ? (
							<ul className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
								<>
									{categories.map((category, index) => (
										<li key={`categoryCard-${category.id}`}>
											<CategoryCard
												title={category.title}
												budgetAmount={category.budget}
												currentAmountUsed={category.budgetUsed}
												color={category.color}
											/>
										</li>
									))}
								</>
							</ul>
						) : (
							<div className="flex flex-col items-center justify-center gap-1 border border-gray-200 p-4 h-[20rem] rounded-lg text-gray-400">
								<Frown size={30} strokeWidth={1} />
								<p className="text-sm text-center">
									No categories have been added. Get started by adding a
									category!
								</p>
							</div>
						)}
					</div>
					<AddCategory />
				</div>
			</div>
		</PageContainer>
	);
};

export default Budget;
