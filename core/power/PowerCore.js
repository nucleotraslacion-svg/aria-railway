/**
 * ARIA - PODER INTEGRADOR: Coordinador de Poderes
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Integra todos los módulos de poder de ARIA
 */

const KnowledgeBase = require('./KnowledgeBase');
const AdvancedReasoning = require('./AdvancedReasoning');
const ProactiveIntelligence = require('./ProactiveIntelligence');

class PowerCore {
  constructor() {
    // Inicializar módulos de poder
    this.knowledgeBase = new KnowledgeBase();
    this.reasoning = new AdvancedReasoning(this.knowledgeBase);
    this.proactive = new ProactiveIntelligence();
    
    this.powerStats = {
      totalProcessed: 0,
      knowledgeAdded: 0,
      questionsAnswered: 0,
      suggestionsGenerated: 0
    };
  }

  /**
   * Procesa un mensaje con todos los poderes
   */
  processPowered(message, cerebralAnalysis, context) {
    this.powerStats.totalProcessed++;
    
    const result = {
      knowledgeUsed: false,
      answerProvided: false,
      suggestionsGenerated: false,
      newKnowledgeExtracted: false
    };
    
    // 1. Extraer y almacenar nuevo conocimiento
    const facts = this.knowledgeBase.extractFacts(message, context);
    if (facts.length > 0) {
      facts.forEach(fact => {
        this.knowledgeBase.addKnowledge('facts', fact);
      });
      result.newKnowledgeExtracted = true;
      this.powerStats.knowledgeAdded += facts.length;
    }
    
    // 2. Intentar responder con conocimiento
    let answer = null;
    if (cerebralAnalysis && cerebralAnalysis.pattern && cerebralAnalysis.pattern.isQuestion) {
      answer = this.reasoning.answerQuestion(message);
      if (answer) {
        result.answerProvided = true;
        result.answer = answer;
        this.powerStats.questionsAnswered++;
      }
    }
    
    // 3. Buscar conocimiento relevante
    const relevantKnowledge = this.knowledgeBase.searchKnowledge(message);
    if (relevantKnowledge.length > 0) {
      result.knowledgeUsed = true;
      result.relevantKnowledge = relevantKnowledge.slice(0, 3); // Top 3
    }
    
    // 4. Generar sugerencias proactivas
    const suggestions = this.proactive.generateSuggestions(context, message, cerebralAnalysis);
    if (suggestions.length > 0) {
      result.suggestionsGenerated = true;
      result.suggestions = suggestions;
      this.powerStats.suggestionsGenerated += suggestions.length;
    }
    
    // 5. Verificar recordatorios
    const reminders = this.proactive.checkReminders(message);
    if (reminders.length > 0) {
      result.reminders = reminders;
    }
    
    return result;
  }

  /**
   * Genera respuesta mejorada con conocimiento
   */
  generatePoweredResponse(powerResult, cerebralResponse, message) {
    let enhancedText = cerebralResponse.text;
    
    // Si tenemos una respuesta basada en conocimiento, usarla
    if (powerResult.answerProvided && powerResult.answer) {
      enhancedText = powerResult.answer.answer;
      
      // Agregar contexto de la fuente
      if (powerResult.answer.source && powerResult.answer.source !== 'unknown') {
        enhancedText += ` (basado en mi conocimiento de ${powerResult.answer.source})`;
      }
    }
    
    // Si hay conocimiento relevante pero no respuesta directa, mencionarlo
    else if (powerResult.knowledgeUsed && powerResult.relevantKnowledge) {
      const knowledgeSummary = powerResult.relevantKnowledge
        .map(k => `${k.subject} ${k.predicate} ${k.object}`)
        .join('. ');
      
      enhancedText += ` Relacionado con esto, sé que: ${knowledgeSummary}.`;
    }
    
    // Agregar sugerencias si son de alta prioridad
    if (powerResult.suggestionsGenerated && powerResult.suggestions) {
      const highPriority = powerResult.suggestions.filter(s => s.priority === 'high');
      if (highPriority.length > 0) {
        enhancedText += ` ${highPriority[0].suggestion}`;
      }
    }
    
    // Agregar recordatorios si existen
    if (powerResult.reminders && powerResult.reminders.length > 0) {
      const reminder = powerResult.reminders[0];
      enhancedText += ` Por cierto, recordé que querías hablar sobre: ${reminder.message}`;
    }
    
    return {
      ...cerebralResponse,
      text: enhancedText,
      powered: true,
      powerFeatures: {
        knowledgeUsed: powerResult.knowledgeUsed,
        answerProvided: powerResult.answerProvided,
        suggestionsAvailable: powerResult.suggestionsGenerated,
        newKnowledgeExtracted: powerResult.newKnowledgeExtracted
      }
    };
  }

  /**
   * Aprende nuevo conocimiento de forma explícita
   */
  learnKnowledge(domain, subject, predicate, object, confidence = 0.8) {
    this.knowledgeBase.addKnowledge(domain, {
      subject,
      predicate,
      object,
      confidence,
      source: 'usuario'
    });
    
    this.powerStats.knowledgeAdded++;
  }

  /**
   * Busca en la base de conocimiento
   */
  searchKnowledge(query) {
    return this.knowledgeBase.searchKnowledge(query);
  }

  /**
   * Explica un concepto usando conocimiento
   */
  explainConcept(concept) {
    return this.reasoning.explain(concept);
  }

  /**
   * Obtiene estadísticas de todos los poderes
   */
  getStats() {
    return {
      processing: this.powerStats,
      knowledge: this.knowledgeBase.getStats(),
      proactive: this.proactive.getStats()
    };
  }

  /**
   * Obtiene el estado de los poderes
   */
  getPowerStatus() {
    const kbStats = this.knowledgeBase.getStats();
    
    return {
      knowledgeBase: {
        active: true,
        totalKnowledge: kbStats.totalKnowledge,
        domains: Object.keys(this.knowledgeBase.knowledge).length,
        entities: kbStats.totalEntities
      },
      reasoning: {
        active: true,
        questionsAnswered: this.powerStats.questionsAnswered
      },
      proactive: {
        active: true,
        ...this.proactive.getStats()
      },
      powerLevel: this.calculatePowerLevel()
    };
  }

  /**
   * Calcula el nivel de poder de ARIA
   */
  calculatePowerLevel() {
    const kbStats = this.knowledgeBase.getStats();
    const proStats = this.proactive.getStats();
    
    let level = 0;
    
    // Conocimiento (hasta 40 puntos)
    level += Math.min(kbStats.totalKnowledge, 40);
    
    // Entidades (hasta 20 puntos)
    level += Math.min(kbStats.totalEntities * 2, 20);
    
    // Preguntas respondidas (hasta 20 puntos)
    level += Math.min(this.powerStats.questionsAnswered * 2, 20);
    
    // Objetivos completados (hasta 20 puntos)
    level += Math.min(proStats.completedGoals * 5, 20);
    
    return {
      level: level,
      maxLevel: 100,
      percentage: level,
      category: this.getPowerCategory(level)
    };
  }

  /**
   * Obtiene la categoría de poder
   */
  getPowerCategory(level) {
    if (level < 20) return 'Aprendiz';
    if (level < 40) return 'Competente';
    if (level < 60) return 'Experimentada';
    if (level < 80) return 'Experta';
    return 'Maestra';
  }
}

module.exports = PowerCore;
