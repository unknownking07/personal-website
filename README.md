# 🎴 Interactive 3D Resume

A stunning, physics-based 3D interactive resume built with Next.js 16, React Three Fiber, and Rapier physics. Features a draggable badge card suspended by a lanyard with realistic physics simulation.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.182-black?style=flat-square&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)

## ✨ Features

- **🎮 Interactive 3D Badge** - Drag and throw the badge card with realistic physics
- **⚡ Rope Physics** - Lanyard simulation using Rapier physics engine
- **🌊 Smooth Animations** - Framer Motion powered transitions
- **🌙 Dark Theme** - Sleek black aesthetic with subtle lighting
- **📱 Responsive Design** - Works seamlessly on desktop and mobile
- **🎨 Custom Badge** - Personalized card with photo and details

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | Useful helpers for R3F |
| [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) | Physics engine |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [MeshLine](https://github.com/spite/THREE.MeshLine) | Lanyard rendering |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/unknownking07/resume.git

# Navigate to the project
cd resume

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
resume/
├── public/
│   └── assets/
│       ├── 3d/          # GLTF 3D models
│       └── images/      # Textures and badge images
├── src/
│   ├── app/
│   │   ├── page.tsx     # Main page with Canvas
│   │   ├── layout.tsx   # Root layout
│   │   └── globals.css  # Global styles
│   ├── components/
│   │   ├── canvas/
│   │   │   └── Band.tsx # 3D badge and physics
│   │   └── dom/
│   │       └── Overlay.tsx # UI overlay
│   └── types/
│       └── three.d.ts   # TypeScript declarations
└── package.json
```

## 🎯 Usage

- **Drag** the badge card to move it around
- **Throw** it to see realistic physics in action
- **Watch** the lanyard follow with rope physics
- Click social links to connect

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/unknownking07/resume)

Or deploy manually:

```bash
npm run build
```

## 📝 Customization

### Update Personal Info

Edit `src/components/dom/Overlay.tsx` to change:
- Name and tagline
- Bio description  
- Social media links

### Update Badge

Replace images in `public/assets/images/`:
- `custom_badge.png` - Badge face design
- `tag_texture.png` - Lanyard texture

## 📄 License

MIT © [Abhinav](https://github.com/unknownking07)

---

<p align="center">
  <b>Built with ☕ and physics</b><br>
  <a href="https://x.com/defiunknownking">X</a> • 
  <a href="https://t.me/unknownking7">Telegram</a> • 
  <a href="https://www.linkedin.com/in/abhinavk7/">LinkedIn</a>
</p>
