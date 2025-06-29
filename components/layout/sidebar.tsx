'use client';

import { useState, useMemo, memo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  TrendingUp,
  Building2,
  Clock,
  DollarSign,
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    ],
  },
  {
    title: 'CRM',
    items: [
      { name: 'Customers', href: '/crm/customers', icon: Users },
      { name: 'Leads', href: '/crm/leads', icon: UserPlus },
      { name: 'Sales Pipeline', href: '/crm/pipeline', icon: TrendingUp },
    ],
  },
  {
    title: 'HR Management',
    items: [
      { name: 'Employees', href: '/hr/employees', icon: Building2 },
      { name: 'Attendance', href: '/hr/attendance', icon: Clock },
      { name: 'Payroll', href: '/hr/payroll', icon: DollarSign },
    ],
  },
  {
    title: 'Inventory',
    items: [
      { name: 'Products', href: '/inventory/products', icon: Package },
      { name: 'Stock Management', href: '/inventory/stock', icon: ShoppingCart },
      { name: 'Suppliers', href: '/inventory/suppliers', icon: Truck },
      { name: 'Reports', href: '/inventory/reports', icon: BarChart3 },
    ],
  },
];

// Memoized navigation item component
const NavigationItem = memo(({ 
  item, 
  isActive, 
  collapsed 
}: { 
  item: any; 
  isActive: boolean; 
  collapsed: boolean; 
}) => {
  const Icon = item.icon;
  
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group',
        isActive
          ? 'bg-primary text-primary-foreground border-r-2 border-primary'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      <Icon
        className={cn(
          'flex-shrink-0 w-5 h-5',
          collapsed ? 'mx-auto' : 'mr-3',
          isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
        )}
      />
      {!collapsed && (
        <span className="truncate">{item.name}</span>
      )}
    </Link>
  );
});

NavigationItem.displayName = 'NavigationItem';

// Memoized navigation section component
const NavigationSection = memo(({ 
  section, 
  pathname, 
  collapsed 
}: { 
  section: any; 
  pathname: string; 
  collapsed: boolean; 
}) => {
  return (
    <div>
      {!collapsed && (
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          {section.title}
        </h3>
      )}
      <ul className="space-y-1">
        {section.items.map((item: any) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <NavigationItem 
                item={item} 
                isActive={isActive} 
                collapsed={collapsed} 
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
});

NavigationSection.displayName = 'NavigationSection';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);
  const sidebarClasses = useMemo(() => cn(
    'bg-card border-r border-border transition-all duration-300 flex flex-col',
    collapsed ? 'w-16' : 'w-64'
  ), [collapsed]);

  // Don't show sidebar on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <div className={sidebarClasses}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-foreground">CRM Pro</h1>
          )}
          <button
            onClick={toggleCollapsed}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-6">
        {navigationItems.map((section) => (
          <NavigationSection 
            key={section.title} 
            section={section} 
            pathname={pathname} 
            collapsed={collapsed} 
          />
        ))}
      </nav>
    </div>
  );
}