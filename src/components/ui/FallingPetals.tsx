'use client'
import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: string
  size: string
  duration: string
  delay: string
  opacity: number
  rotate: number
}

export default function FallingPetals({ count = 15 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 14 + 8}px`,
      duration: `${Math.random() * 6 + 6}s`,
      delay: `${Math.random() * 8}s`,
      opacity: Math.random() * 0.5 + 0.4,
      rotate: Math.random() * 360,
    }))
    setPetals(generated)
  }, [count])

  const petalSVG = (size: string, rotate: number) => (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ transform: `rotate(${rotate}deg)` }}>
      <ellipse cx="20" cy="20" rx="8" ry="18"
        fill="url(#petalGrad)"
        transform="rotate(-30 20 20)"
      />
      <defs>
        <radialGradient id="petalGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#FFD6E0" />
          <stop offset="100%" stopColor="#F4A7B9" stopOpacity="0.7" />
        </radialGradient>
      </defs>
    </svg>
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            top: '-30px',
            opacity: petal.opacity,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
          }}
        >
          {petalSVG(petal.size, petal.rotate)}
        </div>
      ))}
    </div>
  )
}
