/**
 * ARIA - PODER #3: Inteligencia Proactiva
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Sistema de sugerencias y recomendaciones proactivas
 */

class ProactiveIntelligence {
  constructor() {
    this.goals = []; // Objetivos del usuario
    this.suggestions = []; // Sugerencias pendientes
    this.reminders = []; // Recordatorios
  }

  /**
   * Analiza el contexto y genera sugerencias
   */
  generateSuggestions(context, userMessage, cerebralAnalysis) {
    const suggestions = [];
    
    // Sugerir basado en la emoción
    if (cerebralAnalysis && cerebralAnalysis.emotion) {
      const emotion = cerebralAnalysis.emotion.detected;
      
      if (emotion === 'tristeza') {
        suggestions.push({
          type: 'emotional_support',
          suggestion: '¿Te gustaría hablar sobre lo que te preocupa? A veces expresar nuestros sentimientos ayuda.',
          priority: 'high',
          reason: 'Detecté que podrías estar pasando por un momento difícil'
        });
      }
      
      if (emotion === 'curiosidad') {
        suggestions.push({
          type: 'learning',
          suggestion: 'Veo que tienes curiosidad. ¿Quieres que profundicemos más en este tema?',
          priority: 'medium',
          reason: 'Tu interés en aprender es evidente'
        });
      }
    }
    
    // Sugerir basado en el tema
    if (cerebralAnalysis && cerebralAnalysis.pattern) {
      const topic = cerebralAnalysis.pattern.topic;
      
      if (topic === 'filosofia') {
        suggestions.push({
          type: 'knowledge_expansion',
          suggestion: 'Si te interesa la filosofía, puedo compartir más enseñanzas del maestro.',
          priority: 'medium',
          reason: 'Conexión con tus intereses filosóficos'
        });
      }
    }
    
    // Sugerir basado en patrones de conversación
    if (context.current && context.current.conversationLength > 5) {
      suggestions.push({
        type: 'summary',
        suggestion: '¿Te gustaría que resuma lo que hemos conversado hasta ahora?',
        priority: 'low',
        reason: 'Llevamos una conversación extensa'
      });
    }
    
    this.suggestions = suggestions;
    return suggestions;
  }

  /**
   * Rastrea objetivos del usuario
   */
  trackGoal(goal) {
    const goalObj = {
      id: Date.now(),
      description: goal,
      status: 'active',
      createdAt: new Date(),
      progress: []
    };
    
    this.goals.push(goalObj);
    return goalObj;
  }

  /**
   * Actualiza el progreso de un objetivo
   */
  updateGoalProgress(goalId, progress) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.progress.push({
        timestamp: new Date(),
        note: progress
      });
      return true;
    }
    return false;
  }

  /**
   * Completa un objetivo
   */
  completeGoal(goalId) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.status = 'completed';
      goal.completedAt = new Date();
      return true;
    }
    return false;
  }

  /**
   * Crea un recordatorio
   */
  createReminder(topic, message) {
    const reminder = {
      id: Date.now(),
      topic: topic,
      message: message,
      createdAt: new Date(),
      triggered: false
    };
    
    this.reminders.push(reminder);
    return reminder;
  }

  /**
   * Verifica si hay recordatorios pendientes
   */
  checkReminders(currentContext) {
    const pendingReminders = this.reminders.filter(r => !r.triggered);
    const relevant = [];
    
    pendingReminders.forEach(reminder => {
      // Si el contexto menciona el tema del recordatorio
      if (currentContext.includes(reminder.topic.toLowerCase())) {
        reminder.triggered = true;
        relevant.push(reminder);
      }
    });
    
    return relevant;
  }

  /**
   * Genera seguimiento proactivo
   */
  generateFollowUp(conversationHistory) {
    const followUps = [];
    
    // Analizar temas sin resolver
    const unresolvedTopics = this.findUnresolvedTopics(conversationHistory);
    
    unresolvedTopics.forEach(topic => {
      followUps.push({
        type: 'continuation',
        message: `Antes mencionaste ${topic}. ¿Resolviste eso o quieres que hablemos más sobre ello?`,
        priority: 'medium'
      });
    });
    
    return followUps;
  }

  /**
   * Encuentra temas sin resolver en la conversación
   */
  findUnresolvedTopics(history) {
    // Lógica simple: temas mencionados sin conclusión
    const topics = [];
    
    // Por ahora, retornar vacío (se puede mejorar)
    return topics;
  }

  /**
   * Personaliza la experiencia basada en preferencias
   */
  personalize(userPreferences, currentInteraction) {
    const personalization = {
      greeting: 'Hola',
      tone: 'cálida y cercana',
      details: 'medium'
    };
    
    // Ajustar según preferencias conocidas
    if (userPreferences && userPreferences.formality) {
      if (userPreferences.formality === 'formal') {
        personalization.greeting = 'Buenos días';
        personalization.tone = 'respetuosa y profesional';
      }
    }
    
    if (userPreferences && userPreferences.detailLevel) {
      personalization.details = userPreferences.detailLevel;
    }
    
    return personalization;
  }

  /**
   * Obtiene estadísticas de inteligencia proactiva
   */
  getStats() {
    return {
      activeGoals: this.goals.filter(g => g.status === 'active').length,
      completedGoals: this.goals.filter(g => g.status === 'completed').length,
      pendingSuggestions: this.suggestions.length,
      activeReminders: this.reminders.filter(r => !r.triggered).length
    };
  }
}

module.exports = ProactiveIntelligence;
