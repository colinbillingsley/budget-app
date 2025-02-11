import React from "react";

interface MoneyDataCardsProps {
	title: string;
	moneyAmount: number;
}

const MoneyDataCards = ({ title, moneyAmount }: MoneyDataCardsProps) => {
	function displayReadableAmount(num: number): string {
		return num.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	}

	return (
		<div className="flex flex-col justify-between items-stretch bg-white border border-gray-200 rounded-lg p-4 h-[9rem]">
			<div>
				<h2 className="text-sm sm:text-base">{title}</h2>
			</div>

			<div>
				<p className="text-xl sm:text-2xl font-medium">
					${displayReadableAmount(moneyAmount)}
				</p>
				<p className="text-xs bg-gray-50 rounded-lg p-2 w-fit">
					percentage vs last month
				</p>
			</div>
		</div>
	);
};

export default MoneyDataCards;
