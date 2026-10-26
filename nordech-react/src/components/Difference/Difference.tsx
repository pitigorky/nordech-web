import './Difference.css'

interface ComparisonRow {
  dimension: string
  traditional: string
  nordech: string
}

const COMPARISON: ComparisonRow[] = [
  {
    dimension: 'Enfoque de trabajo',
    traditional: 'Reactivo: interviene cuando surge una incidencia o se rompe un equipo.',
    nordech: 'Proactivo: monitorización preventiva, mantenimiento planificado y reducción activa de fallos.',
  },
  {
    dimension: 'Visión de la tecnología',
    traditional: 'Puntual: resuelve el ticket inmediato sin perspectiva de la arquitectura global.',
    nordech: 'Integral: gestiona la totalidad del entorno (usuarios, nube, redes, seguridad y licencias).',
  },
  {
    dimension: 'Documentación técnica',
    traditional: 'Dispersa: el conocimiento reside en la memoria de técnicos externos rotativos.',
    nordech: 'Estandarizada: inventarios, accesos y procedimientos documentados propiedad de tu empresa.',
  },
  {
    dimension: 'Relación con el negocio',
    traditional: 'Proveedor puntual facturado por horas de soporte o urgencias.',
    nordech: 'Partner tecnológico que actúa como tu propio departamento IT con dirección técnica.',
  },
  {
    dimension: 'Evolución y estrategia',
    traditional: 'Sin planificación: los sistemas envejecen hasta que resulta imprescindible sustituirlos.',
    nordech: 'Continua: reuniones periódicas para alinear la tecnología con los objetivos de crecimiento.',
  },
]

export function Difference() {
  return (
    <section id="diferenciacion" className="difference" aria-labelledby="diff-heading">
      <div className="container">
        {/* Section Header */}
        <div className="difference__header">
          <div className="difference__kicker">
            <span className="difference__kicker-num">04</span>
            <span className="difference__kicker-divider" aria-hidden="true">/</span>
            <span>MODELO DE GESTIÓN</span>
          </div>

          <h2 id="diff-heading" className="difference__title">
            Una visión global de tu IT.
            <span className="difference__title-sub">Más allá de la asistencia técnica puntual.</span>
          </h2>

          <p className="difference__intro">
            Toda empresa necesita soporte informático diario, pero el verdadero valor surge cuando
            alguien asume la responsabilidad global de los sistemas, la seguridad y la planificación.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="difference__matrix">
          <div className="difference__matrix-header">
            <div className="difference__matrix-col-dim">CRITERIO</div>
            <div className="difference__matrix-col-trad">INTERVENCIÓN TÉCNICA PUNTUAL</div>
            <div className="difference__matrix-col-nordech">
              <span className="difference__badge">MODELO NORDECH</span>
              PARTNER IT INTEGRAL
            </div>
          </div>

          <div className="difference__matrix-rows">
            {COMPARISON.map((row, idx) => (
              <div key={row.dimension} className="difference__row">
                <div className="difference__cell-dim">
                  <span className="difference__dim-index">0{idx + 1}</span>
                  <strong>{row.dimension}</strong>
                </div>

                <div className="difference__cell-trad">
                  <span className="difference__mobile-label">Intervención puntual:</span>
                  <p>{row.traditional}</p>
                </div>

                <div className="difference__cell-nordech">
                  <span className="difference__mobile-label">Partner NORDECH:</span>
                  <p>{row.nordech}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Editorial Callout */}
        <div className="difference__summary">
          <div className="difference__summary-mark" aria-hidden="true">N</div>
          <div className="difference__summary-text">
            <strong>Tecnología con criterio y responsabilidad.</strong>
            <span>
              Trabajamos con transparencia y rigor para que tu equipo directivo pueda delegar con total tranquilidad técnica y concentrarse en el crecimiento de su negocio.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
