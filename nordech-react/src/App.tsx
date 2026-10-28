import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Services } from './components/Services/Services'
import { AISection } from './components/AISection/AISection'
import { ValueProp } from './components/ValueProp/ValueProp'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import './App.css'

export default function App() {
  return (
    <>
      <a href="#inicio" className="skip-to-content">
        Saltar al contenido principal
      </a>
      <Header />
      <main id="inicio">
        <Hero />
        <Services />
        <AISection />
        <ValueProp />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
