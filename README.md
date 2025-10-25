# Petar Radojicic - Portfolio

A modern, interactive 3D portfolio website built with React, Three.js, and TypeScript. Features a unique scroll-based 3D camera system with an optional free-look mode for exploring the scene.

## 🌟 Features

### Core Functionality
- **3D Interactive Scene** - GLTF 3D model with smooth camera animations
- **Scroll-Based Camera** - Camera automatically transitions between predefined positions as you scroll
- **Free-Look Mode** - Manual camera controls with OrbitControls for exploring the 3D scene
- **Responsive Design** - Fully responsive with device-specific UI elements
- **Multi-Language Support** - English and Serbian (i18n)
- **Glassmorphism UI** - Modern frosted glass effect design
- **SEO Optimized** - Rich meta tags and Schema.org structured data

### Sections
- **Hero** - Landing section with animated 3D model
- **About** - Personal information, skills, and contact details
- **Projects** - Portfolio projects with technology filtering
- **Experience** - Timeline of work experience and education
- **Footer** - Contact information and quick navigation

### Technical Features
- Server-Side Rendering (SSR) ready
- TypeScript for type safety
- Zustand for state management
- React Three Fiber for 3D rendering
- Lottie animations for UI interactions
- Custom hooks for scroll and media query management

## 🚀 Tech Stack

### Frontend Framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### 3D Graphics
- **Three.js** - 3D library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing

### State Management
- **Zustand** - Lightweight state management

### Internationalization
- **i18next** - Translation framework
- **react-i18next** - React bindings for i18next

### Animations
- **Lottie** - Vector animations

### SEO
- **react-helmet-async** - Dynamic meta tags
- **Schema.org** - Structured data for search engines

## 📁 Project Structure

```
radojicic/
├── public/
│   ├── img/                    # Images and assets
│   │   ├── me.webp
│   │   └── projects/
│   ├── locales/                # Translation files
│   │   ├── en/translation.json
│   │   └── sr/translation.json
│   ├── models/                 # 3D models
│   │   └── Scene.glb
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── components/             # React components
│   │   ├── About.tsx
│   │   ├── CameraController.tsx
│   │   ├── ContentSection.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── FreeLookHUD.tsx
│   │   ├── Hero.tsx
│   │   ├── Lighting.tsx
│   │   ├── Projects.tsx
│   │   ├── Scene.tsx
│   │   ├── ScrollIndicator.tsx
│   │   └── SEO.tsx
│   ├── config/                 # Configuration files
│   │   └── scene.ts            # 3D scene settings
│   ├── data/                   # Static data
│   │   └── sections.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── useMediaQuery.ts
│   │   └── useScrollControl.ts
│   ├── icons/                  # Lottie animation files
│   │   ├── finger-move.json
│   │   ├── finger-scroll.json
│   │   ├── mouse-move.json
│   │   └── mouse-scroll.json
│   ├── store/                  # State management
│   │   └── useFreeLookStore.ts
│   ├── types/                  # TypeScript definitions
│   │   └── camera.ts
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   ├── i18n.ts                 # i18n configuration
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/PetarRadojicic/radojicic.git
   cd radojicic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## ⚙️ Configuration

### Camera Positions

Camera positions for each section can be configured in `src/config/scene.ts`:

```typescript
export const cameraPositions = [
  { position: [75, 50, 15], target: [0, 0, 0] },    // Hero
  { position: [2.4, 7, -8.3], target: [-3, 7.1, -5.5] }, // About
  // ... more positions
]
```

**Tip:** Use free-look mode's debug panel to find new camera positions!

### Scene Settings

Adjust 3D model scale and camera limits:

```typescript
export const SCENE_CONFIG = {
  modelScale: 0.5,    // 3D model scale
  minZoom: 5,         // Minimum camera distance
  maxZoom: 50,        // Maximum camera distance
}
```

### Translations

Add or modify translations in `public/locales/{language}/translation.json`:

```json
{
  "hero": {
    "title": "Your Name",
    "subtitle": "Your Tagline"
  }
}
```

## 🎨 Customization

### Adding New Sections

1. Create a new component in `src/components/`
2. Add section data to `src/data/sections.ts`
3. Add camera position to `src/config/scene.ts`
4. Import and render in `src/App.tsx`

### Changing the 3D Model

Replace `public/models/Scene.glb` with your own GLTF model. The model is automatically loaded by the Scene component.

### Styling

The project uses Tailwind CSS. Modify `tailwind.config.js` for theme customization:
- Colors
- Fonts
- Spacing
- Breakpoints

## 🎯 Key Features Explained

### Free-Look Mode

Toggle with the button on the hero section to manually control the camera:
- **Desktop:** Click and drag to rotate, scroll to zoom
- **Mobile:** Touch and drag to rotate, pinch to zoom

The debug panel (top-left) shows current camera coordinates - useful for finding new camera positions!

### Scroll-Based Camera

As you scroll through sections, the camera smoothly transitions between predefined positions, creating a cinematic experience.

### Section Detection

The app uses viewport center detection to determine which section is active and triggers appropriate camera movements.

## 🌐 Deployment

### Build for Production

```bash
npm run build:production
```

This will:
1. Update the sitemap
2. Build optimized production files
3. Output to `dist/` directory

### Deploy to Netlify/Vercel

1. Connect your repository
2. Set build command: `npm run build:production`
3. Set publish directory: `dist`

### Environment Variables

No environment variables required for basic deployment.

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note:** Older browsers may have limited Three.js support.

## 📱 Responsive Breakpoints

- **Mobile:** ≤767px
- **Tablet:** 768px - 1023px
- **Desktop:** ≥1024px

Device-specific UI elements automatically adjust (e.g., scroll icons).

## 🐛 Troubleshooting

### 3D Model Not Loading
- Ensure `Scene.glb` exists in `public/models/`
- Check browser console for errors
- Verify GLTF file is valid

### Camera Not Moving on Scroll
- Check that sections have `data-section` attributes
- Verify camera positions array length matches section count
- Ensure scroll container ref is properly attached

### Translations Not Working
- Verify JSON files are valid in `public/locales/`
- Check browser console for i18n errors
- Ensure language codes match (en, sr)

## 📄 License

This project is open source and available under the MIT License.

## 👤 Contact

**Petar Radojicic**
- Website: [radojicic.co](https://radojicic.co)
- Email: petar@radojicic.co
- GitHub: [@PetarRadojicic](https://github.com/PetarRadojicic)
- LinkedIn: [petarradojicic](https://linkedin.com/in/petarradojicic)

## 🙏 Acknowledgments

- Three.js community
- React Three Fiber team
- Tailwind CSS
- All open-source contributors

---

**Built with ❤️ using React, Three.js, and TypeScript**
