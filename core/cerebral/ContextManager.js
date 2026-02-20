/**
 * ARIA - PIEZA LEGO CEREBRAL #3: Gestor de Contexto
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Mantiene el contexto de la conversación reciente
 */

class ContextManager {
  constructor(contextSize = 5) {
    this.contextSize = contextSize; // Número de mensajes recientes a recordar
    this.conversationContext = [];
    this.currentTopic = null;
    this.lastEmotion = null;
  }

  /**
   * Agrega un mensaje al contexto
   * @param {object} messageData - Datos del mensaje (texto, emoción, tema)
   */
  addToContext(messageData) {
    this.conversationContext.push({
      timestamp: new Date(),
      ...messageData
    });

    // Mantener solo los últimos N mensajes
    if (this.conversationContext.length > this.contextSize) {
      this.conversationContext.shift();
    }

    // Actualizar tema y emoción actuales
    if (messageData.topic) {
      this.currentTopic = messageData.topic;
    }
    if (messageData.emotion) {
      this.lastEmotion = messageData.emotion;
    }
  }

  /**
   * Obtiene el contexto actual
   * @returns {object} - Contexto de la conversación
   */
  getContext() {
    return {
      recentMessages: this.conversationContext,
      currentTopic: this.currentTopic,
      lastEmotion: this.lastEmotion,
      conversationLength: this.conversationContext.length
    };
  }

  /**
   * Verifica si hay continuidad en el tema
   * @param {string} newTopic - Nuevo tema detectado
   * @returns {boolean} - True si es el mismo tema
   */
  isContinuation(newTopic) {
    return this.currentTopic === newTopic;
  }

  /**
   * Busca referencias a mensajes anteriores
   * @param {string} message - Mensaje actual
   * @returns {object} - Información sobre referencias
   */
  findReferences(message) {
    const messageLower = message.toLowerCase();
    const referenceWords = ['eso', 'esto', 'anterior', 'antes', 'dijiste', 'mencionaste'];
    
    const hasReference = referenceWords.some(word => messageLower.includes(word));
    
    if (hasReference && this.conversationContext.length > 0) {
      return {
        hasReference: true,
        previousMessage: this.conversationContext[this.conversationContext.length - 1]
      };
    }

    return {
      hasReference: false,
      previousMessage: null
    };
  }

  /**
   * Limpia el contexto
   */
  clearContext() {
    this.conversationContext = [];
    this.currentTopic = null;
    this.lastEmotion = null;
  }

  /**
   * Obtiene un resumen del contexto
   * @returns {string} - Resumen textual
   */
  getContextSummary() {
    if (this.conversationContext.length === 0) {
      return 'Sin contexto previo';
    }

    const topics = this.conversationContext
      .filter(msg => msg.topic)
      .map(msg => msg.topic);
    
    const uniqueTopics = [...new Set(topics)];

    return `Conversación sobre: ${uniqueTopics.join(', ')}. Emoción actual: ${this.lastEmotion || 'neutral'}`;
  }
}

module.exports = ContextManager;
