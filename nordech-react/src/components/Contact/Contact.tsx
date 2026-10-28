import { useState, type FormEvent, type ChangeEvent } from 'react'
import './Contact.css'

interface FormData {
  name: string
  company: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  company?: string
  email?: string
  message?: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const TOPIC_CHIPS = [
  'Gestión IT integral',
  'Consultoría e Integración de IA',
  'Microsoft 365 y Cloud',
  'Ciberseguridad y backups',
  'Auditoría técnica inicial',
]

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    message: '',
  })

  const [honeypot, setHoneypot] = useState<string>('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [serverError, setServerError] = useState<string>('')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Por favor, introduce tu nombre completo.'
    }

    if (!formData.company.trim() || formData.company.trim().length < 2) {
      newErrors.company = 'Por favor, indica el nombre de tu empresa.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Introduce un correo electrónico profesional válido.'
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Por favor, describe brevemente qué necesita resolver tu empresa (mínimo 10 caracteres).'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    if (status === 'error') {
      setStatus('idle')
      setServerError('')
    }
  }

  const handleTopicClick = (topic: string) => {
    setFormData((prev) => {
      const current = prev.message
      if (current.includes(topic)) return prev
      const updated = current ? `${current}\n- Interés: ${topic}` : `Interés principal: ${topic}. `
      return { ...prev, message: updated }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setStatus('submitting')
    setServerError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          message: formData.message,
          _gotcha: honeypot,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setServerError(
          data.error ||
            'No se ha podido entregar el mensaje en este momento. Por favor, reintenta el envío o contáctanos directamente.'
        )
      }
    } catch {
      setStatus('error')
      setServerError(
        'Error de conectividad al procesar la solicitud. Comprueba tu conexión o escríbenos a info@nordech.es.'
      )
    }
  }

  const handleResetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      message: '',
    })
    setHoneypot('')
    setErrors({})
    setStatus('idle')
    setServerError('')
  }

  return (
    <section id="contacto" className="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact__layout">
          {/* Left Column: Context & Editorial */}
          <div className="contact__info">
            <div className="contact__kicker">
              <span className="contact__kicker-num">05</span>
              <span className="contact__kicker-divider" aria-hidden="true">/</span>
              <span>CONVERSACIÓN INICIAL</span>
            </div>

            <h2 id="contact-heading" className="contact__title">
              ¿Hablamos de tu IT?
              <span className="contact__title-sub">Sin compromiso ni discursos comerciales.</span>
            </h2>

            <p className="contact__intro">
              Cuéntanos qué necesita tu empresa y vemos cómo podemos ayudarte. Te responderá
              un responsable técnico, no un comercial con un guion predefinido.
            </p>

            {/* Direct Coordinates & Channels */}
            <div className="contact__channels">
              <div className="contact__channel-item">
                <span className="contact__channel-label">CORREO DIRECTO</span>
                <a href="mailto:info@nordech.es" className="contact__channel-value">
                  info@nordech.es
                </a>
              </div>

              <div className="contact__channel-item">
                <span className="contact__channel-label">UBICACIÓN Y COBERTURA</span>
                <span className="contact__channel-value">
                  Barcelona · 41°23&apos;N · 02°10&apos;E
                </span>
                <small className="contact__channel-sub">
                  Gestión remota integral y desplazamientos presenciales según necesidad.
                </small>
              </div>

              <div className="contact__channel-item">
                <span className="contact__channel-label">ATENCIÓN TÉCNICA</span>
                <span className="contact__channel-value">
                  Interlocución directa con un responsable senior
                </span>
                <small className="contact__channel-sub">
                  Sin comerciales intermediarios ni respuestas automatizadas genéricas.
                </small>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact__form-card">
            <div className="contact__form-header">
              <span className="contact__form-kicker">FORMULARIO DE CONTACTO</span>
              <span className="contact__form-state-pill">
                {status === 'submitting'
                  ? 'ENVIANDO...'
                  : status === 'success'
                  ? 'ENTREGADO'
                  : 'RESPUESTA DIRECTA'}
              </span>
            </div>

            {status === 'success' ? (
              <div className="contact__confirmed" role="status" aria-live="polite">
                <div className="contact__confirmed-badge">
                  <span className="contact__confirmed-icon" aria-hidden="true">✓</span>
                  <strong>Consulta enviada correctamente</strong>
                </div>

                <div className="contact__confirmed-notice">
                  <span className="contact__confirmed-notice-tag">RECEPCIÓN CONFIRMADA</span>
                  <p>
                    Gracias, <strong>{formData.name}</strong>. Hemos recibido tu mensaje para{' '}
                    <strong>{formData.company}</strong> directamente en nuestro buzón{' '}
                    <strong>info@nordech.es</strong>.
                  </p>
                  <p className="contact__confirmed-followup">
                    Un responsable técnico analizará tus necesidades y se pondrá en contacto contigo en{' '}
                    <strong>{formData.email}</strong> en menos de 24 horas laborables.
                  </p>
                </div>

                <button
                  type="button"
                  className="contact__reset-btn"
                  onClick={handleResetForm}
                >
                  ← Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form" noValidate>
                {/* Honeypot anti-spam (invisible for humans) */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                >
                  <label htmlFor="_gotcha">Campo anti-spam</label>
                  <input
                    id="_gotcha"
                    name="_gotcha"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Topic Selector Chips */}
                <div className="contact__topics">
                  <span className="contact__topics-label">TEMAS DE INTERÉS FRECUENTES:</span>
                  <div className="contact__topics-list">
                    {TOPIC_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        className="contact__topic-btn"
                        onClick={() => handleTopicClick(chip)}
                        disabled={status === 'submitting'}
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Banner when dispatch fails */}
                {status === 'error' && (
                  <div className="contact__alert-box" role="alert">
                    <div className="contact__alert-badge">
                      <span className="contact__alert-icon" aria-hidden="true">!</span>
                      <strong>No se pudo completar el envío telemático</strong>
                    </div>
                    <p className="contact__alert-msg">{serverError}</p>
                    <div className="contact__alert-fallback">
                      <span>Alternativa directa inmediata:</span>
                      <a
                        href={`mailto:info@nordech.es?subject=Contacto%20NORDECH%20-%20${encodeURIComponent(
                          formData.company || 'Consulta'
                        )}&body=${encodeURIComponent(
                          `Nombre: ${formData.name}\nEmpresa: ${formData.company}\nEmail: ${formData.email}\n\nConsulta:\n${formData.message}`
                        )}`}
                        className="contact__alert-mailto-link"
                      >
                        Abrir consulta en tu gestor de correo (info@nordech.es) →
                      </a>
                    </div>
                  </div>
                )}

                {/* Field: Name */}
                <div className="contact__field">
                  <label htmlFor="name" className="contact__label">
                    Nombre y apellidos <span className="contact__required">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Ej. Laura García"
                    className={`contact__input ${errors.name ? 'has-error' : ''}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    required
                  />
                  {errors.name && (
                    <span id="error-name" className="contact__error-msg">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Field: Company */}
                <div className="contact__field">
                  <label htmlFor="company" className="contact__label">
                    Empresa <span className="contact__required">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Ej. Inversiones & Proyectos S.L."
                    className={`contact__input ${errors.company ? 'has-error' : ''}`}
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? 'error-company' : undefined}
                    required
                  />
                  {errors.company && (
                    <span id="error-company" className="contact__error-msg">
                      {errors.company}
                    </span>
                  )}
                </div>

                {/* Field: Email */}
                <div className="contact__field">
                  <label htmlFor="email" className="contact__label">
                    Email profesional <span className="contact__required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="nombre@empresa.com"
                    className={`contact__input ${errors.email ? 'has-error' : ''}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    required
                  />
                  {errors.email && (
                    <span id="error-email" className="contact__error-msg">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Field: Message */}
                <div className="contact__field">
                  <label htmlFor="message" className="contact__label">
                    ¿Qué necesita resolver tu empresa? <span className="contact__required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Explícanos brevemente la situación actual de tu infraestructura, número de puestos o los retos técnicos que queréis abordar..."
                    className={`contact__textarea ${errors.message ? 'has-error' : ''}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    required
                  />
                  {errors.message && (
                    <span id="error-message" className="contact__error-msg">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`contact__submit-btn ${status === 'submitting' ? 'contact__submit-btn--loading' : ''} ${status === 'error' ? 'contact__submit-btn--retry' : ''}`}
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="contact__spinner" aria-hidden="true" />
                      <span>Enviando consulta a info@nordech.es...</span>
                    </>
                  ) : status === 'error' ? (
                    <>
                      <span>Reintentar envío telemático</span>
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M13.65 2.35A8 8 0 1 0 16 8h-2a6 6 0 1 1-1.76-4.24l-2.24 2.24H16V2l-2.35.35z"
                          fill="currentColor"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Contactar</span>
                      <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                          d="M3 11L11 3M11 3H4.5M11 3V9.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>

                <p className="contact__privacy-note">
                  Tus datos se tratarán con absoluta confidencialidad y únicamente para responder a tu consulta. Sin spam ni cesiones a terceros.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
