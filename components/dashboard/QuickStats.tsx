import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export function QuickStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm">Conversion Rate</span>
          </div>
          <div className="text-lg font-semibold">24.5%</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm">Avg Response Time</span>
          </div>
          <div className="text-lg font-semibold">2.3h</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-sm">Pending Issues</span>
          </div>
          <div className="text-lg font-semibold">7</div>
        </div>
      </CardContent>
    </Card>
  );
} 