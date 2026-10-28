import { useState, useRef, type KeyboardEvent } from 'react'
import './TechVisual.css'

type SystemId = 'cloud' | 'security' | 'automation' | 'resilience'

interface SystemNode {
  id: SystemId
  name: string
  code: string
  category: string
  badge: string
  tagline: string
  detail: string
  specs: string[]
  tabName: string
  tagTitle: string
  tagCode: string
  cx: number
  cy: number
  tagBoxX: number
  tagBoxY: number
  tagBoxW: number
  tagBoxH: number
  pathD: string
}

const NODES: SystemNode[] = [
  {
    id: 'cloud',
    name: 'Cloud & Infraestructura',
    code: 'SYS-01 // CLOUD & M365',
    category: 'ARQUITECTURA HÍBRIDA',
    badge: 'MULTI-CLOUD & M365',
    tagline: 'Sistemas centralizados y entornos cloud de alta disponibilidad',
    detail:
      'Administración integral de servidores, Microsoft 365 corporativo, redes seguras y optimización continua de recursos.',
    specs: ['Microsoft 365', 'Azure & AWS', 'Redes & VPN', 'Gestión Entra ID'],
    tabName: 'CLOUD & M365',
    tagTitle: 'Cloud & M365',
    tagCode: 'SYS-01 · CLOUD',
    cx: 410,
    cy: 85,
    tagBoxX: 438,
    tagBoxY: 66,
    tagBoxW: 142,
    tagBoxH: 38,
    pathD: 'M 300 180 L 360 130 L 410 85',
  },
  {
    id: 'security',
    name: 'Ciberseguridad Perimetral',
    code: 'SYS-02 // CIBERSEGURIDAD',
    category: 'DEFENSA ACTIVA',
    badge: 'ZERO-TRUST & EDR',
    tagline: 'Protección proactiva de puestos, accesos e información crítica',
    detail:
      'Monitorización constante, bastionado de sistemas, protección avanzada en puestos (EDR/XDR) y autenticación multifactor.',
    specs: ['Protección EDR', 'Zero-Trust', 'Firewall Gestionado', 'Auditoría Permisos'],
    tabName: 'CIBERSEGURIDAD',
    tagTitle: 'Ciberseguridad',
    tagCode: 'SYS-02 · SEGURIDAD',
    cx: 190,
    cy: 85,
    tagBoxX: 20,
    tagBoxY: 66,
    tagBoxW: 142,
    tagBoxH: 38,
    pathD: 'M 300 180 L 240 130 L 190 85',
  },
  {
    id: 'automation',
    name: 'Automatización & IA',
    code: 'SYS-03 // AUTOMATIZACIÓN & IA',
    category: 'EFICIENCIA OPERATIVA',
    badge: 'AGENTES & WORKFLOWS',
    tagline: 'Flujos automatizados y aplicaciones prácticas de IA en tu operativa',
    detail:
      'Conexión entre plataformas de negocio, eliminación de tareas manuales repetitivas y despliegue de asistentes inteligentes.',
    specs: ['Copilot Ready', 'Flujos Automáticos', 'Integración ERP/CRM', 'IA Aplicada'],
    tabName: 'AUTOMATIZACIÓN & IA',
    tagTitle: 'Automatización & IA',
    tagCode: 'SYS-03 · AUTO & IA',
    cx: 190,
    cy: 275,
    tagBoxX: 20,
    tagBoxY: 256,
    tagBoxW: 142,
    tagBoxH: 38,
    pathD: 'M 300 180 L 240 230 L 190 275',
  },
  {
    id: 'resilience',
    name: 'Backup & Resiliencia',
    code: 'SYS-04 // CONTINUIDAD IT',
    category: 'SEGURIDAD DE DATOS',
    badge: 'COPIAS INMUTABLES',
    tagline: 'Garantía de recuperación ante cualquier contingencia o ransomware',
    detail:
      'Estrategia de backup híbrido 3-2-1 con copias inmutables, custodia externa cifrada y simulacros periódicos de restauración.',
    specs: ['Anti-Ransomware', 'Estrategia 3-2-1', 'Restauración Testeada', 'Custodia Cifrada'],
    tabName: 'BACKUP & RESILIENCIA',
    tagTitle: 'Backup & Resiliencia',
    tagCode: 'SYS-04 · CONTINUIDAD',
    cx: 410,
    cy: 275,
    tagBoxX: 438,
    tagBoxY: 256,
    tagBoxW: 142,
    tagBoxH: 38,
    pathD: 'M 300 180 L 360 230 L 410 275',
  },
]

