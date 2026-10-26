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
  radarLabel: string
  radarSub: string
  cx: number
  cy: number
  tagX: number
  tagY: number
  connectorFrom: { x: number; y: number }
  connectorTo: { x: number; y: number }
  pathD: string
  bendX: number
  bendY: number
}

const NODES: SystemNode[] = [
  {
    id: 'cloud',
    name: 'Cloud & Infraestructura',
    code: 'SYS-01 // CLOUD',
    category: 'INFRAESTRUCTURA',
    badge: 'MULTI-CLOUD & M365',
    tagline: 'Arquitectura híbrida y escalabilidad',
    detail:
      'Diseño, despliegue y administración integral de infraestructuras en nube y entornos de trabajo. Consolidación de Microsoft 365, servidores híbridos y optimización continua de recursos.',
    specs: ['Microsoft 365', 'Azure & AWS', 'Servidores Híbridos', 'Gestión de Identidades'],
    radarLabel: 'CLOUD',
    radarSub: 'GESTIÓN INTEGRAL',
    cx: 490,
    cy: 125,
    tagX: 450,
    tagY: 60,
    connectorFrom: { x: 490, y: 125 },
    connectorTo: { x: 490, y: 102 },
    pathD: 'M 340 250 L 415 175 L 490 125',
    bendX: 415,
    bendY: 175,
  },
  {
    id: 'security',
    name: 'Ciberseguridad Perimetral',
    code: 'SYS-02 // SECURITY',
    category: 'DEFENSA Y PROTECCIÓN',
    badge: 'ENFOQUE ZERO-TRUST',
    tagline: 'Protección proactiva y control de accesos',
    detail:
      'Monitorización constante del perímetro corporativo, protección avanzada de puestos y servidores (EDR), autenticación robusta y adecuación a directivas de seguridad informática.',
    specs: ['Protección EDR', 'Zero Trust', 'Firewall Gestionado', 'Bastionado de Puestos'],
    radarLabel: 'SECURITY',
    radarSub: 'PROTECCIÓN ACTIVA',
    cx: 190,
    cy: 125,
    tagX: 80,
    tagY: 60,
    connectorFrom: { x: 190, y: 125 },
    connectorTo: { x: 190, y: 102 },
    pathD: 'M 340 250 L 265 175 L 190 125',
    bendX: 265,
    bendY: 175,
  },
  {
    id: 'automation',
    name: 'Automatización & IA',
    code: 'SYS-03 // AUTOMATION',
    category: 'EFICIENCIA OPERATIVA',
    badge: 'FLUJOS INTELIGENTES',
    tagline: 'Procesos autónomos y resolución ágil',
    detail:
      'Automatización de mantenimientos preventivos, orquestación de tareas rutinarias de IT y alertas inteligentes para reducir incidencias y optimizar la operativa de tu equipo.',
    specs: ['Mantenimiento Automatizado', 'Alertas Proactivas', 'Workflows IT', 'IA Aplicada'],
    radarLabel: 'AUTOMATION',
    radarSub: 'FLUJOS AUTÓNOMOS',
    cx: 190,
    cy: 375,
    tagX: 80,
    tagY: 395,
    connectorFrom: { x: 190, y: 375 },
    connectorTo: { x: 190, y: 395 },
    pathD: 'M 340 250 L 265 325 L 190 375',
    bendX: 265,
    bendY: 325,
  },
  {
    id: 'resilience',
    name: 'Sistemas & Resiliencia',
    code: 'SYS-04 // RESILIENCE',
    category: 'CONTINUIDAD OPERATIVA',
    badge: 'CUSTODIA Y BACKUPS',
    tagline: 'Seguridad de datos y contingencia',
    detail:
      'Implementación de copias de seguridad inmutables contra incidentes o ransomware, verificación periódica de restauración y diseño de planes de contingencia para salvaguardar la actividad del negocio.',
    specs: ['Backups Inmutables', 'Planes de Contingencia', 'Verificación Periódica', 'Custodia Segura'],
    radarLabel: 'RESILIENCE',
    radarSub: 'COPIAS & CUSTODIA',
    cx: 490,
    cy: 375,
    tagX: 450,
    tagY: 395,
    connectorFrom: { x: 490, y: 375 },
    connectorTo: { x: 490, y: 395 },
    pathD: 'M 340 250 L 415 325 L 490 375',
    bendX: 415,
    bendY: 325,
  },
]

