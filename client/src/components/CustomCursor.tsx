import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('interactive') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      />

      {/* Glow effect on hover */}
      {isHovering && (
        <motion.div
          className="fixed w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full pointer-events-none z-40"
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
        />
      )}

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none;
        }
      `}</style>
    </>
  );
}
