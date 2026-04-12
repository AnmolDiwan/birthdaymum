'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { memories } from '@/lib/data'
import Image from 'next/image'

export default function MemoryLaneSection() {
  const [flipped, setFlipped] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Use slightly smoother organic rotations for the default state
  // Use slightly smoother organic rotations for the default state
  const rotations = [-3, 2, -1.5, 3, -2]

  return (
    <section className="relative py-32 overflow-hidden bg-cream">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute top-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-blush/30 blur-[120px]"
          animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] left-[5%] w-[600px] h-[600px] rounded-full bg-lavender/30 blur-[140px]"
          animate={{ x: [0, 70, 0], y: [0, -50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC0xVjM5SDBWMGg0MnoiIGZpbGw9InJnYmEoMjAxLDE0OSwxMDgsMC4wMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-[0.2]" />
      </div>

      <div className="relative z-10 max-w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 px-6"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-dancing text-2xl md:text-3xl mb-4 text-rose-gold tracking-wide"
          >
            our story
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.2 }}
              className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-deep-mauve"
            >
              Memory Lane
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-cormorant text-lg uppercase tracking-[0.2em] text-mauve/60"
          >
            Flip each polaroid to relive the moment 📷
          </motion.p>
        </motion.div>

        {/* Horizontal scroll container with fade masks on edges */}
        <div className="relative w-full">
          {/* Edge gradients for smooth cutoffs */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-cream to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-cream to-transparent z-20 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-10 md:gap-14 overflow-x-auto pb-20 pt-8 px-12 md:px-[20vw] snap-x snap-mandatory items-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {memories.map((memory, i) => {
              const isFlipped = flipped === memory.id;
              
              return (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{ delay: i * 0.15, type: "spring", bounce: 0.3 }}
                  className="flex-shrink-0 snap-center cursor-pointer perspective-[1500px]"
                  style={{ width: '300px', height: '380px' }}
                  onClick={() => setFlipped(isFlipped ? null : memory.id)}
                >
                  <motion.div
                    className="w-full h-full relative preserve-3d"
                    initial={false}
                    animate={{ 
                      rotateY: isFlipped ? 180 : 0, 
                      scale: isFlipped ? 1.05 : 1,
                      y: isFlipped ? -10 : 0,
                      rotateZ: isFlipped ? 0 : rotations[i % rotations.length] 
                    }}
                    whileHover={{ 
                      scale: isFlipped ? 1.05 : 1.03,
                      y: isFlipped ? -10 : -8,
                      rotateZ: isFlipped ? 0 : 0
                    }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.35 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front - Polaroid */}
                    <div
                      className="absolute inset-0 flex flex-col bg-white p-4 pb-6 rounded-lg shadow-[0_20px_50px_-12px_rgba(93,26,58,0.2)]"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Photo area */}
                      <div
                          className="flex-1 rounded flex items-center justify-center relative overflow-hidden bg-mauve/5"
                        >
                          <Image
                            src={memory.src}
                            alt={memory.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 300px, 400px"
                            priority={i < 3}
                          />
                          {/* Overlay inner shadow for depth */}
                          <div className="absolute inset-0 shadow-[inset_0px_4px_20px_rgba(0,0,0,0.15)] pointer-events-none" />
                        </div>
                      
                      {/* Polaroid caption */}
                      <div className="pt-6 pb-2 text-center flex flex-col items-center justify-center">
                        <p className="font-dancing text-2xl text-deep-mauve font-semibold">{memory.title}</p>
                        <p className="font-nunito text-xs mt-2 uppercase tracking-widest text-mauve/50">{memory.date}</p>
                      </div>
                    </div>

                    {/* Back - Memory description */}
                    <div
                      className="absolute inset-0 rounded-lg p-8 flex flex-col justify-center items-center text-center bg-white border border-rose-gold/20 shadow-[0_20px_50px_-12px_rgba(201,149,108,0.3)]"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      {/* Decorative corner elements */}
                      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-rose-gold/30 rounded-tl-md" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-rose-gold/30 rounded-tr-md" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-rose-gold/30 rounded-bl-md" />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-rose-gold/30 rounded-br-md" />

                      <div className="font-dancing text-3xl mb-4 text-rose-gold opacity-80">✦</div>
                      
                      <h3 className="font-playfair text-xl font-bold mb-4 text-deep-mauve px-2 border-b border-rose-gold/20 pb-4">
                        {memory.title}
                      </h3>
                      
                      <p className="font-lora text-[0.95rem] italic leading-[1.8] text-mauve/90 flex-1 flex items-center">
                        {memory.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Scroll hint indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center justify-center mt-2 relative z-10"
        >
          <div className="flex items-center gap-4">
            <motion.div 
               animate={{ x: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
               className="text-rose-gold/40"
            >
              ←
            </motion.div>
            <span className="font-cormorant text-xs tracking-widest uppercase text-rose-gold font-semibold">
              swipe horizontally
            </span>
            <motion.div 
               animate={{ x: [0, 10, 0] }}
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
               className="text-rose-gold/40"
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
