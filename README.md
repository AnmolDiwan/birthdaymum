# 🌸 Sneha's Birthday Website

A cinematic, interactive birthday journey built with Next.js 14, Framer Motion, and GSAP.

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

- **`snehaTraits`** — her personality traits (constellation section)
- **`loveNotes`** — things you love about her (envelope cards)
- **`memories`** — your shared memories (polaroid section)
- **`quizQuestions`** — the personality quiz
- **`letter`** — your heartfelt closing letter
- **`photos`** — photo gallery array

### 📸 Adding Photos
1. Drop your photos into `/public/photos/`
2. Update the `photos` array in `src/lib/data.ts`:
```ts
export const photos = [
  { id: 1, src: '/photos/photo1.jpg', alt: 'Memory 1', caption: 'Our first adventure ✨' },
  { id: 2, src: '/photos/photo2.jpg', alt: 'Memory 2', caption: 'This day 💕' },
  // ... add all your photos
]
```
3. Also update `PhotoGallery.tsx` to use Next.js `<Image>` instead of the placeholder div.

### 🎵 Adding Music
1. Download a royalty-free track from [Pixabay](https://pixabay.com/music/) or [Uppbeat](https://uppbeat.io)
2. Save it as `/public/music/background.mp3`
3. The music button will work automatically

### 💌 Writing the Letter
In `src/lib/data.ts`, find the `letter` object and replace the placeholder paragraphs:
```ts
export const letter = {
  salutation: "My dearest Sneha,",
  paragraphs: [
    "Your actual first paragraph here...",
    "Your second paragraph...",
    "Your third paragraph...",
    "Your closing line...",
  ],
  closing: "With all my love,",
  signature: "[ Your Name ]",  // ← Replace with your name
}
```

### 🧠 Adding Memories
In `src/lib/data.ts`, update the `memories` array:
```ts
export const memories = [
  {
    id: 1,
    title: "The Rained-Out Picnic",
    date: "July 2023",
    description: "We planned it for weeks, it poured, and we ended up eating sandwiches in the car laughing for two hours.",
    color: "#FFD6E0",
  },
  // ... add more memories
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
4. You get a live URL like `sneha-birthday.vercel.app`

### Netlify
1. Run `npm run build`
2. Drag the `.next` folder to [netlify.com/drop](https://app.netlify.com/drop)

---

## 📁 Project Structure

```
sneha-birthday/
├── public/
│   ├── music/
│   │   └── background.mp3        ← Add your music here
│   └── photos/
│       └── photo1.jpg            ← Add your photos here
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← Root layout
│   │   └── page.tsx              ← Main page (assembles sections)
│   ├── components/
│   │   ├── sections/
│   │   │   ├── EntranceSection.tsx   ← Section 1: Dark entrance
│   │   │   ├── HeroSection.tsx       ← Section 2: Birthday hero
│   │   │   ├── ConstellationSection.tsx ← Section 3: Star traits
│   │   │   ├── LoveNotesSection.tsx  ← Section 4: Envelope cards
│   │   │   ├── MemoryLaneSection.tsx ← Section 5: Polaroids
│   │   │   ├── PhotoGallery.tsx      ← Section 6: Photo gallery
│   │   │   ├── QuizSection.tsx       ← Section 7: Personality quiz
│   │   │   ├── WishSection.tsx       ← Section 8: Birthday cake
│   │   │   ├── LetterSection.tsx     ← Section 9: The letter
│   │   │   └── FinaleSection.tsx     ← Section 10: Grand finale
│   │   └── ui/
│   │       ├── CustomCursor.tsx      ← Rose gold cursor
│   │       ├── MusicPlayer.tsx       ← Music toggle button
│   │       ├── ProgressBar.tsx       ← Scroll progress
│   │       └── FallingPetals.tsx     ← Ambient petals
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
- 🎊 Auto-confetti on load
- ⭐ Interactive constellation map of her personality
- 💌 Envelope cards that open on tap
- 📷 Flip polaroid memory cards
- 🖼️ Masonry photo gallery with lightbox
- 🧠 Personality quiz with animated results
- 🎂 Interactive candle-blowing birthday cake
- 📜 Typewriter letter reveal on scroll
- 👑 Confetti grand finale
- 🌸 Falling petals ambient effect
- 🎵 Soft background music toggle
- 🖱️ Custom rose-gold cursor
- 📊 Scroll progress bar
- 🌊 Lenis smooth scrolling
- 📱 Fully mobile responsive

---

## 💡 Tips

- **Mobile:** The site is fully responsive. Test on your phone before showing her.
- **Music:** Get tracks from [Pixabay Music](https://pixabay.com/music/search/romantic%20piano/) — search "romantic piano"
- **Photos:** Aim for portrait-orientation photos for the masonry gallery — they look best.
- **Letter:** Write it raw and honest. Don't over-edit. The typewriter effect makes even simple words feel profound.
- **Deployment:** Deploy to Vercel, send her the link with a simple "I made something for you 🌸"

---

Made with 💕 for Sneha's birthday.
