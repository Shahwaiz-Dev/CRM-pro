import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const salesData = [
  { month: 'January', amount: '$65,000' },
  { month: 'February', amount: '$75,000' },
  { month: 'March', amount: '$85,000' },
  { month: 'April', amount: '$95,000' },
  { month: 'May', amount: '$105,000' },
  { month: 'June', amount: '$115,000' },
];

export function SalesOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Monthly sales performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {salesData.map((item) => (
            <div key={item.month} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{item.month}</span>
              <span className="font-semibold">{item.amount}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 