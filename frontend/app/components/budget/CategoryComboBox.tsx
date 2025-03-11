"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { categories, cn } from "@/lib/utils";
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

const CategoryComboBox = ({
	categoryName,
	setCategoryName,
	error,
}: {
	categoryName: string;
	setCategoryName: React.Dispatch<React.SetStateAction<string>>;
	error: boolean;
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
					} ${categoryName === "" ? "text-gray-500" : "text-black"} ${
						error ? "border-red-500" : ""
					}`}
				>
					{categoryName
						? categories.find((category) => category.value === categoryName)
								?.label
						: "Select category..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
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