export function TechVisual() {
  const [activeNodeId, setActiveNodeId] = useState<SystemId>('cloud')
  const [hoveredNodeId, setHoveredNodeId] = useState<SystemId | null>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const activeNode = NODES.find((n) => n.id === activeNodeId) ?? NODES[0]

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % NODES.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + NODES.length) % NODES.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = NODES.length - 1
    } else {
      return
    }

    const nextNode = NODES[nextIndex]
    setActiveNodeId(nextNode.id)
    tabsRef.current[nextIndex]?.focus()
  }

  return (
    <div
      className="tech-visual"
      role="region"
      aria-label="Consola de Arquitectura Tecnológica NORDECH"
    >
      {/* Precision Hardware Console Chassis (Refero Style) */}
      <div className="tech-visual__frame">
        {/* Precision Corner Crosshairs (+) */}
        <span className="tech-visual__crosshair tech-visual__crosshair--tl" aria-hidden="true">+</span>
        <span className="tech-visual__crosshair tech-visual__crosshair--tr" aria-hidden="true">+</span>
        <span className="tech-visual__crosshair tech-visual__crosshair--bl" aria-hidden="true">+</span>
        <span className="tech-visual__crosshair tech-visual__crosshair--br" aria-hidden="true">+</span>

        {/* Console Header Bar */}
        <div className="tech-visual__console-header">
          <div className="tech-visual__header-left">
            <span className="tech-visual__led tech-visual__led--red" aria-hidden="true"></span>
            <span className="tech-visual__led tech-visual__led--yellow" aria-hidden="true"></span>
            <span className="tech-visual__led tech-visual__led--green" aria-hidden="true"></span>
            <span className="tech-visual__header-title">NORDECH OS</span>
          </div>

          <div className="tech-visual__header-right">
            <span className="tech-visual__status-pulse" aria-hidden="true"></span>
            <span className="tech-visual__status-text">100% OPERATIVO</span>
          </div>
        </div>

        {/* Segmented System Selector Tabs */}
        <div
          className="tech-visual__segment-bar"
          role="tablist"
          aria-label="Módulos de arquitectura técnica"
        >
          {NODES.map((node, idx) => {
            const isActive = activeNodeId === node.id
            const isHovered = hoveredNodeId === node.id
            return (
              <button
                key={node.id}
                ref={(el) => {
                  tabsRef.current[idx] = el
                }}
                id={`tab-${node.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${node.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`tech-visual__segment-btn ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
                onClick={() => setActiveNodeId(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onFocus={() => setHoveredNodeId(node.id)}
                onBlur={() => setHoveredNodeId(null)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
              >
                <span className="tech-visual__segment-idx">0{idx + 1}</span>
                <span className="tech-visual__segment-name">{node.tabName}</span>
              </button>
            )
          })}
        </div>

        {/* Central Square/Horizontal Topology Canvas (Clean Radar WITHOUT needle) */}
        <div className="tech-visual__viewport">
          <svg
            className="tech-visual__svg"
            viewBox="0 0 600 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Mapa de topología de infraestructura NORDECH"
          >
            <defs>
              {/* Electric blue glow */}
              <filter id="tv-electric-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Core radial glow */}
              <radialGradient id="tv-core-radial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#0052FF" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
              </radialGradient>

              {/* Active bus gradient */}
              <linearGradient id="tv-bus-active" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0052FF" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Concentric Radar Rings & Crosshairs */}
            <g className="tech-visual__grid-lines" aria-hidden="true">
              <circle cx="300" cy="180" r="60" className="tech-visual__ring tech-visual__ring--inner" />
              <circle cx="300" cy="180" r="115" className="tech-visual__ring tech-visual__ring--mid" />
              <circle cx="300" cy="180" r="160" className="tech-visual__ring tech-visual__ring--outer" strokeDasharray="3 6" />

              {/* Axes */}
              <line x1="300" y1="20" x2="300" y2="340" className="tech-visual__axis" />
              <line x1="140" y1="180" x2="460" y2="180" className="tech-visual__axis" />

              {/* Degree labels */}
              <text x="300" y="14" textAnchor="middle" className="tech-visual__degree">000°</text>
              <text x="472" y="183" textAnchor="start" className="tech-visual__degree">090°</text>
              <text x="300" y="352" textAnchor="middle" className="tech-visual__degree">180°</text>
              <text x="128" y="183" textAnchor="end" className="tech-visual__degree">270°</text>
            </g>

            {/* Central Ambient Glow Field */}
            <circle cx="300" cy="180" r="75" fill="url(#tv-core-radial)" aria-hidden="true" />

            {/* Connection Conduits */}
            {NODES.map((node) => {
              const isActive = activeNodeId === node.id
              const isHovered = hoveredNodeId === node.id
              const isHighlighted = isActive || isHovered

              return (
                <g key={`conduit-${node.id}`} className="tech-visual__conduit" aria-hidden="true">
                  <path
                    d={node.pathD}
                    className={`tech-visual__conduit-path ${isHighlighted ? 'tech-visual__conduit-path--active' : ''}`}
                    stroke={isHighlighted ? 'url(#tv-bus-active)' : 'rgba(255, 255, 255, 0.1)'}
                    strokeWidth={isHighlighted ? 2.2 : 1}
                  />

                  {/* Flowing animated pulse packet along the bus */}
                  <circle
                    r={isHighlighted ? 3 : 1.5}
                    className={`tech-visual__packet ${isHighlighted ? 'tech-visual__packet--active' : ''}`}
                    fill={isHighlighted ? '#00D2FF' : 'rgba(255, 255, 255, 0.25)'}
                    filter={isHighlighted ? 'url(#tv-electric-glow)' : undefined}
                  >
                    <animateMotion
                      path={node.pathD}
                      dur={isHighlighted ? '2s' : '4s'}
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>
                </g>
              )
            })}

            {/* Central Command Core with Rotating Halo */}
            <g className="tech-visual__core" transform="translate(300, 180)" aria-hidden="true">
              <polygon
                points="0,-36 31,-18 31,18 0,36 -31,18 -31,-18"
                className="tech-visual__core-halo"
              />
              <polygon
                points="0,-26 22,-13 22,13 0,26 -22,13 -22,-13"
                className="tech-visual__core-plate"
              />
              <path
                d="M -7 9 L -7 -9 L 2 2 L 2 -9 L 7 -9 L 7 9 L -2 -2 L -2 9 Z"
                className="tech-visual__core-n"
              />
            </g>

            {/* Interactive System Nodes */}
            {NODES.map((node) => {
              const isActive = activeNodeId === node.id
              const isHovered = hoveredNodeId === node.id
              const isHighlighted = isActive || isHovered
              const isRight = node.cx > 300

              return (
                <g
                  key={node.id}
                  id={`svg-node-${node.id}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`Sistema ${node.name}`}
                  className={`tech-visual__node ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onFocus={() => setHoveredNodeId(node.id)}
                  onBlur={() => setHoveredNodeId(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveNodeId(node.id)
                    }
                  }}
                >
                  {/* Unified continuous hit area covering both circle and tag box */}
                  <rect
                    x={isRight ? 390 : 20}
                    y={node.cy - 22}
                    width={190}
                    height={44}
                    rx="8"
                    fill="transparent"
                    className="tech-visual__hit-area"
                  />

                  {/* Pulse wave when active */}
                  {isActive && (
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="22"
                      className="tech-visual__node-pulse"
                    />
                  )}

                  {/* Outer Ring (+25% size) */}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={isHighlighted ? 16.5 : 14}
                    className="tech-visual__node-ring"
                  />

                  {/* Center Dot (+25% size) */}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={isHighlighted ? 5.5 : 4.2}
                    className="tech-visual__node-dot"
                    fill={isHighlighted ? '#00D2FF' : '#CBD5E1'}
                  />

                  {/* Node Label Tag Box */}
                  <g
                    className={`tech-visual__node-tag-group ${isHighlighted ? 'is-highlighted' : 'is-default'}`}
                  >
                    {/* Consistent connecting tick */}
                    <line
                      x1={isRight ? node.cx + (isHighlighted ? 16.5 : 14) : node.cx - (isHighlighted ? 16.5 : 14)}
                      y1={node.cy}
                      x2={isRight ? node.tagBoxX : node.tagBoxX + node.tagBoxW}
                      y2={node.cy}
                      className="tech-visual__tag-lead"
                    />

                    {/* Tag Box Container */}
                    <rect
                      x={node.tagBoxX}
                      y={node.tagBoxY}
                      width={node.tagBoxW}
                      height={node.tagBoxH}
                      rx="6"
                      className="tech-visual__tag-rect"
                    />

                    {/* Indicator Dot inside Box */}
                    <circle
                      cx={node.tagBoxX + 12}
                      cy={node.tagBoxY + 19}
                      r="3"
                      className="tech-visual__tag-dot"
                    />

                    {/* Code Text */}
                    <text
                      x={node.tagBoxX + 22}
                      y={node.tagBoxY + 15}
                      textAnchor="start"
                      className="tech-visual__tag-code"
                    >
                      {node.tagCode}
                    </text>

                    {/* Category Title */}
                    <text
                      x={node.tagBoxX + 22}
                      y={node.tagBoxY + 29}
                      textAnchor="start"
                      className="tech-visual__tag-title"
                    >
                      {node.tagTitle}
                    </text>
                  </g>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Integrated Frosted Telemetry Dock (Lower Bay) */}
        <div
          id={`panel-${activeNode.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeNode.id}`}
          className="tech-visual__dock"
        >
          <div className="tech-visual__dock-top">
            <span className="tech-visual__dock-code">{activeNode.code}</span>
            <span className="tech-visual__dock-badge">{activeNode.badge}</span>
          </div>

          <p className="tech-visual__dock-tagline">{activeNode.tagline}</p>

          <div className="tech-visual__dock-specs" aria-label="Capacidades clave">
            {activeNode.specs.map((spec) => (
              <span key={spec} className="tech-visual__dock-pill">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
