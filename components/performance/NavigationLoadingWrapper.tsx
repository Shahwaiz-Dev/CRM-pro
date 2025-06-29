'use client';

import { ReactNode } from 'react';
import { useNavigationLoading } from '@/hooks/use-navigation-loading';

interface NavigationLoadingWrapperProps {
  children: ReactNode;
}

export function NavigationLoadingWrapper({ children }: NavigationLoadingWrapperProps) {
  useNavigationLoading();
  
  return <>{children}</>;
} 