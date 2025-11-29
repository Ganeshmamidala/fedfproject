import React, { useEffect, useState } from 'react';

const PageTransition = ({ children, transitionKey, mode = 'fade-slide' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [direction, setDirection] = useState('forward');

  useEffect(() => {
    // Determine direction based on transition key changes
    setDirection('forward');
    
    // Fade out
    setIsVisible(false);

    // Wait for fade out, then update content and fade in
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [transitionKey, children]);

  // Initial mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getTransitionClasses = () => {
    const baseClasses = 'transition-all duration-500 ease-in-out';
    
    switch (mode) {
      case 'fade':
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      
      case 'fade-slide':
        return `${baseClasses} ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-6 scale-98'
        }`;
      
      case 'slide':
        return `${baseClasses} ${
          isVisible 
            ? 'translate-x-0 opacity-100' 
            : direction === 'forward' 
              ? 'translate-x-8 opacity-0' 
              : '-translate-x-8 opacity-0'
        }`;
      
      case 'zoom':
        return `${baseClasses} ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`;
      
      default:
        return `${baseClasses} ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`;
    }
  };

  return (
    <div className={getTransitionClasses()}>
      {displayChildren}
    </div>
  );
};

export default PageTransition;
