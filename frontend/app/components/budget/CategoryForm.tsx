"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { displayReadableAmount } from "@/lib/utils";
import React, { Dispatch, SetStateAction, useState } from "react";

interface CategoryFormProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoryForm = ({ setIsOpen }: CategoryFormProps) => {
	const [categoryName, setCategoryName] = useState("");
	const [categoryBudget, setCategoryBudget] = useState(0);

	function handleBudgetInput(e: any) {
		setCategoryBudget(e.target.value);
	}

	function handleCancel(e: any) {
		e.preventDefault();
		setIsOpen(false);
	}

	return (
		<form action="" className="space-y-4">
			<div className="space-y-2">
				<Label>Category Name</Label>
				<Input placeholder="Enter a category name" />
			</div>

			<div className="space-y-2">
				<Label htmlFor="number">Budget Limit</Label>
				<Input
					placeholder="Enter a number for the budget (e.g. 1100)"
					onChange={handleBudgetInput}
				/>
			</div>

			<div className="flex justify-end items-center gap-2">
				<Button variant={"outline"} onClick={handleCancel}>
					Cancel
				</Button>
				<Button>Create</Button>
			</div>
		</form>
	);
};

export default CategoryForm;
