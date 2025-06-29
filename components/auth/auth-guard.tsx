'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Ensure component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Add a small delay to allow login to complete
    const timer = setTimeout(() => {
      const checkAuth = () => {
        // Check if we're in the browser before accessing localStorage
        if (typeof window === 'undefined') {
          return;
        }
        
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!isLoggedIn && pathname !== '/login') {
          router.push('/login');
        } else if (isLoggedIn && pathname === '/login') {
          router.push('/');
        } else {
          setIsAuthenticated(isLoggedIn);
        }
      };

      checkAuth();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, router, mounted]);

  // Show loading only during initial mount
  if (!mounted) {
    return null;
  }

  // Always render children - let the individual pages handle their own logic
  return <>{children}</>;
}