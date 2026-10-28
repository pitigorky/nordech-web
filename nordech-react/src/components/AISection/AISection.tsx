import { useState, useRef, type KeyboardEvent } from 'react'
import './AISection.css'

interface AIPlatform {
  name: string
  vendor: string
  tag: string
  logo: React.ReactNode
}

interface AITrack {
  id: string
  code: string
  tabLabel: string
  tag: string
  title: string
  description: string
  deliverables: string[]
  tools: string[]
  securityGuarantee: string
}

// ── Official Platform SVG Logos ──────────────────────────────────────────────

const IconOpenAI = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M22.28 9.82a6 6 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9 6.07 6.07 0 0 0-10.27 2.17 6 6 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 6 6 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9 6.07 6.07 0 0 0 10.27-2.18 6 6 0 0 0 4-2.9 6.05 6.05 0 0 0-.73-7.09zM13.26 22.43a4.5 4.5 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .4-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.5 4.5zm-9.66-4.13a4.47 4.47 0 0 1-.53-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.65zm-1.26-10.4a4.49 4.49 0 0 1 2.37-1.98v5.68a.77.77 0 0 0 .39.68l5.81 3.35-2.02 1.17a.08.08 0 0 1-.07 0L3.99 14.16a4.5 4.5 0 0 1-1.65-6.26zm16.6 3.85L13.1 8.38l2.02-1.16a.08.08 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.1v-5.67a.8.8 0 0 0-.4-.69zm2.01-3.02l-.14-.09-4.78-2.78a.78.78 0 0 0-.78 0L9.41 9.23V6.9a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zM8.31 12.86l-2.02-1.16a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.79 2.76a.8.8 0 0 0-.39.68v6.72zm1.14-2.03l2.55-1.47 2.55 1.47v2.94l-2.55 1.47-2.55-1.47v-2.94z"
      fill="#10A37F"
    />
  </svg>
)

const IconClaude = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M13.5 2.5h-3v4.25l-3-3-2.12 2.12 3 3H4.13v3h4.25l-3 3 2.12 2.12 3-3v4.26h3v-4.26l3 3 2.12-2.12-3-3h4.26v-3h-4.26l3-3-2.12-2.12-3 3V2.5z"
      fill="#D97757"
    />
  </svg>
)

const IconCopilot = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="cp-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="cp-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <path
      d="M14.5 4.5A5.5 5.5 0 0 0 9 10v4a5.5 5.5 0 0 0 11 0v-4a5.5 5.5 0 0 0-5.5-5.5z"
      fill="url(#cp-grad-2)"
    />
    <path
      d="M9.5 19.5A5.5 5.5 0 0 0 15 14v-4a5.5 5.5 0 0 0-11 0v4a5.5 5.5 0 0 0 5.5 5.5z"
      fill="url(#cp-grad-1)"
    />
  </svg>
)

const IconGemini = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="gemini-sparkle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1BA1E3" />
        <stop offset="50%" stopColor="#5B7CF6" />
        <stop offset="100%" stopColor="#D96570" />
      </linearGradient>
    </defs>
    <path
      d="M12 2C12 7.52 7.52 12 2 12c5.48 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z"
      fill="url(#gemini-sparkle)"
    />
  </svg>
)

// ── Platforms Data ────────────────────────────────────────────────────────────

const AI_PLATFORMS: AIPlatform[] = [
  {
    name: 'ChatGPT / OpenAI',
    vendor: 'OpenAI Enterprise',
    tag: 'Modelos GPT-4o & APIs',
    logo: <IconOpenAI />,
  },
  {
    name: 'Claude',
    vendor: 'Anthropic',
    tag: 'Claude 3.5 Sonnet & Análisis',
    logo: <IconClaude />,
  },
  {
    name: 'Microsoft Copilot',
    vendor: 'Microsoft 365 & Azure',
    tag: 'Productividad Corporativa',
    logo: <IconCopilot />,
  },
  {
    name: 'Google Gemini',
    vendor: 'Google Cloud & Workspace',
    tag: 'Gemini 1.5 Pro & Multimodal',
    logo: <IconGemini />,
  },
]

// ── Solutions Tracks Data ─────────────────────────────────────────────────────

