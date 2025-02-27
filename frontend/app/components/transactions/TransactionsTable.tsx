"use client";

import { useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTransactionContext } from "@/app/context/TransactionsContext";
import { displayTitle } from "../budget/CategoryCard";

// // Mock data for demonstration
// const mockTransactions: Transaction[] = [
// 	{
// 		id: "1",
// 		type: "Income",
// 		amount: 1000,
// 		date: "2023-05-01",
// 		notes: "Salary",
// 	},
// 	{
// 		id: "2",
// 		categoryId: "groceries",
// 		type: "Expense",
// 		amount: 50,
// 		date: "2023-05-02",
// 		notes: "Grocery shopping",
// 	},
// 	{
// 		id: "3",
// 		categoryId: "utilities",
// 		type: "Expense",
// 		amount: 100,
// 		date: "2023-05-03",
// 		notes: "Electricity bill",
// 	},
// 	{
// 		id: "4",
// 		type: "Income",
// 		amount: 200,
// 		date: "2023-05-04",
// 		notes: "Freelance work",
// 	},
// 	{
// 		id: "5",
// 		categoryId: "entertainment",
// 		type: "Expense",
// 		amount: 30,
// 		date: "2023-05-05",
// 		notes: "Movie tickets",
// 	},
// 	{
// 		id: "6",
// 		categoryId: "entertainment",
// 		type: "Expense",
// 		amount: 30,
// 		date: "2023-05-05",
// 		notes: "Movie tickets",
// 	},
// 	// Add more mock transactions as needed
// ];

const ITEMS_PER_PAGE = 5;

export function TransactionTable() {
	const { transactions } = useTransactionContext();
	const todaysDate = new Date();

	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE) | 1;
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentTransactions = transactions.slice(startIndex, endIndex);

	return (
		<div className="rounded-lg border-2 border-gray-200 p-4 bg-white">
			<Table>
				<TableCaption>A list of your recent transactions.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Type</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Notes</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<>
						{transactions.length > 0 ? (
							<>
								{currentTransactions.map((transaction) => (
									<TableRow key={transaction.id}>
										<TableCell className="h-16 p-2">
											<p className={`font-medium`}>{transaction.type}</p>
										</TableCell>
										<TableCell>
											<p
												className={`${
													transaction.type === "Expense"
														? "text-red-700 bg-red-400/25"
														: "text-green-700 bg-green-400/25"
												} w-fit px-3 py-1 rounded-full`}
											>
												{transaction.type === "Expense"
													? `-$${transaction.amount.toFixed(2)}`
													: `+$${transaction.amount.toFixed(2)}`}
											</p>
										</TableCell>
										<TableCell>{transaction.date.toString()}</TableCell>
										<TableCell>
											{displayTitle(transaction.category) || "N/A"}
										</TableCell>
										<TableCell>{transaction.notes || "N/A"}</TableCell>
									</TableRow>
								))}
							</>
						) : (
							<TableRow>
								<TableCell className="h-32" colSpan={5}>
									<p className="text-black/40 text-center">
										There are currently no transactions for this month.
									</p>
								</TableCell>
							</TableRow>
						)}
					</>
				</TableBody>
			</Table>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					disabled={currentPage === 1}
				>
					<ChevronLeft size={10} />
					Previous
				</Button>
				<div className="text-sm font-medium">
					Page {currentPage} of {totalPages}
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={currentPage === totalPages}
				>
					Next
					<ChevronRight size={10} />
				</Button>
			</div>
		</div>
	);
}
