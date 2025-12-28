/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SoftworksLogoProps {
  className?: string;
  size?: number | string;
}

/**
 * 2D single-color Softworks "S" logo
 * Uses currentColor to adapt to light/dark themes
 * Simplified geometric interpretation of the 3D cube logo
 */
const SoftworksLogo: React.FC<SoftworksLogoProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Isometric S made of cube shapes - simplified 2D */}
      <g fill="currentColor">
        {/* Top row cubes */}
        <path d="M20 8L32 2L44 8L32 14L20 8Z" />
        <path d="M32 14L44 8V16L32 22V14Z" opacity="0.7" />
        <path d="M20 8V16L32 22V14L20 8Z" opacity="0.5" />

        {/* Second row - left side */}
        <path d="M8 16L20 10L32 16L20 22L8 16Z" />
        <path d="M20 22L32 16V24L20 30V22Z" opacity="0.7" />
        <path d="M8 16V24L20 30V22L8 16Z" opacity="0.5" />

        {/* Middle connector */}
        <path d="M20 28L32 22L44 28L32 34L20 28Z" />
        <path d="M32 34L44 28V36L32 42V34Z" opacity="0.7" />
        <path d="M20 28V36L32 42V34L20 28Z" opacity="0.5" />

        {/* Second to last row - right side */}
        <path d="M32 40L44 34L56 40L44 46L32 40Z" />
        <path d="M44 46L56 40V48L44 54V46Z" opacity="0.7" />
        <path d="M32 40V48L44 54V46L32 40Z" opacity="0.5" />

        {/* Bottom row cubes */}
        <path d="M20 50L32 44L44 50L32 56L20 50Z" />
        <path d="M32 56L44 50V58L32 64V56Z" opacity="0.7" />
        <path d="M20 50V58L32 64V56L20 50Z" opacity="0.5" />
      </g>
    </svg>
  );
};

export default SoftworksLogo;
