import { useState } from 'react'
import './Services.css'

interface ServiceItem {
  id: string
  anchorId?: string
  index: string
  code: string
  category: string
  title: string
  businessValue: string
  description: string
  capabilities: string[]
}

const SERVICES: ServiceItem[] = [
  {
    id: 'gestion-it',
    index: '01',
    code: 'SRV-01 // MANAGEMENT',
    category: 'DIRECCIÓN TÉCNICA',
    title: 'Gestión IT Externa',
    businessValue:
      'Dispones de la solidez y criterio de un departamento IT completo sin soportar los costes fijos ni la gestión de contratarlo internamente.',
    description:
      'Asumimos la responsabilidad operativa de tu tecnología: soporte a usuarios, gestión centralizada de accesos y licencias, relación con proveedores tecnológicos y diseño del plan de evolución técnica de la empresa.',
    capabilities: [
      'Soporte avanzado a usuarios',
      'Gestión de proveedores tecnológicos',
      'Inventario y control de activos',
      'Dirección técnica y roadmap IT',
    ],
  },
  {
    id: 'infraestructura',
    anchorId: 'infraestructura',
    index: '02',
    code: 'SRV-02 // SYSTEMS',
    category: 'INFRAESTRUCTURA',
    title: 'Infraestructura y Sistemas',
    businessValue:
      'Tus sistemas, redes y servidores funcionan de manera previsible, rápida y estable, evitando caídas que paralicen las operaciones.',
    description:
      'Diseñamos, desplegamos y mantenemos la infraestructura de red, servidores locales o remotos, virtualización, Wi-Fi profesional y enlaces seguros (VPN), con monitorización de disponibilidad.',
    capabilities: [
      'Servidores físicos y virtualizados',
      'Redes corporativas y Wi-Fi empresarial',
      'VPN seguras para trabajo remoto',
      'Monitorización de infraestructura',
    ],
  },
  {
    id: 'cloud-m365',
    index: '03',
    code: 'SRV-03 // CLOUD',
    category: 'CLOUD & COLABORACIÓN',
    title: 'Cloud y Microsoft 365',
    businessValue:
      'Tu equipo trabaja con seguridad desde cualquier lugar, con datos sincronizados y licencias optimizadas sin pagar de más.',
    description:
      'Especialistas en la administración y securización del ecosistema Microsoft 365 (Entra ID, Exchange, SharePoint, OneDrive, Intune, Defender), así como migraciones y despliegues en nubes públicas (Azure, AWS).',
    capabilities: [
      'Administración experta de Microsoft 365',
      'Gestión de identidades con Entra ID',
      'Migración de correo y archivos',
      'Optimización de costes cloud (FinOps)',
    ],
  },
  {
    id: 'ciberseguridad',
    anchorId: 'seguridad',
    index: '04',
    code: 'SRV-04 // SECURITY',
    category: 'CIBERSEGURIDAD',
    title: 'Ciberseguridad Perimetral y de Puesto',
    businessValue:
      'Protegemos la información sensible de tu negocio frente a intrusiones, ransomware y fraudes que comprometan tu reputación o finanzas.',
    description:
      'Implantación de defensas avanzadas en puestos de trabajo y servidores (EDR), autenticación multifactor (MFA), bastionado de configuraciones, auditorías de permisos y concienciación técnica del equipo.',
    capabilities: [
      'Protección avanzada en puestos (EDR/XDR)',
      'Autenticación multifactor y Zero-Trust',
      'Auditoría y control de accesos',
      'Bastionado de sistemas y firewalls',
    ],
  },
  {
    id: 'backup-resiliencia',
    index: '05',
    code: 'SRV-05 // RESILIENCE',
    category: 'CONTINUIDAD DE NEGOCIO',
    title: 'Backup y Continuidad de Negocio',
    businessValue:
      'Garantía real de que, ante cualquier desastre técnico o incidente de seguridad, tu empresa podrá recuperar sus datos y volver a operar.',
    description:
      'Diseño y gestión de políticas de backup 3-2-1 con copias inmutables e independientes frente al ransomware, custodias externas cifradas y simulacros periódicos de restauración.',
    capabilities: [
      'Copias inmutables anti-ransomware',
      'Estrategia de respaldo híbrido 3-2-1',
      'Pruebas periódicas de restauración',
      'Planes de contingencia operativa (DRP)',
    ],
  },
  {
    id: 'automatizacion-ia',
    index: '06',
    code: 'SRV-06 // AUTOMATION',
    category: 'EFICIENCIA E INNOVACIÓN',
    title: 'Automatización e IA Aplicada',
    businessValue:
      'Reduces tiempos operativos y errores manuales automatizando tareas rutinarias y conectando plataformas clave del negocio.',
    description:
      'Identificamos cuellos de botella en procesos de trabajo y aplicamos automatizaciones prácticas: flujos entre plataformas, sincronización de bases de datos, generación de informes y asistentes inteligentes internos.',
    capabilities: [
      'Automatización de flujos y procesos',
      'Integración segura entre plataformas',
      'Alertas preventivas automatizadas',
      'Asistentes internos con IA aplicada',
    ],
  },
]

