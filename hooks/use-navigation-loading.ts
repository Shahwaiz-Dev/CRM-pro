'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '@/components/performance/LoadingProvider';

export function useNavigationLoading() {
  const { showLoading, hideLoading } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show loading when navigation starts
    showLoading('Loading page...');
    
    // Hide loading after a short delay to allow page to render
    const timer = setTimeout(() => {
      hideLoading();
    }, 500);

    return () => {
      clearTimeout(timer);
      hideLoading();
    };
  }, [pathname, searchParams, showLoading, hideLoading]);
} 