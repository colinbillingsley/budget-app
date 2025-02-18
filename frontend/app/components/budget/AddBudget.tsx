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

interface AddCategoryProps {}

const AddBudget = ({}: AddCategoryProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="w-full">
					<PlusIcon />
					Add Budget
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col w-full h-full sm:w-[30rem] sm:h-fit">
				<DialogHeader className="">
					<DialogTitle>Create a Budget</DialogTitle>
					<DialogDescription>
						Select a category and set its budget. Money spent in this category
						will also be added to the overall current budget spent.
					</DialogDescription>
				</DialogHeader>

				<CategoryForm isOpen={isOpen} setIsOpen={setIsOpen} />
			</DialogContent>
		</Dialog>
	);
};

export default AddBudget;
