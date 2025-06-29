'use client';

import { memo, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  DollarSign,
  Package,
  UserPlus,
} from 'lucide-react';

// Static data - no calculations
const recentActivities = [
  { id: 1, type: 'sale', message: 'New sale closed with ABC Corp', time: '2 hours ago', amount: '$15,000' },
  { id: 2, type: 'employee', message: 'John Smith marked attendance', time: '3 hours ago' },
  { id: 3, type: 'inventory', message: 'Low stock alert for Product #123', time: '4 hours ago' },
  { id: 4, type: 'lead', message: 'New lead from website form', time: '5 hours ago' },
];

// Memoized icon component
const ActivityIcon = memo(({ type }: { type: string }) => {
  const iconMap = useMemo(() => ({
    sale: <DollarSign className="w-5 h-5 text-green-600" />,
    employee: <Users className="w-5 h-5 text-blue-600" />,
    inventory: <Package className="w-5 h-5 text-amber-600" />,
    lead: <UserPlus className="w-5 h-5 text-purple-600" />,
  }), []);

  return iconMap[type as keyof typeof iconMap] || null;
});

ActivityIcon.displayName = 'ActivityIcon';

// Memoized activity item component
const ActivityItem = memo(({ activity }: { activity: any }) => {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0">
        <ActivityIcon type={activity.type} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
        <p className="text-sm text-gray-500">{activity.time}</p>
      </div>
      {activity.amount && (
        <div className="flex-shrink-0">
          <Badge variant="secondary" className="text-green-700 bg-green-50">
            {activity.amount}
          </Badge>
        </div>
      )}
    </div>
  );
});

ActivityItem.displayName = 'ActivityItem';

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest updates from your business</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 