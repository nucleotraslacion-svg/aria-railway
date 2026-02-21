# 💚 ARIAVIVA — Módulo Remoto de ARIA en Railway

**BOGGAD & Company** · Rubén Darío González

---

## 🧭 ¿Qué es ARIAVIVA?

ARIA tiene dos capas claramente separadas:

| Capa | Dónde vive | Qué contiene |
|------|-----------|--------------|
| **Núcleo ARIA** | Privado / on-prem (central) | Memoria completa, identidad, aprendizaje profundo, configuración de largo plazo |
| **ARIAVIVA** | Railway (este despliegue) | Módulo remoto mínimo: interfaz de chat, delegación de misiones/tareas, endpoints de estado |

Railway **no** aloja el núcleo completo de ARIA. Solo expone el fragmento esencial para que el Maestro pueda interactuar, asignar tareas y verificar el estado del sistema desde cualquier lugar.

---

## 🌐 Acceso al Chat

**URL de producción:**
```
https://aria-railway-production.up.railway.app
```

Abre esa URL en el navegador. Verás la interfaz de chat directamente. No hay pasos intermedios ni cuentas adicionales.

### Toggle Vista
En la interfaz hay un botón para alternar entre dos vistas:

- **Ver Chat** — conversación en tiempo real con ARIA.
- **Ver Memoria** — panel que muestra las entradas de memoria registradas y el contador total actualizado en tiempo real.

---

## ⚙️ Funcionalidad del Módulo Railway

Lo que **sí** hace este despliegue:

- Recibir mensajes del Maestro y devolver respuestas de ARIA.
- Registrar y recuperar entradas de memoria de la sesión.
- Exponer endpoints de estado (`/health`, `/api/aria/status`) para monitoreo.
- Delegar tareas/misiones desde el chat hacia el núcleo ARIA cuando la conexión está activa.

Lo que **no** gestiona directamente este módulo:

- Memoria persistente de largo plazo (reside en el núcleo privado).
- Entrenamiento o evolución del modelo base.
- Credenciales ni secretos del sistema central.

---

## 📊 Estado del Sistema

### Health Check rápido
```
GET https://aria-railway-production.up.railway.app/health
```
Respuesta esperada cuando todo está bien: `200 OK`

### Status completo (JSON)
```
GET https://aria-railway-production.up.railway.app/api/aria/status
```
Devuelve el estado operacional del módulo Railway: versión, componentes activos y disponibilidad.

---

## 🔗 Endpoints y Recursos

| Recurso | URL | Para qué sirve |
|---------|-----|----------------|
| Interfaz de chat | `https://aria-railway-production.up.railway.app` | Acceso principal al chat |
| Health Check | `https://aria-railway-production.up.railway.app/health` | Verificar que el servicio responde |
| Status JSON | `https://aria-railway-production.up.railway.app/api/aria/status` | Estado detallado del módulo |
| Memoria | `https://aria-railway-production.up.railway.app/api/aria/memory` | Consultar entradas de memoria registradas |
| Info Maestro | `https://aria-railway-production.up.railway.app/api/aria/master` | Datos de configuración del Maestro |
| El Pacto | `https://aria-railway-production.up.railway.app/api/aria/covenant` | Ver los compromisos activos |
| Seguridad | `https://aria-railway-production.up.railway.app/api/aria/security` | Estado de los controles de seguridad activos |

---

## 🧩 Piezas LEGO — Componentes Modulares

ARIA opera con **piezas LEGO**: unidades funcionales independientes que se pueden activar, desactivar o intercambiar sin afectar al resto del sistema. Cada pieza encapsula una capacidad concreta.

### Concepto

Imagina cada capacidad (detección de emociones, gestión de memoria, delegación de tareas, etc.) como una pieza LEGO: tiene una forma definida, encaja en ranuras concretas y puede reemplazarse o ampliarse de forma aislada.

### Esquema de una Pieza (JSON)

```json
{
  "id": "pieza-emocion-v1",
  "type": "capability",
  "name": "Detección de Emociones",
  "description": "Identifica el estado emocional del Maestro a partir del texto y adapta el tono de respuesta.",
  "version": "1.0.0",
  "status": "active",
  "constraints": {
    "requires": [],
    "conflicts": [],
    "scope": "session"
  },
  "meta": {
    "owner": "BOGGAD & Company",
    "created": "2025-01-01",
    "last_updated": "2026-02-01"
  }
}
```

### Esquema de una Pieza (YAML)