const AI_TRACKS: AITrack[] = [
  {
    id: 'advisory',
    code: 'AI-01 // EVALUACIÓN & ADOPCIÓN',
    tabLabel: 'Selección de Herramientas',
    tag: 'CONSULTORÍA ESTRATÉGICA',
    title: '¿Copilot, Claude, ChatGPT o Gemini? Elegimos la IA idónea para tu equipo',
    description:
      'Auditamos vuestras necesidades y flujos de trabajo para determinar qué modelos de IA aportan retorno medible y qué licencias son realmente necesarias, evitando sobrecostes.',
    deliverables: [
      'Comparativa de costes, capacidades y compatibilidad por puesto',
      'Despliegue y configuración centralizada de Microsoft 365 Copilot',
      'Plan de adopción progresiva y formación práctica para empleados',
    ],
    tools: ['Microsoft 365 Copilot', 'Claude Enterprise', 'ChatGPT Team/Enterprise', 'Google Gemini'],
    securityGuarantee: 'Licenciamiento corporativo oficial con cláusula Zero Data Retention (tus datos nunca entrenan modelos públicos).',
  },
  {
    id: 'automation',
    code: 'AI-02 // WORKFLOWS & CONECTIVIDAD',
    tabLabel: 'Automatización de Procesos',
    tag: 'EFICIENCIA OPERATIVA',
    title: 'Conectamos tus sistemas existentes con IA para eliminar tareas repetitivas',
    description:
      'Orquestamos flujos inteligentes entre tu ERP, CRM, gestor documental y correo. Los documentos se clasifican, los datos se concilian y las respuestas se generan de forma supervisada.',
    deliverables: [
      'Procesamiento y extracción automática de facturas, pedidos y contratos',
      'Sincronización bidireccional entre plataformas sin intervención manual',
      'Alertas preventivas y detección automática de anomalías en datos',
    ],
    tools: ['Power Automate', 'Make / n8n', 'APIs OpenAI & Anthropic', 'Azure AI Services'],
    securityGuarantee: 'Flujos trazables con auditoría de ejecuciones y control de fallos en infraestructura privada.',
  },
  {
    id: 'assistants',
    code: 'AI-03 // CONOCIMIENTO CORPORATIVO',
    tabLabel: 'Asistentes & Agentes Internos',
    tag: 'INTELIGENCIA INTERNA',
    title: 'Asistentes que responden exclusivamente con la documentación de tu empresa',
    description:
      'Desplegamos entornos de consulta inteligente conectados a vuestros manuales, normativas o histórico técnico. Tu equipo encuentra respuestas fiables con citas al documento de origen.',
    deliverables: [
      'Buscador semántico instantáneo sobre PDFs, bases de datos y SharePoint',
      'Asistente técnico interno para resolver dudas operativas de empleados',
      'Generación automática de informes periódicos y resúmenes ejecutivos',
    ],
    tools: ['Azure OpenAI Service', 'LlamaIndex / LangChain', 'Vector DBs (Qdrant/Pinecone)', 'SharePoint'],
    securityGuarantee: 'Aislamiento estricto de permisos: cada usuario solo accede a la información que tiene autorizada.',
  },
  {
    id: 'security-governance',
    code: 'AI-04 // PRIVACIDAD & GOBERNANZA',
    tabLabel: 'Seguridad y Privacidad',
    tag: 'CIBERSEGURIDAD & COMPLIANCE',
    title: 'Uso responsable y blindado de la IA: protege tu negocio y cumple el RGPD',
    description:
      'Implantamos directivas de uso corporativo, pasarelas de control perimetral y barreras contra fugas de información confidencial, con la tranquilidad de que el secreto profesional está a salvo.',
    deliverables: [
      'Políticas de prevención de fuga de datos confidenciales (DLP)',
      'Control de accesos e identidades corporativas con Microsoft Entra ID',
      'Adecuación al marco regulatorio europeo (EU AI Act) y RGPD',
    ],
    tools: ['Microsoft Purview', 'Zero-Trust AI Gateway', 'DLP Policies', 'Audit Logging'],
    securityGuarantee: 'Cifrado de extremo a extremo en reposo y en tránsito bajo estándares bancarios y europeos.',
  },
]

