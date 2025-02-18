"use client";
import { Category, useCategoryContext } from "@/app/context/CategoriesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import CategoryComboBox from "./CategoryComboBox";

interface CategoryFormProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface Color {
	title: string;
	hex: string;
	isSelected: boolean;
}

const CategoryForm = ({ isOpen, setIsOpen }: CategoryFormProps) => {
	const { addCategory, getNumberOfCategories } = useCategoryContext();
	const [categoryName, setCategoryName] = useState("");
	const [categoryBudget, setCategoryBudget] = useState(0);
	const [selectedColor, setSelectedColor] = useState<Color | null>(null);

	function resetFormFields() {
		setCategoryName("");
		setCategoryBudget(0);

		if (selectedColor) selectedColor.isSelected = false;
		setSelectedColor(null);
	}

	function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
		setCategoryName(e.target.value);
	}

	function handleBudgetInput(e: React.ChangeEvent<HTMLInputElement>) {
		setCategoryBudget(parseFloat(e.target.value) || 0);
	}

	function handleCancel(e: React.FormEvent) {
		e.preventDefault();
		setIsOpen(false);
	}

	async function handleAddCategory(e: React.FormEvent) {
		e.preventDefault();
		const numCats = getNumberOfCategories();

		// get the new category object
		const newCategory: Category = {
			id: (numCats + 1).toString(),
			title: categoryName.trim(),
			budget: categoryBudget,
			budgetUsed: 0,
			color: selectedColor ? selectedColor.hex : "#000",
		};

		// add the new category object to existing categories
		addCategory(newCategory);

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
			<div className="space-y-2 flex flex-col gap-1">
				<Label>Category Name</Label>
				<CategoryComboBox
					categoryName={categoryName}
					setCategoryName={setCategoryName}
				/>
			</div>

			<div className="space-y-2">
				<Label>Budget</Label>
				<Input
					type="number"
					placeholder="Enter a number for the budget (e.g. 1100)"
					onChange={handleBudgetInput}
					className="border-2 border-accent text-sm transition-all focus:border-primary ring-none"
				/>
			</div>

			<div className="space-y-2">
				<Label>Pick a Color</Label>
				<ColorPicker
					selectedColor={selectedColor}
					setSelectedColor={setSelectedColor}
				/>
			</div>

			<div className="flex justify-end items-center gap-2">
				<Button variant={"outline"} onClick={handleCancel}>
					Cancel
				</Button>
				<Button onClick={handleAddCategory}>Create</Button>
			</div>
		</form>
	);
};

export default CategoryForm;
