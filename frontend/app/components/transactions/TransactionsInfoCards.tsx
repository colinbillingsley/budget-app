import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, displayReadableAmount } from "@/lib/utils";
import React, { ReactNode } from "react";

interface TransactionsInfoCardsProps {
	title: string;
	amount: number;
	icon: ReactNode;
	className?: string;
}

const TransactionsInfoCards = ({
	title,
	amount,
	icon,
	className,
}: TransactionsInfoCardsProps) => {
	return (
		<Card className={cn(`relative border-none ${className}`)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-xl sm:text-3xl">
					{amount >= 0
						? `$${displayReadableAmount(amount)}`
						: `-$${displayReadableAmount(amount)}`}
				</p>
				<i className="absolute bottom-1 right-2 opacity-40">{icon}</i>
			</CardContent>
		</Card>
	);
};

export default TransactionsInfoCards;
