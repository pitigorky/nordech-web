import './TargetAudience.css'

interface AudienceProfile {
  index: string
  title: string
  subtitle: string
  description: string
  traits: string[]
}

const PROFILES: AudienceProfile[] = [
  {
    index: '01',
    title: 'Pymes y empresas en crecimiento',
    subtitle: '15 a 150 profesionales',
    description:
      'Compañías donde la tecnología ya es crítica para la facturación diaria. El soporte informal ya no es viable y se requiere un interlocutor profesional que estandarice procesos.',
    traits: ['Crecimiento de plantilla', 'Trabajo híbrido o múltiple sede', 'Necesidad de orden'],
  },
  {
    index: '02',
    title: 'Empresas sin departamento IT interno',
    subtitle: 'Eficiencia de costes y escala',
    description:
      'Organizaciones que prefieren externalizar la gestión técnica en lugar de asumir contrataciones, bajas laborales y obsolescencia de conocimiento en un departamento propio.',
    traits: ['Coste mensual previsible', 'Equipo multidisciplinar senior', 'Cero ataduras'],
  },
  {
    index: '03',
    title: 'Despachos y sectores con datos sensibles',
    subtitle: 'Seguridad y cumplimiento',
    description:
      'Firmas legales, financieras, consultoras y empresas de ingeniería que manejan información confidencial de clientes y no pueden permitirse brechas de seguridad ni caídas.',
    traits: ['Copias inmutables', 'Seguridad perimetral y MFA', 'Auditoría de accesos'],
  },
  {
    index: '04',
    title: 'Dirección que busca control y claridad',
    subtitle: 'Visión estratégica de negocio',
    description:
      'Directores generales y financieros que necesitan entender qué tecnología pagan, por qué la tienen contratada y contar con un roadmap claro de inversiones técnicas.',
    traits: ['Documentación centralizada', 'Reuniones de evolución', 'Transparencia total'],
  },
]

export function TargetAudience() {
  return (
    <section id="para-quien" className="target" aria-labelledby="target-heading">
      <div className="container">
        {/* Section Header */}
        <div className="target__header">
          <div className="target__kicker">
            <span className="target__kicker-num">05</span>
            <span className="target__kicker-divider" aria-hidden="true">/</span>
            <span>A QUIÉN ACOMPAÑAMOS</span>
          </div>

          <h2 id="target-heading" className="target__title">
            Para empresas que necesitan un IT solvente.
            <span className="target__title-sub">Sin la complejidad de crearlo desde cero.</span>
          </h2>

          <p className="target__intro">
            Nos adaptamos a organizaciones donde la tecnología debe funcionar con fluidez para que el
            equipo se concentre en su verdadero valor: hacer crecer el negocio.
          </p>
        </div>

        {/* 4 Profiles Grid */}
        <div className="target__grid">
          {PROFILES.map((profile) => (
            <article key={profile.index} className="target__card">
              <div className="target__card-top">
                <span className="target__card-index">{profile.index}</span>
                <span className="target__card-sub">{profile.subtitle}</span>
              </div>

              <h3 className="target__card-title">{profile.title}</h3>
              <p className="target__card-desc">{profile.description}</p>

              <div className="target__card-traits">
                {profile.traits.map((trait) => (
                  <span key={trait} className="target__trait-pill">
                    <span className="target__trait-dot" aria-hidden="true"></span>
                    {trait}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Quick Diagnostic Checklist Box */}
        <div className="target__checklist">
          <div className="target__checklist-head">
            <span className="target__checklist-kicker">CHECKLIST DE COMPATIBILIDAD</span>
            <h4 className="target__checklist-title">¿Tiene sentido NORDECH para tu empresa?</h4>
          </div>

          <div className="target__checklist-grid">
            <div className="target__check-item">
              <span className="target__check-icon" aria-hidden="true">✓</span>
              <span>Cuentas con entre 15 y 200 personas trabajando con tecnología a diario.</span>
            </div>
            <div className="target__check-item">
              <span className="target__check-icon" aria-hidden="true">✓</span>
              <span>El soporte actual es reactivo o depende excesivamente de una persona.</span>
            </div>
            <div className="target__check-item">
              <span className="target__check-icon" aria-hidden="true">✓</span>
              <span>Utilizas Microsoft 365 o servicios cloud y buscas orden, seguridad y control.</span>
            </div>
            <div className="target__check-item">
              <span className="target__check-icon" aria-hidden="true">✓</span>
              <span>Valoras contar con un equipo senior de confianza con cuota mensual previsible.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
