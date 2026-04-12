'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
    setShowTooltip(false)
  }

  return (
    <>
      {/* Replace /music/background.mp3 with your actual music file */}
      <audio ref={audioRef} loop>
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed top-6 right-6 z-[1000] flex items-center gap-3">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass rounded-full px-4 py-2 text-xs font-nunito text-mauve"
            >
              🎵 Play music
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="music-btn"
          onClick={toggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="flex gap-0.5"
            >
              {[0,1,2].map(i => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-rose-gold rounded-full"
                  animate={{ height: ['8px', '16px', '8px'] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                  style={{ background: 'var(--rose-gold)' }}
                />
              ))}
            </motion.div>
          ) : (
            <span style={{ color: 'var(--rose-gold)' }}>♪</span>
          )}
        </motion.button>
      </div>
    </>
  )
}
