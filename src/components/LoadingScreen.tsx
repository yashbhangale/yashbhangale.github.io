"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { motion } from "framer-motion";

// Create context for loading state
const LoadingContext = createContext<{ isLoading: boolean }>({ isLoading: true });

// Custom hook to use loading context
export const useLoading = () => useContext(LoadingContext);

// Loading Provider component
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    const startTime = Date.now();
    const minDuration = 3000; // 3 seconds minimum (reduced from 5000)

    // Simulate loading progress
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= minDuration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("hasVisited", "true");
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function LoadingScreen() {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const startTime = Date.now();
    const minDuration = 3000; // 3 seconds minimum

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const elapsed = Date.now() - startTime;
        const targetProgress = Math.min((elapsed / minDuration) * 100, 100);
        
        if (elapsed >= minDuration && prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        
        // Smoothly approach target progress
        return prev + (targetProgress - prev) * 0.1 + Math.random() * 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-background flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        {/* Japanese Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-2xl md:text-3xl font-light text-foreground mb-2">
            七転び八起き
          </h1>
          <p className="text-sm md:text-base text-muted-foreground italic">
            &ldquo;Nanakorobi yaoki&rdquo;
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Fall seven times, rise eight times
          </p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-foreground rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Loading Text */}
          <motion.p
            className="text-sm text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Loading...
          </motion.p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center space-x-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-muted-foreground rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
} 