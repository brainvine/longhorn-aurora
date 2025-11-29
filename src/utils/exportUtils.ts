export function exportToPNG(canvas: HTMLCanvasElement, filename = 'longhorn-aurora.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export interface ExportOptions {
  speed: number;
  hueShift: number;
  saturation: number;
}

export function exportToHTML(options: ExportOptions) {
  const html = generateStandaloneHTML(options);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'longhorn-aurora.html';
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

function generateStandaloneHTML(options: ExportOptions): string {
  const { speed, hueShift, saturation } = options;

  // Build filter string
  const filters: string[] = [];
  if (hueShift !== 0) filters.push(`hue-rotate(${hueShift}deg)`);
  if (saturation !== 100) filters.push(`saturate(${saturation}%)`);
  const filterStr = filters.length > 0 ? filters.join(' ') : 'none';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Longhorn Aurora</title>
    <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; background: #000; overflow: hidden; }
        canvas { display: block; width: 100%; height: 100%; }
        .watermark {
            position: fixed;
            bottom: 2%;
            right: 7.5%;
            color: #FFFFFF;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-size: 8pt;
            text-align: right;
            line-height: 1.5;
            pointer-events: none;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        .watermark .bold { font-weight: bold; }
    </style>
</head>
<body>
<canvas id="c"></canvas>
<div class="watermark">
    <div class="bold">Windows Code Name "Longhorn"</div>
    <div>For testing purposes only. Build 4050.private/lab06_demo.031013-1849</div>
    <div>&copy;, &trade; Microsoft Corp. All rights reserved. User interface is &trade; and trade dress of Microsoft Corp.</div>
</div>
<script>
const SPEED=${speed};
const FILTER="${filterStr}";
const c=document.getElementById('c'),x=c.getContext('2d'),W=800,H=600;
function h2r(h){if(!h.startsWith('#'))return h;let v=h.slice(1);if(v.length===8){let a=parseInt(v.slice(0,2),16)/255,r=parseInt(v.slice(2,4),16),g=parseInt(v.slice(4,6),16),b=parseInt(v.slice(6,8),16);return\`rgba(\${r},\${g},\${b},\${a})\`}return h}
function av(t,d,f,to,ar=true){if(d===0)return to;let p;if(ar){let cy=d*2,m=t%cy;p=m<d?m/d:1-(m-d)/d}else p=(t%d)/d;return f+(to-f)*p}
function cg(b,s,e,st){let g=x.createLinearGradient(b.x+b.w*s.x,b.y+b.h*s.y,b.x+b.w*e.x,b.y+b.h*e.y);st.forEach(s=>g.addColorStop(Math.max(0,Math.min(1,s.o)),h2r(s.c)));return g}
const P={f:new Path2D("M 0 0 L 802 0 L 802 603 L 0 603 Z"),r7:new Path2D("M 0 0 L 61 0 L 61 426 L 0 426 Z"),p4:new Path2D("M 9.69 0 C 0.64 53.14 -2.18 106.47 1.69 160"),r17:new Path2D("M 0 0 L 107.80 0 L 107.80 432.10 L 0 432.10 Z"),r3:new Path2D("M 0 0 L 516.96 0 L 516.96 164.00 L 0 164.00 Z"),r1:new Path2D("M 0 8.01 C 263.35 -2.65 530.64 -2.68 802 8.01 L 802 185.00 L 0 185.00 Z"),r4:new Path2D("M 0 0 L 802 0 L 802 212.55 L 0 212.55 Z"),
r16:new Path2D("M 0.61 0 L 162.61 8.37 L 161.99 233.17 L 0 224.79 Z"),r11:new Path2D("M 0 0 L 57.81 0 L 57.81 431 L 0 431 Z"),r6:new Path2D("M 0 0 L 32.57 0 L 32.57 436.93 L 0 436.93 Z"),p8:new Path2D("M 361.96 0 C 400.82 61.96 75.41 695.61 0 770.20")};
function render(t){
x.setTransform(1,0,0,1,0,0);
x.filter=FILTER;
x.fillStyle="#000";x.fillRect(0,0,c.width,c.height);
x.scale(c.width/W,c.height/H);
// Background layers
x.save();x.translate(-0.5,-1.13);x.fillStyle=cg({x:0,y:0,w:802,h:603},{x:0,y:0.5},{x:1,y:0.5},[{c:"#FF675BE6",o:0},{c:"#ADA182EC",o:0.25},{c:"#FF2212CB",o:0.4},{c:"#F4C800A3",o:0.7}]);x.fill(P.f);x.restore();
x.save();x.translate(-0.5,-1.13);x.globalAlpha=av(t,5,0,1);x.fillStyle=cg({x:0,y:0,w:802,h:603},{x:0,y:0.5},{x:1,y:0.5},[{c:"#00000000",o:0},{c:"#FFFF6868",o:0.25},{c:"#00000000",o:0.4},{c:"#FF131028",o:0.7}]);x.fill(P.f);x.restore();
x.save();x.translate(-0.5,-1.13);x.globalAlpha=av(t,6,0,1);x.fillStyle=cg({x:0,y:0,w:802,h:603},{x:0,y:0.5},{x:1,y:0.5},[{c:"#EE000000",o:0},{c:"#00000000",o:0.25},{c:"#FFD400FF",o:0.4},{c:"#00000000",o:0.7}]);x.fill(P.f);x.restore();
x.save();x.translate(-0.5,-1.13);x.fillStyle=cg({x:0,y:0,w:802,h:603},{x:0.5,y:0},{x:0.5,y:1},[{c:"#FF221797",o:0},{c:"#637B72D9",o:0.67},{c:"#BC776DDE",o:0.82},{c:"#FF221797",o:1}]);x.fill(P.f);x.restore();
// Rays Group5
x.save();x.globalAlpha=av(t,4,1,0.1);
x.save();x.translate(370.5,2.86);x.fillStyle=cg({x:0,y:0,w:61,h:426},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#459EACFE",o:0.3},{c:"#5B9EACFE",o:0.71},{c:"#009EACFE",o:1}]);x.fill(P.r7);x.restore();
x.save();x.translate(230.5,-3.13);x.fillStyle=cg({x:0,y:0,w:61,h:426},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#3A9EACFE",o:0.31},{c:"#549EACFE",o:0.84},{c:"#009EACFE",o:1}]);x.fill(P.r7);x.restore();
x.restore();
// Rays Group4
x.save();x.globalAlpha=av(t,3.5,1,0.1);
x.save();x.translate(59.19,213.21);x.translate(81.3,116.58);x.rotate(-5.29*Math.PI/180);x.translate(-81.3,-116.58);x.fillStyle=cg({x:0,y:0,w:163,h:234},{x:-0.2,y:1.14},{x:0.68,y:0.72},[{c:"#009EACFE",o:0},{c:"#B19EACFE",o:0.07},{c:"#2B9EACFE",o:0.57},{c:"#009EACFE",o:0.7}]);x.fill(P.r16);x.restore();
x.save();x.translate(633.68,9.86);x.translate(28.9,215.5);x.rotate(0.96*Math.PI/180);x.translate(-28.9,-215.5);x.fillStyle=cg({x:0,y:0,w:57.81,h:431},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#2F9EACFE",o:0.27},{c:"#2B9EACFE",o:0.69},{c:"#009EACFE",o:1}]);x.fill(P.r11);x.restore();
x.restore();
// Group3
x.save();x.globalAlpha=av(t,3,1,0);
x.save();x.translate(430.49,-10.21);x.translate(16.28,218.46);x.rotate(1.76*Math.PI/180);x.translate(-16.28,-218.46);x.fillStyle=cg({x:0,y:0,w:32.57,h:436.93},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#549EACFE",o:0.53},{c:"#009EACFE",o:1}]);x.fill(P.r6);x.restore();
x.save();x.translate(124.72,-12.49);x.fillStyle=cg({x:0,y:0,w:57.63,h:432.1},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#3A9EACFE",o:0.29},{c:"#3D9EACFE",o:0.67},{c:"#009EACFE",o:1}]);x.fill(P.r11);x.restore();
x.restore();
// Group1
x.save();x.globalAlpha=av(t,2.5,0.6,0.2);
x.save();x.translate(290.5,-8.49);x.translate(53.9,216.05);x.rotate(4.46*Math.PI/180);x.translate(-53.9,-216.05);x.fillStyle=cg({x:0,y:0,w:107.8,h:432.1},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#759EACFE",o:0.29},{c:"#549EACFE",o:0.67},{c:"#009EACFE",o:1}]);x.fill(P.r17);x.restore();
x.save();x.translate(633.82,-7.1);x.translate(28.9,223.98);x.rotate(0.96*Math.PI/180);x.translate(-28.9,-223.98);x.fillStyle=cg({x:0,y:0,w:57.81,h:447.96},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#0D9EACFE",o:0.27},{c:"#119EACFE",o:0.69},{c:"#009EACFE",o:1}]);x.fill(P.r11);x.restore();
x.restore();
// MovingRays
x.save();let mx=av(t,20,0,200,false);x.translate(mx,0);x.globalAlpha=av(t,10,0,1);
x.save();x.translate(370.5,2.86);x.fillStyle=cg({x:0,y:0,w:61,h:426},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#459EACFE",o:0.3},{c:"#5B9EACFE",o:0.71},{c:"#009EACFE",o:1}]);x.fill(P.r7);x.restore();
x.restore();
// Foregrounds
x.save();x.translate(0.5,436.86);x.fillStyle=cg({x:0,y:0,w:516.96,h:164},{x:0.055,y:0.55},{x:0.945,y:0.55},[{c:"#FF12127E",o:0},{c:"#0012127E",o:1}]);x.fill(P.r3);x.restore();
x.save();x.translate(-0.5,415.85);x.fillStyle=cg({x:0,y:0,w:802,h:185},{x:0.509,y:0.105},{x:0.491,y:0.995},[{c:"#D212127E",o:0},{c:"#0012127E",o:0.58}]);x.fill(P.r1);x.restore();
x.save();x.translate(-0.5,-0.13);x.fillStyle=cg({x:0,y:0,w:802,h:212.55},{x:0.5,y:0},{x:0.5,y:1},[{c:"#FF23159E",o:0},{c:"#96372AB4",o:0.4},{c:"#005448D4",o:1}]);x.fill(P.r4);x.restore();
// BottomLights
x.save();x.globalAlpha=av(t,6,0.7,0.1);
x.save();x.translate(244.95,100.04);x.translate(182.58,385.1);x.rotate(121.98*Math.PI/180);x.scale(-0.99,0.99);x.translate(-182.58,-385.1);x.fillStyle=cg({x:0,y:0,w:361.96,h:770.2},{x:0.461,y:0.519},{x:0.559,y:0.541},[{c:"#00B9C3FE",o:0.14},{c:"#3D9EACFE",o:0.66},{c:"#00B9C3FE",o:1}]);x.fill(P.p8);x.restore();
x.save();x.translate(225.34,95.3);x.translate(182.58,385.1);x.rotate(-60.57*Math.PI/180);x.scale(0.99,-0.99);x.translate(-182.58,-385.1);x.fillStyle=cg({x:0,y:0,w:361.96,h:770.2},{x:0.461,y:0.519},{x:0.559,y:0.541},[{c:"#00B9C3FE",o:0.08},{c:"#3D9EACFE",o:0.52},{c:"#00B9C3FE",o:0.93}]);x.fill(P.p8);x.restore();
x.restore();
x.filter='none';
}
function resize(){c.width=innerWidth;c.height=innerHeight}
addEventListener('resize',resize);resize();
let start=0;
(function loop(ts){if(!start)start=ts;render((ts-start)/1000*SPEED);requestAnimationFrame(loop)})();
</script>
</body>
</html>`;
}

// Simple WebM video recording using MediaRecorder API
interface VideoRecorderOptions {
  canvas: HTMLCanvasElement;
  duration: number;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export function recordVideo({
  canvas,
  duration,
  onProgress,
  onComplete,
}: VideoRecorderOptions): void {
  const stream = canvas.captureStream(30);

  // Try VP9 first, fallback to VP8 or default
  let mimeType = 'video/webm;codecs=vp9';
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    mimeType = 'video/webm;codecs=vp8';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm';
    }
  }

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 5000000,
  });

  const chunks: Blob[] = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'longhorn-aurora.webm';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);

    if (onComplete) {
      onComplete();
    }
  };

  mediaRecorder.start();

  const startTime = Date.now();
  const checkProgress = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / (duration * 1000), 1);

    if (onProgress) {
      onProgress(progress);
    }

    if (progress < 1) {
      requestAnimationFrame(checkProgress);
    }
  };
  checkProgress();

  setTimeout(() => {
    mediaRecorder.stop();
  }, duration * 1000);
}
