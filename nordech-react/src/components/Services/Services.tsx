import { useState } from 'react'
import './Services.css'

interface ServiceItem {
  id: string
  index: string
  title: string
  short: string
  description: string
  capabilities: string[]
  featured?: boolean
  icon: React.ReactNode
}

// ── SVG Icons ────────────────────────────────────────────────────────────────

const IconGestion = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.85" />
    <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.85" />
    <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.85" />
    <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.85" />
  </svg>
)

const IconInfraestructura = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="3" width="16" height="4" rx="1.5" fill="currentColor" opacity="0.85" />
    <rect x="2" y="8.5" width="16" height="4" rx="1.5" fill="currentColor" opacity="0.85" />
    <rect x="2" y="14" width="16" height="3" rx="1.5" fill="currentColor" opacity="0.85" />
  </svg>
)

const IconCloud = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M15.5 8.5a3.5 3.5 0 0 0-6.8-1.1A3 3 0 1 0 5 13.5h10a3 3 0 0 0 .5-5.95V8.5z"
      fill="currentColor"
      opacity="0.85"
    />
  </svg>
)

const IconCiberseguridad = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 2L3 5v5c0 4.1 2.9 7.9 7 9 4.1-1.1 7-4.9 7-9V5L10 2z"
      fill="currentColor"
      opacity="0.85"
    />
  </svg>
)

const IconBackup = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 3a7 7 0 1 0 6.32 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity="0.85"
    />
    <path d="M16 3v4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
  </svg>
)

const IconIA = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z" fill="currentColor" opacity="0.9" />
    <path d="M16 13l0.8 2.2L19 16l-2.2.8L16 19l-.8-2.2L13 16l2.2-.8L16 13z" fill="currentColor" opacity="0.7" />
    <path d="M4 2l.6 1.4L6 4l-1.4.6L4 6l-.6-1.4L2 4l1.4-.6L4 2z" fill="currentColor" opacity="0.6" />
  </svg>
)

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES: ServiceItem[] = [
  {
    id: 'gestion-it',
    index: '01',
    title: 'Gestión IT Externa',
    short: 'Tu departamento IT completo, sin los costes de tenerlo internamente.',
    description:
      'Asumimos la responsabilidad operativa de tu tecnología: soporte a usuarios, gestión centralizada de accesos y licencias, relación con proveedores tecnológicos y diseño del plan de evolución técnica de la empresa.',
    capabilities: [
      'Soporte avanzado a usuarios',
      'Gestión de proveedores',
      'Inventario de activos',
      'Dirección técnica y roadmap IT',
    ],
    icon: <IconGestion />,
  },
  {
    id: 'infraestructura',
    index: '02',
    title: 'Infraestructura y Sistemas',
    short: 'Redes, servidores y conectividad que no fallan.',
    description:
      'Diseñamos, desplegamos y mantenemos la infraestructura de red, servidores locales o remotos, virtualización, Wi-Fi profesional y enlaces seguros (VPN), con monitorización de disponibilidad.',
    capabilities: [
      'Servidores físicos y virtualizados',
      'Redes corporativas y Wi-Fi',
      'VPN seguras para trabajo remoto',
      'Monitorización de infraestructura',
    ],
    icon: <IconInfraestructura />,
  },
  {
    id: 'cloud-m365',
    index: '03',
    title: 'Cloud y Microsoft 365',
    short: 'Tu equipo trabaja desde cualquier lugar, con seguridad.',
    description:
      'Especialistas en la administración y securización del ecosistema Microsoft 365 (Entra ID, Exchange, SharePoint, OneDrive, Intune, Defender), así como migraciones y despliegues en nubes públicas.',
    capabilities: [
      'Administración de Microsoft 365',
      'Gestión de identidades Entra ID',
      'Migración de correo y archivos',
      'Optimización de costes cloud',
    ],
    icon: <IconCloud />,
  },
  {
    id: 'ciberseguridad',
    index: '04',
    title: 'Ciberseguridad',
    short: 'Protección activa frente a amenazas, ransomware y accesos no autorizados.',
    description:
      'Implantación de defensas avanzadas en puestos de trabajo y servidores (EDR), autenticación multifactor (MFA), bastionado de configuraciones, auditorías de permisos y concienciación técnica del equipo.',
    capabilities: [
      'Protección EDR/XDR en puestos',
      'Autenticación multifactor y Zero-Trust',
      'Auditoría y control de accesos',
      'Bastionado de sistemas y firewalls',
    ],
    icon: <IconCiberseguridad />,
  },
  {
    id: 'backup-resiliencia',
    index: '05',
    title: 'Backup y Continuidad',
    short: 'Copias inmutables y planes de contingencia para que ningún incidente pare tu negocio.',
    description:
      'Diseño y gestión de políticas de backup 3-2-1 con copias inmutables e independientes frente al ransomware, custodias externas cifradas y simulacros periódicos de restauración.',
    capabilities: [
      'Copias inmutables anti-ransomware',
      'Estrategia de respaldo híbrido 3-2-1',
      'Pruebas periódicas de restauración',
      'Planes de contingencia (DRP)',
    ],
    icon: <IconBackup />,
  },
  {
    id: 'automatizacion-ia',
    index: '06',
    title: 'Automatización e IA',
    short: 'Automatizamos tareas y aplicamos IA de forma práctica a tus procesos.',
    description:
      'Identificamos cuellos de botella en procesos de trabajo y aplicamos automatizaciones prácticas: flujos entre plataformas, sincronización de bases de datos, generación de informes y asistentes inteligentes internos.',
    capabilities: [
      'Automatización de flujos y procesos',
      'Integración segura entre plataformas',
      'Alertas preventivas automatizadas',
      'Asistentes internos con IA aplicada',
    ],
    featured: true,
    icon: <IconIA />,
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export function Services() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const handleCardClick = (id: string) => {
    setActiveCard((prev) => (prev === id ? null : id))
  }

  return (
    <section id="servicios" className="services" aria-labelledby="services-heading">
      <div className="container">
        {/* Header */}
        <div className="services__header">
          <div className="services__kicker">
            <span className="services__kicker-num">02</span>
            <span>/</span>
            <span>CAPACIDADES Y SERVICIOS</span>
          </div>
          <h2 id="services-heading" className="services__title">
            Todo lo que tu IT necesita.
            <span className="services__title-sub">Con un único equipo responsable.</span>
          </h2>
          <p className="services__intro">
            Gestión, infraestructura, seguridad, cloud y automatización. Nos responsabilizamos de
            que tu tecnología funcione.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="services__grid" aria-label="Catálogo de servicios IT">
          {SERVICES.map((service) => {
            const isActive = activeCard === service.id
            return (
              <article
                key={service.id}
                className={[
                  'service-card',
                  service.featured ? 'service-card--featured' : '',
                  isActive ? 'is-active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleCardClick(service.id)}
                aria-expanded={isActive}
              >
                <div className="service-card__icon">{service.icon}</div>
                <div className="service-card__index">{service.index}</div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__short">{service.short}</p>

                <div className="service-card__body" aria-hidden={!isActive}>
                  <p className="service-card__desc">{service.description}</p>
                  <div className="service-card__caps">
                    {service.capabilities.map((cap) => (
                      <span key={cap} className="service-card__cap">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
