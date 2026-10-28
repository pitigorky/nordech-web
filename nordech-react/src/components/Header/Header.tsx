import { useState, useEffect } from 'react'
import './Header.css'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'IA Aplicada', href: '#ia' },
  { label: 'Enfoque', href: '#propuesta' },
  { label: 'Contacto', href: '#contacto' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Track scroll position to enhance header backdrop on desktop/tablet
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body and html scroll, and handle Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isMobileMenuOpen ? 'header--menu-open' : ''}`}>
      <div className="container header__inner">
        {/* Brand Lockup */}
        <a href="#inicio" className="header__brand" onClick={closeMobileMenu}>
          <div className="header__brand-mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 19V5L15 15.5V5H19V19L9 8.5V19H5Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="header__brand-text">
            <span className="header__brand-name">NORDECH</span>
            <span className="header__brand-divider" aria-hidden="true">/</span>
            <span className="header__brand-descriptor">IT Partner</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Navegación principal">
          <ul className="header__nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="header__nav-item">
                <a href={link.href} className="header__nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="header__actions">
          <div className="header__status" title="Sistemas operativos y monitorizados">
            <span className="header__status-dot" aria-hidden="true"></span>
            <span className="header__status-text">Sistemas activos</span>
          </div>
          <a href="#contacto" className="header__cta">
            <span>Hablemos</span>
            <svg
              className="header__cta-arrow"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 11L11 3M11 3H4.5M11 3V9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className={`header__menu-btn ${isMobileMenuOpen ? 'is-active' : ''}`}
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-dropdown-menu"
          onClick={toggleMobileMenu}
        >
          <span className={`header__hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} aria-hidden="true">
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Panel: Solid background, full-width overlay below header */}
      <div
        id="mobile-dropdown-menu"
        className={`header__mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="header__mobile-menu-inner">
          {/* Top Status Strip */}
          <div className="header__mobile-top-bar">
            <div className="header__mobile-brand-descriptor">
              <span className="header__mobile-pulse" aria-hidden="true"></span>
              <span>NORDECH // STRATEGIC IT PARTNER</span>
            </div>
            <div className="header__mobile-status-pill">
              <span>SISTEMAS ONLINE</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="header__mobile-nav" aria-label="Navegación móvil">
            <ul className="header__mobile-nav-list">
              {NAV_LINKS.map((link, idx) => (
                <li key={link.href} className="header__mobile-nav-item">
                  <a
                    href={link.href}
                    className="header__mobile-nav-link"
                    onClick={closeMobileMenu}
                  >
                    <span className="header__mobile-nav-index">0{idx + 1}</span>
                    <span className="header__mobile-nav-label">{link.label}</span>
                    <span className="header__mobile-nav-chevron" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Operational Context Card (No false commercial guarantees) */}
          <div className="header__mobile-info-card">
            <div className="header__mobile-info-item">
              <small>MODELO OPERATIVO</small>
              <strong>Departamento IT Externo</strong>
            </div>
            <div className="header__mobile-info-divider" aria-hidden="true"></div>
            <div className="header__mobile-info-item">
              <small>COBERTURA TÉCNICA</small>
              <strong>Sistemas · Cloud · Seguridad</strong>
            </div>
          </div>

          {/* Sole Mobile CTA: Hablemos de tu IT */}
          <div className="header__mobile-cta-wrap">
            <a
              href="#contacto"
              className="header__mobile-cta"
              onClick={closeMobileMenu}
            >
              <span>Hablemos de tu IT</span>
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3 11L11 3M11 3H4.5M11 3V9.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
