/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

/**
 * Hook to add scroll-based reveal animations using native IntersectionObserver.
 * Adds 'visible' class to elements with 'reveal' class when they enter viewport.
 *
 * Usage:
 * 1. Import and call useScrollAnimation() in your component
 * 2. Add 'reveal' class to elements that should animate in
 * 3. Optionally add 'reveal-delay-1' through 'reveal-delay-4' for staggered effects
 */
export function useScrollAnimation(containerRef?: React.RefObject<HTMLElement>) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after reveal (one-time animation)
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters
        threshold: 0.1 // 10% of element visible
      }
    );

    // Get container or document
    const container = containerRef?.current || document;

    // Observe all elements with 'reveal' class
    const revealElements = container.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Cleanup
    return () => {
      observerRef.current?.disconnect();
    };
  }, [containerRef]);
}

/**
 * Hook to track scroll position and update CSS custom property for parallax effects.
 * Updates --scroll-y on document root for CSS-based parallax.
 */
export function useParallaxScroll() {
  useEffect(() => {
    let ticking = false;

    const updateScrollY = () => {
      document.documentElement.style.setProperty('--scroll-y', String(window.scrollY));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollY);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial value
    updateScrollY();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}

export default useScrollAnimation;
