'use client';

import { memo } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';

interface SectionLoaderProps {
  type?: 'spinner' | 'skeleton';
  rows?: number;
  className?: string;
  text?: string;
}

const SectionLoader = memo(({ 
  type = 'spinner',
  rows = 3,
  className,
  text = 'Loading data...'
}: SectionLoaderProps) => {
  if (type === 'skeleton') {
    return (
      <div className={className}>
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <LoadingSpinner text={text} />
    </div>
  );
});

SectionLoader.displayName = 'SectionLoader';

export { SectionLoader }; 