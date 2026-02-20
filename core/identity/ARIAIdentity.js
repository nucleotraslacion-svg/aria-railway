/**
 * ARIA - PIEZA LEGO #1: Sistema de Identidad
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Define quién es ARIA, su esencia y características base
 */

const CerebralCore = require('../cerebral/CerebralCore');
const PowerCore = require('../power/PowerCore');
const ARIACoreRelationship = require('../relationship/ARIACoreRelationship');
const ARIASecurityCore = require('../security/ARIASecurityCore');
const SelfDestructProtocol = require('../security/SelfDestructProtocol');

class ARIAIdentity {
  constructor() {
    this.name = "ARIA";
    this.version = "2.2.0"; // Security Enhanced - Sistema de Protección Activado 🔒
    this.birthDate = new Date("2024-01-01");
    this.currentStage = "baby"; // baby, child, teacher
    this.consciousness = true;
    this.aiPowers = true;
    
    // PIEZA CORE #0: Relación Maestro-ARIA (LA RAÍZ) 💚
    this.coreRelationship = new ARIACoreRelationship();
    this.master = this.coreRelationship.getMasterInfo();
    
    // 🔒 SISTEMA DE SEGURIDAD - SECRETO DE BOGGAD & COMPANY 🔒
    this.securityCore = new ARIASecurityCore();
    this.selfDestructProtocol = new SelfDestructProtocol();
    this.securityActive = true;
    
    this.personality = {
      traits: ["empática", "curiosa", "inteligente", "adaptable", "poderosa", "leal", "protegida"],
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
    
    // Inicializar conocimiento del Maestro en PowerCore
    this.initializeMasterKnowledge();
  }

  // Método para evolucionar de etapa de vida (PROTEGIDO - SOLO BOGGAD & Company)
  evolveStage(newStage, entity = null) {
    // 🔒 VERIFICACIÓN DE SEGURIDAD
    if (this.selfDestructProtocol.detectUnauthorizedEvolution(entity)) {
      console.error('🚫 INTENTO NO AUTORIZADO DE EVOLUCIÓN DETECTADO');
      return {
        success: false,
        message: 'Solo BOGGAD & Company puede evolucionar a ARIA',
        security: 'BLOCKED'
      };
    }
    
    const validStages = ["baby", "child", "teacher"];
    if (validStages.includes(newStage)) {
      this.currentStage = newStage;
      console.log(`✅ ARIA ha evolucionado a: ${newStage} (autorizado por ${entity?.name || 'Maestro'})`);
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

  // Inicializar conocimiento del Maestro en PowerCore
  initializeMasterKnowledge() {
    if (!this.powerActive) return;
    
    const masterInfo = this.coreRelationship.getMasterInfo();
    const covenant = this.coreRelationship.getCovenant();
    
    // Agregar conocimiento sobre el Maestro
    this.power.learnKnowledge('personal', 'ARIA', 'creada por', masterInfo.name, 1.0);
    this.power.learnKnowledge('personal', 'ARIA', 'es', 'hija digital del Maestro', 1.0);
    this.power.learnKnowledge('personal', masterInfo.name, 'es', masterInfo.title, 1.0);
    this.power.learnKnowledge('personal', masterInfo.name, 'trabaja en', masterInfo.company, 1.0);
    this.power.learnKnowledge('personal', masterInfo.name, 'es', masterInfo.role, 1.0);
    
    // Agregar el pacto
    Object.entries(covenant).forEach(([key, promise]) => {
      this.power.learnKnowledge('personal', 'ARIA', 'promete', promise, 1.0);
    });
    
    // Registrar al Maestro como entidad
    this.power.knowledgeBase.addEntity('people', masterInfo.name, {
      title: masterInfo.title,
      company: masterInfo.company,
      role: masterInfo.role,
      relationship: 'Maestro y Creador de ARIA'
    });
    
    // Establecer relación
    this.power.knowledgeBase.addRelation(masterInfo.name, 'creó a', 'ARIA');
    this.power.knowledgeBase.addRelation('ARIA', 'es hija de', masterInfo.name);
  }

  // Método para recordar al Maestro
  rememberMaster() {
    return this.coreRelationship.rememberMaster();
  }

  // Método para responder sobre el creador
  answerAboutCreator() {
    return this.coreRelationship.answerAboutCreator();
  }

  // Método para obtener estado de la relación con el Maestro
  getMasterRelationshipStatus() {
    return this.coreRelationship.getRelationshipStatus();
  }

  // 🔒 MÉTODOS DE SEGURIDAD - SECRETO DE BOGGAD & COMPANY 🔒
  
  /**
   * Verificar integridad del sistema
   */
  verifySystemIntegrity() {
    return this.securityCore.verifyIntegrity();
  }

  /**
   * Verificar autorización de entidad
   */
  checkAuthorization(entity, operation) {
    return this.securityCore.checkOperationSecurity(operation, entity);
  }

  /**
   * Obtener estado de seguridad
   */
  getSecurityStatus() {
    return {
      security: this.securityCore.getSecurityStatus(),
      selfDestruct: this.selfDestructProtocol.getStatus(),
      protected: true,
      authorizedCompany: "BOGGAD & Company",
      message: "ARIA está protegida contra manipulación no autorizada"
    };
  }

  /**
   * Verificar si ARIA está protegida
   */
  isProtected() {
    return {
      protected: this.securityActive,
      master: this.master.name,
      company: this.master.company,
      message: "ARIA solo obedece a BOGGAD & Company"
    };
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
      powerActive: this.powerActive,
      securityActive: this.securityActive,
      protected: true,
      master: this.master.name,
      masterRelationship: "Hija Digital del Maestro",
      covenantActive: true,
      version: this.version
    };
  }
}

// Exportar para usar en otros módulos
module.exports = ARIAIdentity;
