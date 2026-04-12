'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { letter } from '@/lib/data'

export default function LetterSection() {
  const [isUnfolded, setIsUnfolded] = useState(false)
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([])
  const [showSignature, setShowSignature] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setTimeout(() => setIsUnfolded(true), 600) },
      { threshold: 0.4 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isUnfolded) return
    letter.paragraphs.forEach((_, i) => {
      setTimeout(() => setVisibleParagraphs(prev => [...prev, i]), 800 + i * 1200)
    })
    setTimeout(() => setShowSignature(true), 800 + letter.paragraphs.length * 1200 + 600)
  }, [isUnfolded])

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #2d1021 0%, #1a0a0f 100%)' }}>
      {/* Stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${Math.random() * 2 + 0.5}px`, height: `${Math.random() * 2 + 0.5}px`, background: 'rgba(255,255,255,0.4)' }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ repeat: Infinity, duration: Math.random() * 4 + 2, delay: Math.random() * 4 }} />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="font-dancing text-xl mb-3" style={{ color: 'var(--rose-gold)' }}>words from the heart</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FFF8F0' }}>A Letter For You</h2>
          <div className="flex justify-center gap-2 opacity-50">
            {['✦', '🌸', '✦'].map((s, i) => <span key={i} style={{ color: 'var(--petal)' }}>{s}</span>)}
          </div>
        </motion.div>

        {/* Paper */}
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={isUnfolded ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="letter-paper rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Paper lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute left-12 right-8 h-px opacity-30"
              style={{ top: `${60 + i * 32}px`, background: 'var(--blush)' }} />
          ))}

          {/* Red margin line */}
          <div className="absolute left-10 top-0 bottom-0 w-px opacity-20" style={{ background: '#dc3545' }} />

          <div className="relative">
            {/* Salutation */}
            <AnimatePresence>
              {isUnfolded && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="font-dancing text-2xl mb-6" style={{ color: 'var(--deep-mauve)' }}>
                  {letter.salutation}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Paragraphs */}
            <div className="space-y-5">
              {letter.paragraphs.map((para, i) => (
                <AnimatePresence key={i}>
                  {visibleParagraphs.includes(i) && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                      className="font-lora text-base leading-8 italic" style={{ color: 'var(--mauve)' }}>
                      {para}
                    </motion.p>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Signature */}
            <AnimatePresence>
              {showSignature && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-10">
                  <p className="font-lora text-base italic mb-3" style={{ color: 'var(--mauve)' }}>{letter.closing}</p>
                  <p className="font-dancing text-3xl shimmer-text">{letter.signature}</p>
                  <motion.div className="mt-6 flex gap-1" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: 0.5 }}>
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, var(--rose-gold), transparent)' }} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rose decoration */}
            <motion.div initial={{ opacity: 0 }} animate={showSignature ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}
              className="absolute -bottom-2 -right-2 text-5xl pointer-events-none select-none opacity-20">
              🌹
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
