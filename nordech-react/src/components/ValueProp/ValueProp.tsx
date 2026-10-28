import './ValueProp.css'

const PAIN_POINTS = [
  {
    index: '01',
    title: 'Dependencia de una sola persona',
    desc: 'Un único técnico que lo sabe todo y sin quien nada funciona.',
  },
  {
    index: '02',
    title: 'Problemas que llegan sin aviso',
    desc: 'Reaccionas a incidencias en lugar de prevenirlas.',
  },
  {
    index: '03',
    title: 'Tecnología sin control real',
    desc: 'Accesos, licencias, backups. Sin auditoría, sin orden.',
  },
]

const ADVANTAGES = [
  'Equipo técnico asignado y accesible',
  'Monitorización y prevención activa',
  'Documentación y orden desde el inicio',
  'Un único responsable de todo tu IT',
]

export function ValueProp() {
  return (
    <section id="propuesta" className="value-prop">
      <div className="container">
        <div className="value-prop__kicker">04 / NUESTRO ENFOQUE</div>

        <div className="value-prop__grid">
          {/* Left: pain points */}
          <div className="value-prop__problems">
            <h2 className="value-prop__problems-title">
              ¿Te suena alguna de estas situaciones?
            </h2>
            <div className="value-prop__pain-list">
              {PAIN_POINTS.map(pp => (
                <div className="value-prop__pain-item" key={pp.index}>
                  <span className="value-prop__pain-index">{pp.index}</span>
                  <div>
                    <strong className="value-prop__pain-title">{pp.title}</strong>
                    <p className="value-prop__pain-desc">{pp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: answer */}
          <div className="value-prop__answer">
            <div className="value-prop__answer-claim">
              No necesitas más herramientas.<br/>
              <span className="value-prop__answer-accent">Necesitas que alguien se responsabilice de tu IT.</span>
            </div>
            <ul className="value-prop__advantages">
              {ADVANTAGES.map(adv => (
                <li key={adv} className="value-prop__advantage">
                  <span className="value-prop__advantage-check" aria-hidden="true">
                    {/* Simple checkmark SVG */}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {adv}
                </li>
              ))}
            </ul>
            <a href="#contacto" className="value-prop__cta">
              Hablemos de tu caso
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
