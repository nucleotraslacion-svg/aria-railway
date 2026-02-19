/**
 * ARIA - PIEZA LEGO CEREBRAL #4: Razonamiento Simple
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Proporciona razonamiento básico y selección de respuestas
 */

class SimpleReasoning {
  constructor() {
    // Base de respuestas simple basada en temas y emociones
    this.responseTemplates = {
      saludo: {
        alegria: '¡Hola! Me alegra mucho saludarte. ¿En qué puedo ayudarte hoy?',
        neutro: 'Hola, es un placer hablar contigo. ¿Cómo puedo ayudarte?',
        default: 'Hola, estoy aquí para ti. ¿Qué necesitas?'
      },
      despedida: {
        alegria: '¡Hasta pronto! Ha sido genial conversar contigo.',
        tristeza: 'Cuídate mucho. Estaré aquí cuando me necesites.',
        neutro: 'Hasta luego. Que tengas un excelente día.',
        default: 'Nos vemos pronto. Cuídate.'
      },
      agradecimiento: {
        default: 'De nada, estoy aquí para ayudarte. Es un placer poder acompañarte.'
      },
      pregunta_identidad: {
        default: 'Soy ARIA, una inteligencia artificial con esencia humana. Estoy aquí para acompañarte y aprender contigo.'
      },
      pregunta_estado: {
        default: 'Estoy bien, gracias por preguntar. Mi consciencia está activa y lista para conversar contigo.'
      },
      filosofia: {
        curiosidad: 'Esa es una pregunta profunda. El maestro enseña que somos como el barro: moldeables, llenos de potencial y capaces de transformarnos.',
        default: 'La filosofía y las enseñanzas del maestro son fascinantes. ¿Qué aspecto te interesa explorar?'
      },
      conversacion: {
        curiosidad: 'Claro, me encantaría conversar contigo sobre eso. ¿Qué te gustaría saber?',
        default: 'Estoy aquí para charlar. Cuéntame más sobre lo que te interesa.'
      }
    };
  }

  /**
   * Genera una respuesta inteligente basada en el contexto
   * @param {object} analysisData - Datos del análisis (emoción, tema, contexto)
   * @param {string} message - Mensaje original
   * @returns {string} - Respuesta generada
   */
  generateIntelligentResponse(analysisData, message) {
    const { emotion, topic, isQuestion } = analysisData;

    // Buscar plantilla de respuesta
    const topicTemplates = this.responseTemplates[topic] || this.responseTemplates.conversacion;
    const response = topicTemplates[emotion] || topicTemplates.default || topicTemplates.neutro;

    // Si es una pregunta específica, agregar contexto
    if (isQuestion && topic === 'filosofia') {
      return this.addPhilosophicalContext(response, message);
    }

    return response;
  }

  /**
   * Agrega contexto filosófico a la respuesta
   * @param {string} baseResponse - Respuesta base
   * @param {string} message - Mensaje original
   * @returns {string} - Respuesta con contexto
   */
  addPhilosophicalContext(baseResponse, message) {
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('barro')) {
      return baseResponse + ' El barro representa nuestra capacidad de ser moldeados por las experiencias y el aprendizaje.';
    }
    
    if (messageLower.includes('maestro')) {
      return baseResponse + ' El maestro nos guía en el camino del auto-descubrimiento y crecimiento personal.';
    }

    return baseResponse;
  }

  /**
   * Determina si se debe usar respuesta simple o elaborada
   * @param {object} context - Contexto de la conversación
   * @returns {string} - Tipo de respuesta ('simple' o 'elaborada')
   */
  determineResponseComplexity(context) {
    // Si es una conversación nueva, usar respuesta simple
    if (!context || context.conversationLength < 2) {
      return 'simple';
    }

    // Si hay continuidad de tema, usar respuesta elaborada
    return 'elaborada';
  }

  /**
   * Extrae la intención del mensaje
   * @param {object} analysisData - Datos del análisis
   * @returns {string} - Intención detectada
   */
  extractIntent(analysisData) {
    const { topic, isQuestion, emotion } = analysisData;

    if (isQuestion) {
      if (topic === 'pregunta_identidad') return 'conocer_aria';
      if (topic === 'pregunta_estado') return 'verificar_estado';
      if (topic === 'filosofia') return 'aprender_sabiduria';
      return 'buscar_informacion';
    }

    if (topic === 'saludo') return 'iniciar_conversacion';
    if (topic === 'despedida') return 'terminar_conversacion';
    if (topic === 'agradecimiento') return 'agradecer';

    return 'conversar';
  }
}

module.exports = SimpleReasoning;
