import AllExpenses from "../../components/dashboard/AllExpenses";
import FinanceDataGraph from "../../components/dashboard/FinanceDataGraph";
import MoneyDataCards from "../../components/dashboard/MoneyDataCards";
import PageContainer from "../../components/PageContainer";

export default function Home() {
	return (
		<PageContainer>
			<div className="mb-4">
				<h1 className="text-3xl">Greetings Colin!</h1>
				<p className="text-xs text-gray-400">
					This is an overview of all of your finances.
				</p>
			</div>

			{/* 2 Column Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
				{/* Left Column - MoneyDataCards & AllExpenses */}
				<div className="flex flex-col gap-6">
					{/* Money Cards */}
					<div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4 w-full">
						<MoneyDataCards title="Total Income" moneyAmount={12645.0} />
						<MoneyDataCards title="Monthly Income" moneyAmount={2645.0} />
						<MoneyDataCards title="Monthly Expenses" moneyAmount={1895.0} />
					</div>

					<FinanceDataGraph />
				</div>

				<div className="h-full">
					<AllExpenses />
				</div>
			</div>
		</PageContainer>
	);
}
