"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export interface Category {
	id: string;
	title: string;
	budget: number;
	budgetUsed: number;
	color: string;
}

interface CategoriesContextProps {
	categories: Category[];
	addCategory: (param: Category) => void;
	removeCategory: (param: string) => Category[];
	editCategory: (param: Category) => void;
	getNumberOfCategories: () => number;
}

export const CategoryContext = createContext<CategoriesContextProps | null>(
	null
);

export const CategoryContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [categories, setCategories] = useState<Array<Category>>([]);

	function addCategory(category: Category) {
		setCategories((prevCat) => [...prevCat, category]);
	}

	function getNumberOfCategories() {
		return categories.length;
	}

	function removeCategory(categoryId: string) {
		const newCategory = categories.filter(
			(category) => category.id !== categoryId
		);
		setCategories(newCategory);
		return newCategory;
	}

	function editCategory(updatedCategory: Category) {
		const id = updatedCategory.id;
		setCategories((prevCategory) =>
			prevCategory.map((category) =>
				category.id === id ? { ...category, ...updatedCategory } : category
			)
		);
	}

	return (
		<CategoryContext.Provider
			value={{
				categories,
				addCategory,
				removeCategory,
				editCategory,
				getNumberOfCategories,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useCategoryContext = () => {
	const context = useContext(CategoryContext);
	if (!context) {
		throw new Error("useCategoryContext must be used within an ListProvider");
	}
	return context;
};
