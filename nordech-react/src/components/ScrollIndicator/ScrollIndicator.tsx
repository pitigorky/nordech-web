import './ScrollIndicator.css'

export function ScrollIndicator() {
  return (
    <div className="scroll-indicator" aria-label="Indicador de desplazamiento">
      <div className="scroll-indicator__track">
        <span className="scroll-indicator__index">01 // 06</span>
        <a href="#problema" className="scroll-indicator__action" aria-label="Desplazar a la siguiente sección">
          <span className="scroll-indicator__label">Desplazar para explorar</span>
          <div className="scroll-indicator__line" aria-hidden="true">
            <span className="scroll-indicator__dot"></span>
          </div>
        </a>
      </div>

      <div className="scroll-indicator__meta">
        <span className="scroll-indicator__coord">SISTEMAS IT DE MISIÓN CRÍTICA</span>
        <span className="scroll-indicator__divider" aria-hidden="true">·</span>
        <span className="scroll-indicator__status">GESTIÓN CONTINUA</span>
      </div>
    </div>
  )
}
