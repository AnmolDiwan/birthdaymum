'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function HeroSection() {
  const hasLaunched = useRef(false)
  const { scrollYProgress } = useScroll()
  const yParallaxText = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    if (hasLaunched.current) return
    hasLaunched.current = true

    const duration = 5000
    const end = Date.now() + duration
    const colors = ['#FFD6E0', '#E8D5F5', '#C9956C', '#F4A7B9', '#ffffff']

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
        shapes: ['circle'],
        gravity: 0.6,
        scalar: 0.8,
        ticks: 300,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
        shapes: ['circle'],
        gravity: 0.6,
        scalar: 0.8,
        ticks: 300,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    setTimeout(frame, 1500)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream pt-20">
      {/* Base Dynamic Background Gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at top left, var(--blush) 0%, transparent 50%), radial-gradient(ellipse at bottom right, var(--lavender) 0%, transparent 50%), radial-gradient(ellipse at center, var(--cream) 0%, transparent 70%)',
          opacity: 0.8
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated Glowing Orbs (Pure CSS Depth) */}
      <motion.div 
        className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-[80px] bg-rose-gold/20 z-0"
        animate={{ y: [0, 40, 0], x: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[100px] bg-petal/30 z-0"
        animate={{ y: [0, -50, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating CSS Petals and Sparkles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* CSS Petals */}
        {Array.from({ length: 12 }).map((_, i) => (
           <motion.div
             key={`petal-${i}`}
             className="absolute"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${-10 - Math.random() * 20}%`,
               width: `${15 + Math.random() * 20}px`,
               height: `${15 + Math.random() * 20}px`,
               background: `linear-gradient(135deg, ${i % 2 === 0 ? 'var(--petal)' : 'var(--blush)'} 0%, transparent 100%)`,
               borderRadius: '50% 0 50% 0', // Leaf/Petal shape
               filter: 'blur(1px)',
               opacity: 0.6,
               boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)',
             }}
             animate={{
               y: ['-10vh', '110vh'],
               x: [0, Math.sin(i) * 60, Math.cos(i) * 60, 0],
               rotate: [0, 360, 720],
             }}
             transition={{
               duration: 10 + Math.random() * 8,
               repeat: Infinity,
               delay: Math.random() * 5,
               ease: "linear"
             }}
           />
        ))}

        {/* Floating Sparkles */}
        {Array.from({ length: 20 }).map((_, i) => (
           <motion.div
             key={`sparkle-${i}`}
             className="absolute rounded-full"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               width: `${3 + Math.random() * 4}px`,
               height: `${3 + Math.random() * 4}px`,
               background: '#ffffff',
               boxShadow: `0 0 ${10 + Math.random() * 10}px #ffffff`,
             }}
             animate={{
               y: ['0vh', `-${20 + Math.random() * 40}vh`],
               opacity: [0, 0.8, 0],
               scale: [0, 1.5, 0],
             }}
             transition={{
               duration: 5 + Math.random() * 5,
               repeat: Infinity,
               delay: Math.random() * 5,
               ease: "easeInOut"
             }}
           />
        ))}
      </div>

      {/* Main Glass Container */}
      <motion.div 
        className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center"
        style={{ y: yParallaxText, opacity: opacityFade }}
      >
        <div className="glass rounded-[3rem] p-8 md:p-16 border border-white/50 shadow-[0_32px_64px_-12px_rgba(93,26,58,0.15)] relative overflow-hidden backdrop-blur-xl">
          
          {/* Inner subtle glow and texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 -z-10" />
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent opacity-50" />

          {/* Animated decorative line */}
          <motion.div 
            className="absolute top-0 left-[20%] w-[100px] h-px bg-white"
            style={{ filter: 'blur(2px)' }}
            animate={{ x: [-200, 800] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 2 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-dancing text-2xl md:text-3xl mb-6 text-rose-gold tracking-wider"
          >
            ✨ Today is All About You ✨
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0, rotateZ: 3 }}
              animate={{ y: 0, opacity: 1, rotateZ: 0 }}
              transition={{ duration: 1.2, delay: 0.5, type: "spring", bounce: 0.3 }}
              className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold leading-tight text-deep-mauve drop-shadow-sm"
            >
              Happy <br className="md:hidden"/> Birthday,
              <br />
              <span className="shimmer-text block mt-2">Maa</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
            className="w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-gold/60 to-transparent mx-auto my-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="font-lora text-xl md:text-3xl italic max-w-3xl mx-auto leading-relaxed text-mauve/90 font-medium"
          >
            "You gave me the world before I even knew what the world was."
          </motion.p>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="absolute left-1/2 -bottom-24 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-rose-gold font-semibold">
            Scroll to celebrate her
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border border-rose-gold/40 flex items-center justify-center text-rose-gold/80 backdrop-blur-md bg-white/20 shadow-sm"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
