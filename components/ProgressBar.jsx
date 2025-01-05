"use client";
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show progress bar and start progress
    setIsVisible(true);
    setProgress(0);
    
    const timer = setTimeout(() => {
      setProgress(100);
      
      // Hide the bar after animation completes
      setTimeout(() => {
        setIsVisible(false);
      }, 200);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div 
        className="h-1 bg-blue-500 transition-all duration-200 ease-out"
        style={{ 
          width: `${progress}%`,
          transition: progress === 100 ? 'width 200ms ease-out' : 'width 2000ms ease-in'
        }}
      />
    </div>
  );
};

export default ProgressBar;