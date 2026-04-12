'use client'
import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { snehaTraits } from '@/lib/data'

// Generate stable random background stars using a seed-like approach
function generateBackgroundStars(count: number) {
  const stars = []
  // Use a deterministic-ish approach so stars don't jump on re-render
  for (let i = 0; i < count; i++) {
    const seed = i * 7919 // prime multiplier for pseudo-random spread
    stars.push({
      left: ((seed * 13) % 1000) / 10,
      top: ((seed * 17) % 1000) / 10,
      size: ((seed * 23) % 100) / 100 * 2 + 0.5,
      delay: ((seed * 31) % 100) / 100 * 5,
      duration: ((seed * 37) % 100) / 100 * 3 + 2,
      brightness: ((seed * 41) % 100) / 100,
    })
  }
  return stars
}

export default function ConstellationSection() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [visibleStars, setVisibleStars] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const backgroundStars = useMemo(() => generateBackgroundStars(120), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          snehaTraits.forEach((_, i) => {
            setTimeout(() => {
              setVisibleStars(prev => [...prev, i])
            }, i * 400)
          })
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Heart-shaped constellation lines
  // Indices: 0=bottom, 1=top-left, 2=top-right, 3=left, 4=right, 5=lower-left, 6=lower-right
  const lines = [
    // Left side of heart: top-left bump → left → lower-left → bottom tip
    [1, 3], [3, 5], [5, 0],
    // Right side of heart: top-right bump → right → lower-right → bottom tip
    [2, 4], [4, 6], [6, 0],
    // Top center dip connecting the two bumps
    [1, 2],
  ]

  // SVG heart outline path for the faint background glow
  const heartPath = `
    M 50 85
    C 50 85, 15 55, 14 38
    C 13 22, 28 10, 39 15
    C 45 18, 50 28, 50 28
    C 50 28, 55 18, 61 15
    C 72 10, 87 22, 86 38
    C 85 55, 50 85, 50 85
    Z
  `

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0510 0%, #1a0a1a 30%, #1a0a1a 70%, #0a0510 100%)' }}
    >
      {/* SVG Filters for star glow effects */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="starRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="30%" stopColor="#ffe8cc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c9956c" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Deep space nebula glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 600px 400px at 30% 40%, rgba(125,60,94,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 500px 350px at 70% 50%, rgba(201,149,108,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 800px 300px at 50% 80%, rgba(93,26,58,0.1) 0%, transparent 60%)
          `,
        }}
      />

      {/* Background twinkling stars — three layers for depth */}
      {backgroundStars.map((star, i) => {
        const isLarge = star.size > 2
        return (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          >
            {/* Star core */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: star.brightness > 0.7
                  ? '#fff'
                  : star.brightness > 0.4
                    ? 'rgba(255,240,220,0.9)'
                    : 'rgba(200,200,255,0.7)',
                boxShadow: isLarge
                  ? `0 0 ${star.size * 2}px rgba(255,255,255,0.4), 0 0 ${star.size * 4}px rgba(201,149,108,0.2)`
                  : `0 0 ${star.size}px rgba(255,255,255,0.3)`,
              }}
              animate={{
                opacity: [
                  0.2 + star.brightness * 0.3,
                  0.8 + star.brightness * 0.2,
                  0.1 + star.brightness * 0.2,
                  0.6 + star.brightness * 0.3,
                  0.2 + star.brightness * 0.3,
                ],
                scale: [1, 1.2, 0.9, 1.15, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: star.duration,
                delay: star.delay,
                ease: 'easeInOut',
              }}
            />
            {/* Cross-shaped diffraction spike for brighter stars */}
            {isLarge && (
              <motion.div
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  width: `${star.size * 6}px`,
                  height: `${star.size * 6}px`,
                  transform: 'translate(-50%, -50%)',
                  background: `
                    linear-gradient(0deg, transparent 44%, rgba(255,255,255,0.15) 49%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 51%, transparent 56%),
                    linear-gradient(90deg, transparent 44%, rgba(255,255,255,0.15) 49%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 51%, transparent 56%)
                  `,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.2, 0.6, 0.3],
                  rotate: [0, 15, -5, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: star.duration * 1.5,
                  delay: star.delay,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.div>
        )
      })}

      {/* Shooting star animation (occasional) */}
      <motion.div
        className="absolute"
        style={{
          width: '2px',
          height: '2px',
          background: '#fff',
          borderRadius: '50%',
          boxShadow: '0 0 6px 2px rgba(255,255,255,0.6), -30px 0 20px 1px rgba(255,255,255,0.3), -60px 0 30px 0px rgba(255,255,255,0.1)',
          top: '15%',
          left: '-5%',
        }}
        animate={{
          x: ['0vw', '110vw'],
          y: ['0vh', '30vh'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          delay: 8,
          repeatDelay: 15,
          ease: 'easeIn',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            className="font-dancing text-xl mb-3"
            style={{ color: 'var(--rose-gold)' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            written in the stars
          </motion.p>
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4" style={{ color: '#FFF8F0' }}>
            The Universe of <span className="shimmer-text">Maa</span>
          </h2>
          <p className="font-lora text-base italic max-w-lg mx-auto" style={{ color: 'rgba(244,167,185,0.7)' }}>
            Every star is a piece of who she is. Hover to discover.
          </p>
        </motion.div>

        {/* Constellation Map */}
        <div className="relative w-full" style={{ height: '500px' }}>
          {/* Background heart outline glow */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ pointerEvents: 'none' }}>
            <motion.path
              d={heartPath}
              fill="none"
              stroke="rgba(201,149,108,0.06)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={visibleStars.length >= 7 ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 3, delay: 1, ease: 'easeInOut' }}
            />
            {/* Fainter filled heart */}
            <motion.path
              d={heartPath}
              fill="rgba(201,149,108,0.015)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={visibleStars.length >= 7 ? { opacity: 1 } : {}}
              transition={{ duration: 2, delay: 3 }}
            />
          </svg>

          {/* Constellation lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            {lines.map(([a, b], i) => {
              const starA = snehaTraits[a]
              const starB = snehaTraits[b]
              if (!starA || !starB) return null
              return (
                <motion.line
                  key={i}
                  x1={`${starA.x}%`} y1={`${starA.y}%`}
                  x2={`${starB.x}%`} y2={`${starB.y}%`}
                  stroke="rgba(201,149,108,0.25)"
                  strokeWidth="0.8"
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={visibleStars.length > Math.max(a, b) ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.15 }}
                />
              )
            })}
          </svg>

          {/* Constellation Stars */}
          {snehaTraits.map((trait, i) => (
            <motion.div
              key={trait.id}
              className="absolute star-dot"
              style={{ left: `${trait.x}%`, top: `${trait.y}%`, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={visibleStars.includes(i) ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              onMouseEnter={() => setActiveId(trait.id)}
              onMouseLeave={() => setActiveId(null)}
              onClick={() => setActiveId(activeId === trait.id ? null : trait.id)}
            >
              {/* Outermost subtle halo */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '80px', height: '80px',
                  background: 'radial-gradient(circle, rgba(201,149,108,0.08) 0%, rgba(201,149,108,0.02) 40%, transparent 70%)',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut' }}
              />

              {/* Middle glow ring */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '40px', height: '40px',
                  background: 'radial-gradient(circle, rgba(255,224,180,0.2) 0%, rgba(201,149,108,0.1) 40%, transparent 70%)',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.3, ease: 'easeInOut' }}
              />

              {/* Diffraction spikes — 4 pointed star */}
              <motion.div
                className="absolute"
                style={{
                  width: '40px', height: '40px',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: `
                    linear-gradient(0deg, transparent 40%, rgba(255,255,255,0.2) 48%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.2) 52%, transparent 60%),
                    linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.2) 48%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.2) 52%, transparent 60%)
                  `,
                }}
                animate={{
                  opacity: activeId === trait.id ? [0.8, 1, 0.8] : [0.3, 0.7, 0.3],
                  scale: activeId === trait.id ? 1.8 : [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{ repeat: Infinity, duration: 2.5 + i * 0.2, ease: 'easeInOut' }}
              />

              {/* Diagonal diffraction spikes */}
              <motion.div
                className="absolute"
                style={{
                  width: '28px', height: '28px',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  background: `
                    linear-gradient(0deg, transparent 42%, rgba(255,230,200,0.15) 49%, rgba(255,230,200,0.3) 50%, rgba(255,230,200,0.15) 51%, transparent 58%),
                    linear-gradient(90deg, transparent 42%, rgba(255,230,200,0.15) 49%, rgba(255,230,200,0.3) 50%, rgba(255,230,200,0.15) 51%, transparent 58%)
                  `,
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{ repeat: Infinity, duration: 3 + i * 0.3, ease: 'easeInOut' }}
              />

              {/* Star core — the actual bright point */}
              <motion.div
                className="star-inner relative rounded-full"
                style={{
                  width: activeId === trait.id ? '10px' : '6px',
                  height: activeId === trait.id ? '10px' : '6px',
                  background: 'radial-gradient(circle, #ffffff 0%, #ffe4c4 50%, rgba(201,149,108,0.6) 100%)',
                  boxShadow: activeId === trait.id
                    ? '0 0 12px 4px rgba(255,255,255,0.7), 0 0 30px 8px rgba(201,149,108,0.5), 0 0 60px 16px rgba(201,149,108,0.2)'
                    : '0 0 6px 2px rgba(255,255,255,0.5), 0 0 15px 4px rgba(201,149,108,0.3)',
                }}
                animate={{
                  scale: activeId === trait.id ? [1, 1.1, 1] : [0.9, 1.15, 0.9],
                }}
                transition={{ repeat: Infinity, duration: 1.5 + i * 0.15, ease: 'easeInOut' }}
              />

              {/* Emoji floating above */}
              <motion.span
                className="absolute text-lg"
                style={{
                  top: '-32px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  filter: 'drop-shadow(0 0 4px rgba(201,149,108,0.4))',
                }}
                animate={{
                  y: [0, -5, 0],
                  opacity: activeId === trait.id ? 1 : [0.6, 0.9, 0.6],
                }}
                transition={{ repeat: Infinity, duration: 2.5 + i * 0.2 }}
              >
                {trait.emoji}
              </motion.span>

              {/* Tooltip */}
              <AnimatePresence>
                {activeId === trait.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute z-20 w-56 rounded-2xl p-4 text-center"
                    style={{
                      bottom: '120%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(20,8,15,0.85)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(201,149,108,0.3)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,149,108,0.1)',
                    }}
                  >
                    <div className="font-playfair text-sm font-semibold mb-1" style={{ color: 'var(--petal)' }}>
                      {trait.label}
                    </div>
                    <div className="font-lora text-xs italic leading-relaxed" style={{ color: 'rgba(255,248,240,0.8)' }}>
                      {trait.description}
                    </div>
                    <div
                      className="absolute w-3 h-3 rotate-45"
                      style={{
                        bottom: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)',
                        background: 'rgba(20,8,15,0.85)',
                        borderRight: '1px solid rgba(201,149,108,0.3)',
                        borderBottom: '1px solid rgba(201,149,108,0.3)',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Star labels list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {snehaTraits.map((trait) => (
            <motion.button
              key={trait.id}
              onClick={() => setActiveId(activeId === trait.id ? null : trait.id)}
              className="px-4 py-2 rounded-full text-sm font-nunito transition-all"
              style={{
                background: activeId === trait.id ? 'rgba(201,149,108,0.3)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeId === trait.id ? 'rgba(201,149,108,0.6)' : 'rgba(255,255,255,0.1)'}`,
                color: activeId === trait.id ? 'var(--petal)' : 'rgba(255,255,255,0.5)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {trait.emoji} {trait.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
