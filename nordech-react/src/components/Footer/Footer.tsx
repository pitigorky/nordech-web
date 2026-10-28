import './Footer.css'

const CURRENT_YEAR = 2026

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer__grid">
          {/* Brand & Purpose */}
          <div className="footer__brand-col">
            <a href="#inicio" className="footer__brand">
              <span className="footer__brand-mark" aria-hidden="true">N</span>
              <span className="footer__brand-name">NORDECH</span>
              <span className="footer__brand-divider" aria-hidden="true">/</span>
              <span className="footer__brand-desc">IT PARTNER</span>
            </a>

            <p className="footer__tagline">
              Tu departamento IT, sin tener que montarlo. Partner tecnológico estratégico para empresas que necesitan sistemas sólidos, cloud gestionado, ciberseguridad y automatización.
            </p>

            <div className="footer__coords">
              <span>COORD 41°23&apos;N · 02°10&apos;E</span>
              <span className="footer__coords-dot" aria-hidden="true">·</span>
              <span>BARCELONA // COBERTURA NACIONAL</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer__links-col">
            <span className="footer__col-title">NAVEGACIÓN</span>
            <ul className="footer__links-list">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#propuesta">Nuestro enfoque</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#ia">Inteligencia Artificial</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer__links-col">
            <span className="footer__col-title">ÁREAS DE SERVICIO</span>
            <ul className="footer__links-list">
              <li><a href="#servicios">Gestión IT externa</a></li>
              <li><a href="#servicios">Infraestructura y redes</a></li>
              <li><a href="#servicios">Cloud & Microsoft 365</a></li>
              <li><a href="#servicios">Ciberseguridad y EDR</a></li>
              <li><a href="#servicios">Backup y continuidad (DRP)</a></li>
              <li><a href="#ia">Automatización e IA aplicada</a></li>
            </ul>
          </div>

          {/* Contact Direct Column */}
          <div className="footer__links-col">
            <span className="footer__col-title">CONTACTO DIRECTO</span>
            <div className="footer__contact-box">
              <span className="footer__contact-label">CONSULTAS GENERALES:</span>
              <a href="mailto:info@nordech.es" className="footer__contact-email">
                info@nordech.es
              </a>
              <p className="footer__contact-note">
                Atención directa y valoración técnica por un responsable senior.
              </p>
              <a href="#contacto" className="footer__contact-cta">
                <span>Contacta con nosotros</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <span>© {CURRENT_YEAR} NORDECH. Todos los derechos reservados.</span>
          </div>

          <div className="footer__bottom-center">
            <span className="footer__live-dot" aria-hidden="true"></span>
            <span>SISTEMAS OPERATIVOS // ENTORNO MONITORIZADO</span>
          </div>

          <div className="footer__bottom-right">
            <button type="button" onClick={scrollToTop} className="footer__back-to-top">
              <span>Volver arriba</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
