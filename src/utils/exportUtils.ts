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
  showWatermark: boolean;
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
  const { speed, hueShift, saturation, showWatermark } = options;

  // Build filter string
  const filters: string[] = [];
  if (hueShift !== 0) filters.push(`hue-rotate(${hueShift}deg)`);
  if (saturation !== 100) filters.push(`saturate(${saturation}%)`);
  const filterStr = filters.length > 0 ? filters.join(' ') : 'none';

  // Watermark HTML (only include if showWatermark is true)
  const watermarkHTML = showWatermark ? `<div class="watermark">
    <div class="bold">Windows Code Name "Longhorn"</div>
    <div>For testing purposes only. Build 4050.private/lab06_demo.031013-1849</div>
    <div>&copy;, &trade; Microsoft Corp. All rights reserved. User interface is &trade; and trade dress of Microsoft Corp.</div>
</div>` : '';

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
            bottom: 20px;
            right: 20px;
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
${watermarkHTML}
<script>
const SPEED=${speed};
const FILTER="${filterStr}";
const c=document.getElementById('c'),x=c.getContext('2d'),W=800,H=600;
function h2r(h){if(!h.startsWith('#'))return h;let v=h.slice(1);if(v.length===8){let a=parseInt(v.slice(0,2),16)/255,r=parseInt(v.slice(2,4),16),g=parseInt(v.slice(4,6),16),b=parseInt(v.slice(6,8),16);return\`rgba(\${r},\${g},\${b},\${a})\`}return h}
function av(t,d,f,to,ar=true){if(d===0)return to;let p;if(ar){let cy=d*2,m=t%cy;p=m<d?m/d:1-(m-d)/d}else p=(t%d)/d;return f+(to-f)*p}
function cg(b,s,e,st){let g=x.createLinearGradient(b.x+b.w*s.x,b.y+b.h*s.y,b.x+b.w*e.x,b.y+b.h*e.y);st.forEach(s=>g.addColorStop(Math.max(0,Math.min(1,s.o)),h2r(s.c)));return g}
const P={
f:new Path2D("M 0 0 L 802 0 L 802 603 L 0 603 Z"),
r7:new Path2D("M 0 0 L 61 0 L 61 426 L 0 426 Z"),
p4:new Path2D("M 9.69 0 C 0.64 53.14 -2.18 106.47 1.69 160"),
p6c4:new Path2D("M 10.53 0 C -0.60 85.75 -2.66 182.15 3.19 287.87"),
p6c2:new Path2D("M 10.53 0 C -0.60 132.99 -2.66 282.51 3.19 446.47"),
p6c1:new Path2D("M 10.53 0 C -0.60 111.71 -2.66 237.30 3.19 375.02"),
r8c1:new Path2D("M 0 0 L 21.06 0 L 21.06 430.12 L 0 430.12 Z"),
r16:new Path2D("M 0.61 0 L 162.61 8.37 L 161.99 233.17 L 0 224.79 Z"),
p6:new Path2D("M 17.23 0 C -0.98 102.77 -4.36 218.30 5.23 345"),
r11c2:new Path2D("M 0 0 L 57.81 0 L 57.81 431 L 0 431 Z"),
r8:new Path2D("M 0.54 0.58 L 36.59 0 L 36.04 272.11 L 0 272.70 Z"),
r16c1:new Path2D("M 1.10 0 L 292.18 10.45 L 291.07 291.15 L 0 280.69 Z"),
p1:new Path2D("M 89 0 C 31.87 89.58 1.44 209.78 0 365"),
r6c2:new Path2D("M 0 0 L 32.57 0 L 32.57 436.93 L 0 436.93 Z"),
r14c1:new Path2D("M 0 5.51 L 105.41 0 L 120.61 298.07 L 15.19 303.58 Z"),
r17c1:new Path2D("M 0 0 L 57.63 0 L 57.63 432.10 L 0 432.10 Z"),
r6:new Path2D("M 1.99 0 L 25.55 0 L 23.55 431.45 L 0 431.45 Z"),
r11:new Path2D("M 0 0 L 57.81 0 L 57.81 447.96 L 0 447.96 Z"),
r14:new Path2D("M 0 4.93 L 105.41 0 L 120.61 266.64 L 15.19 271.57 Z"),
r17:new Path2D("M 0 0 L 107.80 0 L 107.80 432.10 L 0 432.10 Z"),
p6c5:new Path2D("M 21.01 0 C 2.79 102.77 -5.58 256.30 4.01 382.99"),
r6c1:new Path2D("M 0 0 L 23.94 0 L 26.05 428.14 L 2.10 428.14 Z"),
r10:new Path2D("M 0 0 L 40.14 0.06 L 40.14 396.06 L 0 396 Z"),
r11c1:new Path2D("M 0 0 L 53.42 0 L 53.42 431 L 0 431 Z"),
p2:new Path2D("M 24.39 0 C 4.33 60.95 -3.45 123.60 1.39 188"),
r3:new Path2D("M 0 0 L 516.96 0 L 516.96 164.00 L 0 164.00 Z"),
r1:new Path2D("M 0 8.01 C 263.35 -2.65 530.64 -2.68 802 8.01 L 802 185.00 L 0 185.00 Z"),
r4:new Path2D("M 0 0 L 802 0 L 802 212.55 L 0 212.55 Z"),
p8c3:new Path2D("M 361.96 0 C 400.82 61.96 75.41 695.61 0 770.20"),
p8c1:new Path2D("M 105.08 0 C 88.41 94.60 28.55 211.61 0 258.66"),
p8c9:new Path2D("M 128.31 0 C 93.69 110.82 33.79 246.63 0 301.57"),
p8c10:new Path2D("M 103.66 0 C 83.93 110.48 33.79 250.38 0 305.33"),
p8:new Path2D("M 87.63 0 C 55.64 145.88 32.61 231.90 0 310.56")
};
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
// Group5
x.save();x.globalAlpha=av(t,4,1,0.1);
x.save();x.translate(370.5,2.86);x.fillStyle=cg({x:0,y:0,w:61,h:426},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#459EACFE",o:0.3},{c:"#5B9EACFE",o:0.71},{c:"#009EACFE",o:1}]);x.fill(P.r7);x.restore();
x.save();x.translate(600.8,98.98);x.lineWidth=1.33;x.strokeStyle=cg({x:0,y:0,w:12,h:160},{x:0.5,y:0},{x:0.5,y:1},[{c:"#00675BE6",o:0},{c:"#9E675BE6",o:0.4},{c:"#9EAEA7F2",o:0.75},{c:"#00AEA7F2",o:1}]);x.fillStyle=cg({x:0,y:0,w:12,h:160},{x:-0.21,y:0.49},{x:1.21,y:0.51},[{c:"#CB9991EE",o:0},{c:"#00AEA7F2",o:0.79}]);x.fill(P.p4);x.stroke(P.p4);x.restore();
x.save();x.translate(600.45,-28.78);x.translate(5.26,143.93);x.rotate(-2.51*Math.PI/180);x.scale(0.89,0.8);x.translate(-5.26,-143.93);x.fillStyle=cg({x:0,y:0,w:13,h:288},{x:-0.005,y:0.5},{x:1.565,y:0.5},[{c:"#8C9EACFE",o:0},{c:"#009EACFE",o:0.45}]);x.fill(P.p6c4);x.restore();
x.save();x.translate(230.5,-3.13);x.fillStyle=cg({x:0,y:0,w:61,h:426},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#3A9EACFE",o:0.31},{c:"#549EACFE",o:0.84},{c:"#009EACFE",o:1}]);x.fill(P.r7);x.restore();
x.save();x.translate(534.23,-8.22);x.translate(10.53,215.06);x.rotate(-177.77*Math.PI/180);x.scale(1,0.99);x.translate(-10.53,-215.06);x.fillStyle=cg({x:0,y:0,w:21.06,h:430.12},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#239EACFE",o:0.24},{c:"#279EACFE",o:0.77},{c:"#009EACFE",o:1}]);x.fill(P.r8c1);x.restore();
x.restore();
// Group4
x.save();x.globalAlpha=av(t,3.5,1,0.1);
x.save();x.translate(59.19,213.21);x.translate(81.3,116.58);x.rotate(-5.29*Math.PI/180);x.translate(-81.3,-116.58);x.fillStyle=cg({x:0,y:0,w:163,h:234},{x:-0.2,y:1.14},{x:0.68,y:0.72},[{c:"#009EACFE",o:0},{c:"#B19EACFE",o:0.07},{c:"#2B9EACFE",o:0.57},{c:"#009EACFE",o:0.7}]);x.fill(P.r16);x.restore();
x.save();x.translate(643.26,10.98);x.fillStyle=cg({x:0,y:0,w:17.23,h:345},{x:0,y:0.5},{x:1,y:0.5},[{c:"#8C9EACFE",o:0.01},{c:"#009EACFE",o:0.53}]);x.fill(P.p6);x.restore();
x.save();x.translate(633.68,9.86);x.translate(28.9,215.5);x.rotate(0.96*Math.PI/180);x.scale(1,0.99);x.translate(-28.9,-215.5);x.fillStyle=cg({x:0,y:0,w:57.81,h:431},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#2F9EACFE",o:0.27},{c:"#2B9EACFE",o:0.69},{c:"#009EACFE",o:1}]);x.fill(P.r11c2);x.restore();
x.save();x.translate(552.23,149.4);x.translate(18.29,136.35);x.rotate(-177.77*Math.PI/180);x.scale(1,0.99);x.translate(-18.29,-136.35);x.fillStyle=cg({x:0,y:0,w:36.59,h:272.7},{x:0.265,y:0.166},{x:1.155,y:0.154},[{c:"#009EACFE",o:0},{c:"#279EACFE",o:0.25},{c:"#5B9EACFE",o:0.47},{c:"#009EACFE",o:1}]);x.fill(P.r8);x.restore();
x.save();x.translate(-8.31,155.35);x.translate(146.09,145.57);x.rotate(-5.29*Math.PI/180);x.scale(0.99,1);x.translate(-146.09,-145.57);x.translate(-30,0);x.fillStyle=cg({x:0,y:0,w:292.18,h:291.15},{x:0.136,y:1.334},{x:0.744,y:0.466},[{c:"#009EACFE",o:0},{c:"#B19EACFE",o:0.35},{c:"#499EACFE",o:0.67},{c:"#009EACFE",o:1}]);x.fill(P.r16c1);x.restore();
x.restore();
// Path1 animated
x.save();let p1x=av(t,4,686,700,false);x.translate(p1x,17.98);x.globalAlpha=av(t,2,0,1);x.lineWidth=1.33;x.strokeStyle=cg({x:0,y:0,w:89,h:365},{x:0.5,y:0},{x:0.5,y:1},[{c:"#00675BE6",o:0},{c:"#B8AEA7F2",o:0.12},{c:"#9E675BE6",o:0.77},{c:"#00AEA7F2",o:1}]);x.stroke(P.p1);x.restore();
// Group3
x.save();x.globalAlpha=av(t,3,1,0);
x.save();x.translate(430.49,-10.21);x.translate(16.28,218.46);x.rotate(1.76*Math.PI/180);x.scale(0.99,1);x.translate(-16.28,-218.46);x.fillStyle=cg({x:0,y:0,w:32.57,h:436.93},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#549EACFE",o:0.53},{c:"#009EACFE",o:1}]);x.fill(P.r6c2);x.restore();
x.save();x.translate(159.36,146.9);x.translate(60.3,151.79);x.rotate(181.62*Math.PI/180);x.translate(-60.3,-151.79);x.fillStyle=cg({x:0,y:0,w:120.61,h:303.58},{x:0.305,y:0.137},{x:1.295,y:0.003},[{c:"#009EACFE",o:0},{c:"#FF9EACFE",o:1}]);x.fill(P.r14c1);x.restore();
x.save();x.translate(281.23,149.4);x.translate(18.29,136.35);x.rotate(-177.77*Math.PI/180);x.scale(1,0.99);x.translate(-18.29,-136.35);x.fillStyle=cg({x:0,y:0,w:36.59,h:272.7},{x:0.265,y:0.166},{x:1.155,y:0.154},[{c:"#009EACFE",o:0},{c:"#279EACFE",o:0.25},{c:"#5B9EACFE",o:0.77},{c:"#009EACFE",o:1}]);x.fill(P.r8);x.restore();
x.save();x.translate(124.72,-12.49);x.fillStyle=cg({x:0,y:0,w:57.63,h:432.1},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#3A9EACFE",o:0.29},{c:"#3D9EACFE",o:0.67},{c:"#009EACFE",o:1}]);x.fill(P.r17c1);x.restore();
x.restore();
// Group1
x.save();x.globalAlpha=av(t,2.5,0.6,0.2);
x.save();x.translate(506.01,-8.4);x.translate(12.77,215.72);x.rotate(2.03*Math.PI/180);x.translate(-12.77,-215.72);x.fillStyle=cg({x:0,y:0,w:25.55,h:431.45},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#279EACFE",o:0.53},{c:"#009EACFE",o:1}]);x.fill(P.r6);x.restore();
x.save();x.translate(633.82,-7.1);x.translate(28.9,223.98);x.rotate(0.96*Math.PI/180);x.translate(-28.9,-223.98);x.fillStyle=cg({x:0,y:0,w:57.81,h:447.96},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#0D9EACFE",o:0.27},{c:"#119EACFE",o:0.69},{c:"#009EACFE",o:1}]);x.fill(P.r11);x.restore();
x.save();x.translate(100.38,174.91);x.translate(60.3,135.78);x.rotate(-180.06*Math.PI/180);x.translate(-60.3,-135.78);x.fillStyle=cg({x:0,y:0,w:120.61,h:271.57},{x:0.358,y:0.127},{x:1.342,y:-0.047},[{c:"#009EACFE",o:0},{c:"#5B9EACFE",o:0.34},{c:"#F49EACFE",o:0.92},{c:"#009EACFE",o:1}]);x.fill(P.r14);x.restore();
x.save();x.translate(290.5,-8.49);x.translate(53.9,216.05);x.rotate(4.46*Math.PI/180);x.translate(-53.9,-216.05);x.fillStyle=cg({x:0,y:0,w:107.8,h:432.1},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#759EACFE",o:0.29},{c:"#549EACFE",o:0.67},{c:"#009EACFE",o:1}]);x.fill(P.r17);x.restore();
x.save();x.translate(623.92,-16.86);x.translate(5.26,223.23);x.rotate(-1.31*Math.PI/180);x.scale(0.99,1);x.scale(1,0.8);x.translate(-5.26,-223.23);x.fillStyle=cg({x:0,y:0,w:10.53,h:446.47},{x:-0.005,y:0.5},{x:1.565,y:0.5},[{c:"#8C9EACFE",o:0},{c:"#009EACFE",o:0.45}]);x.fill(P.p6c2);x.restore();
x.save();x.translate(637.48,-24.01);x.fillStyle=cg({x:0,y:0,w:21.01,h:382.99},{x:0,y:0.5},{x:1,y:0.5},[{c:"#CBFFFFFF",o:0},{c:"#009EACFE",o:0.46}]);x.fill(P.p6c5);x.restore();
x.restore();
// Path6_Copy3 animated
x.save();let p6c3x=av(t,7,605,620,false);x.translate(p6c3x,-16.86);x.translate(5.26,223.23);x.rotate(2.51*Math.PI/180);x.scale(-0.99,1);x.translate(-5.26,-223.23);x.globalAlpha=av(t,3.5,0,1);x.fillStyle=cg({x:0,y:0,w:10.53,h:446.47},{x:-0.005,y:0.5},{x:1.565,y:0.5},[{c:"#549EACFE",o:0},{c:"#009EACFE",o:0.45}]);x.fill(P.p6c2);x.restore();
// Group2
x.save();x.globalAlpha=av(t,2.5,0,1);
x.save();x.translate(494.44,-8.25);x.translate(13.02,214.07);x.rotate(1.76*Math.PI/180);x.translate(-13.02,-214.07);x.fillStyle=cg({x:0,y:0,w:26.05,h:428.14},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#419EACFE",o:0.53},{c:"#009EACFE",o:1}]);x.fill(P.r6c1);x.restore();
x.save();x.translate(455.35,32.82);x.translate(20.07,198.03);x.rotate(-179.07*Math.PI/180);x.translate(-20.07,-198.03);x.fillStyle=cg({x:0,y:0,w:40.14,h:396.06},{x:0.13,y:0.151},{x:1.33,y:0.129},[{c:"#009EACFE",o:0},{c:"#159EACFE",o:0.3},{c:"#329EACFE",o:0.84},{c:"#009EACFE",o:1}]);x.fill(P.r10);x.restore();
x.save();x.translate(685.53,2.86);x.translate(26.71,215.5);x.rotate(2.18*Math.PI/180);x.translate(-26.71,-215.5);x.fillStyle=cg({x:0,y:0,w:53.42,h:431},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#2F9EACFE",o:0.25},{c:"#2B9EACFE",o:0.73},{c:"#009EACFE",o:1}]);x.fill(P.r11c1);x.restore();
x.save();let p2x=av(t,5,690,705,false);x.translate(p2x,201.98);x.lineWidth=1.33;x.strokeStyle=cg({x:0,y:0,w:24.39,h:188},{x:0.5,y:0},{x:0.5,y:1},[{c:"#00675BE6",o:0},{c:"#9E675BE6",o:0.4},{c:"#9EAEA7F2",o:0.75},{c:"#00AEA7F2",o:1}]);x.fillStyle=cg({x:0,y:0,w:24.39,h:188},{x:-0.22,y:0.492},{x:0.64,y:0.508},[{c:"#CB9991EE",o:0},{c:"#00AEA7F2",o:0.79}]);x.fill(P.p2);x.stroke(P.p2);x.restore();
x.restore();
// Path6_Copy1 animated
x.save();let p6c1x=av(t,5,630,615,false);x.translate(p6c1x,10.98);x.translate(5.26,187.51);x.scale(1,0.85);x.translate(-5.26,-187.51);x.globalAlpha=av(t,2.5,0,1);x.fillStyle=cg({x:0,y:0,w:10.53,h:375.02},{x:0,y:0.5},{x:1,y:0.5},[{c:"#8C9EACFE",o:0},{c:"#009EACFE",o:1}]);x.fill(P.p6c1);x.restore();
// MovingRays
x.save();let mx=av(t,20,0,200,false);x.translate(mx,0);x.globalAlpha=av(t,10,0,1);
x.save();x.translate(370.5,2.86);x.fillStyle=cg({x:0,y:0,w:61,h:426},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#459EACFE",o:0.3},{c:"#5B9EACFE",o:0.71},{c:"#009EACFE",o:1}]);x.fill(P.r7);x.restore();
x.save();x.translate(633.82,-7.1);x.translate(28.9,223.98);x.rotate(0.96*Math.PI/180);x.translate(-28.9,-223.98);x.fillStyle=cg({x:0,y:0,w:57.81,h:447.96},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#0D9EACFE",o:0.27},{c:"#119EACFE",o:0.69},{c:"#009EACFE",o:1}]);x.fill(P.r11);x.restore();
x.save();x.translate(290.49,-8.49);x.translate(53.9,216.05);x.rotate(4.46*Math.PI/180);x.scale(1,0.99);x.translate(-53.9,-216.05);x.fillStyle=cg({x:0,y:0,w:107.8,h:432.1},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#759EACFE",o:0.29},{c:"#549EACFE",o:0.67},{c:"#009EACFE",o:1}]);x.fill(P.r17);x.restore();
x.save();x.translate(494.44,-8.25);x.translate(13.02,214.07);x.rotate(1.76*Math.PI/180);x.scale(0.99,1);x.translate(-13.02,-214.07);x.fillStyle=cg({x:0,y:0,w:26.05,h:428.14},{x:0,y:0.5},{x:1,y:0.5},[{c:"#009EACFE",o:0},{c:"#419EACFE",o:0.53},{c:"#009EACFE",o:1}]);x.fill(P.r6c1);x.restore();
x.save();x.translate(455.35,32.82);x.translate(20.07,198.03);x.rotate(-179.07*Math.PI/180);x.translate(-20.07,-198.03);x.fillStyle=cg({x:0,y:0,w:40.14,h:396.06},{x:0.13,y:0.151},{x:1.33,y:0.129},[{c:"#009EACFE",o:0},{c:"#159EACFE",o:0.3},{c:"#329EACFE",o:0.84},{c:"#009EACFE",o:1}]);x.fill(P.r10);x.restore();
x.restore();
// Foregrounds
x.save();x.translate(0.5,436.86);x.fillStyle=cg({x:0,y:0,w:516.96,h:164},{x:0.055,y:0.55},{x:0.945,y:0.55},[{c:"#FF12127E",o:0},{c:"#0012127E",o:1}]);x.fill(P.r3);x.restore();
x.save();x.translate(0.5,436.86);x.globalAlpha=av(t,5,0,1);x.fillStyle=cg({x:0,y:0,w:516.96,h:164},{x:0.055,y:0.55},{x:0.945,y:0.55},[{c:"#99000000",o:0},{c:"#0012127E",o:1}]);x.fill(P.r3);x.restore();
x.save();x.translate(-0.5,415.85);x.fillStyle=cg({x:0,y:0,w:802,h:185},{x:0.509,y:0.105},{x:0.491,y:0.995},[{c:"#D212127E",o:0},{c:"#0012127E",o:0.58}]);x.fill(P.r1);x.restore();
x.save();x.translate(-0.5,415.85);x.globalAlpha=av(t,4,0,1);x.fillStyle=cg({x:0,y:0,w:802,h:185},{x:0.509,y:0.105},{x:0.491,y:0.995},[{c:"#66000000",o:0},{c:"#0012127E",o:0.58}]);x.fill(P.r1);x.restore();
x.save();x.translate(-0.5,-0.13);x.fillStyle=cg({x:0,y:0,w:802,h:212.55},{x:0.5,y:0},{x:0.5,y:1},[{c:"#FF23159E",o:0},{c:"#96372AB4",o:0.4},{c:"#005448D4",o:1}]);x.fill(P.r4);x.restore();
// BottomLights
x.save();x.globalAlpha=av(t,6,0.7,0.1);
x.save();x.translate(244.95,100.04);x.translate(182.58,385.1);x.rotate(121.98*Math.PI/180);x.scale(-0.99,0.99);x.translate(-182.58,-385.1);x.fillStyle=cg({x:0,y:0,w:361.96,h:770.2},{x:0.461,y:0.519},{x:0.559,y:0.541},[{c:"#00B9C3FE",o:0.14},{c:"#3D9EACFE",o:0.66},{c:"#00B9C3FE",o:1}]);x.fill(P.p8c3);x.restore();
x.save();x.translate(225.34,95.3);x.translate(182.58,385.1);x.rotate(-60.57*Math.PI/180);x.scale(0.99,-0.99);x.translate(-182.58,-385.1);x.fillStyle=cg({x:0,y:0,w:361.96,h:770.2},{x:0.461,y:0.519},{x:0.559,y:0.541},[{c:"#00B9C3FE",o:0.08},{c:"#3D9EACFE",o:0.52},{c:"#00B9C3FE",o:0.93}]);x.fill(P.p8c3);x.restore();
x.save();x.translate(346.33,56.3);x.translate(182.58,385.1);x.rotate(-62.42*Math.PI/180);x.scale(0.99,-0.99);x.translate(-182.58,-385.1);x.fillStyle=cg({x:0,y:0,w:361.96,h:770.2},{x:0.461,y:0.519},{x:0.559,y:0.541},[{c:"#00B9C3FE",o:0.08},{c:"#589EACFE",o:0.52},{c:"#00B9C3FE",o:0.93}]);x.fill(P.p8c3);x.restore();
x.restore();
// Path8_Copy1 animated
x.save();let p8c1x=av(t,4,70,60,false);x.translate(p8c1x,145.63);x.translate(52.54,129.33);x.rotate(-8.3*Math.PI/180);x.scale(1,0.99);x.translate(-52.54,-129.33);x.globalAlpha=av(t,2,0,0.5);x.fillStyle=cg({x:0,y:0,w:105.08,h:258.66},{x:0.382,y:0.499},{x:0.618,y:0.541},[{c:"#009EACFE",o:0.24},{c:"#32B9C3FE",o:0.56},{c:"#45E9ECFF",o:0.8}]);x.fill(P.p8c1);x.restore();
// Path8_Copy10 animated
x.save();let p8c10x=av(t,4,80,100,false);x.translate(p8c10x,49.8);x.translate(51.83,152.66);x.rotate(169.05*Math.PI/180);x.scale(1,0.99);x.translate(-51.83,-152.66);x.globalAlpha=av(t,2,0,1);x.fillStyle=cg({x:0,y:0,w:103.66,h:305.33},{x:0.381,y:0.506},{x:0.619,y:0.534},[{c:"#009EACFE",o:0.41},{c:"#1CB9C3FE",o:0.72}]);x.fill(P.p8c10);x.restore();
// Lights animated
x.save();let lx=av(t,6,-10,10,false);x.translate(lx,0);x.globalAlpha=av(t,3,0,0.6);
x.save();x.translate(600.8,98.98);x.lineWidth=1.33;x.strokeStyle=cg({x:0,y:0,w:12,h:160},{x:0.5,y:0},{x:0.5,y:1},[{c:"#00675BE6",o:0},{c:"#9E675BE6",o:0.4},{c:"#9EAEA7F2",o:0.75},{c:"#00AEA7F2",o:1}]);x.fillStyle=cg({x:0,y:0,w:12,h:160},{x:-0.225,y:0.494},{x:1.205,y:0.506},[{c:"#5B9991EE",o:0},{c:"#00AEA7F2",o:0.79}]);x.fill(P.p4);x.stroke(P.p4);x.restore();
x.save();x.translate(47.68,120.33);x.translate(64.15,150.78);x.rotate(-142.73*Math.PI/180);x.scale(-1,0.82);x.translate(-64.15,-150.78);x.fillStyle=cg({x:0,y:0,w:128.31,h:301.57},{x:0.441,y:0.482},{x:0.679,y:0.518},[{c:"#009EACFE",o:0.37},{c:"#8FCFD6FE",o:0.69}]);x.fill(P.p8c9);x.restore();
x.restore();
// TopLeft2 animated
x.save();x.translate(-9,-15);x.translate(125,199.61);x.rotate(-16.91*Math.PI/180);x.translate(-125,-199.61);x.globalAlpha=av(t,2.5,1,0);
x.save();x.translate(96.54,28.53);x.translate(43.81,155.28);x.rotate(5.86*Math.PI/180);x.translate(-43.81,-155.28);x.fillStyle=cg({x:0,y:0,w:87.63,h:310.56},{x:0.455,y:0.525},{x:0.625,y:0.535},[{c:"#009EACFE",o:0.24},{c:"#1CB9C3FE",o:0.56},{c:"#4CE9ECFF",o:0.8}]);x.fill(P.p8);x.restore();
x.restore();
// Path8_Copy14 animated
x.save();let p8c14x=av(t,4,45,55,false);x.translate(p8c14x,-68.18);x.translate(51.83,152.66);x.scale(1,0.99);x.translate(-51.83,-152.66);x.globalAlpha=av(t,2,0,1);x.fillStyle=cg({x:0,y:0,w:103.66,h:305.33},{x:0.381,y:0.506},{x:0.619,y:0.534},[{c:"#009EACFE",o:0.41},{c:"#1CB9C3FE",o:0.72}]);x.fill(P.p8c10);x.restore();
// Path8_Copy15 animated
x.save();let p8c15x=av(t,4,65,50,false);x.translate(p8c15x,-163.15);x.translate(51.83,152.66);x.rotate(352.09*Math.PI/180);x.scale(0.99,0.99);x.translate(-51.83,-152.66);x.globalAlpha=av(t,2,0,1);x.fillStyle=cg({x:0,y:0,w:103.66,h:305.33},{x:0.381,y:0.506},{x:0.619,y:0.534},[{c:"#009EACFE",o:0.41},{c:"#1CB9C3FE",o:0.72}]);x.fill(P.p8c10);x.restore();
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
