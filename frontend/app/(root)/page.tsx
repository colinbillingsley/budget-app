import FinanceDataGraph from "../components/dashboard/FinanceDataGraph";
import MoneyDataCards from "../components/dashboard/MoneyDataCards";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-items-center min-h-screen w-full p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<div className="self-start">
				<h1 className="text-3xl">Greetings Colin!</h1>
				<p className="text-xs text-gray-400">
					This is an overview of all of your finances.
				</p>
			</div>

			<div className="flex self-start w-full">
				<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 w-full">
					<MoneyDataCards title="Total Income" moneyAmount={12645.0} />
					<MoneyDataCards title="Monthly Income" moneyAmount={2645.0} />
					<MoneyDataCards title="Monthly Expenses" moneyAmount={1895.0} />
				</div>
			</div>

			<FinanceDataGraph />
		</div>
	);
}
