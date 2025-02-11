import BudgetCard from "@/app/components/budget/BudgetCard";
import PageContainer from "@/app/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, PieChart, PiggyBank } from "lucide-react";
import React from "react";

const Budgeting = () => {
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
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
				{/* Left Side - Budget Categories */}
				<div className="flex flex-col gap-4 overflow-x-hidden">
					<div className="flex items-center gap-2">
						<PiggyBank size={20} />
						<h3 className="font-semibold">Budget Categories</h3>
					</div>

					<div className="flex items-center gap-3 overflow-x-auto">
						<BudgetCard
							title="Food"
							budget={2000}
							amountUsed={300}
							color="blue"
						/>
						<BudgetCard
							title="Rent"
							budget={1200}
							amountUsed={1100}
							color="red"
						/>
						<BudgetCard
							title="Subscriptions"
							budget={1200}
							amountUsed={30}
							color="red"
						/>
					</div>
					<Button variant={"outline"}>+ Add Category</Button>
				</div>

				{/* Right Side - Graph & Insights */}
				<Card className="w-full">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<PieChart size={20} />
							Spending Breakdown
						</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center h-40 bg-gray-200 dark:bg-gray-800">
						{/* Placeholder for a real chart */}
						<span className="text-gray-500">Chart Placeholder</span>
					</CardContent>
				</Card>
			</div>
		</PageContainer>
	);
};

export default Budgeting;
