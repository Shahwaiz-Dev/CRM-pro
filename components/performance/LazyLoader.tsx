'use client';

import { Suspense, lazy, ComponentType } from 'react';

interface LazyLoaderProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  [key: string]: any;
}

const defaultFallback = (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export function LazyLoader({ 
  component, 
  fallback = defaultFallback, 
  ...props 
}: LazyLoaderProps) {
  const LazyComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Predefined lazy components for common use cases
export const LazyChart = lazy(() => import('@/components/charts/SalesChart'));
export const LazyInventoryChart = lazy(() => import('@/components/charts/InventoryChart'));

// Lazy loading wrapper for heavy components
export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode
) {
  return function LazyWrapper(props: T) {
    return (
      <Suspense fallback={fallback || defaultFallback}>
        <Component {...props} />
      </Suspense>
    );
  };
} 