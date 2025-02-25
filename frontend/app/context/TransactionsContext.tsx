"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export interface Transaction {
	id: string;
	title: string;
	amount: number;
	type: "income" | "expense";
}

interface TransactionContextProps {
	transactions: Transaction[];
}

export const TransactionContext = createContext<TransactionContextProps | null>(
	null
);

export const TransactionContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [transactions, settransactions] = useState<Array<Transaction>>([]);

	return (
		<TransactionContext.Provider
			value={{
				transactions,
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
