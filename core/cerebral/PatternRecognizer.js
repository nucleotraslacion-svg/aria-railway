/**
 * ARIA - PIEZA LEGO CEREBRAL #2: Reconocedor de Patrones
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Reconoce patrones y temas recurrentes en las conversaciones
 */

class PatternRecognizer {
  constructor() {
    this.topicPatterns = {
      saludo: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hi', 'hey'],
      despedida: ['adiós', 'hasta luego', 'nos vemos', 'chau', 'bye'],
      agradecimiento: ['gracias', 'te agradezco', 'muchas gracias', 'thank you'],
      pregunta_identidad: ['quién eres', 'qué eres', 'tu nombre', 'cómo te llamas'],
      pregunta_estado: ['cómo estás', 'qué tal', 'cómo te va'],
      filosofia: ['maestro', 'barro', 'metáfora', 'enseñanza', 'sabiduría', 'aprender'],
      conversacion: ['cuéntame', 'hablame', 'dime', 'explica', 'describe']
    };
  }

  /**
   * Reconoce el tema principal del mensaje
   * @param {string} message - Mensaje a analizar
   * @returns {object} - Tema detectado
   */
  recognizeTopic(message) {
    const messageLower = message.toLowerCase();
    const topicScores = {};

    // Calcular puntuación para cada tema
    for (const [topic, patterns] of Object.entries(this.topicPatterns)) {
      topicScores[topic] = 0;
      
      patterns.forEach(pattern => {
        if (messageLower.includes(pattern)) {
          topicScores[topic]++;
        }
      });
    }

    // Encontrar el tema con mayor puntuación
    let dominantTopic = 'conversacion';
    let maxScore = 0;

    for (const [topic, score] of Object.entries(topicScores)) {
      if (score > maxScore) {
        maxScore = score;
        dominantTopic = topic;
      }
    }

    return {
      topic: dominantTopic,
      confidence: maxScore > 0 ? 'alta' : 'baja',
      isQuestion: this.isQuestion(message),
      keywords: this.extractKeywords(message)
    };
  }

  /**
   * Determina si el mensaje es una pregunta
   * @param {string} message - Mensaje a analizar
   * @returns {boolean} - True si es pregunta
   */
  isQuestion(message) {
    const questionWords = ['qué', 'cómo', 'cuándo', 'dónde', 'por qué', 'quién', 'cuál'];
    const messageLower = message.toLowerCase();
    
    // Termina con signo de interrogación
    if (message.trim().endsWith('?')) {
      return true;
    }

    // Contiene palabras de pregunta
    return questionWords.some(word => messageLower.includes(word));
  }

  /**
   * Extrae palabras clave del mensaje
   * @param {string} message - Mensaje a analizar
   * @returns {array} - Array de palabras clave
   */
  extractKeywords(message) {
    // Palabras comunes a ignorar
    const stopWords = ['el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'a', 'en', 'y', 'o', 'que', 'es', 'por', 'con', 'para'];
    
    const words = message.toLowerCase()
      .replace(/[^\w\sáéíóúñ]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word));

    // Retornar palabras únicas
    return [...new Set(words)];
  }

  /**
   * Analiza frecuencia de temas en el historial
   * @param {array} experiences - Array de experiencias
   * @returns {object} - Frecuencia de temas
   */
  analyzeTopicFrequency(experiences) {
    const topicCount = {};
    
    experiences.forEach(exp => {
      if (exp.content && exp.content.message) {
        const topic = this.recognizeTopic(exp.content.message).topic;
        topicCount[topic] = (topicCount[topic] || 0) + 1;
      }
    });

    return topicCount;
  }
}

module.exports = PatternRecognizer;
