'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loveNotes } from '@/lib/data'

export default function LoveNotesSection() {
  const [activeNote, setActiveNote] = useState<number | null>(null)

  const cardColors = [
    { bg: 'from-[#FFD6E0]/80 to-[#F4A7B9]/40', border: 'border-white/50', shadow: 'shadow-[#F4A7B9]/20' },
    { bg: 'from-[#E8D5F5]/80 to-[#D4B8F0]/40', border: 'border-white/50', shadow: 'shadow-[#D4B8F0]/20' },
    { bg: 'from-[#FFE4CC]/80 to-[#F4C49A]/40', border: 'border-white/50', shadow: 'shadow-[#F4C49A]/20' },
    { bg: 'from-[#FFD6E0]/80 to-[#E8D5F5]/40', border: 'border-white/50', shadow: 'shadow-[#E8D5F5]/20' },
    { bg: 'from-[#F4A7B9]/80 to-[#FFD6E0]/40', border: 'border-white/50', shadow: 'shadow-[#F4A7B9]/20' },
  ]

  return (
    <section className="relative py-32 overflow-hidden bg-warm-white">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft glowing orbs */}
        <motion.div 
          className="absolute top-0 left-[10%] w-[500px] h-[500px] rounded-full bg-blush/20 blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-lavender/30 blur-[120px]"
          animate={{ x: [0, -70, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC0xVjM5SDBWMGg0MnoiIGZpbGw9InJnYmEoMjAxLDE0OSwxMDgsMC4wMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-[0.15]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-dancing text-2xl md:text-3xl mb-4 text-rose-gold tracking-wide"
          >
            from the heart
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.2 }}
              className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-deep-mauve"
            >
              What Makes Her Extraordinary
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-cormorant text-lg uppercase tracking-[0.2em] text-mauve/60"
          >
            Tap a card to reveal
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loveNotes.map((note, i) => {
            const isActive = activeNote === note.id
            const color = cardColors[i % cardColors.length]

            return (
              <motion.div
                key={note.id}
                layoutId={`card-container-${note.id}`}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
                className="relative group h-[280px]" // Fixed height for grid stability
                onClick={() => setActiveNote(isActive ? null : note.id)}
              >
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      layoutId={`card-${note.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={`absolute inset-0 cursor-pointer rounded-[2rem] bg-gradient-to-br ${color.bg} border ${color.border} backdrop-blur-xl shadow-xl ${color.shadow} flex flex-col items-center justify-center p-8 text-center overflow-hidden`}
                    >
                      {/* Glass glare effect */}
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-[2rem]" />
                      
                      <motion.div
                        className="text-5xl mb-6 bg-white/30 w-20 h-20 rounded-full flex items-center justify-center shadow-inner border border-white/40"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {note.emoji}
                      </motion.div>
                      
                      <h3 className="font-playfair text-2xl font-bold text-deep-mauve mb-2 px-4 leading-snug group-hover:text-mauve transition-colors">
                        {note.title}
                      </h3>
                      
                      {/* Decorative dots */}
                      <div className="absolute bottom-6 flex gap-1 opacity-40">
                         <div className="w-1.5 h-1.5 rounded-full bg-deep-mauve" />
                         <div className="w-1.5 h-1.5 rounded-full bg-deep-mauve/50" />
                         <div className="w-1.5 h-1.5 rounded-full bg-deep-mauve/20" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded State (Absolute positioned to cover grid area but visually popping out) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId={`card-${note.id}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1.05, zIndex: 50 }}
                      exit={{ opacity: 0, scale: 0.9, zIndex: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      className={`absolute inset-[-20px] cursor-pointer rounded-[2.5rem] bg-white border border-rose-gold/20 shadow-[0_40px_80px_-20px_rgba(93,26,58,0.2)] flex flex-col p-10 overflow-hidden`}
                    >
                      {/* Decorative top strip */}
                      <div className={`absolute top-0 inset-x-0 h-3 bg-gradient-to-r ${color.bg}`} />
                      
                      <div className="flex justify-between items-start mb-6 mt-2">
                        <div className="text-4xl">{note.emoji}</div>
                        <button className="text-mauve/40 hover:text-mauve transition-colors">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>

                      <h3 className="font-playfair text-2xl font-bold text-deep-mauve mb-4 pb-4 border-b border-rose-gold/20">
                        {note.title}
                      </h3>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="flex-1 overflow-y-auto pr-2 scrollbar-hide"
                      >
                         <p className="font-lora text-[1.1rem] leading-[1.8] text-mauve/90 text-justify">
                           {note.note}
                         </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          {/* Final 'More' Card */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
            className="md:col-span-2 lg:col-span-1 h-[280px]"
          >
            <div className="h-full rounded-[2rem] bg-gradient-to-br from-deep-mauve to-mauve shadow-2xl shadow-deep-mauve/30 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
               {/* Animated star pattern background */}
               <motion.div 
                 className="absolute inset-0 opacity-20"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                 style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
               />
               
               <motion.div
                className="text-5xl mb-6 relative z-10"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
               >
                ✨
               </motion.div>
               <h3 className="font-dancing text-3xl text-white/90 mb-4 leading-tight relative z-10">
                 And so many more reasons...
               </h3>
               <p className="font-lora text-sm italic text-white/50 relative z-10">
                 that words will never be enough to hold.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
