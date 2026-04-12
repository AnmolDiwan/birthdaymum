'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const CANDLE_COUNT = 6

export default function WishSection() {
  const [blown, setBlown] = useState<number[]>([])
  const [wishRevealed, setWishRevealed] = useState(false)
  const [blowingAll, setBlowingAll] = useState(false)

  const allBlown = blown.length === CANDLE_COUNT

  const blowCandle = (id: number) => {
    if (blown.includes(id) || wishRevealed) return
    setBlown(prev => [...prev, id])
  }

  useEffect(() => {
    if (allBlown && !wishRevealed) {
      setTimeout(() => {
        setWishRevealed(true)
        const colors = ['#FFD6E0', '#E8D5F5', '#C9956C', '#F4A7B9', '#ffffff', '#ffd700']
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors })
        setTimeout(() => confetti({ particleCount: 100, angle: 60, spread: 80, origin: { x: 0 }, colors }), 300)
        setTimeout(() => confetti({ particleCount: 100, angle: 120, spread: 80, origin: { x: 1 }, colors }), 600)
      }, 600)
    }
  }, [allBlown, wishRevealed])

  const blowAll = () => {
    if (blowingAll) return
    setBlowingAll(true)
    Array.from({ length: CANDLE_COUNT }).forEach((_, i) => {
      setTimeout(() => setBlown(prev => [...prev, i]), i * 200)
    })
  }

  const reset = () => {
    setBlown([])
    setWishRevealed(false)
    setBlowingAll(false)
  }

  return (
    <section className="relative py-32 overflow-hidden bg-cream">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute top-[0%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blush/20 blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-lavender/25 blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC0xVjM5SDBWMGg0MnoiIGZpbGw9InJnYmEoMjAxLDE0OSwxMDgsMC4wMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-dancing text-2xl md:text-3xl mb-4 text-rose-gold tracking-wide"
          >
            close your eyes
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.2 }}
              className="font-playfair text-5xl md:text-6xl font-bold text-deep-mauve"
            >
              Make a Wish 🕯️
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-lora text-lg italic text-mauve/80"
          >
            {allBlown ? 'Your wish is on its way… ✨' : 'Tap each candle to blow it out'}
          </motion.p>
        </motion.div>

        {/* Enhanced CSS Cake */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 40 }} 
          whileInView={{ opacity: 1, scale: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
          className="relative"
        >
          {/* Magical Aura Behind Cake */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-rose-gold/10 blur-[60px] rounded-full pointer-events-none" />

          {/* Candles */}
          <div className="flex justify-center gap-4 mb-2 relative z-10">
            {Array.from({ length: CANDLE_COUNT }).map((_, i) => {
              const isBlown = blown.includes(i)
              // Fixed random seeds so hydration matches
              const randomDuration = 0.5 + (i % 3) * 0.2; 
              
              return (
                <motion.div 
                  key={i} 
                  className="flex flex-col items-center cursor-pointer group" 
                  onClick={() => blowCandle(i)}
                  whileHover={!isBlown ? { scale: 1.1 } : {}} 
                  whileTap={!isBlown ? { scale: 0.95 } : {}}
                >
                  {/* Fluttering Flame */}
                  <AnimatePresence>
                    {!isBlown && (
                      <motion.div 
                        key="flame" 
                        initial={{ scale: 1, opacity: 1 }} 
                        exit={{ scale: 0, opacity: 0, y: -10, transition: { duration: 0.2 } }} 
                        animate={{ 
                           rotate: [-2, 2, -1, 3, -2], 
                           scaleY: [1, 1.1, 0.95, 1.05, 1], 
                           scaleX: [1, 0.95, 1.05, 0.95, 1] 
                        }}
                        transition={{ repeat: Infinity, duration: randomDuration, ease: "easeInOut" }}
                        className="candle-flame origin-bottom mb-1 filter drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]"
                      >
                        <svg width="16" height="24" viewBox="0 0 16 24">
                          <ellipse cx="8" cy="18" rx="6" ry="8" fill="#FFB347" opacity="0.8" />
                          <ellipse cx="8" cy="14" rx="4" ry="10" fill="#FFD700" />
                          <ellipse cx="8" cy="10" rx="2.5" ry="7" fill="#FFF5CC" />
                          <ellipse cx="8" cy="6" rx="1.5" ry="4" fill="white" opacity="0.9" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {isBlown && (
                    <motion.div 
                       initial={{ opacity: 1, y: 0 }}
                       animate={{ opacity: 0, y: -20, scale: 1.5 }}
                       transition={{ duration: 1 }}
                       className="w-4 h-6 mb-1 flex items-end justify-center pointer-events-none"
                    >
                      <div className="w-1 h-3 bg-gray-300/40 rounded-full blur-[1px]" />
                    </motion.div>
                  )}

                  {/* High-End Candle stick */}
                  <div className="w-5 rounded-t-sm relative overflow-hidden shadow-inner" style={{
                    height: '45px',
                    background: `linear-gradient(135deg, ${['#FFD6E0','#E8D5F5','#F4A7B9','#FFE4CC','#D4B8F0','#FFD6E0'][i]} 0%, white 100%)`,
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.05)'
                  }}>
                    {/* Inner highlight */}
                    <div className="absolute inset-y-0 left-0 w-1 bg-white/40" />
                    {/* Wax drip */}
                    {isBlown && <div className="absolute top-0 left-1 w-2 h-5 rounded-b-full opacity-60 bg-white" />}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Elaborate CSS Cake Body */}
          <div className="relative mx-auto drop-shadow-2xl" style={{ maxWidth: '340px' }}>
            {/* Top tier */}
            <div className="mx-auto rounded-t-3xl relative overflow-hidden z-10" style={{
              height: '65px', width: '230px',
              background: 'linear-gradient(135deg, #FFB6C1, #FF8FAB)',
              boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.5), 0 4px 0 rgba(140,50,70,0.15)',
            }}>
              <div className="absolute bottom-0 left-0 right-0 h-5" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.3), transparent)' }} />
              {/* Frosting dripping beautifully */}
              {[10, 25, 45, 65, 85].map((left, i) => (
                <div key={i} className="absolute top-0 rounded-b-full bg-white/80 shadow-sm" style={{ left: `${left}%`, width: '18px', height: `${15 + (i%2)*10}px` }} />
              ))}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center font-dancing text-white/90 text-2xl drop-shadow-md">
                Happy Birthday!
              </div>
            </div>

            {/* Bottom tier */}
            <div className="mx-auto rounded-b-[2rem] rounded-t-sm relative overflow-hidden" style={{
              height: '90px', width: '320px',
              background: 'linear-gradient(135deg, #DFB595, #C9956C)',
              boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.3)',
            }}>
              <div className="absolute top-0 left-0 right-0 h-4 bg-black/5" />
              {/* Decoration dots (pearls) */}
              {[12, 28, 43, 58, 73, 88].map((left, i) => (
                <div key={i} className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-sm" style={{ 
                  left: `${left}%`, 
                  background: `radial-gradient(circle at 30% 30%, white, ${['#FFD6E0','#E8D5F5','#FFF8F0','#F4A7B9','#E8D5F5','#FFD6E0'][i]})` 
                }} />
              ))}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <span className="font-dancing text-white/90 text-2xl font-bold tracking-wider drop-shadow-md"> Mummy ✨ </span>
              </div>
            </div>

            {/* Premium Plate/Stand */}
            <div className="mx-auto rounded-full mt-2 relative overflow-hidden" 
                 style={{ height: '20px', width: '360px', background: 'linear-gradient(180deg, #f5f5f5, #d4d4d4)', boxShadow: '0 10px 20px rgba(93,26,58,0.2)' }}>
              <div className="absolute top-0 inset-x-0 h-[2px] bg-white opacity-80" />
            </div>
          </div>
        </motion.div>

        {/* Blow all button with Glassmorphism */}
        {!allBlown && (
          <AnimatePresence>
            <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               exit={{ opacity: 0 }}
               transition={{ delay: 0.6 }} 
               className="mt-12"
            >
              <motion.button 
                onClick={blowAll}
                className="group relative px-8 py-4 rounded-full font-nunito text-sm tracking-widest uppercase font-bold overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)', color: 'var(--deep-mauve)', boxShadow: '0 8px 32px rgba(93,26,58,0.08)' }}
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.6)' }} 
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>💨</motion.span>
                  Blow all candles
                </span>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Ultimate Premium Wish Reveal */}
        <AnimatePresence>
          {wishRevealed && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 40 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ type: 'spring', stiffness: 100, delay: 0.4 }} 
              className="mt-16"
            >
              <div className="relative glass rounded-[3rem] p-10 md:p-14 overflow-hidden border border-white/60 shadow-[0_40px_80px_-20px_rgba(93,26,58,0.15)]">
                
                {/* Embedded decorative lighting */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/5 opacity-80 -z-10" />
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-rose-gold/20 rounded-full blur-[60px]" />

                <motion.div 
                  className="text-5xl mb-6 drop-shadow-xl"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  🌟
                </motion.div>
                
                <h3 className="font-playfair text-3xl md:text-5xl font-bold mb-6 text-deep-mauve">Your wish is on its way</h3>
                
                <motion.div 
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-gold/50 to-transparent mx-auto mb-8" 
                />
                
                <p className="font-lora text-[1.15rem] md:text-xl italic leading-[1.8] text-deep-mauve mb-6 max-w-xl mx-auto font-medium">
                  "May this year bring you everything you deserve — and you deserve everything beautiful."
                </p>
                
                <p className="font-lora text-base italic leading-relaxed text-mauve/80 mb-4 max-w-xl mx-auto">
                  More rest, more joy, more laughter. You have given so much — today it all comes back to you. 💖
                </p>
              </div>

              <motion.button 
                onClick={reset} 
                className="mt-8 font-nunito text-xs uppercase tracking-widest font-bold text-rose-gold/70 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-right after:scale-x-0 after:bg-rose-gold hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300" 
                whileHover={{ color: 'var(--rose-gold)' }}
              >
                ↺ Relight candles
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