export function Services() {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filteredServices =
    activeFilter === 'all' ? SERVICES : SERVICES.filter((s) => s.id === activeFilter)

  return (
    <section id="servicios" className="services" aria-labelledby="services-heading">
      <div className="container">
        {/* Header */}
        <div className="services__header">
          <div className="services__kicker">
            <span className="services__kicker-num">02</span>
            <span className="services__kicker-divider" aria-hidden="true">/</span>
            <span>CAPACIDADES Y SERVICIOS</span>
          </div>

          <h2 id="services-heading" className="services__title">
            Todo lo que tu IT necesita.
            <span className="services__title-sub">Con un único equipo responsable.</span>
          </h2>

          <p className="services__intro">
            No creemos en acumular herramientas complejas. Aportamos criterio técnico para que cada
            inversión tecnológica tenga un impacto directo en la productividad, la seguridad y la
            continuidad de tu negocio.
          </p>
        </div>

        {/* Quick Filter Bar (Sin duplicidad: filtra o muestra todo sin duplicar paneles) */}
        <div className="services__filter-bar" role="tablist" aria-label="Filtrar áreas de servicio">
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'all'}
            className={`services__filter-btn ${activeFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <span>Todas las áreas</span>
            <span className="services__filter-count">6</span>
          </button>

          {SERVICES.map((s) => {
            const isActive = activeFilter === s.id
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`services__filter-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(s.id)}
              >
                <span className="services__filter-index">{s.index}</span>
                <span>{s.title}</span>
              </button>
            )
          })}
        </div>

        {/* 6 Comprehensive Service Cards Grid (Una sola fuente de verdad, sin fichas duplicadas) */}
        <div className="services__grid" aria-label="Catálogo completo de servicios IT">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              id={service.anchorId}
              className="services__card"
            >
              <div className="services__card-header">
                <div className="services__card-meta">
                  <span className="services__card-index">{service.index}</span>
                  <span className="services__card-code">{service.code}</span>
                </div>
                <span className="services__card-category">{service.category}</span>
              </div>

              <h3 className="services__card-title">{service.title}</h3>

              {/* Value to Business Callout */}
              <div className="services__card-value">
                <div className="services__card-value-header">
                  <span className="services__card-value-icon" aria-hidden="true">★</span>
                  <span className="services__card-value-label">QUÉ APORTA A TU NEGOCIO</span>
                </div>
                <p className="services__card-value-text">{service.businessValue}</p>
              </div>

              <p className="services__card-desc">{service.description}</p>

              <div className="services__card-footer">
                <span className="services__card-cap-label">INCLUYE:</span>
                <div className="services__card-caps">
                  {service.capabilities.map((cap) => (
                    <span key={cap} className="services__card-cap-pill">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
