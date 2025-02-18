"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export const categories = [
	{ label: "Groceries", value: "groceries" },
	{ label: "Rent/Mortgage", value: "rent_mortgage" },
	{ label: "Utilities", value: "utilities" },
	{ label: "Transportation", value: "transportation" },
	{ label: "Dining Out", value: "dining_out" },
	{ label: "Entertainment", value: "entertainment" },
	{ label: "Healthcare", value: "healthcare" },
	{ label: "Insurance", value: "insurance" },
	{ label: "Debt Payments", value: "debt_payments" },
	{ label: "Savings", value: "savings" },
	{ label: "Investments", value: "investments" },
	{ label: "Personal Care", value: "personal_care" },
	{ label: "Clothing", value: "clothing" },
	{ label: "Education", value: "education" },
	{ label: "Gifts & Donations", value: "gifts_donations" },
	{ label: "Subscriptions", value: "subscriptions" },
	{ label: "Travel", value: "travel" },
	{ label: "Taxes", value: "taxes" },
	{ label: "Miscellaneous", value: "miscellaneous" },
];

const CategoryComboBox = ({
	categoryName,
	setCategoryName,
}: {
	categoryName: string;
	setCategoryName: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const [open, setOpen] = React.useState(false);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={`w-[200px] justify-between border-2 font-normal ${
						open ? "border-primary" : "border-accent"
					} ${categoryName === "" ? "text-gray-500" : "text-black"}`}
				>
					{categoryName
						? categories.find((category) => category.value === categoryName)
								?.label
						: "Select category..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search category..." />
					<CommandList>
						<CommandEmpty>No category found.</CommandEmpty>
						<CommandGroup>
							{categories.map((category) => (
								<CommandItem
									key={category.value}
									value={category.value}
									onSelect={(currentValue: string) => {
										setCategoryName(
											currentValue === categoryName ? "" : currentValue
										);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											categoryName === category.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{category.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default CategoryComboBox;
