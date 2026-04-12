'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function FinaleSection() {
  const launched = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !launched.current) {
        launched.current = true
        const colors = ['#FFD6E0', '#E8D5F5', '#C9956C', '#F4A7B9', '#ffffff', '#ffd700']
        const launch = () => {
          confetti({ particleCount: 8, angle: 60, spread: 80, origin: { x: 0, y: 0.8 }, colors, gravity: 0.7 })
          confetti({ particleCount: 8, angle: 120, spread: 80, origin: { x: 1, y: 0.8 }, colors, gravity: 0.7 })
        }
        const interval = setInterval(launch, 400)
        setTimeout(() => clearInterval(interval), 5000)
      }
    }, { threshold: 0.3 })

    const section = document.getElementById('finale')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const floatingEmojis = ['🌸', '✨', '💕', '🎉', '💖', '🎊', '🌟', '🥂', '💫', '🎈', '✦', '🌺']

  return (
    <section id="finale" className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0a0f 0%, #2d1021 40%, #1a0a0f 100%)' }}>
      {/* Background particles */}
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`, background: `rgba(${244},${167},${185},${Math.random() * 0.6 + 0.2})` }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: Math.random() * 5 + 3, delay: Math.random() * 5 }} />
      ))}

      {/* Floating emoji ring */}
      {floatingEmojis.map((emoji, i) => {
        const angle = (i / floatingEmojis.length) * 360
        const radius = 280
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius
        return (
          <motion.div key={i} className="absolute text-2xl pointer-events-none select-none"
            style={{ left: '50%', top: '50%' }}
            animate={{ x: [x, x + 10, x], y: [y, y - 10, y], opacity: [0.4, 0.9, 0.4], rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 + i * 0.3, delay: i * 0.2 }}>
            {emoji}
          </motion.div>
        )
      })}

      {/* Central content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ type: 'spring', stiffness: 80, damping: 12 }}>
          {/* Crown */}
          <motion.div className="text-5xl mb-6"
            animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
            👑
          </motion.div>

          {/* Main text */}
          <motion.h2 className="font-playfair text-5xl md:text-8xl font-bold mb-4 leading-tight shimmer-text"
            animate={{ scale: [1, 1.01, 1] }} transition={{ repeat: Infinity, duration: 4 }}>
            Happy Birthday,<br />Mummy
          </motion.h2>

          {/* Sparkles row */}
          <motion.div className="flex justify-center gap-4 text-2xl my-6"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            {['✦', '🌸', '✨', '💕', '✨', '🌸', '✦'].map((s, i) => (
              <motion.span key={i} animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }} style={{ color: 'var(--petal)' }}>
                {s}
              </motion.span>
            ))}
          </motion.div>

          {/* Closing quote */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.8 }}
            className="rounded-3xl p-8 md:p-12 mb-8"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', border: '1px solid rgba(244,167,185,0.2)' }}>
            <p className="font-cormorant text-2xl md:text-4xl italic leading-relaxed" style={{ color: 'rgba(255,248,240,0.9)' }}>
              "The world makes sense because of mothers like you."
            </p>
            <div className="divider mt-6" />
            <p className="font-lora text-base italic mt-4" style={{ color: 'rgba(244,167,185,0.6)' }}>
              May you always know how deeply, endlessly loved you are. 💖
            </p>
          </motion.div>

          {/* Bottom signature */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }}>
            <p className="font-dancing text-2xl mb-2" style={{ color: 'var(--rose-gold)' }}>Made with every ounce of love I have for you.</p>
            <p className="font-nunito text-xs tracking-widest uppercase" style={{ color: 'rgba(244,167,185,0.3)' }}>
              ✦ always ✦
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner decorations */}
      {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
        <motion.div key={i} className={`absolute ${pos} text-2xl opacity-30`}
          animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 20 + i * 5, ease: 'linear' }}>
          ✦
        </motion.div>
      ))}
    </section>
  )
}
