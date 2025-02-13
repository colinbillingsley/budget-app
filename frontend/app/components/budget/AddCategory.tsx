"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

interface AddCategoryProps {
	budgetRemaining: number;
}

const AddCategory = ({ budgetRemaining }: AddCategoryProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon />
					Add Category
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a category</DialogTitle>
					<DialogDescription>
						Add a category and set its budget. Money spent in this category will
						also be added to the overall budget.
					</DialogDescription>
				</DialogHeader>

				<CategoryForm setIsOpen={setIsOpen} budgetRemaining={budgetRemaining} />
			</DialogContent>
		</Dialog>
	);
};

export default AddCategory;
