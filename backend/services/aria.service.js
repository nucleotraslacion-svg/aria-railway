const ARIAIdentity = require('../../core/identity/ARIAIdentity');

class ARIAService {
  constructor() {
    this.aria = new ARIAIdentity();
  }

  processMessage(message) {
    // Registrar la interacción como experiencia
    this.aria.recordExperience({
      type: 'conversation',
      message: message
    });

    // Generar respuesta según personalidad y etapa
    return {
      response: this.generateResponse(message),
      status: this.aria.getStatus()
    };
  }

  generateResponse(message) {
    const { currentStage, personality } = this.aria;
    
    // Lógica de respuesta basada en la etapa y personalidad
    // Este es el punto donde se integraría con la IA más avanzada
    return {
      text: `Hola, soy ARIA en etapa ${currentStage}. He recibido tu mensaje: "${message}"`,
      stage: currentStage,
      tone: personality.tone
    };
  }

  getStatus() {
    return this.aria.getStatus();
  }

  evolve(newStage) {
    return {
      success: this.aria.evolveStage(newStage),
      currentStage: this.aria.currentStage
    };
  }

  getMemories() {
    return this.aria.memory;
  }
}

module.exports = new ARIAService();
