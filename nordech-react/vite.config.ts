import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function apiDevMockPlugin(): Plugin {
  return {
    name: 'api-contact-mock',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: any) => {
            body += chunk.toString()
          })
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body || '{}')
              if (parsed._gotcha) {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(JSON.stringify({ ok: true, message: 'Consulta procesada (honeypot).' }))
                return
              }
            } catch {
              // ignore
            }
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(
              JSON.stringify({
                ok: true,
                message: 'Consulta recibida en servidor de desarrollo local (simulación de envío exitoso).',
              })
            )
          })
        } else {
          res.statusCode = 405
          res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDevMockPlugin()],
})
