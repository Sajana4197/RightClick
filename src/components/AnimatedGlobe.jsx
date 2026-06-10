// src/components/AnimatedGlobe.jsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedGlobe() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const R = W * 0.42

    function drawGlobe() {
      ctx.clearRect(0, 0, W, H)

      // Outer glow ring
      const grd = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.15)
      grd.addColorStop(0, 'rgba(30,144,255,0.0)')
      grd.addColorStop(0.7, 'rgba(30,144,255,0.08)')
      grd.addColorStop(1, 'rgba(30,144,255,0.22)')
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Globe base gradient
      const globeGrd = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * 0.05, cx, cy, R)
      globeGrd.addColorStop(0, 'rgba(30,80,160,0.55)')
      globeGrd.addColorStop(0.5, 'rgba(10,30,80,0.45)')
      globeGrd.addColorStop(1, 'rgba(5,10,30,0.6)')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = globeGrd
      ctx.fill()

      // Globe border
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(30,144,255,0.35)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.clip()

      // Latitude lines
      const latCount = 9
      for (let i = 1; i < latCount; i++) {
        const lat = (i / latCount) * Math.PI - Math.PI / 2
        const yr = cy + R * Math.sin(lat)
        const rr = R * Math.cos(lat)
        if (rr < 2) continue
        ctx.beginPath()
        ctx.ellipse(cx, yr, rr, rr * 0.28, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(30,144,255,0.18)'
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Longitude lines (rotating)
      const lonCount = 10
      for (let i = 0; i < lonCount; i++) {
        const angle = (i / lonCount) * Math.PI + t * 0.004
        const x1 = cx + R * Math.cos(angle)
        const x2 = cx + R * Math.cos(angle + Math.PI)
        ctx.beginPath()
        ctx.moveTo(x1, cy)
        ctx.bezierCurveTo(
          cx + R * Math.cos(angle) * 0.5, cy - R,
          cx + R * Math.cos(angle) * 0.5, cy + R,
          x2, cy
        )
        ctx.strokeStyle = 'rgba(30,144,255,0.12)'
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Animated dots on globe surface
      const dots = [
        { lat: 0.5, lon: 0.3 }, { lat: -0.3, lon: 1.2 }, { lat: 0.8, lon: 2.1 },
        { lat: -0.6, lon: 0.8 }, { lat: 0.2, lon: 1.8 }, { lat: 0.6, lon: 3.0 },
        { lat: -0.1, lon: 2.5 }, { lat: 0.9, lon: 0.6 }, { lat: -0.4, lon: 1.6 },
        { lat: 0.3, lon: 3.5 }, { lat: -0.7, lon: 2.9 }, { lat: 0.7, lon: 1.1 },
      ]
      dots.forEach(({ lat, lon }) => {
        const adjustedLon = lon + t * 0.004
        const x = cx + R * Math.cos(lat) * Math.cos(adjustedLon)
        const y = cy + R * Math.sin(lat)
        const visible = Math.cos(lat) * Math.cos(adjustedLon) > -0.1
        if (!visible) return
        const brightness = (Math.cos(lat) * Math.cos(adjustedLon) + 1) / 2
        const pulse = 0.7 + 0.3 * Math.sin(t * 0.05 + lon * 3)
        ctx.beginPath()
        ctx.arc(x, y, 2.5 * brightness, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(30,144,255,${0.5 * brightness * pulse})`
        ctx.fill()
        // glow
        const dotGrd = ctx.createRadialGradient(x, y, 0, x, y, 6)
        dotGrd.addColorStop(0, `rgba(30,144,255,${0.3 * brightness * pulse})`)
        dotGrd.addColorStop(1, 'rgba(30,144,255,0)')
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fillStyle = dotGrd
        ctx.fill()
      })

      ctx.restore()

      // Highlight sheen
      const sheenGrd = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx - R * 0.35, cy - R * 0.35, R * 0.7)
      sheenGrd.addColorStop(0, 'rgba(255,255,255,0.07)')
      sheenGrd.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = sheenGrd
      ctx.fill()

      // RightClicks R logo overlay
      ctx.save()
      ctx.font = `bold ${R * 0.55}px Inter, sans-serif`
      ctx.fillStyle = 'rgba(30,144,255,0.12)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('R', cx + R * 0.12, cy + R * 0.04)
      ctx.restore()

      t++
      animId = requestAnimationFrame(drawGlobe)
    }

    drawGlobe()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="relative w-full flex items-center justify-center"
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full"
          style={{
            width: '75%',
            aspectRatio: '1',
            background: 'radial-gradient(circle, rgba(30,144,255,0.12) 0%, rgba(30,144,255,0.04) 50%, transparent 75%)',
            filter: 'blur(24px)',
          }}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={520}
        height={520}
        className="relative z-10 w-full max-w-[520px]"
        style={{ imageRendering: 'crisp-edges' }}
      />
    </motion.div>
  )
}
