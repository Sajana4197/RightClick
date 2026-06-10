// src/hooks/useLenis.js
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

let lenisInstance = null

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    lenisInstance = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el && lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -72, duration: 1.4 })
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
