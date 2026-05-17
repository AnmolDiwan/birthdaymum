# 🌸 Mum's Birthday Website

A cinematic, interactive birthday journey built with Next.js 14, Framer Motion, and GSAP — crafted with love for the most special person in the world.

---

## 🚀 Quick Setup (5 minutes)

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Personalizing the Site

### ✏️ Edit Content
All personalized text is in ONE file:
```
src/lib/data.ts
```

- **`snehaTraits`** — personality traits shown in the heart constellation section
- **`loveNotes`** — things you love about her (envelope cards)
- **`memories`** — shared memories (polaroid cards with photos)
- **`photos`** — photo gallery array
- **`tinyLetters`** — mini letters written by family members (Manddodri, Munduru, DD1)

### 📸 Adding Photos
1. Drop your photos into `/public/photos/`
2. Update the `photos` array in `src/lib/data.ts`:
```ts
export const photos = [
  { id: 1, src: '/photos/image13.jpeg', caption: 'A beautiful memory' },
  { id: 2, src: '/photos/image10.jpeg', caption: 'Always smiling' },
  // ... add all your photos
]
```
3. Also update the `memories` and `tinyLetters` arrays if you change image filenames.

### 🎵 Adding Music
1. Download a royalty-free track from [Pixabay](https://pixabay.com/music/) or [Uppbeat](https://uppbeat.io)
2. Save it as `/public/music/background.mp3`
3. The music button will work automatically

### 💌 Adding Mini Letters
In `src/lib/data.ts`, find the `tinyLetters` array and add or edit entries:
```ts
export const tinyLetters = [
  {
    id: 1,
    author: "manddodri",
    image: "/photos/image17.jpeg",
    message: "My dearest mummy, ...",
  },
  // ... add more letters from family/friends
]
```

### ⭐ Editing Constellation Traits
In `src/lib/data.ts`, update the `snehaTraits` array to change the heart constellation points:
```ts
export const snehaTraits = [
  {
    id: 1,
    label: "Love Like No Other",
    description: "Your love is unconditional...",
    emoji: "💖",
    x: 50, y: 88,  // position on the heart shape (percentage)
  },
  // ...
]
```

### 💕 Editing Love Notes (Envelope Cards)
```ts
export const loveNotes = [
  {
    id: 1,
    title: "Your Sacrifices",
    note: "You gave up so much...",
    emoji: "🌹",
  },
  // ...
]
```

### 🧠 Editing Memory Polaroids
```ts
export const memories = [
  {
    id: 1,
    title: "In Your Arms",
    date: "The safest place I've ever known",
    description: "From the very beginning...",
    color: "#FFD6E0",
    src: "/photos/image2.jpeg",
  },
  // ...
]
```

---

## 📦 All Dependencies

```bash
# Core
npm install next@14.2.5 react@^18.3.1 react-dom@^18.3.1

# Animations
npm install framer-motion gsap @studio-freight/lenis

# Particles & Effects
npm install tsparticles @tsparticles/react @tsparticles/slim canvas-confetti

# UI Components
npm install lottie-react yet-another-react-lightbox

# Utilities
npm install clsx tailwind-merge

# Dev
npm install -D typescript @types/node @types/react @types/react-dom @types/canvas-confetti tailwindcss postcss autoprefixer eslint eslint-config-next
```

---

## 🌐 Deploying (Free)

### Vercel (Recommended — 2 minutes)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select your repo → Deploy
4. You get a live URL to share with Mum 🎉

### Netlify
1. Run `npm run build`
2. Drag the `.next` folder to [netlify.com/drop](https://app.netlify.com/drop)

---

## 📁 Project Structure

```
birthdaymum/
├── public/
│   ├── music/
│   │   └── background.mp3        ← Add your music here
│   └── photos/
│       └── image1.jpeg           ← Add your photos here
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← Root layout
│   │   └── page.tsx              ← Main page (assembles all sections)
│   ├── components/
│   │   ├── sections/
│   │   │   ├── EntranceSection.tsx      ← Section 1: Cinematic dark entrance
│   │   │   ├── HeroSection.tsx          ← Section 2: Birthday hero & confetti
│   │   │   ├── ConstellationSection.tsx ← Section 3: Heart constellation traits
│   │   │   ├── LoveNotesSection.tsx     ← Section 4: Envelope cards
│   │   │   ├── MemoryLaneSection.tsx    ← Section 5: Polaroid memory cards
│   │   │   ├── PhotoGallery.tsx         ← Section 6: Masonry photo gallery
│   │   │   ├── MiniLettersSection.tsx   ← Section 7: Mini letters from family
│   │   │   ├── WishSection.tsx          ← Section 8: Birthday cake & candles
│   │   │   └── FinaleSection.tsx        ← Section 9: Confetti grand finale
│   │   └── ui/
│   │       ├── CustomCursor.tsx         ← Rose gold cursor
│   │       ├── MusicPlayer.tsx          ← Music toggle button
│   │       ├── ProgressBar.tsx          ← Scroll progress bar
│   │       └── FallingPetals.tsx        ← Ambient falling petals
│   ├── lib/
│   │   └── data.ts               ← ⭐ ALL YOUR CONTENT GOES HERE
│   └── styles/
│       └── globals.css           ← All global styles & animations
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## ✨ Features

- 🎬 Cinematic typewriter entrance with starfield
- 🎊 Auto-confetti burst on load
- 💖 Interactive heart constellation map of her qualities
- 💌 Envelope cards that open on tap
- 📷 Flip polaroid memory cards with real photos
- 🖼️ Masonry photo gallery with lightbox
- 📝 Mini letters section — heartfelt messages from family
- 🎂 Interactive birthday cake with blow-out candles
- 👑 Confetti grand finale
- 🌸 Falling petals ambient effect
- 🎵 Soft background music toggle
- 🖱️ Custom rose-gold cursor
- 📊 Scroll progress bar
- 🌊 Lenis smooth scrolling
- 📱 Fully mobile responsive

Made with 💕 for Mum's birthday.
