import React, { useMemo } from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Transaction } from '@/types/transaction'

interface MonthlyChartProps {
    transactions: Transaction[]
}
const MonthlyChart: React.FC<MonthlyChartProps> = ({ transactions }) => {
    const monthlyData = useMemo(() => {
        const data: { [key: string]: { month: string, income: number, expenses: number } } = {};
        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!data[monthYear]) {
                data[monthYear] = {month: monthYear, income: 0, expenses: 0};
            }
            if (transaction.amount > 0) {
                data[monthYear].income += transaction.amount;
            } else {
                data[monthYear].expenses += Math.abs(transaction.amount);
            }
        })
        return Object.values(data).sort((a, b) => a.month.localeCompare(b.month));
    }, [transactions])
  return (
    <ResponsiveContainer width="60%" height="60%">
        <BarChart data={monthlyData}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="income" fill="#8884d8" name="income"/>
            <Bar dataKey="expenses" fill="#82ca9d" name="expenses"/>
        </BarChart>
    </ResponsiveContainer>
  )
}

export default MonthlyChart