export function TechVisual() {
  const [activeNodeId, setActiveNodeId] = useState<SystemId>('cloud')
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
      aria-label="Visualización interactiva de arquitectura IT NORDECH"
    >
      {/* Decorative Technical Frame Backdrop */}
      <div className="tech-visual__frame">
        {/* Architectural Coordinates Corner Markers */}
        <span className="tech-visual__crosshair tech-visual__crosshair--tl" aria-hidden="true">+</span>
        <span className="tech-visual__crosshair tech-visual__crosshair--tr" aria-hidden="true">+</span>
        <span className="tech-visual__crosshair tech-visual__crosshair--bl" aria-hidden="true">+</span>
        <span className="tech-visual__crosshair tech-visual__crosshair--br" aria-hidden="true">+</span>

        {/* Technical Header Pill */}
        <div className="tech-visual__top-meta">
          <div className="tech-visual__meta-badge">
            <span className="tech-visual__meta-dot" aria-hidden="true"></span>
            <span>NORDECH // GESTIÓN DE SISTEMAS</span>
          </div>
          <div className="tech-visual__meta-coords">
            COORD 41°23&apos;N · 02°10&apos;E
          </div>
        </div>

        {/* Interactive SVG Diagram */}
        <div className="tech-visual__canvas-wrap">
          <svg
            className="tech-visual__svg"
            viewBox="0 0 680 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Mapa interactivo de arquitectura IT"
          >
            <defs>
              {/* Electric blue glow filter */}
              <filter id="electric-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Active bus line gradient */}
              <linearGradient id="bus-gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0052FF" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#0066FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.9" />
              </linearGradient>

              {/* Idle bus line gradient */}
              <linearGradient id="bus-gradient-idle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#0F172A" stopOpacity="0.08" />
              </linearGradient>

              {/* Core radial ambient glow */}
              <radialGradient id="core-radial-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0052FF" stopOpacity="0.16" />
                <stop offset="60%" stopColor="#0052FF" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background Geometric Grid & Rings */}
            <g className="tech-visual__grid-lines" aria-hidden="true">
              {/* Concentric radar rings */}
              <circle cx="340" cy="250" r="75" className="tech-visual__ring tech-visual__ring--inner" />
              <circle cx="340" cy="250" r="145" className="tech-visual__ring tech-visual__ring--mid" />
              <circle cx="340" cy="250" r="215" className="tech-visual__ring tech-visual__ring--outer" strokeDasharray="4 8" />

              {/* Cardinal Axes */}
              <line x1="340" y1="35" x2="340" y2="465" className="tech-visual__axis" />
              <line x1="125" y1="250" x2="555" y2="250" className="tech-visual__axis" />

              {/* Cardinal degree labels */}
              <text x="340" y="26" textAnchor="middle" className="tech-visual__degree">000°</text>
              <text x="568" y="253" textAnchor="start" className="tech-visual__degree">090°</text>
              <text x="340" y="482" textAnchor="middle" className="tech-visual__degree">180°</text>
              <text x="112" y="253" textAnchor="end" className="tech-visual__degree">270°</text>

              {/* Calibration dots */}
              <circle cx="340" cy="35" r="2" className="tech-visual__notch" />
              <circle cx="555" cy="250" r="2" className="tech-visual__notch" />
              <circle cx="340" cy="465" r="2" className="tech-visual__notch" />
              <circle cx="125" cy="250" r="2" className="tech-visual__notch" />
            </g>

            {/* Central Glow Field */}
            <circle cx="340" cy="250" r="95" fill="url(#core-radial-glow)" aria-hidden="true" />

            {/* Connection Conduits */}
            {NODES.map((node) => {
              const isActive = activeNodeId === node.id
              return (
                <g key={`conduit-${node.id}`} className="tech-visual__conduit" aria-hidden="true">
                  {/* Underlay trace */}
                  <path
                    d={node.pathD}
                    className={`tech-visual__conduit-path ${isActive ? 'tech-visual__conduit-path--active' : ''}`}
                    stroke={isActive ? 'url(#bus-gradient-active)' : 'url(#bus-gradient-idle)'}
                    strokeWidth={isActive ? 2.5 : 1.25}
                  />

                  {/* Junction bend tick */}
                  <rect
                    x={node.bendX - 2.5}
                    y={node.bendY - 2.5}
                    width="5"
                    height="5"
                    className={`tech-visual__conduit-junction ${isActive ? 'is-active' : ''}`}
                  />

                  {/* Flowing animated pulse packet */}
                  <circle
                    r={isActive ? 3.5 : 2}
                    className={`tech-visual__packet ${isActive ? 'tech-visual__packet--active' : ''}`}
                    fill={isActive ? '#0052FF' : '#94A3B8'}
                  >
                    <animateMotion
                      path={node.pathD}
                      dur={isActive ? '2.4s' : '4.5s'}
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>
                </g>
              )
            })}

            {/* Central NORDECH Command Core */}
            <g className="tech-visual__core" transform="translate(340, 250)" aria-hidden="true">
              {/* Outer rotating dashed hexagonal halo */}
              <polygon
                points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22"
                className="tech-visual__core-halo"
              />
              {/* Solid crystal core polygon */}
              <polygon
                points="0,-34 29.5,-17 29.5,17 0,34 -29.5,17 -29.5,-17"
                className="tech-visual__core-plate"
              />
              {/* NORDECH 'N' Emblem */}
              <path
                d="M -9 11 L -9 -11 L 3 2.5 L 3 -11 L 9 -11 L 9 11 L -3 -2.5 L -3 11 Z"
                className="tech-visual__core-n"
              />
              {/* Core micro label */}
              <text x="0" y="56" textAnchor="middle" className="tech-visual__core-label">
                NORDECH CORE
              </text>
            </g>

            {/* System Nodes & Labels */}
            {NODES.map((node) => {
              const isActive = activeNodeId === node.id
              return (
                <g
                  key={node.id}
                  id={`svg-node-${node.id}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`Sistema ${node.name}: ${node.radarSub}`}
                  className={`tech-visual__node ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveNodeId(node.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveNodeId(node.id)
                    }
                  }}
                >
                  {/* Hairline connector between node dot and tag box */}
                  <line
                    x1={node.connectorFrom.x}
                    y1={node.connectorFrom.y}
                    x2={node.connectorTo.x}
                    y2={node.connectorTo.y}
                    className={`tech-visual__node-lead ${isActive ? 'is-active' : ''}`}
                  />

                  {/* Ripple pulse ring when active */}
                  {isActive && (
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="22"
                      className="tech-visual__node-pulse"
                    />
                  )}

                  {/* Node Outer Ring */}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="14"
                    className="tech-visual__node-ring"
                  />

                  {/* Node Center Dot */}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={isActive ? 5.5 : 4}
                    className="tech-visual__node-dot"
                  />

                  {/* Refined Node Tag Pill (High Contrast & Clear Typography) */}
                  <g
                    transform={`translate(${node.tagX}, ${node.tagY})`}
                    className="tech-visual__node-tag"
                  >
                    <rect
                      width="150"
                      height="42"
                      rx="6"
                      className="tech-visual__node-tag-bg"
                    />
                    <text
                      x="14"
                      y="18"
                      className="tech-visual__node-tag-kicker"
                    >
                      {node.code}
                    </text>
                    <text
                      x="14"
                      y="32"
                      className="tech-visual__node-tag-title"
                    >
                      {node.radarSub}
                    </text>
                  </g>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Interactive Telemetry HUD / Inspector Card */}
        <div className="tech-visual__hud">
          {/* Accessible Navigation Tabs */}
          <div
            className="tech-visual__hud-tabs"
            role="tablist"
            aria-label="Sectores de infraestructura IT"
          >
            {NODES.map((node, idx) => {
              const isActive = activeNodeId === node.id
              return (
                <button
                  key={node.id}
                  ref={(el) => {
                    tabsRef.current[idx] = el
                  }}
                  id={`tab-${node.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${node.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`tech-visual__hud-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveNodeId(node.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                >
                  <span className="tech-visual__hud-tab-dot" aria-hidden="true"></span>
                  <span className="tech-visual__hud-tab-code">0{idx + 1}</span>
                  <span className="tech-visual__hud-tab-name">{node.id.toUpperCase()}</span>
                </button>
              )
            })}
          </div>

          {/* Dynamic Inspector Panel with Discrete Transition */}
          <div
            key={activeNode.id}
            id={`panel-${activeNode.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeNode.id}`}
            className="tech-visual__hud-body"
          >
            <div className="tech-visual__hud-header">
              <span className="tech-visual__hud-code">{activeNode.code}</span>
              <div className="tech-visual__hud-status">
                <span className="tech-visual__hud-status-dot" aria-hidden="true"></span>
                <span>GESTIÓN ACTIVA</span>
              </div>
            </div>

            <div className="tech-visual__hud-title-row">
              <h3 className="tech-visual__hud-title">{activeNode.name}</h3>
              <span className="tech-visual__hud-badge">{activeNode.badge}</span>
            </div>

            <p className="tech-visual__hud-tagline">{activeNode.tagline}</p>
            <p className="tech-visual__hud-desc">{activeNode.detail}</p>

            <div className="tech-visual__hud-specs" aria-label="Capacidades clave">
              {activeNode.specs.map((spec) => (
                <span key={spec} className="tech-visual__hud-spec-pill">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Technical Ticker */}
        <div className="tech-visual__footer">
          <div className="tech-visual__footer-left">
            <span className="tech-visual__live-pulse" aria-hidden="true"></span>
            <span>ARQUITECTURA TECNOLÓGICA B2B · CONTROL CENTRALIZADO</span>
          </div>
          <div className="tech-visual__footer-right">
            <span>NORDECH INFRASTRUCTURE SYSTEMS</span>
          </div>
        </div>
      </div>
    </div>
  )
}
