import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Problem } from './components/Problem/Problem'
import { Services } from './components/Services/Services'
import { Method } from './components/Method/Method'
import { Difference } from './components/Difference/Difference'
import { TargetAudience } from './components/TargetAudience/TargetAudience'
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
        <Problem />
        <Services />
        <Method />
        <Difference />
        <TargetAudience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
