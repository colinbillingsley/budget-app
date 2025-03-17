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
	const [categoryName, setCategoryName] = useState<string>("");
	const [categoryBudget, setCategoryBudget] = useState<number>(0);
	const [selectedColor, setSelectedColor] = useState<Color | null>(null);

	const [categoryNameError, setCategoryNameError] = useState(false);
	const [categoryBudgetError, setCategoryBudgetError] = useState(false);
	const [selectedColorError, setSelectedColorError] = useState(false);

	function resetFormFields() {
		setCategoryName("");
		setCategoryBudget(0);

		if (selectedColor) selectedColor.isSelected = false;
		setSelectedColor(null);

		setCategoryNameError(false);
		setCategoryBudgetError(false);
		setSelectedColorError(false);
	}

	function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
		setCategoryName(e.target.value);
	}

	function handleBudgetInput(e: React.ChangeEvent<HTMLInputElement>) {
		setCategoryBudget(parseFloat(e.target.value) || 0);
		setCategoryBudgetError(false);
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
		if (categoryBudget === 0) {
			setCategoryBudgetError(true);
			errors = true;
		}
		if (selectedColor === null) {
			setSelectedColorError(true);
			errors = true;
		}
		return errors;
	}

	async function handleAddCategory(e: React.FormEvent) {
		e.preventDefault();

		const errors = await determineErrors();

		if (!errors) {
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
				<Label
					className={`${categoryNameError ? "text-red-500" : "text-black"}`}
				>
					Category Name*
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
				<Label
					className={`${categoryBudgetError ? "text-red-500" : "text-black"}`}
				>
					Budget*
				</Label>
				<Input
					type="number"
					placeholder="Enter a number for the budget (e.g. 1100)"
					onChange={handleBudgetInput}
					className={`border-2 text-sm transition-all focus:border-primary ring-none outline-none ${
						categoryBudgetError ? "border-red-500" : "border-accent"
					}`}
				/>
				{categoryBudgetError ? (
					<p className="text-red-500 text-xs">
						Budget is required. Please enter a budget.
					</p>
				) : (
					<></>
				)}
			</div>

			<div className="space-y-2">
				<Label
					className={`${selectedColorError ? "text-red-500" : "text-black"}`}
				>
					Pick a Color*
				</Label>
				<ColorPicker
					selectedColor={selectedColor}
					setSelectedColor={(e) => {
						setSelectedColor(e);
						setSelectedColorError(false);
					}}
				/>
				{selectedColorError ? (
					<p className="text-red-500 text-xs">
						A color is required. Please select a color for your category.
					</p>
				) : (
					<></>
				)}
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
