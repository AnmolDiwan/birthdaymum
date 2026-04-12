'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import CustomCursor from '@/components/ui/CustomCursor'
import MusicPlayer from '@/components/ui/MusicPlayer'
import ProgressBar from '@/components/ui/ProgressBar'
import FallingPetals from '@/components/ui/FallingPetals'

import EntranceSection from '@/components/sections/EntranceSection'
import HeroSection from '@/components/sections/HeroSection'
import ConstellationSection from '@/components/sections/ConstellationSection'
import LoveNotesSection from '@/components/sections/LoveNotesSection'
import MemoryLaneSection from '@/components/sections/MemoryLaneSection'
import PhotoGallery from '@/components/sections/PhotoGallery'
import WishSection from '@/components/sections/WishSection'
import FinaleSection from '@/components/sections/FinaleSection'

export default function Home() {
  const [entered, setEntered] = useState(false)
  const [showPetals, setShowPetals] = useState(false)

  const handleEnter = () => {
    setEntered(true)
    setTimeout(() => setShowPetals(true), 500)
  }

  // Lenis smooth scroll
  useEffect(() => {
    if (!entered) return
    
    let lenis: any
    let rafId: number

    const initLenis = async () => {
      const { default: Lenis } = await import('@studio-freight/lenis')
      lenis = new Lenis({
        duration: 2.0, // Slightly more buttery
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        lerp: 0.05, // Added for smoother transition
      })

      const raf = (time: number) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    }

    initLenis()

    return () => {
      if (lenis) lenis.destroy()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [entered])

  return (
    <main className="relative">
      <CustomCursor />

      <AnimatePresence>
        {!entered && <EntranceSection onEnter={handleEnter} />}
      </AnimatePresence>

      {entered && (
        <>
          <ProgressBar />
          <MusicPlayer />
          {showPetals && <FallingPetals count={12} />}

          <HeroSection />

          {/* Hero (aurora-bg / light pinks) → Constellation (dark #0a0510) */}
          <div
            className="relative z-[1]"
            style={{
              height: '120px',
              background: 'linear-gradient(180deg, #E8D5F5 0%, #7d3c5e 30%, #2d1021 60%, #0a0510 100%)',
            }}
          />

          <ConstellationSection />

          {/* Constellation (dark #0a0510) → LoveNotes (warm-white #FFFAF5) */}
          <div
            className="relative z-[1]"
            style={{
              height: '140px',
              background: 'linear-gradient(180deg, #0a0510 0%, #1a0a1a 20%, #3d1a2e 40%, #7d3c5e 55%, #c9956c 70%, #FFD6E0 85%, #FFFAF5 100%)',
            }}
          />

          <LoveNotesSection />

          {/* LoveNotes (warm-white) → MemoryLane (cream) — subtle */}
          <div
            className="relative z-[1]"
            style={{
              height: '60px',
              background: 'linear-gradient(180deg, #FFFAF5 0%, #FFF8F0 100%)',
            }}
          />

          <MemoryLaneSection />

          {/* PhotoGallery (cream → blush → lavender) */}
          <div
            className="relative z-[1]"
            style={{
              height: '60px',
              background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFAF5 100%)',
            }}
          />

          <PhotoGallery />

          {/* Gallery (lavender end) → Wish (lavender start) — almost seamless */}
          <div
            className="relative z-[1]"
            style={{
              height: '40px',
              background: 'linear-gradient(180deg, #E8D5F5 0%, #E8D5F5 100%)',
            }}
          />

          <WishSection />

          {/* Wish (blush end) → Finale (dark #1a0a0f) */}
          <div
            className="relative z-[1]"
            style={{
              height: '120px',
              background: 'linear-gradient(180deg, #FFD6E0 0%, #c9956c 25%, #7d3c5e 50%, #3d1a2e 75%, #1a0a0f 100%)',
            }}
          />

          <FinaleSection />
        </>
      )}
    </main>
  )
}
