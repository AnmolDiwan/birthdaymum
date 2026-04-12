'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { photos } from '@/lib/data'

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const currentPhoto = lightbox !== null ? photos[lightbox] : null

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'var(--warm-white)' }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--lavender) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="font-dancing text-xl mb-3" style={{ color: 'var(--rose-gold)' }}>captured moments</p>
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4" style={{ color: 'var(--deep-mauve)' }}>
            A Lifetime of Love
          </h2>
          <p className="font-lora text-base italic max-w-lg mx-auto mb-2" style={{ color: 'var(--mauve)', opacity: 0.8 }}>
            "Every photo captures a piece of your beautiful soul. Thank you for everything, Maa."
          </p>

        </motion.div>

        <div className="divider mb-12" />

        {/* Single Line Showcase */}
        <div className="flex flex-col items-center gap-16 w-full max-w-4xl mx-auto">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="w-full relative group cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <div
                className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-3xl p-4 shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${i % 2 === 0 ? 'var(--blush)' : 'var(--lavender)'}, var(--cream))`,
                }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[inset_0_4px_20px_rgba(0,0,0,0.1)]">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-contain"
                  />
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(93,26,58,0.3)', backdropFilter: 'blur(4px)' }}
                  >
                    <span className="text-white text-3xl font-dancing drop-shadow-md">View Photo</span>
                  </motion.div>
                </div>
              </div>
              <p className="text-center mt-6 font-dancing text-2xl text-deep-mauve transition-colors duration-300 group-hover:text-rose-gold">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Usage note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-6 rounded-2xl"
          style={{ background: 'rgba(201,149,108,0.08)', border: '1px solid rgba(201,149,108,0.2)' }}
        >
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(26,10,15,0.9)', backdropFilter: 'blur(12px)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
              style={{ background: 'var(--cream)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 pb-0">
                <div className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{ height: '65vh', maxHeight: '700px', minHeight: '300px', background: 'var(--blush)' }}>
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.caption}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <p className="font-dancing text-lg" style={{ color: 'var(--rose-gold)' }}>{currentPhoto.caption}</p>
              </div>

              {/* Navigation */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2">
                <button
                  onClick={() => setLightbox(Math.max(0, lightbox - 1))}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center"
                  style={{ color: 'var(--mauve)' }}
                  disabled={lightbox === 0}
                >
                  ←
                </button>
              </div>
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <button
                  onClick={() => setLightbox(Math.min(photos.length - 1, lightbox + 1))}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center"
                  style={{ color: 'var(--mauve)' }}
                  disabled={lightbox === photos.length - 1}
                >
                  →
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-sm"
                style={{ color: 'var(--mauve)' }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
