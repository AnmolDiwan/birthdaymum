'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX - 10 + 'px'
      cursor.style.top = mouseY - 10 + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      follower.style.left = followerX - 4 + 'px'
      follower.style.top = followerY - 4 + 'px'
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    animate()

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('button, a, [data-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)'
        cursor.style.borderColor = 'var(--mauve)'
        cursor.style.background = 'rgba(201,149,108,0.1)'
      })
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)'
        cursor.style.borderColor = 'var(--rose-gold)'
        cursor.style.background = 'transparent'
      })
    })

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
