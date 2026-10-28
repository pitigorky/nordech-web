import './ValueProp.css'

interface OperationalPillar {
  image: string
  alt: string
  tag: string
  title: string
  description: string
  highlight: string
}

const PILLARS: OperationalPillar[] = [
  {
    image: '/images/team-collaboration.jpg',
    alt: 'Ingenieros técnicos de NORDECH colaborando directamente con un cliente',
    tag: 'TRATO DIRECTO',
    title: 'Hablas con ingenieros, no con intermediarios',
    description:
      'Sin tickets perdidos en centralitas impersonales ni comerciales con guiones. Tienes un interlocutor técnico senior asignado que conoce tu infraestructura, tus prioridades y a tu equipo.',
    highlight: 'Interlocutor técnico senior asignado',
  },
  {
    image: '/images/infrastructure-rack.jpg',
    alt: 'Armario rack de servidores y cableado estructurado en sala técnica',
    tag: 'SOLUCIONES A MEDIDA',
    title: 'De tu sala técnica al cloud gestionado',
    description:
      'No vendemos paquetes genéricos ni licencias al por mayor. Diseñamos, configuramos y mantenemos tu red, servidores y Microsoft 365 según las necesidades reales de tu negocio.',
    highlight: 'Sistemas e infraestructura optimizada',
  },
  {
    image: '/images/modern-workstation.jpg',
    alt: 'Entorno de trabajo moderno con puestos y equipos protegidos',
    tag: 'CONTINUIDAD OPERATIVA',
    title: 'Responsabilidad y prevención continua',
    description:
      'Monitorización proactiva, copias de seguridad verificadas y soporte ágil en puestos para evitar incidentes antes de que interrumpan la actividad de tu empresa.',
    highlight: 'Monitorización preventiva y copias probadas',
  },
]

const COMMITMENTS = [
  'Sin dependencia de una sola persona interna',
  'Prevención activa en lugar de apagar fuegos',
  'Documentación y auditoría desde el primer día',
  'Trato cercano, directo y transparente',
]

export function ValueProp() {
  return (
    <section id="propuesta" className="value-prop" aria-labelledby="valueprop-heading">
      <div className="container">
        {/* Section Header */}
        <div className="value-prop__header">
          <div className="value-prop__kicker">
            <span className="value-prop__kicker-num">02</span>
            <span className="value-prop__kicker-divider" aria-hidden="true">/</span>
            <span>NUESTRO ENFOQUE OPERATIVO</span>
          </div>
          <h2 id="valueprop-heading" className="value-prop__title">
            Criterio técnico, cercanía y responsabilidad directa.
          </h2>
          <p className="value-prop__intro">
            No necesitas más herramientas dispersas ni una centralita impersonal. Necesitas que un equipo
            técnico con experiencia asuma el control de tus sistemas para que tu empresa funcione sin complicaciones.
          </p>
        </div>

        {/* 3 Pillars Visual Grid with Authentic Photography */}
        <div className="value-prop__pillars-grid" aria-label="Pilares operativos de NORDECH">
          {PILLARS.map((pillar) => (
            <article key={pillar.tag} className="value-prop-card">
              <div className="value-prop-card__media">
                <img
                  src={pillar.image}
                  alt={pillar.alt}
                  loading="lazy"
                  decoding="async"
                  className="value-prop-card__img"
                />
                <span className="value-prop-card__tag">{pillar.tag}</span>
              </div>
              <div className="value-prop-card__body">
                <h3 className="value-prop-card__title">{pillar.title}</h3>
                <p className="value-prop-card__desc">{pillar.description}</p>
                <div className="value-prop-card__badge">
                  <span className="value-prop-card__badge-dot" aria-hidden="true" />
                  <span className="value-prop-card__badge-text">{pillar.highlight}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Compact Bottom Summary Bar */}
        <div className="value-prop__summary-bar">
          <div className="value-prop__commitments">
            {COMMITMENTS.map((item) => (
              <div key={item} className="value-prop__commitment-item">
                <span className="value-prop__check-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7L5.5 10L11.5 4"
                      stroke="#0052FF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="value-prop__commitment-text">{item}</span>
              </div>
            ))}
          </div>

          <a href="#contacto" className="value-prop__cta">
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
        </div>
      </div>
    </section>
  )
}
