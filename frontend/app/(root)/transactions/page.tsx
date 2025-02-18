import H1 from "@/app/components/H1";
import PageContainer from "@/app/components/PageContainer";
import { TransactionTable } from "@/app/components/transactions/TransactionsTable";
import React from "react";

const Transactions = () => {
	return (
		<PageContainer className="space-y-4">
			<div>
				<H1>Transactions</H1>
				<p className="text-gray-400 text-sm">
					Keep track of transactions over the months.
				</p>
			</div>

			<div>
				<div className="w-full bg-black/10 p-4">
					<p className="">Filters</p>
				</div>
			</div>

			<div>
				<TransactionTable />
			</div>
		</PageContainer>
	);
};

export default Transactions;
