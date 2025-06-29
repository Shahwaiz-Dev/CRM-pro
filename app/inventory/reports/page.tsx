'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';
import { Download, TrendingUp, TrendingDown, Package, DollarSign, AlertTriangle, Calendar } from 'lucide-react';

const inventoryTurnoverData = [
  { month: 'Jan', turnover: 4.2, value: 125000 },
  { month: 'Feb', turnover: 3.8, value: 135000 },
  { month: 'Mar', turnover: 4.5, value: 142000 },
  { month: 'Apr', turnover: 4.1, value: 138000 },
  { month: 'May', turnover: 4.7, value: 155000 },
  { month: 'Jun', turnover: 4.3, value: 148000 },
];

const stockLevelData = [
  { category: 'Electronics', inStock: 68, lowStock: 22, outOfStock: 10 },
  { category: 'Wearables', inStock: 75, lowStock: 18, outOfStock: 7 },
  { category: 'Audio', inStock: 62, lowStock: 28, outOfStock: 10 },
  { category: 'Accessories', inStock: 80, lowStock: 15, outOfStock: 5 },
];

const topSellingProducts = [
  { name: 'Wireless Headphones Pro', sold: 245, revenue: 73500, growth: 12.5 },
  { name: 'Smart Fitness Tracker', sold: 189, revenue: 37800, growth: 8.3 },
  { name: 'USB-C Hub Pro', sold: 156, revenue: 12480, growth: -2.1 },
  { name: 'Portable Bluetooth Speaker', sold: 134, revenue: 20100, growth: 15.7 },
  { name: 'Gaming Mouse Pro', sold: 98, revenue: 7840, growth: 5.2 },
];

const supplierPerformance = [
  { name: 'TechSupply Co.', onTime: 95, quality: 4.8, cost: 'Low' },
  { name: 'WearTech Ltd.', onTime: 88, quality: 4.6, cost: 'Medium' },
  { name: 'ConnectCorp', onTime: 97, quality: 4.9, cost: 'Low' },
  { name: 'AudioMax Inc.', onTime: 82, quality: 3.9, cost: 'High' },
];

const categoryDistribution = [
  { name: 'Electronics', value: 35, color: '#3B82F6' },
  { name: 'Wearables', value: 25, color: '#10B981' },
  { name: 'Audio', value: 20, color: '#F59E0B' },
  { name: 'Accessories', value: 20, color: '#EF4444' },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('last-6-months');
  const [selectedReport, setSelectedReport] = useState('overview');

  const totalInventoryValue = inventoryTurnoverData.reduce((sum, item) => sum + item.value, 0) / inventoryTurnoverData.length;
  const avgTurnover = inventoryTurnoverData.reduce((sum, item) => sum + item.turnover, 0) / inventoryTurnoverData.length;
  const totalProductsSold = topSellingProducts.reduce((sum, product) => sum + product.sold, 0);
  const totalRevenue = topSellingProducts.reduce((sum, product) => sum + product.revenue, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Reports</h1>
          <p className="text-gray-600 mt-2">Analyze inventory performance and trends</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalInventoryValue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgTurnover.toFixed(1)}x</div>
            <p className="text-xs text-muted-foreground">Average monthly turnover</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProductsSold.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">From inventory sales</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Turnover Trend</CardTitle>
            <CardDescription>Monthly inventory turnover rate and value</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={inventoryTurnoverData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value, name) => [
                  name === 'turnover' ? `${value}x` : `$${value.toLocaleString()}`,
                  name === 'turnover' ? 'Turnover Rate' : 'Inventory Value'
                ]} />
                <Area yAxisId="right" type="monotone" dataKey="value" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                <Line yAxisId="left" type="monotone" dataKey="turnover" stroke="#10B981" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Inventory distribution by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              {categoryDistribution.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Stock Level Analysis</CardTitle>
            <CardDescription>Stock status distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockLevelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inStock" stackId="a" fill="#10B981" name="In Stock" />
                <Bar dataKey="lowStock" stackId="a" fill="#F59E0B" name="Low Stock" />
                <Bar dataKey="outOfStock" stackId="a" fill="#EF4444" name="Out of Stock" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products by units sold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.sold} units sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">
                      ${product.revenue.toLocaleString()}
                    </div>
                    <div className={`text-sm flex items-center ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {Math.abs(product.growth)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supplier Performance</CardTitle>
          <CardDescription>Key metrics for supplier evaluation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supplierPerformance.map((supplier, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-medium mb-3">{supplier.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">On-time Delivery</span>
                    <Badge variant={supplier.onTime >= 90 ? 'default' : 'secondary'}>
                      {supplier.onTime}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quality Rating</span>
                    <Badge variant={supplier.quality >= 4.5 ? 'default' : 'secondary'}>
                      {supplier.quality}/5
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cost Level</span>
                    <Badge variant={supplier.cost === 'Low' ? 'default' : supplier.cost === 'Medium' ? 'secondary' : 'destructive'}>
                      {supplier.cost}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}