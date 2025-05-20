"use client";

/**
 * Prevents the application from being minimized below a certain width on desktop devices
 * This script runs on the client side to enforce minimum width constraints
 */
export function preventMinimize() {
  // Only run on client side
  if (typeof window === 'undefined') return;

  // Function to enforce minimum width
  const enforceMinWidth = () => {
    // Check if we're on a desktop device (using a simple check for screen width)
    const isDesktop = window.innerWidth >= 1024 || window.screen.width >= 1024;
    
    if (isDesktop) {
      // If window is resized below minimum width, enforce the minimum width
      if (window.innerWidth < 1024) {
        document.body.style.minWidth = '1024px';
        document.documentElement.style.minWidth = '1024px';
      } else {
        // Reset if window is larger than minimum
        document.body.style.minWidth = '';
        document.documentElement.style.minWidth = '';
      }
    }
  };

  // Add event listeners
  window.addEventListener('resize', enforceMinWidth);
  window.addEventListener('load', enforceMinWidth);
  
  // Initial check
  enforceMinWidth();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', enforceMinWidth);
    window.removeEventListener('load', enforceMinWidth);
  };
}
