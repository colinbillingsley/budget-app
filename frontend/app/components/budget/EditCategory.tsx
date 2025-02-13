"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

const EditCategory = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<button className="w-full text-start hover:cursor-default">Edit</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Category</DialogTitle>
					<DialogDescription>
						Make any changes to the category and apply its changes.
					</DialogDescription>
				</DialogHeader>

				{/* <CategoryForm setIsOpen={setIsOpen} /> */}
			</DialogContent>
		</Dialog>
	);
};

export default EditCategory;
