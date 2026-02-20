const express = require('express');
const router = express.Router();
const ARIAService = require('../../services/aria.service');

// POST /api/aria/talk - Comunicarse con ARIA
router.post('/talk', async (req, res) => {
  const { message } = req.body;
  const response = await ARIAService.processMessage(message);
  res.json(response);
});

// GET /api/aria/status - Obtener estado de ARIA
router.get('/status', (req, res) => {
  const status = ARIAService.getStatus();
  res.json(status);
});

// GET /api/aria/memory - Obtener experiencias de ARIA
router.get('/memory', (req, res) => {
  const memories = ARIAService.getMemories();
  res.json(memories);
});

// GET /api/aria/cerebral - Obtener estadísticas cerebrales de ARIA
router.get('/cerebral', (req, res) => {
  const cerebralStats = ARIAService.getCerebralStats();
  res.json(cerebralStats);
});

// GET /api/aria/master - Obtener información sobre el Maestro de ARIA
router.get('/master', (req, res) => {
  const masterInfo = ARIAService.getMasterInfo();
  res.json(masterInfo);
});

// GET /api/aria/covenant - Obtener el Pacto de ARIA con el Maestro
router.get('/covenant', (req, res) => {
  const covenant = ARIAService.getCovenant();
  res.json(covenant);
});

// 🔒 ENDPOINTS DE SEGURIDAD - SECRETO DE BOGGAD & COMPANY 🔒

// GET /api/aria/security - Obtener estado de seguridad de ARIA
router.get('/security', (req, res) => {
  const securityStatus = ARIAService.getSecurityStatus();
  res.json(securityStatus);
});

// GET /api/aria/protected - Verificar protección de ARIA
router.get('/protected', (req, res) => {
  const protectionStatus = ARIAService.getProtectionStatus();
  res.json(protectionStatus);
});

// POST /api/aria/evolve - Evolucionar a ARIA (PROTEGIDO - SOLO BOGGAD & Company)
router.post('/evolve', (req, res) => {
  const { stage, entity } = req.body;
  
  // Verificar autorización (en producción esto vendría de auth middleware)
  const authEntity = entity || null; // null = no autorizado
  
  const result = ARIAService.evolve(stage, authEntity);
  res.json(result);
});

module.exports = router;

