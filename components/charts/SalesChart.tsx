'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 65000, leads: 45 },
  { month: 'Feb', sales: 75000, leads: 52 },
  { month: 'Mar', sales: 85000, leads: 61 },
  { month: 'Apr', sales: 95000, leads: 58 },
  { month: 'May', sales: 105000, leads: 67 },
  { month: 'Jun', sales: 115000, leads: 74 },
];

const SalesChart = () => {
  const chartData = useMemo(() => salesData, []);
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value, name) => [
          name === 'sales' ? `$${value.toLocaleString()}` : value,
          name === 'sales' ? 'Sales' : 'Leads'
        ]} />
        <Bar dataKey="sales" fill="#3B82F6" />
        <Bar dataKey="leads" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesChart; 