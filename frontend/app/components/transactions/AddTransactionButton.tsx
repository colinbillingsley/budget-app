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
import TransactionForm from "./TransactionForm";

interface AddTransactionProps {}

const AddTransactionButton = ({}: AddTransactionProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="w-full">
					<PlusIcon />
					Add Transaction
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col w-full h-full sm:w-[30rem] sm:h-fit">
				<DialogHeader className="">
					<DialogTitle>Add a Transaction</DialogTitle>
					<DialogDescription>
						Fill out the fields to add a transaction to your table.
					</DialogDescription>
				</DialogHeader>

				<TransactionForm isOpen={isOpen} setIsOpen={setIsOpen} />
			</DialogContent>
		</Dialog>
	);
};

export default AddTransactionButton;
