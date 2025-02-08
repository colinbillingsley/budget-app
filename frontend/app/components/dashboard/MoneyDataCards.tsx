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
		<div className="flex flex-col justify-between items-stretch border border-gray-200 rounded-lg p-4 h-36">
			<div>
				<h2>{title}</h2>
			</div>

			<div>
				<p>${displayReadableAmount(moneyAmount)}</p>
				<p>percentage (up or down) vs last month</p>
			</div>
		</div>
	);
};

export default MoneyDataCards;
