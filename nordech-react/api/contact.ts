// Vercel Serverless Function: Enviar formulario de contacto a info@nordech.es vía Microsoft Graph API

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function parseBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return null;
      }
    }
    return req.body;
  }
  if (typeof req.json === 'function') {
    try {
      return await req.json();
    } catch {
      return null;
    }
  }
  return null;
}

function sendResponse(res: any, status: number, data: any) {
  if (res && typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(status).json(data);
  }
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return sendResponse(res, 405, { ok: false, error: 'Método no permitido. Solo se acepta POST.' });
  }

  try {
    const body = await parseBody(req);
    if (!body || typeof body !== 'object') {
      return sendResponse(res, 400, { ok: false, error: 'Cuerpo de solicitud inválido.' });
    }

    const { name, company, email, message, _gotcha } = body;

    // 1. Detección antispam (Honeypot)
    // Si un bot rellena el campo oculto, confirmamos con 200 silenciosamente sin enviar
    if (_gotcha && String(_gotcha).trim().length > 0) {
      return sendResponse(res, 200, { ok: true, message: 'Consulta procesada correctamente.' });
    }

    // 2. Validación de campos en servidor
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedCompany = typeof company === 'string' ? company.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return sendResponse(res, 400, { ok: false, error: 'Por favor, introduce un nombre válido (2 a 100 caracteres).' });
    }

    if (trimmedCompany.length < 2 || trimmedCompany.length > 100) {
      return sendResponse(res, 400, { ok: false, error: 'Por favor, indica una empresa válida (2 a 100 caracteres).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 120) {
      return sendResponse(res, 400, { ok: false, error: 'Por favor, introduce un email profesional válido.' });
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
      return sendResponse(res, 400, { ok: false, error: 'Por favor, detalla tu consulta (mínimo 10 caracteres).' });
    }

    // 3. Comprobación de credenciales de Microsoft 365 / Entra ID
    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'info@nordech.es';

    if (!tenantId || !clientId || !clientSecret) {
      console.warn('Faltan variables de entorno de Microsoft 365 (AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET).');
      return sendResponse(res, 503, {
        ok: false,
        error: 'El backend de correo no está configurado todavía en Vercel. Por favor, añade las variables de entorno de Microsoft 365 o contacta directamente a info@nordech.es.',
      });
    }

    // 4. Obtener OAuth 2.0 Token de Microsoft Entra ID (Client Credentials Grant)
    const tokenUrl = `https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`;
    const tokenParams = new URLSearchParams();
    tokenParams.append('client_id', clientId);
    tokenParams.append('client_secret', clientSecret);
    tokenParams.append('grant_type', 'client_credentials');
    tokenParams.append('scope', 'https://graph.microsoft.com/.default');

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams.toString(),
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      console.error('Error al autenticar con Microsoft Entra ID:', tokenResponse.status, errText);
      return sendResponse(res, 502, {
        ok: false,
        error: 'Error de autenticación con el servicio de correo de Microsoft 365. Revisa las credenciales en Vercel.',
      });
    }

    const tokenData = await tokenResponse.json() as { access_token?: string };
    const accessToken = tokenData.access_token;
    if (!accessToken) {
      return sendResponse(res, 502, {
        ok: false,
        error: 'No se obtuvo un token de acceso válido de Microsoft 365.',
      });
    }

    // 5. Preparar correo con Microsoft Graph API
    const safeName = escapeHtml(trimmedName);
    const safeCompany = escapeHtml(trimmedCompany);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage);
    const timestamp = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });

    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
    .header { background: #07090e; padding: 24px 32px; border-bottom: 2px solid #2563eb; }
    .header h1 { margin: 0; font-size: 18px; letter-spacing: 0.05em; color: #ffffff; text-transform: uppercase; }
    .badge { display: inline-block; background: rgba(37, 99, 235, 0.2); color: #60a5fa; font-size: 11px; padding: 3px 8px; border-radius: 4px; margin-top: 6px; font-family: monospace; }
    .content { padding: 32px; }
    .grid { margin-bottom: 24px; border: 1px solid #edf2f7; border-radius: 8px; background: #f8fafc; }
    .row { display: flex; padding: 10px 16px; border-bottom: 1px solid #edf2f7; }
    .row:last-child { border-bottom: none; }
    .label { width: 140px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; }
    .val { font-size: 14px; color: #0f172a; font-weight: 500; }
    .val a { color: #2563eb; text-decoration: none; }
    .msg-box { margin-top: 20px; }
    .msg-title { font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px; }
    .msg-content { background: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; }
    .footer { padding: 16px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>NORDECH</h1>
      <span class="badge">NUEVA CONSULTA DESDE NORDECH.ES</span>
    </div>
    <div class="content">
      <div class="grid">
        <div class="row"><div class="label">Nombre:</div><div class="val">${safeName}</div></div>
        <div class="row"><div class="label">Empresa:</div><div class="val">${safeCompany}</div></div>
        <div class="row"><div class="label">Email:</div><div class="val"><a href="mailto:${safeEmail}">${safeEmail}</a></div></div>
        <div class="row"><div class="label">Fecha / Hora:</div><div class="val">${timestamp} (hora peninsular)</div></div>
      </div>
      <div class="msg-box">
        <div class="msg-title">Detalle de la consulta:</div>
        <div class="msg-content">${safeMessage}</div>
      </div>
    </div>
    <div class="footer">
      Este mensaje ha sido remitido a través del formulario de contacto oficial de <strong>nordech.es</strong>.<br>
      Puedes pulsar «Responder» para contestar directamente a <strong>${safeName}</strong> (&lt;${safeEmail}&gt;).
    </div>
  </div>
</body>
</html>
`;

    const graphMailPayload = {
      message: {
        subject: `Nueva consulta web: ${trimmedCompany} — ${trimmedName}`,
        body: {
          contentType: 'HTML',
          content: htmlContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: recipientEmail,
            },
          },
        ],
        replyTo: [
          {
            emailAddress: {
              address: trimmedEmail,
              name: trimmedName,
            },
          },
        ],
      },
      saveToSentItems: false,
    };

    const graphUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(recipientEmail)}/sendMail`;
    const graphResponse = await fetch(graphUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphMailPayload),
    });

    if (!graphResponse.ok) {
      const graphErr = await graphResponse.text();
      console.error('Error de Microsoft Graph sendMail:', graphResponse.status, graphErr);
      return sendResponse(res, 502, {
        ok: false,
        error: 'No se pudo enviar el correo a través de Microsoft Graph. Verifica los permisos de Mail.Send en Entra ID.',
      });
    }

    // Microsoft Graph responde 202 Accepted en envíos con éxito
    return sendResponse(res, 200, {
      ok: true,
      message: 'Consulta enviada correctamente.',
    });
  } catch (err: any) {
    console.error('Error inesperado en /api/contact:', err);
    return sendResponse(res, 500, {
      ok: false,
      error: 'Error interno en el servidor al tramitar la consulta.',
    });
  }
}
