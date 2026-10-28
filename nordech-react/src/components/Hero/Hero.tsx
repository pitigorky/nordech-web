import { useEffect, useRef } from 'react'
import { TechVisual } from '../TechVisual/TechVisual'
import './Hero.css'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    // Activate only for fine-pointer devices; respect reduced-motion
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Target position (updated on every mousemove, in % of hero dims)
    let targetX = 50
    let targetY = 50
    // Current interpolated position (chases target each frame)
    let currentX = 50
    let currentY = 50
    let active = false
    const LERP = 0.08 // ~8% of remaining distance per frame → smooth lag

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      targetX = ((e.clientX - rect.left) / rect.width) * 100
      targetY = ((e.clientY - rect.top) / rect.height) * 100
      if (!active) {
        active = true
        el.style.setProperty('--halo-active', '1')
        loop()
      }
    }

    const onLeave = () => {
      active = false
      el.style.setProperty('--halo-active', '0')
      cancelAnimationFrame(rafRef.current)
    }

    const loop = () => {
      currentX += (targetX - currentX) * LERP
      currentY += (targetY - currentY) * LERP
      el.style.setProperty('--halo-x', `${currentX.toFixed(2)}%`)
      el.style.setProperty('--halo-y', `${currentY.toFixed(2)}%`)
      if (active) {
        rafRef.current = requestAnimationFrame(loop)
      }
    }

    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section ref={heroRef} className="hero" id="inicio" aria-labelledby="hero-heading">
      {/* Background Architectural Grid Accent */}
      <div className="hero__backdrop" aria-hidden="true">
        <div className="hero__glow-orb hero__glow-orb--left" />
        <div className="hero__glow-orb hero__glow-orb--right" />
        <div className="hero__grid-pattern" />
        {/* Cursor-reactive layers — pointer-events: none in CSS */}
        <div className="hero__halo" />
        <div className="hero__grid-cursor" />
      </div>

      <div className="container hero__container">
        <div className="hero__layout">
          {/* Left Column: Editorial & Value Proposition */}
          <div className="hero__content">
            {/* Editorial Positioning Badge */}
            <div className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true"></span>
              <span className="hero__badge-kicker">PARTNER IT EXTERNO</span>
              <span className="hero__badge-divider" aria-hidden="true">/</span>
              <span className="hero__badge-category">SISTEMAS · CLOUD · CIBERSEGURIDAD · IA</span>
            </div>

            {/* Headline */}
            <h1 id="hero-heading" className="hero__title">
              Tu IT.
              <span className="hero__title-accent">Bajo control.</span>
            </h1>

            {/* Value Proposition Description */}
            <p className="hero__lead">
              Sistemas, cloud y seguridad para que tu empresa funcione sin complicaciones.
            </p>

            {/* Action Group */}
            <div className="hero__actions">
              <a href="#contacto" className="hero__cta-primary">
                <span>Contacta con nosotros</span>
                <svg
                  className="hero__cta-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 11L11 3M11 3H4.5M11 3V9.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a href="#servicios" className="hero__cta-secondary">
                <span>Ver servicios</span>
                <svg
                  className="hero__cta-secondary-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 2V12M7 12L3 8M7 12L11 8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Tech Visual */}
          <div className="hero__visual">
            <TechVisual />
          </div>
        </div>

      </div>
    </section>
  )
}
