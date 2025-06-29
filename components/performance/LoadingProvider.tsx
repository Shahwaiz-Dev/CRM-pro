'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PageLoader } from './PageLoader';

interface LoadingContextType {
  isLoading: boolean;
  showLoading: (text?: string) => void;
  hideLoading: () => void;
  loadingText: string;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');

  const showLoading = useCallback((text = 'Loading...') => {
    setLoadingText(text);
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingText('Loading...');
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading, loadingText }}>
      {children}
      {isLoading && <PageLoader text={loadingText} />}
    </LoadingContext.Provider>
  );
} 