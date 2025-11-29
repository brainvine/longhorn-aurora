import { useState } from 'react';
import { COLOR_THEMES } from '../utils/auroraRenderer';
import type { ColorTheme } from '../utils/auroraRenderer';

interface ControlPanelProps {
  showWatermark: boolean;
  onWatermarkChange: (show: boolean) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  theme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
  hueShift: number;
  onHueShiftChange: (hue: number) => void;
  saturation: number;
  onSaturationChange: (sat: number) => void;
  onExportPNG: () => void;
  onExportHTML: () => void;
  onExportVideo: () => void;
  isRecording: boolean;
}

export function ControlPanel({
  showWatermark,
  onWatermarkChange,
  speed,
  onSpeedChange,
  theme,
  onThemeChange,
  hueShift,
  onHueShiftChange,
  saturation,
  onSaturationChange,
  onExportPNG,
  onExportHTML,
  onExportVideo,
  isRecording,
}: ControlPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const glassStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
    `,
  };

  const buttonStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 0.9)',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: '"Segoe UI", system-ui, sans-serif',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)',
  };

  const buttonHoverStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const labelStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '11px',
    fontFamily: '"Segoe UI", system-ui, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '6px',
    display: 'block',
  };

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    height: '4px',
    borderRadius: '2px',
    background: 'rgba(255, 255, 255, 0.15)',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        ...glassStyle,
        padding: isExpanded ? '20px' : '12px',
        minWidth: isExpanded ? '280px' : 'auto',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isHovered ? 1 : 0.85,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: isExpanded ? '16px' : 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isRecording
                ? '#ff4444'
                : `linear-gradient(135deg, ${theme.rays}, ${theme.accent})`,
              boxShadow: isRecording
                ? '0 0 8px #ff4444'
                : `0 0 8px ${theme.rays}`,
              animation: isRecording ? 'pulse 1s infinite' : 'none',
            }}
          />
          {isExpanded && (
            <span
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '13px',
                fontFamily: '"Segoe UI", system-ui, sans-serif',
                fontWeight: 500,
              }}
            >
              Aurora Controls
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Watermark Toggle */}
          <div>
            <label style={labelStyle}>Watermark</label>
            <ToggleSwitch checked={showWatermark} onChange={onWatermarkChange} />
          </div>

          {/* Speed Slider */}
          <div>
            <label style={labelStyle}>Speed: {speed.toFixed(1)}x</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={speed}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Theme Selector */}
          <div>
            <label style={labelStyle}>Color Theme</label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
              }}
            >
              {COLOR_THEMES.map((t) => (
                <ThemeButton
                  key={t.id}
                  theme={t}
                  isActive={t.id === theme.id}
                  onClick={() => onThemeChange(t)}
                />
              ))}
            </div>
          </div>

          {/* Hue/Saturation Controls */}
          <div>
            <label style={labelStyle}>Color Adjustments</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ ...labelStyle, marginBottom: 0, fontSize: '10px' }}>Hue</span>
                  <span style={{ ...labelStyle, marginBottom: 0, fontSize: '10px' }}>{hueShift}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={hueShift}
                  onChange={(e) => onHueShiftChange(parseInt(e.target.value))}
                  style={{
                    ...sliderStyle,
                    background: `linear-gradient(to right,
                      hsl(0, 80%, 60%),
                      hsl(60, 80%, 60%),
                      hsl(120, 80%, 60%),
                      hsl(180, 80%, 60%),
                      hsl(240, 80%, 60%),
                      hsl(300, 80%, 60%),
                      hsl(360, 80%, 60%)
                    )`,
                  }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ ...labelStyle, marginBottom: 0, fontSize: '10px' }}>Saturation</span>
                  <span style={{ ...labelStyle, marginBottom: 0, fontSize: '10px' }}>{saturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="1"
                  value={saturation}
                  onChange={(e) => onSaturationChange(parseInt(e.target.value))}
                  style={{
                    ...sliderStyle,
                    background: `linear-gradient(to right,
                      hsl(${hueShift}, 0%, 50%),
                      hsl(${hueShift}, 100%, 50%)
                    )`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Export Section */}
          <div>
            <label style={labelStyle}>Export</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <HoverButton style={buttonStyle} hoverStyle={buttonHoverStyle} onClick={onExportPNG}>
                PNG
              </HoverButton>
              <HoverButton style={buttonStyle} hoverStyle={buttonHoverStyle} onClick={onExportHTML}>
                HTML
              </HoverButton>
              <HoverButton
                style={{
                  ...buttonStyle,
                  opacity: isRecording ? 0.5 : 1,
                }}
                hoverStyle={buttonHoverStyle}
                onClick={onExportVideo}
                disabled={isRecording}
              >
                {isRecording ? 'Rec...' : 'Video'}
              </HoverButton>
            </div>
          </div>
        </div>
      )}

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          transition: transform 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        background: checked ? 'rgba(100, 200, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: 0,
      }}
    >
      <div
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      />
    </button>
  );
}

interface ThemeButtonProps {
  theme: ColorTheme;
  isActive: boolean;
  onClick: () => void;
}

function ThemeButton({ theme, isActive, onClick }: ThemeButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={theme.name}
      style={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: '8px',
        border: isActive
          ? '2px solid rgba(255, 255, 255, 0.6)'
          : '1px solid rgba(255, 255, 255, 0.15)',
        background: `linear-gradient(135deg, ${theme.rays}, ${theme.accent})`,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isActive
          ? `0 0 12px ${theme.rays}40`
          : isHovered
          ? `0 4px 12px rgba(0, 0, 0, 0.3)`
          : 'none',
      }}
    />
  );
}

interface HoverButtonProps {
  children: React.ReactNode;
  style: React.CSSProperties;
  hoverStyle: React.CSSProperties;
  onClick: () => void;
  disabled?: boolean;
}

function HoverButton({ children, style, hoverStyle, onClick, disabled }: HoverButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      style={isHovered && !disabled ? hoverStyle : style}
    >
      {children}
    </button>
  );
}
