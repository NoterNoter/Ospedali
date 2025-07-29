'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { usePageTransition } from '@/contexts/PageTransitionContext';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const isFirstLoad = useRef(true);
  const { setIsTransitioning: setGlobalTransitioning } = usePageTransition();

  useEffect(() => {
    // Skip transition on first load
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    setIsTransitioning(true);
    setGlobalTransitioning(true);
    setShowContent(false);
    
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, 600); // Show content after columns animate in
    
    const hideTimer = setTimeout(() => {
      setIsTransitioning(false);
      setGlobalTransitioning(false);
    }, 1200); // Total transition duration

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname, setGlobalTransitioning]);

  const columnVariants = {
    initial: {
      scaleY: 0,
      originY: 0
    },
    animate: {
      scaleY: 1,
      originY: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      scaleY: 0,
      originY: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={pathname + '-transition'}
            className="fixed inset-0 z-[100] pointer-events-none"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute top-0 bottom-0 bg-blu"
                style={{
                  left: `${index * 20}%`,
                  width: '20%'
                }}
                variants={columnVariants}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={showContent ? 'opacity-100' : 'opacity-0'}>
        {children}
      </div>
    </>
  );
}