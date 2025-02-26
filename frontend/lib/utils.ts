import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function displayReadableAmount(num: number): string {
	return num.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}

export function calculateBudgetUsed(budget: number, spent: number): number {
	return Math.round((spent / budget) * 100);
}

export const categories = [
	{ label: "Groceries", value: "groceries" },
	{ label: "Rent/Mortgage", value: "rent_mortgage" },
	{ label: "Utilities", value: "utilities" },
	{ label: "Transportation", value: "transportation" },
	{ label: "Dining Out", value: "dining_out" },
	{ label: "Entertainment", value: "entertainment" },
	{ label: "Healthcare", value: "healthcare" },
	{ label: "Insurance", value: "insurance" },
	{ label: "Debt Payments", value: "debt_payments" },
	{ label: "Savings", value: "savings" },
	{ label: "Investments", value: "investments" },
	{ label: "Personal Care", value: "personal_care" },
	{ label: "Clothing", value: "clothing" },
	{ label: "Education", value: "education" },
	{ label: "Gifts & Donations", value: "gifts_donations" },
	{ label: "Subscriptions", value: "subscriptions" },
	{ label: "Travel", value: "travel" },
	{ label: "Taxes", value: "taxes" },
	{ label: "Miscellaneous", value: "miscellaneous" },
];
