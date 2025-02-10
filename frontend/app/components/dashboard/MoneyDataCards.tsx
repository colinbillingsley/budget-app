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
		<div className="flex flex-col justify-between items-stretch bg-white border border-gray-200 rounded-lg p-4 h-36">
			<div>
				<h2>{title}</h2>
			</div>

			<div>
				<p className="text-2xl font-medium">
					${displayReadableAmount(moneyAmount)}
				</p>
				<p className="text-xs">percentage vs last month</p>
			</div>
		</div>
	);
};

export default MoneyDataCards;
