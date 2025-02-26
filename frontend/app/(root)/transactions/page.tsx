"use client";
import React, { useEffect, useState } from "react";
import H1 from "@/app/components/H1";
import PageContainer from "@/app/components/PageContainer";
import { TransactionTable } from "@/app/components/transactions/TransactionsTable";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn
import {
	BadgeDollarSign,
	ChevronDown,
	ChevronUp,
	Landmark,
	Scale,
	SlidersHorizontal,
} from "lucide-react";
import TransactionsInfoCards from "@/app/components/transactions/TransactionsInfoCards";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/utils";
import { useTransactionContext } from "@/app/context/TransactionsContext";
import AddTransactionButton from "@/app/components/transactions/AddTransactionButton";

const Transactions = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [date, setDate] = useState<Date>();
	const [categoryFilter, setCategoryFilter] = useState<string>("");
	const [typeFilter, setTypeFilter] = useState<string>("");
	const [amountFilter, setAmountFilter] = useState<number | null>(null);

	const [totalIncome, setTotalIncome] = useState<number>(0);
	const [totalExpense, setTotalExpense] = useState<number>(0);
	const [netBalance, setNetBalance] = useState<number>(0);
	const { getTotalIncome, getTotalExpense, getNetBalance } =
		useTransactionContext();

	function computeTotalIncome() {
		const total = getTotalIncome();
		setTotalIncome(total);
	}

	function computeTotalExpenses() {
		const total = getTotalExpense();
		setTotalExpense(total);
	}

	function computeNetBalance() {
		const total = getNetBalance();
		setNetBalance(total);
	}

	useEffect(() => {
		computeTotalIncome();
		computeTotalExpenses();
		computeNetBalance();
	}, []);

	return (
		<PageContainer className="space-y-4">
			{/* HEADER */}
			<div>
				<H1>Transactions</H1>
				<p className="text-gray-400 text-sm">
					Keep track of transactions over the months.
				</p>
			</div>

			{/* SUMMARY */}
			<div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
				<TransactionsInfoCards
					title={"Total Income"}
					amount={totalIncome}
					icon={<Landmark size={80} strokeWidth={1} />}
					className="bg-green-500 text-white"
				/>
				<TransactionsInfoCards
					title={"Total Expenses"}
					amount={totalExpense}
					icon={<BadgeDollarSign size={80} strokeWidth={1} />}
					className="bg-red-500 text-white"
				/>
				<TransactionsInfoCards
					title={"Net Balance"}
					amount={netBalance}
					icon={<Scale size={80} strokeWidth={1} />}
					className="bg-blue-500 text-white"
				/>
			</div>

			<AddTransactionButton />

			{/* FILTERS (COLLAPSIBLE) */}
			<div className="w-full bg-white p-4 rounded-lg border-2 border-gray-200">
				<div className="flex items-center justify-between">
					<p className="font-semibold">All Transactions</p>
					<Button
						variant="ghost"
						onClick={() => setShowFilters(!showFilters)}
						className="hidden sm:flex items-center gap-2 text-primary hover:text-primary hover:bg-accent/25"
					>
						{showFilters ? "Hide" : "Show"} Filters
						{showFilters ? <ChevronUp /> : <ChevronDown />}
					</Button>
					<Button
						variant="ghost"
						onClick={() => setShowFilters(!showFilters)}
						className="block sm:hidden text-primary hover:text-primary hover:bg-accent/25"
					>
						<SlidersHorizontal />
					</Button>
				</div>

				<div
					className={`grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-4 transition-all duration-300 ${
						showFilters ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
					}`}
				>
					<input
						type="date"
						className="p-2 w-full border rounded-md bg-white text-gray-700 focus:outline-none focus:border-gray-500"
					/>

					<Select onValueChange={(value) => setTypeFilter(value)}>
						<SelectTrigger
							className={`p-2 h-12 border rounded-md w-full ${
								typeFilter !== "" ? "text-black" : "text-gray-500"
							}`}
						>
							<SelectValue placeholder="Select a type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={"all"} className="focus:bg-accent/25">
								All Types
							</SelectItem>
							<SelectItem value={"income"} className="focus:bg-accent/25">
								Income
							</SelectItem>
							<SelectItem value={"expense"} className="focus:bg-accent/25">
								Expense
							</SelectItem>
						</SelectContent>
					</Select>

					<Select onValueChange={(value) => setCategoryFilter(value)}>
						<SelectTrigger
							className={`p-2 h-12 border rounded-md w-full ${
								categoryFilter !== "" ? "text-black" : "text-gray-500"
							}`}
						>
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={"all"} className="focus:bg-accent/25">
								All Categories
							</SelectItem>
							{categories.map((category, index) => (
								<SelectItem
									key={`filter-${category.value}`}
									value={category.value}
									className="focus:bg-accent/25"
								>
									{category.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input
						type="number"
						placeholder="Amount"
						className="p-2 h-12 border rounded-md w-full"
						onChange={(e) => setAmountFilter(parseFloat(e.target.value))}
					/>
				</div>
			</div>

			{/* TRANSACTIONS TABLE */}
			<div>
				<TransactionTable />
			</div>
		</PageContainer>
	);
};

export default Transactions;
