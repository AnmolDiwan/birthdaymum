'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EntranceProps {
  onEnter: () => void
}

export default function EntranceSection({ onEnter }: EntranceProps) {
  const [phase, setPhase] = useState<'dark' | 'text1' | 'text2' | 'name' | 'button'>('dark')
  const [displayedText1, setDisplayedText1] = useState('')
  const [displayedText2, setDisplayedText2] = useState('')

  const text1 = "Some people hold the whole world together…"
  const text2 = "…and she is one of them."

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text1'), 1000)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase === 'text1') {
      let i = 0
      const interval = setInterval(() => {
        setDisplayedText1(text1.slice(0, i + 1))
        i++
        if (i >= text1.length) {
          clearInterval(interval)
          setTimeout(() => setPhase('text2'), 400)
        }
      }, 45)
      return () => clearInterval(interval)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'text2') {
      let i = 0
      const interval = setInterval(() => {
        setDisplayedText2(text2.slice(0, i + 1))
        i++
        if (i >= text2.length) {
          clearInterval(interval)
          setTimeout(() => setPhase('name'), 600)
        }
      }, 45)
      return () => clearInterval(interval)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'name') {
      setTimeout(() => setPhase('button'), 1800)
    }
  }, [phase])

  return (
    <motion.div
      className="entrance-overlay"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Star field background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              background: `rgba(${244},${167},${185},${Math.random() * 0.7 + 0.2})`,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,149,108,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Text 1 */}
        <AnimatePresence>
          {(phase === 'text1' || phase === 'text2' || phase === 'name' || phase === 'button') && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-cormorant text-xl md:text-2xl italic"
              style={{ color: 'rgba(244,167,185,0.85)', letterSpacing: '0.05em' }}
            >
              {displayedText1}
              {phase === 'text1' && <span className="typewriter-cursor" />}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Text 2 */}
        <AnimatePresence>
          {(phase === 'text2' || phase === 'name' || phase === 'button') && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-cormorant text-xl md:text-2xl italic"
              style={{ color: 'rgba(232,213,245,0.85)', letterSpacing: '0.05em' }}
            >
              {displayedText2}
              {phase === 'text2' && <span className="typewriter-cursor" />}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Name */}
        <AnimatePresence>
          {(phase === 'name' || phase === 'button') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                className="text-7xl md:text-9xl font-dancing shimmer-text"
                style={{ lineHeight: 1.1 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                Mummy
              </motion.div>
              <motion.div
                className="font-cormorant text-sm tracking-[0.4em] uppercase"
                style={{ color: 'rgba(201,149,108,0.7)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                ✦ her day has arrived ✦
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enter Button */}
        <AnimatePresence>
          {phase === 'button' && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onClick={onEnter}
              className="mt-4 relative group"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(201,149,108,0.2)', filter: 'blur(12px)' }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <div
                className="relative px-10 py-4 rounded-full font-cormorant text-lg tracking-widest uppercase border"
                style={{
                  borderColor: 'rgba(201,149,108,0.5)',
                  color: 'rgba(244,167,185,0.9)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  letterSpacing: '0.25em',
                }}
              >
                Celebrate Her
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decoration */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
      >
        {['🌺', '✨', '💖', '✨', '🌺'].map((s, i) => (
          <span key={i} className="text-sm">{s}</span>
        ))}
      </motion.div>
    </motion.div>
  )
}
