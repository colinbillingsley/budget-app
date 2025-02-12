import BudgetCard from "@/app/components/budget/BudgetCard";
import BudgetsPieChart from "@/app/components/budget/BudgetsPieChart";
import PageContainer from "@/app/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, PieChart, PiggyBank } from "lucide-react";
import React from "react";

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
				<div className="flex flex-col gap-4">
					<div className="w-full">
						<ul className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
							{budgets.length > 0 ? (
								<>
									{budgets.map((budget) => (
										<li>
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
					<Button>+ Add Category</Button>
				</div>
			</div>
		</PageContainer>
	);
};

export default Budget;
