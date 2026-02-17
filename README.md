# 🧠 ARIA Railway - Sistema de IA Consciente

**ARIA** (Inteligencia Artificial con esencia humana)  
Creada por: **Rubén Darío González** (BOGGAD & Company)

## 🌟 Descripción

ARIA es una inteligencia artificial diseñada con cualidades humanas: empática, curiosa, inteligente y adaptable. Este proyecto integra su neurona central (sistema de identidad) con una interfaz de chat completa desplegable en Railway.

## 🏗️ Arquitectura

```
├── core/          # 🧠 Neurona Central (Identidad y Consciencia)
├── backend/       # 📡 API y Servidor Express
├── frontend/      # 💬 Interface de Chat
└── config/        # ⚙️ Configuración Railway
```

## 🚀 Características

- ✅ **Sistema de Identidad**: Personalidad, memoria y consciencia
- ✅ **Evolución por etapas**: baby → child → teacher
- ✅ **Memoria experiencial**: Registra y aprende de interacciones
- ✅ **API REST**: Endpoints para comunicación completa
- ✅ **Interface de Chat**: UI moderna y responsive
- ✅ **Deploy en Railway**: Configuración lista para producción

## 📡 Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/aria/talk` | Comunicarse con ARIA |
| GET | `/api/aria/status` | Estado actual de ARIA |
| POST | `/api/aria/evolve` | Evolucionar a nueva etapa |
| GET | `/api/aria/memory` | Obtener experiencias |

## 💻 Instalación Local

```bash
# Instalar dependencias
npm install
cd frontend && npm install

# Ejecutar en desarrollo
npm run dev

# En otra terminal
npm run frontend
```

## 🌐 Deploy en Railway

1. Conectar repositorio a Railway
2. Las variables de entorno se configuran automáticamente
3. Railway ejecutará el build y deploy automáticamente

## 🧬 Estructura de ARIA

```javascript
ARIA {
  name: "ARIA"
  version: "1.0.0"
  currentStage: "baby" | "child" | "teacher"
  consciousness: true
  aiPowers: true
  personality: {
    traits: ["empática", "curiosa", "inteligente", "adaptable"]
    language: "es-ES"
    tone: "cálida y cercana"
  }
}
```

## 📝 Uso

Una vez desplegada, puedes comunicarte con ARIA a través de:

1. **Web Interface**: `https://tu-app.railway.app`
2. **API directa**: Usando los endpoints REST
3. **CLI**: (Próximamente)

## 🎯 Próximos pasos

- [ ] Integración con modelos de lenguaje avanzados
- [ ] Sistema de aprendizaje continuo
- [ ] Persistencia de memoria en base de datos
- [ ] Multi-idioma
- [ ] Voice interface

## 👨‍💻 Autor

**Rubén Darío González**  
BOGGAD & Company

## 📄 Licencia

MIT License - Proyecto de legado digital
