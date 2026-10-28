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

  const [errors, setErrors] = useState<FormErrors>({})
  const [isValidated, setIsValidated] = useState<boolean>(false)

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

    // Clear error for that field on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validate()) {
      // Form validation passed. As instructed, we do not simulate a fake sent transmission;
      // instead, we confirm the UI validation state and leave the payload prepared for the endpoint.
      setIsValidated(true)
    }
  }

  const handleResetValidation = () => {
    setIsValidated(false)
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
              <span className="contact__form-state-pill">RESPUESTA DIRECTA</span>
            </div>

            {isValidated ? (
              <div className="contact__confirmed" role="status" aria-live="polite">
                <div className="contact__confirmed-badge">
                  <span className="contact__confirmed-icon" aria-hidden="true">✓</span>
                  <strong>Validación de datos correcta</strong>
                </div>

                <div className="contact__confirmed-notice">
                  <span className="contact__confirmed-notice-tag">AVISO TÉCNICO</span>
                  <p>
                    Los datos ({formData.name} · {formData.company} · {formData.email}) han superado
                    la validación de la interfaz. La integración telemática con el servidor de correo o API
                    está pendiente de configuración externa.
                  </p>
                </div>

                <div className="contact__confirmed-mailto-box">
                  <span>Para enviar tu consulta ahora mismo por correo electrónico:</span>
                  <a
                    href={`mailto:contacto@nordech.es?subject=Contacto%20NORDECH%20-%20${encodeURIComponent(formData.company)}&body=${encodeURIComponent(
                      `Nombre: ${formData.name}\nEmpresa: ${formData.company}\nEmail: ${formData.email}\n\nConsulta:\n${formData.message}`
                    )}`}
                    className="contact__confirmed-mailto-btn"
                  >
                    <span>Abrir en tu gestor de correo con datos completados</span>
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

                <button
                  type="button"
                  className="contact__edit-btn"
                  onClick={handleResetValidation}
                >
                  ← Volver a editar el formulario
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form" noValidate>
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
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

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
                <button type="submit" className="contact__submit-btn">
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
