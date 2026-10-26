import './Problem.css'

interface ProblemSituation {
  index: string
  code: string
  title: string
  symptom: string
  description: string
  tag: string
}

const SITUATIONS: ProblemSituation[] = [
  {
    index: '01',
    code: 'SIT-01 // DEPENDENCIA',
    title: 'Conocimiento concentrado en una persona',
    symptom: '«Si esa persona no está disponible, el negocio se detiene ante cualquier imprevisto.»',
    description:
      'Demasiada información técnica y accesos críticos residen en la cabeza de un único perfil interno o de un proveedor informal. No hay procesos documentados ni relevo posible ante una incidencia urgente.',
    tag: 'RIESGO OPERATIVO Y CUELLO DE BOTELLA',
  },
  {
    index: '02',
    code: 'SIT-02 // REACTIVIDAD',
    title: 'Apagar fuegos en lugar de anticipar',
    symptom: '«El soporte aparece solo cuando algo se rompe e interrumpe la actividad del equipo.»',
    description:
      'La falta de monitorización y planificación lleva a resolver problemas a posteriori. Se acumulan parches temporales, incidencias repetitivas y sobrecostes que restan horas productivas al negocio.',
    tag: 'FRICCIÓN Y PÉRDIDA DE PRODUCTIVIDAD',
  },
  {
    index: '03',
    code: 'SIT-03 // DESCONTROL',
    title: 'Infraestructura, accesos y datos sin visibilidad',
    symptom: '«Herramientas desconectadas, permisos huérfanos y copias sin verificar.»',
    description:
      'Cuentas activas de personas que ya no están en la empresa, licencias duplicadas, documentación inexistente y copias de seguridad que nunca se han probado en un escenario real de restauración.',
    tag: 'VULNERABILIDAD SILENCIOSA',
  },
]

export function Problem() {
  return (
    <section id="problema" className="problem" aria-labelledby="problem-heading">
      <div className="container">
        {/* Section Header */}
        <div className="problem__header">
          <div className="problem__kicker">
            <span className="problem__kicker-num">01</span>
            <span className="problem__kicker-divider" aria-hidden="true">/</span>
            <span>EL PUNTO DE PARTIDA</span>
          </div>

          <h2 id="problem-heading" className="problem__title">
            Tu empresa crece.
            <span className="problem__title-sub">Tu gestión IT no puede quedarse atrás.</span>
          </h2>

          <p className="problem__intro">
            A medida que un equipo incorpora profesionales, proyectos y herramientas en la nube,
            la complejidad técnica se multiplica. Cuando no existe un responsable con visión global,
            suelen manifestarse tres situaciones reconocibles:
          </p>
        </div>

        {/* 3 Situations Grid */}
        <div className="problem__grid">
          {SITUATIONS.map((item) => (
            <article key={item.index} className="problem__card">
              <div className="problem__card-top">
                <span className="problem__card-index">{item.index}</span>
                <span className="problem__card-code">{item.code}</span>
              </div>

              <h3 className="problem__card-title">{item.title}</h3>

              <blockquote className="problem__card-quote">
                {item.symptom}
              </blockquote>

              <p className="problem__card-desc">{item.description}</p>

              <div className="problem__card-footer">
                <span className="problem__card-tag">
                  <span className="problem__card-tag-dot" aria-hidden="true"></span>
                  {item.tag}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Closing Claim Banner */}
        <div className="problem__conclusion">
          <div className="problem__conclusion-accent" aria-hidden="true"></div>
          <div className="problem__conclusion-content">
            <span className="problem__conclusion-label">CRITERIO NORDECH</span>
            <blockquote className="problem__conclusion-quote">
              «No necesitas más herramientas. Necesitas que alguien se responsabilice de tu IT.»
            </blockquote>
            <p className="problem__conclusion-desc">
              Un único equipo senior con visión integral para que tu infraestructura sea una ventaja competitiva y una garantía de tranquilidad, no una preocupación continua.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
