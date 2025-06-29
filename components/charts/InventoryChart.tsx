'use client';

import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const inventoryData = [
  { name: 'In Stock', value: 68, color: '#10B981' },
  { name: 'Low Stock', value: 22, color: '#F59E0B' },
  { name: 'Out of Stock', value: 10, color: '#EF4444' },
];

const InventoryChart = () => {
  const chartData = useMemo(() => inventoryData, []);
  
  return (
    <div className="flex items-center justify-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center space-x-6 mt-4">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryChart; 