import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const inventoryData = [
  { status: 'In Stock', percentage: '68%', color: 'bg-green-500' },
  { status: 'Low Stock', percentage: '22%', color: 'bg-yellow-500' },
  { status: 'Out of Stock', percentage: '10%', color: 'bg-red-500' },
];

export function InventoryStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
        <CardDescription>Current stock distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventoryData.map((item) => (
            <div key={item.status} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm">{item.status}</span>
              </div>
              <span className="font-semibold">{item.percentage}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 