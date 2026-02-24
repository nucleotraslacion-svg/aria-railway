# ARIA · Boggad Consulting Technologic

Interfaz de chat con IA para **Boggad Consulting Technologic**, plataforma de Boggad Company.

ARIA es el agente de inteligencia tecnológica que opera en dos modos dentro de la misma sesión de chat:

| Modo | Descripción |
|---|---|
| **⚡ Consulta** | ARIA responde consultas tecnológicas como experta en tecnologías, innovación y desarrollo de productos. |
| **🎓 Maestro** | ARIA educa, guía y potencia las capacidades del usuario para que pueda cumplir su misión tecnológica. |

## Integración de la API

En `index.html`, localiza el bloque comentado en la función `enviar()` y reemplázalo con la llamada real al endpoint de ARIA:

```js
const res = await fetch('/api/aria', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mensaje: texto, modo: modoActual }),
});
const data = await res.json();
quitarEscribiendo();
agregarMensaje(data.respuesta, 'aria');
```

El campo `modo` será `"consulta"` o `"maestro"` según la pestaña activa.

## Plantillas disponibles

| Archivo | Descripción |
|---|---|
| `boggad.pro.website.json` | Plantilla Domain Connect para conectar un dominio al sitio web de Boggad. Configura los registros DNS `A` y `CNAME` automáticamente. |

## Uso de la plantilla Boggad

La plantilla `boggad.pro.website.json` sigue el estándar [Domain Connect](https://www.domainconnect.org/).  
Requiere la variable `%ipv4%` con la dirección IP del servidor web de Boggad.

```json
{
  "providerId": "boggad.pro",
  "providerName": "Boggad",
  "serviceId": "website",
  "serviceName": "Boggad Website",
  "records": [
    { "type": "A",     "host": "@",   "pointsTo": "%ipv4%", "ttl": 3600 },
    { "type": "CNAME", "host": "www", "pointsTo": "@",      "ttl": 3600 }
  ]
}
```
