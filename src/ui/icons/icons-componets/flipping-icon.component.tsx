'use client';
import { useState, useRef, useEffect, PropsWithChildren } from 'react';

function FlippingIcon({ children }: PropsWithChildren) {
  const [flipDirection, setFlipDirection] = useState(1); // 1 for normal, -1 for flipped
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!iconRef.current) return;

      // Get icon's center position
      const iconRect = iconRef.current.getBoundingClientRect();
      const iconCenterX = iconRect.left + iconRect.width / 2;

      // Determine if cursor is left or right of center
      const isOnLeftSide = e.clientX < iconCenterX;

      // Set flip direction
      setFlipDirection(isOnLeftSide ? -1 : 1);
    };

    // Add mousemove listener to track cursor
    document.addEventListener('mousemove', handleMouseMove);

    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={iconRef} style={{ display: 'inline-block' }}>
      <div
        style={{
          transform: `scaleX(${flipDirection})`,
          transition: 'transform 0.2s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default FlippingIcon;
