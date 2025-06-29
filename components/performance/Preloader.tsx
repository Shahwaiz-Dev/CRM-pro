'use client';

import { useEffect } from 'react';

export function Preloader() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preload chart components
      const chartModules = [
        () => import('@/components/charts/SalesChart'),
        () => import('@/components/charts/InventoryChart'),
      ];

      // Preload layout components
      const layoutModules = [
        () => import('@/components/layout/sidebar'),
        () => import('@/components/layout/header'),
      ];

      // Preload all modules in background
      setTimeout(() => {
        chartModules.forEach(module => module());
        layoutModules.forEach(module => module());
      }, 1000); // Delay to not block initial render
    };

    preloadResources();
  }, []);

  return null; // This component doesn't render anything
} 