"use client";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

interface BudgetData {
	title: string;
	budgetAmount: number;
	currentAmountUsed: number;
	color: string;
}

interface BudgetsPieChartProps {
	data: BudgetData[];
}

const BudgetsPieChart = ({ data }: BudgetsPieChartProps) => {
	const chartData = data.map((budget) => ({
		name: budget.title,
		value: budget.currentAmountUsed,
		color: budget.color,
	}));

	const CustomTooltip = ({ payload }) => {
		if (!payload || payload.length === 0) return null;
		const { name, value, color } = payload[0].payload;
		return (
			<div style={{}} className="bg-white p-2 rounded-lg">
				<h4>{name}</h4>
				<p>{`$${value.toLocaleString()}`}</p>
			</div>
		);
	};

	return (
		<ResponsiveContainer width="100" height="100%">
			<PieChart>
				<Pie
					data={chartData}
					dataKey="value"
					nameKey="name"
					outerRadius={"100%"}
					innerRadius={"50%"}
					paddingAngle={1}
					startAngle={90}
					endAngle={450}
				>
					{chartData.map((entry, index) => (
						<Cell
							className="hover:opacity-85 transition-all"
							key={`cell-${index}`}
							fill={entry.color}
						/>
					))}
				</Pie>
				<Tooltip content={<CustomTooltip payload={chartData} />} />
			</PieChart>
		</ResponsiveContainer>
	);
};

export default BudgetsPieChart;
