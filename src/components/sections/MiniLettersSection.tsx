'use client'
import { motion } from 'framer-motion'
import { tinyLetters } from '@/lib/data'
import Image from 'next/image'

export default function MiniLettersSection() {
  return (
    <section className="relative py-20 bg-warm-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-mauve mb-4 relative inline-block">
            Little Notes of Love
          </h2>
          <p className="font-lora italic text-mauve/70 md:hidden">Read from our hearts</p>
          <p className="font-lora italic text-mauve/70 hidden md:block">Swipe to read</p>
        </motion.div>

        {/* Stacked vertically on mobile (3 rows), horizontal on desktop */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch md:justify-center md:overflow-x-auto gap-8 pb-8 pt-4 px-4 w-full">
          {tinyLetters.map((letter, index) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full max-w-[340px] md:w-[320px] shrink-0 h-[480px] rounded-[1.5rem] bg-gradient-to-br from-[#FFF8F0] to-[#FFFAF5] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-rose-gold/20 flex flex-col items-center p-6 relative group"
              whileHover={{ y: -5 }}
            >
              {/* Top Image (bigger: w-32 h-32) */}
              <div className="w-32 h-32 rounded-full overflow-hidden mb-5 border-4 border-white shadow-sm relative shrink-0">
                <Image
                  src={letter.image}
                  alt={letter.author}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Mini letter wrapping (vertically scrollable text) */}
              <div className="flex-1 w-full relative bg-white/50 rounded-xl p-4 border border-rose-gold/10 flex flex-col overflow-hidden">
                <div className="absolute top-2 left-2 text-2xl text-rose-gold/30 font-serif leading-none">&quot;</div>
                
                <div className="overflow-y-auto scrollbar-hide px-2 pt-2 pb-2 mt-2 mb-2 z-10 flex-1">
                  <p className="font-lora text-sm text-mauve/80 leading-relaxed text-center italic relative">
                    {letter.message}
                  </p>
                </div>

                <div className="absolute bottom-[-10px] right-2 text-2xl text-rose-gold/30 font-serif leading-none">&quot;</div>
              </div>

              {/* Author */}
              <div className="mt-4 w-full text-center">
                <span className="font-dancing text-2xl text-deep-mauve font-bold shadow-sm">
                  ~ {letter.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
