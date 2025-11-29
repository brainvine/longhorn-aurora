import { useState, useRef, useCallback } from 'react';
import { AuroraCanvas } from './components/AuroraCanvas';
import { ControlPanel } from './components/ControlPanel';
import { Watermark } from './components/Watermark';
import { COLOR_THEMES } from './utils/auroraRenderer';
import type { ColorTheme } from './utils/auroraRenderer';
import { exportToPNG, exportToHTML, recordVideo } from './utils/exportUtils';

function App() {
  const [showWatermark, setShowWatermark] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const [theme, setTheme] = useState<ColorTheme>(COLOR_THEMES[0]);
  const [hueShift, setHueShift] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [isRecording, setIsRecording] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleExportPNG = useCallback(() => {
    if (canvasRef.current) {
      exportToPNG(canvasRef.current);
    }
  }, []);

  const handleExportHTML = useCallback(() => {
    exportToHTML({ speed, hueShift, saturation });
  }, [speed, hueShift, saturation]);

  const handleExportVideo = useCallback(() => {
    if (canvasRef.current && !isRecording) {
      setIsRecording(true);
      recordVideo({
        canvas: canvasRef.current,
        duration: 5,
        onComplete: () => setIsRecording(false),
      });
    }
  }, [isRecording]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <AuroraCanvas
        speed={speed}
        theme={theme}
        hueShift={hueShift}
        saturation={saturation}
        canvasRef={canvasRef}
      />
      <Watermark visible={showWatermark} />
      <ControlPanel
        showWatermark={showWatermark}
        onWatermarkChange={setShowWatermark}
        speed={speed}
        onSpeedChange={setSpeed}
        theme={theme}
        onThemeChange={setTheme}
        hueShift={hueShift}
        onHueShiftChange={setHueShift}
        saturation={saturation}
        onSaturationChange={setSaturation}
        onExportPNG={handleExportPNG}
        onExportHTML={handleExportHTML}
        onExportVideo={handleExportVideo}
        isRecording={isRecording}
      />

      {/* GitHub link - subtle in bottom left */}
      <a
        href="https://github.com/brainvine/longhorn-aurora"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          color: 'rgba(255, 255, 255, 0.4)',
          textDecoration: 'none',
          fontSize: '12px',
          fontFamily: '"Segoe UI", system-ui, sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'color 0.2s',
          zIndex: 100,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        View on GitHub
      </a>
    </div>
  );
}

export default App;
