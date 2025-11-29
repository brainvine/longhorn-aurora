# Windows Longhorn Aurora (HTML5 Canvas)

A faithful 1:1 recreation of the "Aurora" desktop effect from Windows Longhorn Build 4074, ported from the original XAML/BAML definitions to modern HTML5 Canvas + React.

![Aurora Preview](https://via.placeholder.com/800x400?text=Place+Your+Screenshot+Here)

> "An animated aurora effect... mostly seen in Milestone 7 builds. Using the powerful Avalon presentation engine."

## The Story Behind Aurora

In 2003/2004, Microsoft was working on "Longhorn" (which eventually became Windows Vista). One of the most iconic yet elusive features was the **Aurora** animation. It was designed to show off the power of the new Avalon presentation engine (the precursor to WPF), rendering complex animations without significant CPU load.

### The "Lost" Effect of Build 4074

In the famous leaked Build 4074 ("The WinHEC Build"), the Aurora effect appeared to be missing. However, it was actually there, just buried under technical conflicts:

1. **Theme Incompatibility:** The default "Jade" theme couldn't draw the Aurora. Only the hidden "Aero" theme could, but Aero was locked away for internal developers.
2. **Broken BAML:** The resource files used a deprecated version of BAML (Binary Application Markup Language) that the build's own parser couldn't read anymore.

This project takes the logic intended for that original Avalon engine and brings it to the modern web using HTML5 Canvas. It serves as a tribute to the designers and engineers who were pioneering "Glass" and "Liquid" interfaces 21 years ago—long before modern OS designs started revisiting these concepts.

## Features

- **Pixel-perfect recreation** - Based on original XAML gradient stops, timing, and animation curves
- **6 Color themes** - Original Aurora, Emerald Dream, Sunset Blaze, Deep Ocean, Cyberpunk, Monochrome
- **Speed control** - Adjust animation speed from 0.1x to 3x
- **Watermark toggle** - Show/hide the authentic Longhorn build watermark
- **Export options**:
  - **PNG** - Save current frame as wallpaper
  - **HTML** - Download standalone single-file version
  - **Video** - Record 5-second WebM clip
- **Glassmorphism UI** - Control panel with Aero/LiquidGlass-inspired design
- **60 FPS performance** - Optimized canvas rendering with pre-compiled Path2D objects

## Technical Implementation

This recreation is based on the original XAML paths and animation logic found in the Longhorn system files.

- **Rendering:** HTML5 Canvas API (2D Context) with React
- **Logic:** TypeScript translation of the original WPF/Avalon coordinate systems and gradients
- **Performance:** Optimized for 60fps on modern browsers, mimicking the intended efficiency of the original Avalon engine
- **Build tool:** Vite for fast development and optimized production builds

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/brainvine/longhorn-aurora.git

# Navigate to the folder
cd longhorn-aurora

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Standalone Version

Just want the HTML file? Download `longhorn-aurora-standalone.html` from the public folder - it's a single file that runs anywhere with zero dependencies.

## How it Works

The animation consists of multiple layers of gradients and shapes moving in a loop. Just like the original `System.Windows.Client.Shell.View.Aurora` class intended, this script generates the visual flow programmatically rather than playing back a video file.

Key techniques:
- Pre-compiled `Path2D` objects for maximum rendering performance
- XAML `DoubleAnimation` timing logic with `AutoReverse` support
- Layered gradient compositions matching original color stops
- Proper z-ordering of all visual elements

## Color Themes

| Theme | Description |
|-------|-------------|
| Original Aurora | The authentic purple/blue/pink gradient |
| Emerald Dream | Green forest tones |
| Sunset Blaze | Orange and red warm colors |
| Deep Ocean | Deep blue underwater feel |
| Cyberpunk | Neon pink and cyan |
| Monochrome | Elegant grayscale |

## License

This project is released under the MIT License.

*Original design concepts and "Longhorn" references are copyright © Microsoft Corporation. This is a fan recreation for educational and preservation purposes.*

---

## Credits

Created by **Danny de Kruijk** - [@brainvine](https://twitter.com/brainvine)

### AI Assistance

This project was made possible with significant help from:
- **Google Gemini 2.5 Pro** - Initial XAML analysis and path extraction
- **Anthropic Claude Opus 4.5** - React app architecture, TypeScript implementation, and UI design

Without these AI models, recreating the complex XAML animation logic would have been extraordinarily time-consuming—the original contains dozens of gradient definitions, precise timing curves, and intricate path coordinates.

---

*"For testing purposes only. Build 4050.private/lab06_demo.031013-1849"*
