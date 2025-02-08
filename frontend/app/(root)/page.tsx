import MoneyDataCards from "../components/dashboard/MoneyDataCards";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<div className="self-start">
				<h1 className="text-2xl">Greetings Colin!</h1>
				<p className="text-xs text-gray-400">
					This is an overview of all of your finances.
				</p>
			</div>

			<div>
				<div>
					<MoneyDataCards title="Total Income" moneyAmount={12645.0} />
					<MoneyDataCards title="Monthly Income" moneyAmount={2645.0} />
					<MoneyDataCards title="Monthly Expenses" moneyAmount={1895.0} />
				</div>
			</div>
		</div>
	);
}
