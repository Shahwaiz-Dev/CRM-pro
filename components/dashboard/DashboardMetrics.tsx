import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, UserPlus, Package } from 'lucide-react';

const metrics = [
  {
    title: 'Total Revenue',
    value: '$547,200',
    change: '+12.5% from last month',
    icon: DollarSign,
    changeType: 'positive' as const,
  },
  {
    title: 'Active Customers',
    value: '1,429',
    change: '+8.2% from last month',
    icon: Users,
    changeType: 'positive' as const,
  },
  {
    title: 'Total Employees',
    value: '147',
    change: '+3 new hires this month',
    icon: UserPlus,
    changeType: 'positive' as const,
  },
  {
    title: 'Products in Stock',
    value: '892',
    change: '23 need restocking',
    icon: Package,
    changeType: 'neutral' as const,
  },
];

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const changeColor = metric.changeType === 'positive' ? 'text-green-600' : 
                           metric.changeType === 'neutral' ? 'text-gray-600' : 'text-red-600';
        
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={changeColor}>{metric.change}</span>
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 