export function AISection() {
  const [activeTrackId, setActiveTrackId] = useState<string>('advisory')
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const activeTrack = AI_TRACKS.find((t) => t.id === activeTrackId) ?? AI_TRACKS[0]

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % AI_TRACKS.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + AI_TRACKS.length) % AI_TRACKS.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = AI_TRACKS.length - 1
    } else {
      return
    }

    const nextTrack = AI_TRACKS[nextIndex]
    setActiveTrackId(nextTrack.id)
    tabsRef.current[nextIndex]?.focus()
  }

  return (
    <section id="ia" className="ai-section" aria-labelledby="ai-heading">
      <div className="container ai-section__inner">
        {/* Header */}
        <div className="ai-section__header">
          <div className="ai-section__kicker">
            <span className="ai-section__kicker-num">04</span>
            <span className="ai-section__kicker-sep">/</span>
            <span>INTELIGENCIA ARTIFICIAL APLICADA</span>
          </div>

          <h2 id="ai-heading" className="ai-section__title">
            IA con criterio empresarial.
            <span className="ai-section__title-accent">Sin humo ni riesgos.</span>
          </h2>

          <p className="ai-section__intro">
            Te ayudamos a elegir las herramientas idóneas (Microsoft Copilot, Claude, ChatGPT, Gemini),
            automatizar procesos de tu día a día y garantizar la privacidad absoluta de los datos de tu empresa.
          </p>
        </div>

        {/* Real Enterprise AI Platforms Showcase */}
        <div className="ai-section__platforms" aria-label="Plataformas de Inteligencia Artificial que integramos">
          <div className="ai-section__platforms-header">
            <span className="ai-section__platforms-label">PLATAFORMAS PRINCIPALES CON LAS QUE TRABAJAMOS</span>
            <span className="ai-section__platforms-badge">CONSULTORÍA & INTEGRACIÓN DIRECTA</span>
          </div>

          <div className="ai-section__platforms-grid">
            {AI_PLATFORMS.map((platform) => (
              <div key={platform.name} className="ai-platform-card">
                <div className="ai-platform-card__icon-wrap">
                  {platform.logo}
                </div>
                <div className="ai-platform-card__info">
                  <strong className="ai-platform-card__name">{platform.name}</strong>
                  <span className="ai-platform-card__vendor">{platform.vendor}</span>
                </div>
                <span className="ai-platform-card__tag">{platform.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Use Case & Solutions Explorer */}
        <div className="ai-section__explorer">
          {/* Navigation Tabs */}
          <div
            className="ai-section__tabs"
            role="tablist"
            aria-label="Líneas de consultoría e integración de Inteligencia Artificial"
          >
            {AI_TRACKS.map((track, idx) => {
              const isActive = activeTrackId === track.id
              return (
                <button
                  key={track.id}
                  ref={(el) => {
                    tabsRef.current[idx] = el
                  }}
                  id={`ai-tab-${track.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`ai-panel-${track.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`ai-section__tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveTrackId(track.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                >
                  <span className="ai-section__tab-index">0{idx + 1}</span>
                  <span className="ai-section__tab-label">{track.tabLabel}</span>
                </button>
              )
            })}
          </div>

          {/* Active Track Panel */}
          <div
            key={activeTrack.id}
            id={`ai-panel-${activeTrack.id}`}
            role="tabpanel"
            aria-labelledby={`ai-tab-${activeTrack.id}`}
            className="ai-section__panel"
          >
            <div className="ai-section__panel-header">
              <span className="ai-section__panel-code">{activeTrack.code}</span>
              <span className="ai-section__panel-tag">{activeTrack.tag}</span>
            </div>

            <h3 className="ai-section__panel-title">{activeTrack.title}</h3>
            <p className="ai-section__panel-desc">{activeTrack.description}</p>

            {/* Deliverables Grid */}
            <div className="ai-section__deliverables">
              <span className="ai-section__deliverables-label">QUÉ RESOLVEMOS EN TU EMPRESA:</span>
              <ul className="ai-section__deliverables-list">
                {activeTrack.deliverables.map((item) => (
                  <li key={item} className="ai-section__deliverable-item">
                    <span className="ai-section__deliverable-check" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6L4.5 8.5L10 3"
                          stroke="#0052FF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platforms & Tools Covered */}
            <div className="ai-section__tools-wrap">
              <span className="ai-section__tools-label">HERRAMIENTAS & ENTORNOS:</span>
              <div className="ai-section__tools">
                {activeTrack.tools.map((tool) => (
                  <span key={tool} className="ai-section__tool-badge">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Privacy & Security Guarantee Callout */}
            <div className="ai-section__security-box">
              <div className="ai-section__security-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="ai-section__security-text">
                <strong>PRIVACIDAD CORPORATIVA GARANTIZADA:</strong>
                <span>{activeTrack.securityGuarantee}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="ai-section__action-bar">
              <a href="#contacto" className="ai-section__cta">
                <span>Contacta con nosotros</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M3 11L11 3M11 3H4.5M11 3V9.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <span className="ai-section__cta-sub">
                Evaluación inicial confidencial con un consultor técnico especializado
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
