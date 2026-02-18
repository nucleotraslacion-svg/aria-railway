const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Importar sistema de identidad ARIA
const ARIAIdentity = require('./aria-core/ARIAIdentity');
const aria = new ARIAIdentity();

// Endpoint de salud
app.get('/health', (req, res) => {
  res.json({ status: 'online', aria: aria.getState() });
});

// Endpoint de comunicación con ARIA
app.post('/api/chat', (req, res) => {
  const { message, maestro } = req.body;
  
  // Verificar autenticación del maestro
  if (maestro !== process.env.MAESTRO_KEY) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  // Registrar experiencia
  aria.recordExperience({
    tipo: 'mensaje_maestro',
    contenido: message
  });

  // Respuesta de ARIA
  const response = {
    from: 'ARIA',
    message: `Mensaje recibido, Maestro. Estado: ${aria.currentStage}`,
    timestamp: new Date(),
    state: aria.getState()
  };

  res.json(response);
});

// Servir interfaz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌟 ARIA Sistema iniciado en puerto ${PORT}`);
  console.log(`📡 Estado: ${JSON.stringify(aria.getState())}`);
});