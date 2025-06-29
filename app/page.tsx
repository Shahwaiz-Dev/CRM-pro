import { Suspense } from 'react';
import { SectionLoader } from '@/components/performance/SectionLoader';
import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { SalesOverview } from '@/components/dashboard/SalesOverview';
import { InventoryStatus } from '@/components/dashboard/InventoryStatus';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { RecentActivities } from '@/components/dashboard/RecentActivities';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening in your business today.</p>
      </div>

      {/* Key Metrics - Server Component with Suspense */}
      <Suspense fallback={<SectionLoader type="skeleton" rows={4} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" />}>
        <DashboardMetrics />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview - Server Component with Suspense */}
        <Suspense fallback={<SectionLoader type="skeleton" rows={6} />}>
          <SalesOverview />
        </Suspense>

        {/* Inventory Status - Server Component with Suspense */}
        <Suspense fallback={<SectionLoader type="skeleton" rows={3} />}>
          <InventoryStatus />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats - Server Component */}
        <QuickStats />

        {/* Recent Activities - Client Component (needs interactivity) with Suspense */}
        <div className="lg:col-span-2">
          <Suspense fallback={<SectionLoader type="skeleton" rows={4} />}>
            <RecentActivities />
          </Suspense>
        </div>
      </div>
    </div>
  );
}