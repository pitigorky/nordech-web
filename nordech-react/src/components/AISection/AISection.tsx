import './AISection.css'

interface Capability {
  icon: React.ReactNode
  label: string
  desc: string
}

// Simple inline SVG icons replacing emoji
const IconLightning = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" fill="#0052FF" />
  </svg>
)

const IconRobot = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="8" width="14" height="10" rx="2" stroke="#0052FF" strokeWidth="1.8" />
    <circle cx="9" cy="13" r="1.5" fill="#0052FF" />
    <circle cx="15" cy="13" r="1.5" fill="#0052FF" />
    <path d="M12 4V8" stroke="#0052FF" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="3.5" r="1.5" fill="#0052FF" />
    <path d="M3 12H5M19 12H21" stroke="#0052FF" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="14" width="4" height="7" rx="1" fill="#0052FF" />
    <rect x="10" y="9" width="4" height="12" rx="1" fill="#0052FF" />
    <rect x="17" y="4" width="4" height="17" rx="1" fill="#0052FF" />
  </svg>
)

const IconLink = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#0052FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#0052FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const AI_CAPABILITIES: Capability[] = [
  { icon: <IconLightning />, label: 'Automatización de procesos', desc: 'Eliminamos tareas manuales y rutinarias conectando sistemas.' },
  { icon: <IconRobot />,     label: 'Asistentes internos con IA',  desc: 'Chatbots y agentes inteligentes para equipos de trabajo.' },
  { icon: <IconChart />,     label: 'Análisis e informes automáticos', desc: 'Extrae insights de tus datos sin esfuerzo manual.' },
  { icon: <IconLink />,      label: 'Integración entre plataformas',   desc: 'Conectamos tus herramientas de negocio de forma segura.' },
]

// Satellite node definition
interface SatelliteNode {
  cx: number
  cy: number
  label: string
  motionPath: string
  dur: string
  begin: string
}

const SATELLITES: SatelliteNode[] = [
  { cx: 210, cy:  60, label: 'DATA',  motionPath: 'M210,170 L210,60',   dur: '2s',   begin: '0s'    },
  { cx: 320, cy: 170, label: 'CLOUD', motionPath: 'M210,170 L320,170',  dur: '2.4s', begin: '0.6s'  },
  { cx: 210, cy: 280, label: 'AUTO',  motionPath: 'M210,170 L210,280',  dur: '2.2s', begin: '1.2s'  },
  { cx: 100, cy: 170, label: 'IA',    motionPath: 'M210,170 L100,170',  dur: '2.6s', begin: '1.8s'  },
]

function AIFlowSVG() {
  return (
    <svg
      className="ai-section__svg"
      viewBox="0 0 420 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagrama de flujo de IA"
    >
      <defs>
        {/* Electric-blue gradient for center node */}
        <radialGradient id="ai-core-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2979FF" />
          <stop offset="100%" stopColor="#0052FF" />
        </radialGradient>

        {/* Glow filter */}
        <filter id="ai-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Background subtle grid ── */}
      <g opacity="0.2">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`vg-${i}`} x1={i * 60} y1="0" x2={i * 60} y2="340" stroke="#0052FF" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`hg-${i}`} x1="0" y1={i * 60} x2="420" y2={i * 60} stroke="#0052FF" strokeWidth="0.5" />
        ))}
      </g>

      {/* ── Corner technical markers ── */}
      {[
        { x: 16, y: 16 },
        { x: 404, y: 16 },
        { x: 16, y: 324 },
        { x: 404, y: 324 },
      ].map((pos, i) => (
        <g key={`corner-${i}`} stroke="rgba(0,82,255,0.4)" strokeWidth="1.5">
          <line x1={pos.x - 6} y1={pos.y} x2={pos.x + 6} y2={pos.y} />
          <line x1={pos.x} y1={pos.y - 6} x2={pos.x} y2={pos.y + 6} />
        </g>
      ))}

      {/* ── Connecting lines (center → satellites) ── */}
      {SATELLITES.map((sat) => (
        <line
          key={`line-${sat.label}`}
          x1="210" y1="170"
          x2={sat.cx} y2={sat.cy}
          stroke="#0052FF"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      ))}

      {/* ── Animated dots along each line ── */}
      {SATELLITES.map((sat) => (
        <circle key={`dot-${sat.label}`} r="4" fill="var(--accent-cyan, #00CFFF)" opacity="0.9" filter="url(#ai-glow)">
          <animateMotion
            dur={sat.dur}
            begin={sat.begin}
            repeatCount="indefinite"
            path={sat.motionPath}
          />
        </circle>
      ))}

      {/* ── Satellite nodes ── */}
      {SATELLITES.map((sat) => (
        <g key={`sat-${sat.label}`}>
          <circle
            cx={sat.cx} cy={sat.cy} r="22"
            fill="#0A0F1D"
            stroke="#0052FF"
            strokeWidth="1.5"
          />
          <text
            x={sat.cx} y={sat.cy + 4}
            textAnchor="middle"
            fill="rgba(255,255,255,0.85)"
            fontSize="9"
            fontFamily="var(--font-mono, monospace)"
            fontWeight="700"
            letterSpacing="0.06em"
          >
            {sat.label}
          </text>
        </g>
      ))}

      {/* ── Central AI node ── */}
      <circle
        className="ai-section__core-circle"
        cx="210" cy="170" r="32"
        fill="url(#ai-core-grad)"
        filter="url(#ai-glow)"
      />
      <text
        x="210" y="174"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="13"
        fontFamily="var(--font-mono, monospace)"
        fontWeight="700"
        letterSpacing="0.04em"
      >
        AI
      </text>
    </svg>
  )
}

export function AISection() {
  return (
    <section id="ia" className="ai-section">
      <div className="container ai-section__inner">
        {/* ── Left column: copy ── */}
        <div className="ai-section__content">
          <p className="ai-section__kicker">
            <span>03</span>
            <span>/</span>
            <span>INTELIGENCIA ARTIFICIAL</span>
          </p>

          <h2 className="ai-section__title">
            IA aplicada a tu empresa.
            <span className="ai-section__title-accent">Sin fricciones.</span>
          </h2>

          <p className="ai-section__desc">
            Integramos inteligencia artificial y automatización en los procesos reales de tu empresa.
            Sin proyectos piloto interminables. Sin fricciones técnicas. Con resultados medibles.
          </p>

          <ul className="ai-section__caps" role="list">
            {AI_CAPABILITIES.map((cap) => (
              <li key={cap.label} className="ai-section__cap">
                <span className="ai-section__cap-icon" aria-hidden="true">
                  {cap.icon}
                </span>
                <div className="ai-section__cap-body">
                  <p className="ai-section__cap-label">{cap.label}</p>
                  <p className="ai-section__cap-desc">{cap.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <a href="#contacto" className="ai-section__cta">
            Explorar posibilidades
          </a>
        </div>

        {/* ── Right column: animated SVG ── */}
        <div className="ai-section__visual">
          <AIFlowSVG />
        </div>
      </div>
    </section>
  )
}
