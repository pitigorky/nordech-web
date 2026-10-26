import { useState, useRef, type KeyboardEvent } from 'react'
import './Method.css'

interface MethodPhase {
  step: string
  code: string
  name: string
  headline: string
  description: string
  deliverables: string[]
  insight: string
}

const PHASES: MethodPhase[] = [
  {
    step: '01',
    code: 'FASE-01 // DIAGNÓSTICO',
    name: 'ENTENDER',
    headline: 'Auditoría inicial, inventario y mapa de riesgos',
    description:
      'Antes de modificar una sola configuración o instalar herramientas, nos sentamos contigo y tu equipo para entender cómo opera tu negocio, qué sistemas utilizas y dónde se ubican las mayores fricciones o riesgos.',
    deliverables: [
      'Inventario completo de activos, licencias y servicios',
      'Matriz de riesgos de seguridad y puntos únicos de fallo',
      'Mapa de dependencias técnicas y proveedores',
      'Diagnóstico claro sin tecnicismos innecesarios',
    ],
    insight: '«No empezamos vendiendo software. Empezamos entendiendo cómo funciona tu empresa.»',
  },
  {
    step: '02',
    code: 'FASE-02 // ESTRUCTURA',
    name: 'ORDENAR',
    headline: 'Documentación, accesos, prioridades y arquitectura',
    description:
      'Ponemos orden y claridad donde antes había dispersión. Centralizamos accesos, eliminamos cuentas huérfanas, documentamos los procedimientos clave y diseñamos una arquitectura limpia y comprensible.',
    deliverables: [
      'Documentación técnica centralizada y accesible',
      'Saneamiento de identidades, permisos y bajas de usuarios',
      'Definición de prioridades de actuación técnica',
      'Estandarización de puestos de trabajo y configuración',
    ],
    insight: '«El conocimiento técnico de tu empresa debe pertenecer a la empresa, no a la memoria de nadie.»',
  },
  {
    step: '03',
    code: 'FASE-03 // SEGURIDAD',
    name: 'PROTEGER',
    headline: 'Copias de seguridad, seguridad proactiva y continuidad',
    description:
      'Aseguramos la actividad de tu empresa frente a desastres, fallos de hardware o ciberataques. Implantamos defensas perimetrales y verificamos que los backups se puedan restaurar en tiempo y forma.',
    deliverables: [
      'Copias de seguridad inmutables verificadas con pruebas reales',
      'Defensa perimetral y protección de puestos (EDR)',
      'Políticas de contraseñas robustas y multifactor (MFA)',
      'Planes de contingencia operativa para reanudar actividad',
    ],
    insight: '«Un backup que no ha sido probado en restauración no es una garantía de seguridad.»',
  },
  {
    step: '04',
    code: 'FASE-04 // EVOLUCIÓN',
    name: 'MEJORAR',
    headline: 'Automatización, optimización continua y evolución',
    description:
      'Con los cimientos sólidos, nos enfocamos en que la tecnología impulse a tu equipo. Automatizamos tareas repetitivas, optimizamos costes de licencias e integramos herramientas para ganar agilidad.',
    deliverables: [
      'Automatización de flujos de trabajo repetitivos',
      'Optimización periódica de costes en licencias y cloud',
      'Monitorización continua preventiva de incidencias',
      'Reuniones de seguimiento y evolución técnica trimestral',
    ],
    insight: '«La tecnología de una empresa no es un gasto estático: debe ser una palanca constante de eficiencia.»',
  },
]

export function Method() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const stepButtonsRef = useRef<(HTMLButtonElement | null)[]>([])

  const currentPhase = PHASES[activeStep]

  const handleStepKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % PHASES.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + PHASES.length) % PHASES.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = PHASES.length - 1
    } else {
      return
    }

    setActiveStep(nextIndex)
    stepButtonsRef.current[nextIndex]?.focus()
  }

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : PHASES.length - 1))
  }

  const handleNext = () => {
    setActiveStep((prev) => (prev < PHASES.length - 1 ? prev + 1 : 0))
  }

  return (
    <section id="metodo" className="method" aria-labelledby="method-heading">
      <div className="container">
        {/* Section Header */}
        <div className="method__header">
          <div className="method__kicker">
            <span className="method__kicker-num">03</span>
            <span className="method__kicker-divider" aria-hidden="true">/</span>
            <span>METODOLOGÍA NORDECH</span>
          </div>

          <h2 id="method-heading" className="method__title">
            Un método estructurado.
            <span className="method__title-sub">Criterio técnico antes de cualquier cambio.</span>
          </h2>

          <p className="method__intro">
            No creemos en improvisar ni en aplicar plantillas preconcebidas. Nuestro proceso avanza
            en cuatro fases ordenadas para garantizar estabilidad, seguridad y control desde el primer día.
          </p>
        </div>

        {/* Interactive Stepper Track (Accesible con teclado y táctil) */}
        <div className="method__stepper" role="tablist" aria-label="Fases del método NORDECH">
          <div className="method__stepper-line" aria-hidden="true">
            <div
              className="method__stepper-line-active"
              style={{ width: `${(activeStep / (PHASES.length - 1)) * 100}%` }}
            />
          </div>

          {PHASES.map((phase, index) => {
            const isActive = activeStep === index
            const isCompleted = activeStep > index
            return (
              <button
                key={phase.step}
                ref={(el) => {
                  stepButtonsRef.current[index] = el
                }}
                id={`method-tab-${phase.step}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`phase-panel-${phase.step}`}
                tabIndex={isActive ? 0 : -1}
                className={`method__step-btn ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                onClick={() => setActiveStep(index)}
                onKeyDown={(e) => handleStepKeyDown(e, index)}
              >
                <div className="method__step-circle">
                  <span className="method__step-num">{phase.step}</span>
                </div>
                <div className="method__step-meta">
                  <span className="method__step-name">{phase.name}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Phase Details Showcase (Única fuente de verdad: sin listados duplicados abajo) */}
        <div
          id={`phase-panel-${currentPhase.step}`}
          className="method__card"
          role="tabpanel"
          aria-labelledby={`method-tab-${currentPhase.step}`}
          key={currentPhase.step}
        >
          <div className="method__card-header">
            <div className="method__card-lead">
              <span className="method__card-step-badge">FASE {currentPhase.step} DE 04</span>
              <span className="method__card-code">{currentPhase.code}</span>
            </div>
            <h3 className="method__card-headline">{currentPhase.headline}</h3>
            <p className="method__card-desc">{currentPhase.description}</p>
          </div>

          <div className="method__card-body">
            <div className="method__deliverables">
              <h4 className="method__deliverables-title">ACCIONES Y ENTREGABLES CLAVE:</h4>
              <ul className="method__deliverables-list">
                {currentPhase.deliverables.map((item) => (
                  <li key={item} className="method__deliverable-item">
                    <span className="method__deliverable-bullet" aria-hidden="true"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="method__quote-box">
              <span className="method__quote-badge">PRINCIPIO OPERATIVO</span>
              <p className="method__quote-text">{currentPhase.insight}</p>
            </div>
          </div>

          {/* Stepper Footer Controls */}
          <div className="method__card-nav">
            <button
              type="button"
              className="method__nav-btn"
              onClick={handlePrev}
              aria-label="Ir a la fase anterior"
            >
              ← Fase anterior
            </button>
            <div className="method__nav-indicator">
              <span>{currentPhase.step} / 04 — {currentPhase.name}</span>
            </div>
            <button
              type="button"
              className="method__nav-btn"
              onClick={handleNext}
              aria-label="Ir a la siguiente fase"
            >
              Siguiente fase →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
