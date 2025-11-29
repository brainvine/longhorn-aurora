import { useEffect, useRef, useCallback } from 'react';
import { render } from '../utils/auroraRenderer';
import type { RenderOptions, ColorTheme } from '../utils/auroraRenderer';

interface AuroraCanvasProps {
  speed: number;
  theme: ColorTheme;
  hueShift: number;
  saturation: number;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export function AuroraCanvas({ speed, theme, hueShift, saturation, canvasRef: externalRef }: AuroraCanvasProps) {
  const internalRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = externalRef || internalRef;
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const time = (timestamp - startTimeRef.current) / 1000;
    const options: RenderOptions = { speed, theme, hueShift, saturation };

    render(ctx, canvas, time, options);
    animationRef.current = requestAnimationFrame(animate);
  }, [speed, theme, hueShift, saturation, canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
}
