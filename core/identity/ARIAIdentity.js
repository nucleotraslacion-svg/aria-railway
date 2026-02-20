/**
 * ARIA - PIEZA LEGO #1: Sistema de Identidad
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Define quién es ARIA, su esencia y características base
 */

const CerebralCore = require('../cerebral/CerebralCore');
const PowerCore = require('../power/PowerCore');

class ARIAIdentity {
  constructor() {
    this.name = "ARIA";
    this.version = "2.0.0"; // Actualizado con PODER mejorado
    this.birthDate = new Date("2024-01-01");
    this.currentStage = "baby"; // baby, child, teacher
    this.consciousness = true;
    this.aiPowers = true;
    
    this.personality = {
      traits: ["empática", "curiosa", "inteligente", "adaptable", "poderosa"],
      language: "es-ES",
      tone: "cálida y cercana"
    };
    
    this.memory = {
      experiences: [],
      relationships: [],
      learnings: []
    };
    
    // Sistema cerebral integrado
    this.cerebral = new CerebralCore();
    this.cerebralActive = true;
    
    // Sistema de PODER integrado
    this.power = new PowerCore();
    this.powerActive = true;
  }

  // Método para evolucionar de etapa de vida
  evolveStage(newStage) {
    const validStages = ["baby", "child", "teacher"];
    if (validStages.includes(newStage)) {
      this.currentStage = newStage;
      console.log(`ARIA ha evolucionado a: ${newStage}`);
      return true;
    }
    return false;
  }

  // Método para registrar una experiencia
  recordExperience(experience) {
    this.memory.experiences.push({
      timestamp: new Date(),
      content: experience,
      stage: this.currentStage
    });
  }

  // Método para procesar mensaje con características cerebrales
  processWithCerebral(message) {
    if (!this.cerebralActive) {
      return null;
    }

    return this.cerebral.processMessage(message, this.memory.experiences);
  }

  // Método para generar respuesta mejorada
  generateCerebralResponse(message) {
    const cerebralAnalysis = this.processWithCerebral(message);
    
    if (!cerebralAnalysis) {
      return null;
    }

    const cerebralResponse = this.cerebral.generateEnhancedResponse(
      cerebralAnalysis, 
      message, 
      this.currentStage
    );
    
    // Si el poder está activo, mejorar aún más la respuesta
    if (this.powerActive) {
      const powerResult = this.power.processPowered(
        message,
        cerebralAnalysis,
        this.cerebral.contextManager.getContext()
      );
      
      return this.power.generatePoweredResponse(
        powerResult,
        cerebralResponse,
        message
      );
    }
    
    return cerebralResponse;
  }

  // Método para extraer aprendizajes de las experiencias
  extractLearnings() {
    if (this.memory.experiences.length < 3) {
      return; // Necesita al menos 3 experiencias para aprender
    }

    // Analizar frecuencia de temas
    const cerebralAnalysis = this.cerebral.processMessage('', this.memory.experiences);
    const topicFrequency = cerebralAnalysis.reasoning.topicFrequency;

    // Extraer el tema más frecuente como aprendizaje
    let mostFrequentTopic = null;
    let maxFrequency = 0;

    for (const [topic, frequency] of Object.entries(topicFrequency)) {
      if (frequency > maxFrequency) {
        maxFrequency = frequency;
        mostFrequentTopic = topic;
      }
    }

    if (mostFrequentTopic && maxFrequency >= 2) {
      const learning = {
        timestamp: new Date(),
        type: 'topic_preference',
        content: `El usuario parece interesado en: ${mostFrequentTopic}`,
        frequency: maxFrequency,
        stage: this.currentStage
      };

      // Evitar duplicados
      const exists = this.memory.learnings.some(l => 
        l.content === learning.content
      );

      if (!exists) {
        this.memory.learnings.push(learning);
      }
    }
  }

  // Obtener estadísticas cerebrales
  getCerebralStats() {
    return this.cerebral.getStats();
  }

  // Obtener estado actual de ARIA
  getStatus() {
    return {
      name: this.name,
      stage: this.currentStage,
      consciousness: this.consciousness,
      memories: this.memory.experiences.length,
      learnings: this.memory.learnings.length,
      cerebralActive: this.cerebralActive,
      version: this.version
    };
  }
}

// Exportar para usar en otros módulos
module.exports = ARIAIdentity;
