"use client";
import { createContext, ReactNode, useContext, useState } from "react";

enum Category {
	Groceries = "groceries",
	RentMortgage = "rent_mortgage",
	Utilities = "utilities",
	Transportation = "transportation",
	DiningOut = "dining_out",
	Entertainment = "entertainment",
	Healthcare = "healthcare",
	Insurance = "insurance",
	DebtPayments = "debt_payments",
	Savings = "savings",
	Investments = "investments",
	PersonalCare = "personal_care",
	Clothing = "clothing",
	Education = "education",
	GiftsDonations = "gifts_donations",
	Subscriptions = "subscriptions",
	Travel = "travel",
	Taxes = "taxes",
	Miscellaneous = "miscellaneous",
}

export interface Transaction {
	id: string;
	title: string;
	amount: number;
	type: "Income" | "Expense";
	date: Date;
	category: Category;
	notes: string;
}

interface TransactionContextProps {
	transactions: Transaction[];
	addTransaction: (transaction: Transaction) => void;
	removeTransaction: (id: string) => void;
	filterByType: (type: "Income" | "Expense") => Transaction[];
	getTotalIncome: () => number;
	getTotalExpense: () => number;
	getNetBalance: () => number;
}

export const TransactionContext = createContext<TransactionContextProps | null>(
	null
);

export const TransactionContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [transactions, setTransactions] = useState<Array<Transaction>>([]);

	function addTransaction(newTrans: Transaction) {
		setTransactions((prev) => [...prev, newTrans]);
	}

	function removeTransaction(deletedTransId: string) {
		const updatedTransactions = transactions.filter(
			(transaction) => transaction.id !== deletedTransId
		);
		setTransactions(updatedTransactions);
	}

	function filterByType(type: "Income" | "Expense") {
		return transactions.filter((transaction) => transaction.type === type);
	}

	function getTotalIncome() {
		const incomeTrans = filterByType("Income");
		const totalIncome = 0;
		incomeTrans.reduce(
			(accumulator, currentValue) => accumulator + currentValue.amount,
			totalIncome
		);
		return totalIncome;
	}

	function getTotalExpense() {
		const expenseTrans = filterByType("Expense");
		const totalExpense = 0;
		expenseTrans.reduce(
			(accumulator, currentValue) => accumulator + currentValue.amount,
			totalExpense
		);
		return totalExpense;
	}

	function getNetBalance() {
		const incomeTotal = getTotalIncome();
		const expenseTotal = getTotalExpense();

		return incomeTotal - expenseTotal;
	}

	return (
		<TransactionContext.Provider
			value={{
				transactions,
				addTransaction,
				removeTransaction,
				filterByType,
				getTotalIncome,
				getTotalExpense,
				getNetBalance,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useTransactionContext = () => {
	const context = useContext(TransactionContext);
	if (!context) {
		throw new Error(
			"useTransactionContext must be used within an ListProvider"
		);
	}
	return context;
};
