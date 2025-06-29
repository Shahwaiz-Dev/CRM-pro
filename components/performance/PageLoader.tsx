'use client';

import { memo } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Building2 } from 'lucide-react';

interface PageLoaderProps {
  text?: string;
  showLogo?: boolean;
}

const PageLoader = memo(({ 
  text = 'Loading your dashboard...',
  showLogo = true 
}: PageLoaderProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-6 p-8">
        {showLogo && (
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">CRM Pro</h1>
          </div>
        )}
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  );
});

PageLoader.displayName = 'PageLoader';

export { PageLoader }; 