'use client';

import { useEffect, useRef } from 'react';

export function TransitionBand() {
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bandRef.current) return;

      const scrolled = window.scrollY;
      const bandTop = bandRef.current.offsetTop;
      const windowHeight = window.innerHeight;

      // Calculate parallax effect
      if (scrolled + windowHeight > bandTop) {
        const offset = (scrolled + windowHeight - bandTop) * 0.5;
        bandRef.current.style.backgroundPositionX = `${offset}px`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={bandRef}
      className="relative h-32 overflow-hidden bg-gradient-to-b from-white via-wellco-neutral/50 to-white"
      style={{
        backgroundSize: '200% 100%',
        backgroundPosition: '0% 0%',
      }}
    >
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-wellco-accent-vibrant/3 via-wellco-accent-magenta/5 to-wellco-accent-vibrant/3 animate-gradient" />

      {/* Floating shapes - very subtle */}
      <div className="absolute inset-0 opacity-10">
        {/* Shape 1 */}
        <div
          className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-wellco-primary/20 blur-2xl animate-float-slow"
        />

        {/* Shape 2 */}
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 rounded-full bg-wellco-accent-vibrant/20 blur-2xl animate-float-medium"
        />

        {/* Shape 3 */}
        <div
          className="absolute bottom-1/4 left-1/2 w-12 h-12 rounded-full bg-wellco-accent-magenta/20 blur-2xl animate-float-fast"
        />
      </div>

      {/* Decorative lines - more subtle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-wellco-accent-vibrant/15 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center mt-4">
        <div className="w-4/5 h-px bg-gradient-to-r from-transparent via-wellco-primary/10 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center -mt-4">
        <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-wellco-accent-magenta/12 to-transparent" />
      </div>
    </div>
  );
}
