"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import CategoryComboBox from "../budget/CategoryComboBox";

interface TransactionFormProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TransactionForm = ({ isOpen, setIsOpen }: TransactionFormProps) => {
	const [transactionType, setTransactionType] = useState<string>("Income");
	const [transactionAmount, setTransactionAmount] = useState(0);
	const [categoryName, setCategoryName] = useState("");
	const [notes, setNotes] = useState<string>("");

	function resetFormFields() {
		setCategoryName("");
		setTransactionAmount(0);
		setTransactionType("Income");
		setNotes("");
	}

	function handleNotesInput(e: React.ChangeEvent<HTMLInputElement>) {
		setNotes(e.target.value);
	}

	function handleBudgetInput(e: React.ChangeEvent<HTMLInputElement>) {
		setTransactionAmount(parseFloat(e.target.value) || 0);
	}

	function handleCancel(e: React.FormEvent) {
		e.preventDefault();
		setIsOpen(false);
	}

	async function handleAddTransaction(e: React.FormEvent) {
		e.preventDefault();

		// close the modal
		setIsOpen(false);
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
				<Label>Type</Label>
				<RadioGroup
					value={transactionType}
					onValueChange={setTransactionType}
					className="flex items-center gap-2"
				>
					<div
						className={`flex items-center gap-2 p-3 hover:bg-primary/20 w-fit rounded-lg transition-all ${
							transactionType === "Income" ? "bg-primary/10" : "bg-transparent"
						}`}
					>
						<RadioGroupItem value="Income" id="income" />
						<Label htmlFor="income">Income</Label>
					</div>

					<div
						className={`flex items-center gap-2 p-3 hover:bg-primary/10 w-fit rounded-lg transition-all ${
							transactionType === "Expense" ? "bg-primary/10" : "bg-transparent"
						}`}
					>
						<RadioGroupItem value="Expense" id="expense" />
						<Label htmlFor="expense">Expense</Label>
					</div>
				</RadioGroup>
			</div>

			<div className="space-y-2 flex flex-col gap-1">
				<Label>Category</Label>
				<CategoryComboBox
					categoryName={categoryName}
					setCategoryName={setCategoryName}
				/>
			</div>

			<div className="space-y-2">
				<Label>Amount</Label>
				<Input
					type="number"
					placeholder="Enter a number for the amount (e.g. 1100)"
					onChange={handleBudgetInput}
					className="border-2 border-accent text-sm transition-all focus:border-primary ring-none"
				/>
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
