"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import CategoryComboBox from "../budget/CategoryComboBox";
import {
	Transaction,
	useTransactionContext,
} from "@/app/context/TransactionsContext";

interface TransactionFormProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TransactionForm = ({ isOpen, setIsOpen }: TransactionFormProps) => {
	const [transactionType, setTransactionType] = useState<"Income" | "Expense">(
		"Expense"
	);
	const [transactionAmount, setTransactionAmount] = useState(0);
	const [transactionAmountError, setTransactionAmountError] = useState(false);
	const [categoryName, setCategoryName] = useState<string>("");
	const [categoryNameError, setCategoryNameError] = useState(false);
	const [notes, setNotes] = useState<string>("");

	const { transactions, addTransaction } = useTransactionContext();

	function resetFormFields() {
		setCategoryName("");
		setTransactionAmount(0);
		setTransactionType("Expense");
		setNotes("");
		setTransactionAmountError(false);
		setCategoryNameError(false);
	}

	function handleNotesInput(e: React.ChangeEvent<HTMLInputElement>) {
		setNotes(e.target.value);
	}

	function handleBudgetInput(e: React.ChangeEvent<HTMLInputElement>) {
		setTransactionAmountError(false);
		setTransactionAmount(parseFloat(e.target.value) || 0);
	}

	function handleCancel(e: React.FormEvent) {
		e.preventDefault();
		setIsOpen(false);
	}

	async function determineErrors() {
		let errors = false;
		if (categoryName === "") {
			setCategoryNameError(true);
			errors = true;
		}
		if (transactionAmount === 0) {
			setTransactionAmountError(true);
			errors = true;
		}
		return errors;
	}

	async function handleAddTransaction(e: React.FormEvent) {
		e.preventDefault();

		const errors = await determineErrors();

		if (!errors) {
			const newTransaction = {
				id: (transactions.length + 1).toString(),
				amount: transactionAmount,
				type: transactionType,
				date: new Date(),
				category: categoryName,
				notes: notes,
			};

			addTransaction(newTransaction);

			// close the modal
			setIsOpen(false);
		}
	}

	// whenever category form modal is closed, reset all the fields
	useEffect(() => {
		if (!isOpen) {
			resetFormFields();
		}
	}, [isOpen]);

	return (
		<form action="" className="space-y-4">
			<div className="space-y-2">
				<Label>Type*</Label>
				<RadioGroup
					value={transactionType}
					onValueChange={setTransactionType}
					className="flex items-center gap-2"
				>
					<div
						className={`flex items-center gap-2 p-3 hover:bg-primary/20 w-fit rounded-lg transition-all active:bg-primary/50 ${
							transactionType === "Income" ? "bg-primary/10" : "bg-transparent"
						}`}
					>
						<RadioGroupItem value="Income" id="income" />
						<Label htmlFor="income">Income</Label>
					</div>

					<div
						className={`flex items-center gap-2 p-3 hover:bg-primary/10 w-fit rounded-lg transition-all active:bg-primary/50 ${
							transactionType === "Expense" ? "bg-primary/10" : "bg-transparent"
						}`}
					>
						<RadioGroupItem value="Expense" id="expense" />
						<Label htmlFor="expense">Expense</Label>
					</div>
				</RadioGroup>
			</div>

			<div className="space-y-2 flex flex-col gap-1">
				<Label className={`${categoryNameError ? "text-red-500" : ""}`}>
					Category*
				</Label>
				<CategoryComboBox
					categoryName={categoryName}
					setCategoryName={(e) => {
						setCategoryName(e);
						setCategoryNameError(false);
					}}
					error={categoryNameError}
				/>
				{categoryNameError ? (
					<p className="text-red-500 text-xs">
						Transaction category is required. Please select a category.
					</p>
				) : (
					<></>
				)}
			</div>

			<div className="space-y-2">
				<Label className={`${transactionAmountError ? "text-red-500" : ""}`}>
					Amount*
				</Label>
				<Input
					type="number"
					placeholder="Enter a number for the amount (e.g. 1100)"
					onChange={handleBudgetInput}
					className={`border-2 border-accent text-sm transition-all focus:border-primary ring-none ${
						transactionAmountError ? "border-red-500" : ""
					}`}
				/>
				{transactionAmountError ? (
					<p className="text-red-500 text-xs">
						Transaction amount is required. Please enter an amount.
					</p>
				) : (
					<></>
				)}
			</div>

			<div className="space-y-2">
				<Label>Notes</Label>
				<Input
					type="string"
					placeholder="Enter any notes if needed"
					onChange={handleNotesInput}
					className="border-2 border-accent text-sm transition-all focus:border-primary ring-none"
				/>
			</div>

			<div className="flex justify-end items-center gap-2">
				<Button variant={"outline"} onClick={handleCancel}>
					Cancel
				</Button>
				<Button onClick={handleAddTransaction}>Create</Button>
			</div>
		</form>
	);
};

export default TransactionForm;
