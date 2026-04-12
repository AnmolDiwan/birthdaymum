'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions } from '@/lib/data'

export default function QuizSection() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [answers, setAnswers] = useState<boolean[]>([])

  const question = quizQuestions[current]

  const handleSelect = (index: number, isRight: boolean) => {
    if (selected !== null) return
    setSelected(index)
    setShowFeedback(true)
    setAnswers(prev => [...prev, isRight])
  }

  const handleNext = () => {
    if (current + 1 >= quizQuestions.length) {
      setCompleted(true)
    } else {
      setCurrent(prev => prev + 1)
      setSelected(null)
      setShowFeedback(false)
    }
  }

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setShowFeedback(false)
    setCompleted(false)
    setAnswers([])
  }

  return (
    <section className="relative py-32 overflow-hidden bg-warm-white">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute top-[0%] right-[0%] w-[500px] h-[500px] rounded-full bg-blush/20 blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] rounded-full bg-lavender/25 blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC0xVjM5SDBWMGg0MnoiIGZpbGw9InJnYmEoMjAxLDE0OSwxMDgsMC4wMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-dancing text-2xl md:text-3xl mb-4 text-rose-gold tracking-wide"
          >
            just for fun
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.2 }}
              className="font-playfair text-5xl md:text-6xl font-bold text-deep-mauve"
            >
              How Well Do You Know Yourself?
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-lora text-lg italic text-mauve/80"
          >
            A little quiz, made just for you 🌸
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div 
              key={current} 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 1.05, y: -20 }} 
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            >
              {/* Sleek Progress Indicator */}
              <div className="flex gap-3 mb-10 justify-center">
                {quizQuestions.map((_, i) => (
                  <div 
                    key={i} 
                    className="h-1.5 rounded-full flex-1 max-w-[3rem] transition-all duration-700 ease-out relative overflow-hidden"
                    style={{ background: i < current ? 'var(--rose-gold)' : i === current ? 'var(--mauve)' : 'rgba(201,149,108,0.2)' }} 
                  >
                    {i === current && (
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-white/40 blur-[1px]"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* High-End Glass Question Card */}
              <div className="glass rounded-[2.5rem] p-8 md:p-14 mb-8 relative overflow-hidden border border-white/60 shadow-[0_32px_64px_-12px_rgba(93,26,58,0.1)]">
                {/* Decorative glowing gradient inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-gold/5 rounded-full blur-[60px] pointer-events-none -mr-32 -mt-32" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-rose-gold/30" />
                  <div className="font-nunito text-xs tracking-[0.2em] uppercase font-bold text-rose-gold">
                    Question {current + 1} of {quizQuestions.length}
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-rose-gold/30" />
                </div>

                <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-deep-mauve text-center leading-snug">
                  {question.question}
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {question.options.map((option, i) => {
                    const isSelected = selected === i
                    const isCorrect = option.isRight

                    // Styling logic for options based on state
                    let baseClass = "bg-white/50 border-rose-gold/20 text-deep-mauve hover:border-rose-gold/60 hover:bg-white/80 hover:shadow-md"
                    let iconClass = "text-rose-gold/50"

                    if (showFeedback) {
                      if (isCorrect) {
                        baseClass = "bg-[#d4edda]/40 border-[#28a745]/50 text-[#155724] shadow-[0_0_20px_rgba(40,167,69,0.15)]"
                        iconClass = "text-[#28a745]"
                      } else if (isSelected && !isCorrect) {
                        baseClass = "bg-[#f8d7da]/40 border-[#dc3545]/50 text-[#721c24]"
                        iconClass = "text-[#dc3545]"
                      } else {
                        baseClass = "bg-white/30 border-transparent text-mauve/40 opacity-50"
                      }
                    } else if (isSelected) {
                      baseClass = "bg-blush/30 border-rose-gold text-deep-mauve shadow-lg"
                    }

                    return (
                      <motion.button 
                        key={i} 
                        onClick={() => handleSelect(i, isCorrect)}
                        className={`group relative text-left px-6 py-5 rounded-2xl font-lora text-[1.05rem] border transition-all duration-300 flex items-center justify-between ${baseClass}`}
                        whileHover={selected === null ? { scale: 1.01, y: -2 } : {}}
                        whileTap={selected === null ? { scale: 0.99 } : {}}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`font-nunito text-xs uppercase tracking-widest font-bold opacity-70 transition-colors ${iconClass}`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="leading-relaxed">{option.text}</span>
                        </div>
                        
                        <div className="flex-shrink-0 ml-4">
                           {showFeedback && isCorrect && <motion.span initial={{scale:0, rotate:-180}} animate={{scale:1, rotate:0}} className={`text-xl ${iconClass}`}>✓</motion.span>}
                           {showFeedback && isSelected && !isCorrect && <motion.span initial={{scale:0, rotate:180}} animate={{scale:1, rotate:0}} className={`text-xl ${iconClass}`}>✕</motion.span>}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Sleek Feedback Popup */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -10 }} 
                    animate={{ opacity: 1, height: 'auto', y: 0 }} 
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl p-6 mb-8 text-center bg-white/60 border border-white/80 backdrop-blur-md shadow-xl shadow-rose-gold/5 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-rose-gold/20 via-rose-gold to-rose-gold/20" />
                      <p className="font-lora text-[1.05rem] italic text-deep-mauve">{question.feedback}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button Animation */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center pb-12"
                  >
                    <motion.button 
                      onClick={handleNext}
                      className="group relative px-10 py-4 rounded-full font-nunito text-sm tracking-[0.15em] uppercase font-bold overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, var(--deep-mauve), var(--mauve))', color: 'white', boxShadow: '0 10px 30px rgba(93,26,58,0.25)' }}
                      whileHover={{ scale: 1.05, y: -3 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {current + 1 >= quizQuestions.length ? 'See Your Result' : 'Next Question'}
                        <motion.span 
                           animate={current + 1 >= quizQuestions.length ? { rotate: [0, 15, -15, 0] } : { x: [0, 4, 0] }}
                           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                          {current + 1 >= quizQuestions.length ? '✨' : '→'}
                        </motion.span>
                      </span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-out_infinite]" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              key="result" 
              initial={{ opacity: 0, scale: 0.9, y: 40 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="text-center relative"
            >
              <div className="relative z-10 rounded-[3rem] p-10 md:p-16 glass border border-white/60 shadow-[0_40px_80px_-20px_rgba(93,26,58,0.15)] overflow-hidden">
                
                {/* Result Confetti/Sparkles pure CSS logic embedded */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_0%,var(--petal),transparent_60%)]" />

                <motion.div 
                  className="text-7xl mb-8 drop-shadow-xl" 
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  👑
                </motion.div>

                <div className="font-nunito text-sm tracking-[0.2em] font-bold uppercase mb-3 text-rose-gold">
                  Your Result
                </div>
                
                <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-deep-mauve leading-tight">
                  You are: <br className="md:hidden" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-deep-mauve via-mauve to-rose-gold">
                    The Rarest Kind of Person
                  </span>
                </h3>
                
                <motion.div 
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="w-24 h-[2px] bg-gradient-to-r from-transparent via-rose-gold/50 to-transparent mx-auto mb-8" 
                />
                
                <p className="font-lora text-[1.1rem] md:text-lg italic leading-[1.9] mb-10 text-mauve/90 max-w-2xl mx-auto">
                  Strong, selfless, endlessly patient, and overflowing with love. You put everyone first without a second thought, carry the weight of the whole family on your shoulders, and still show up every day with warmth and grace. You are the kind of person this world needs more of — and we are so incredibly lucky to have you.
                </p>
                
                <div className="flex justify-center gap-3 flex-wrap mb-10">
                  {['Loving ❤️', 'Strong 🌿', 'Wise 💫', 'Selfless 🌟', 'Home 🏡'].map((tag, i) => (
                    <motion.span 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                      className="px-5 py-2 rounded-full text-xs font-nunito font-semibold border shadow-sm" 
                      style={{ background: 'var(--warm-white)', color: 'var(--deep-mauve)', borderColor: 'var(--blush)' }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <motion.button 
                  onClick={restart} 
                  whileHover={{ scale: 1.05 }}
                  className="font-nunito text-sm tracking-widest uppercase font-bold text-rose-gold/80 hover:text-rose-gold transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-right after:scale-x-0 after:bg-rose-gold hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  Play again?
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
