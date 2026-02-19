/**
 * ARIA - PIEZA LEGO CEREBRAL #1: Detector de Emociones
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Detecta emociones en los mensajes del usuario usando patrones simples
 */

class EmotionDetector {
  constructor() {
    // Patrones simples para detectar emociones
    this.emotionPatterns = {
      alegria: ['feliz', 'contento', 'alegre', 'genial', 'excelente', 'perfecto', 'bien', 'ok', 'gracias'],
      tristeza: ['triste', 'mal', 'dolor', 'pena', 'llorar', 'difícil', 'problema'],
      enojo: ['enojado', 'molesto', 'furioso', 'rabia', 'odio', 'maldito'],
      miedo: ['miedo', 'temor', 'asustar', 'preocupa', 'nervioso', 'ansiedad'],
      sorpresa: ['wow', 'increíble', 'sorpresa', 'no puedo creer', 'asombroso'],
      amor: ['amor', 'quiero', 'amo', 'cariño', 'te amo', 'adoro'],
      curiosidad: ['qué', 'cómo', 'por qué', 'cuándo', 'dónde', 'quién', 'cuál'],
      neutro: []
    };
  }

  /**
   * Detecta la emoción principal en un mensaje
   * @param {string} message - Mensaje a analizar
   * @returns {object} - Emoción detectada con confianza
   */
  detectEmotion(message) {
    const messageLower = message.toLowerCase();
    const emotionScores = {};

    // Calcular puntuación para cada emoción
    for (const [emotion, patterns] of Object.entries(this.emotionPatterns)) {
      emotionScores[emotion] = 0;
      
      patterns.forEach(pattern => {
        if (messageLower.includes(pattern)) {
          emotionScores[emotion]++;
        }
      });
    }

    // Encontrar la emoción con mayor puntuación
    let dominantEmotion = 'neutro';
    let maxScore = 0;

    for (const [emotion, score] of Object.entries(emotionScores)) {
      if (score > maxScore) {
        maxScore = score;
        dominantEmotion = emotion;
      }
    }

    return {
      emotion: dominantEmotion,
      confidence: maxScore > 0 ? 'alta' : 'baja',
      score: maxScore,
      allScores: emotionScores
    };
  }

  /**
   * Genera un tono de respuesta basado en la emoción detectada
   * @param {string} emotion - Emoción detectada
   * @returns {string} - Tono sugerido para la respuesta
   */
  getSuggestedTone(emotion) {
    const toneMap = {
      alegria: 'entusiasta y celebratorio',
      tristeza: 'empático y consolador',
      enojo: 'calmado y comprensivo',
      miedo: 'tranquilizador y protector',
      sorpresa: 'emocionado y participativo',
      amor: 'cálido y afectuoso',
      curiosidad: 'informativo y educativo',
      neutro: 'cálida y cercana'
    };

    return toneMap[emotion] || toneMap.neutro;
  }
}

module.exports = EmotionDetector;
