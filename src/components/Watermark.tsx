interface WatermarkProps {
  visible: boolean;
}

export function Watermark({ visible }: WatermarkProps) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2%',
        right: '7.5%',
        color: '#FFFFFF',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '8pt',
        textAlign: 'right',
        lineHeight: 1.5,
        pointerEvents: 'none',
        zIndex: 10,
        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ fontWeight: 'bold' }}>Windows Code Name "Longhorn"</div>
      <div>For testing purposes only. Build 4050.private/lab06_demo.031013-1849</div>
      <div>
        &copy;, &trade; Microsoft Corp. All rights reserved. User interface is &trade; and trade
        dress of Microsoft Corp.
      </div>
    </div>
  );
}