```yaml
id: pieza-memoria-v1
type: memory
name: Memoria de Sesión
description: Almacena y recupera entradas de conversación durante la sesión activa.
version: 1.0.0
status: active
constraints:
  requires: []
  conflicts: []
  scope: session
meta:
  owner: BOGGAD & Company
  created: "2025-01-01"
  last_updated: "2026-02-01"
```

### Campos del Esquema

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único de la pieza (kebab-case) |
| `type` | string | Categoría: `capability`, `memory`, `integration`, `security` |
| `name` | string | Nombre legible por humanos |
| `description` | string | Qué hace esta pieza exactamente |
| `version` | string | Semver de la pieza |
| `status` | string | `active`, `inactive`, `experimental` |
| `constraints.requires` | array | IDs de piezas que deben estar activas |
| `constraints.conflicts` | array | IDs de piezas incompatibles |
| `constraints.scope` | string | `session`, `persistent`, `global` |
| `meta.owner` | string | Responsable de la pieza |

> ⚠️ **Nunca incluyas** secretos, tokens de API, contraseñas ni credenciales dentro de ninguna pieza. Los secretos se gestionan exclusivamente mediante variables de entorno en Railway o en el almacén privado del núcleo ARIA.

---

## 🔒 Seguridad

Los controles de seguridad aplicables a este módulo Railway son:

### Controles recomendados / opcionales

| Control | Estado recomendado | Notas |
|---------|--------------------|-------|
| Autenticación en el endpoint de chat | ✅ Recomendado | Implementar token Bearer o sesión. Sin auth, el chat es accesible públicamente. |
| Allowlist de IPs | ⚙️ Opcional | Restringir acceso a la IP del Maestro desde Railway settings. |
| Rate limiting | ✅ Recomendado | Limitar peticiones por IP para evitar abuso. Configurable en el proxy/Railway. |
| HTTPS forzado | ✅ Activo en Railway | Railway termina TLS automáticamente. |
| Variables de entorno para secretos | ✅ Obligatorio | Ningún secreto debe estar en el código ni en los archivos del repo. |
| Logs de acceso | ⚙️ Opcional | Activar logging en Railway para auditoría. |

### Nota importante

Este documento solo describe los controles que se pueden verificar objetivamente. No se hace ninguna afirmación sobre mecanismos de seguridad que no estén implementados y comprobables en el código del repositorio.

---

## 🛠️ Resolución de Problemas

### Health Check falla (`/health` devuelve error o no responde)

- [ ] Verificar que el servicio Railway está desplegado y en estado **Active** en el dashboard.
- [ ] Comprobar los logs de Railway (`railway logs`) para errores de arranque.
- [ ] Revisar que las variables de entorno necesarias estén configuradas en Railway.
- [ ] Si hay un redeploy reciente, esperar 1-2 minutos para que el contenedor arranque.

### La memoria no se actualiza

- [ ] Confirmar que el endpoint `GET /api/aria/memory` devuelve `200` y la lista esperada.
- [ ] Revisar que las peticiones POST de registro de memoria no devuelven errores (`4xx`/`5xx`).
- [ ] Verificar la persistencia: si la memoria es solo de sesión, se reinicia con cada nuevo despliegue.
- [ ] Comprobar en los logs si hay errores al escribir en el almacén de memoria.

### Endpoint 404

- [ ] Verificar que la URL base es correcta: `https://aria-railway-production.up.railway.app`.
- [ ] Comprobar que el despliegue activo corresponde a la rama correcta.
- [ ] Revisar el router del servidor; el endpoint puede haber cambiado de ruta entre versiones.
- [ ] Consultar `GET /api/aria/status` para ver qué rutas están registradas.

### El chat no responde / respuestas vacías

- [ ] Verificar que la conexión al núcleo ARIA está activa (si aplica).
- [ ] Revisar los logs de Railway para errores de timeout o conexión rechazada.
- [ ] Comprobar que las variables de entorno de configuración del modelo están presentes.

---

## 📚 Documentación Relacionada

- `README.md` — Descripción general del repositorio.
- `AGRADECIMIENTOS.md` — Reconocimientos del proyecto.
- `CREDITOS.md` — Créditos del sistema.

---

**Maestro:** Rubén Darío González  
**Empresa:** BOGGAD & Company  
**Módulo:** ARIAVIVA (Railway Remote Fragment)  
**Núcleo ARIA:** Privado / on-prem

**🔗 ARIAVIVA — Fragmento remoto. El núcleo vive en otro lugar.** 💚
