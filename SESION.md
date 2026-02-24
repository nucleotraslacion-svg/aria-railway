# 📋 Estado de la sesión · Boggad Company / ARIA Railway

> Última actualización: 2026-02-24

---

## 🎯 Objetivo del proyecto

Publicar la web **ARIA · Boggad Consulting Technologic** (`index.html`) en Railway
**sin cambios** al contenido, configurando el dominio personalizado **boggad.pro**.

---

## ✅ Lo que ya está hecho (commiteado en la rama)

| Archivo | Qué hace |
|---|---|
| `index.html` | Web de Boggad Company — **NO tocar**, ya está completa |
| `package.json` | Usa `serve@14` para servir el sitio estático; comando `npm start` |
| `railway.json` | Config Railway: Nixpacks builder, `npm start`, healthcheck en `/` |
| `package-lock.json` | Lock de dependencias para instalación reproducible |
| `.gitignore` | Excluye `node_modules/` |
| `boggad.pro.website.json` | Plantilla Domain Connect para configurar DNS |

**Rama activa:** `copilot/add-domain-boggad-pro`
**Último commit:** `a73d48a` – feat: add Railway deployment config to publish Boggad site on boggad.pro

---

## 🚀 Pasos PENDIENTES (lo que queda para mañana)

### Paso 1 — Fusionar el PR a `main`
1. Ir a → https://github.com/nucleotraslacion-svg/aria-railway
2. Aceptar el Pull Request de la rama `copilot/add-domain-boggad-pro` → `main`

### Paso 2 — Desplegar en Railway
1. Ir a → https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. Seleccionar `nucleotraslacion-svg/aria-railway` (rama `main`)
4. Railway detectará `package.json` automáticamente y ejecutará `npm start`
5. Esperar a que el build termine (≈ 2 minutos)
6. Anotar la URL pública temporal que Railway asigna (ej: `aria-railway-production.up.railway.app`)

### Paso 3 — Añadir el dominio boggad.pro en Railway
1. Dentro del proyecto Railway → **Settings → Domains → Add Custom Domain**
2. Añadir: `boggad.pro`
3. Añadir: `www.boggad.pro`
4. Railway mostrará los registros DNS que hay que configurar:
   - Un registro **A** apuntando a la IP de Railway (para `@`)
   - Un registro **CNAME** apuntando al subdominio Railway (para `www`)

### Paso 4 — Configurar el DNS en el registrador del dominio
1. Ir al panel del registrador donde compraste `boggad.pro`
2. Actualizar los registros DNS con los valores que dio Railway en el Paso 3
3. Esperar propagación DNS (puede tardar entre 5 minutos y 48 horas)

### Paso 5 — Verificar
- Abrir https://boggad.pro en el navegador
- Comprobar que aparece la interfaz ARIA · Boggad Consulting Technologic
- Comprobar que el certificado SSL (🔒) está activo

---

## ℹ️ Información de referencia

- **Repositorio:** https://github.com/nucleotraslacion-svg/aria-railway
- **Plataforma de hosting:** https://railway.app
- **Dominio objetivo:** https://boggad.pro
- **Tecnología:** Sitio estático HTML puro, servido con `serve` v14 (Node.js)

---

## 🛑 Lo que NO hay que hacer

- ❌ No modificar `index.html` (el cliente quiere la web tal como está)
- ❌ No cambiar `package.json` ni `railway.json` (ya están correctos)
- ❌ No subir `node_modules/` al repo (está en `.gitignore`)
