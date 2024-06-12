'use client'
import { useEffect, useState } from 'react';
const breakpoints: Record<string, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
};
const useBreakpoint = () => {
    const [windowWidth, setWindowWidth] = useState<number | null>(null);
    const [currentBreakpoint, setCurrentBreakpoint] = useState<string | null>(null);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            const breakpoint = Object.keys(breakpoints).find(
                (key) => window.innerWidth < breakpoints[key as keyof typeof breakpoints]
            );
            setCurrentBreakpoint(breakpoint || 'xl');
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return currentBreakpoint;
};

export default useBreakpoint;
