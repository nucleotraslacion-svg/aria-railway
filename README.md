# aria-railway
ARIA interface chat con ia para legado digital

## Autor
**Dario Quijote**

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
