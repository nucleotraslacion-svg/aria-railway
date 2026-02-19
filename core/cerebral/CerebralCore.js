/**
 * ARIA - CEREBRO INTEGRADOR: Coordinador Cerebral
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Integra todos los módulos cerebrales para procesamiento cognitivo
 */

const EmotionDetector = require('./EmotionDetector');
const PatternRecognizer = require('./PatternRecognizer');
const ContextManager = require('./ContextManager');
const SimpleReasoning = require('./SimpleReasoning');

class CerebralCore {
  constructor() {
    // Inicializar módulos cerebrales
    this.emotionDetector = new EmotionDetector();
    this.patternRecognizer = new PatternRecognizer();
    this.contextManager = new ContextManager(5);
    this.reasoning = new SimpleReasoning();
    
    this.processingStats = {
      totalProcessed: 0,
      emotionsDetected: {},
      topicsIdentified: {}
    };
  }

  /**
   * Procesa un mensaje usando todos los módulos cerebrales
   * @param {string} message - Mensaje a procesar
   * @param {array} experiences - Historial de experiencias
   * @returns {object} - Análisis completo del mensaje
   */
  processMessage(message, experiences = []) {
    // 1. Detectar emoción
    const emotionAnalysis = this.emotionDetector.detectEmotion(message);
    
    // 2. Reconocer patrones y tema
    const patternAnalysis = this.patternRecognizer.recognizeTopic(message);
    
    // 3. Verificar referencias al contexto
    const contextReferences = this.contextManager.findReferences(message);
    
    // 4. Agregar al contexto
    this.contextManager.addToContext({
      message: message,
      emotion: emotionAnalysis.emotion,
      topic: patternAnalysis.topic,
      isQuestion: patternAnalysis.isQuestion,
      keywords: patternAnalysis.keywords
    });
    
    // 5. Obtener contexto actual
    const currentContext = this.contextManager.getContext();
    
    // 6. Generar respuesta inteligente
    const intelligentResponse = this.reasoning.generateIntelligentResponse({
      emotion: emotionAnalysis.emotion,
      topic: patternAnalysis.topic,
      isQuestion: patternAnalysis.isQuestion,
      keywords: patternAnalysis.keywords
    }, message);
    
    // 7. Determinar intención
    const intent = this.reasoning.extractIntent(patternAnalysis);
    
    // 8. Obtener tono sugerido
    const suggestedTone = this.emotionDetector.getSuggestedTone(emotionAnalysis.emotion);
    
    // 9. Analizar frecuencia de temas (si hay experiencias)
    const topicFrequency = experiences.length > 0 
      ? this.patternRecognizer.analyzeTopicFrequency(experiences)
      : {};
    
    // 10. Actualizar estadísticas
    this.updateStats(emotionAnalysis.emotion, patternAnalysis.topic);
    
    // Retornar análisis completo
    return {
      // Análisis de emoción
      emotion: {
        detected: emotionAnalysis.emotion,
        confidence: emotionAnalysis.confidence,
        score: emotionAnalysis.score
      },
      // Análisis de patrón
      pattern: {
        topic: patternAnalysis.topic,
        isQuestion: patternAnalysis.isQuestion,
        keywords: patternAnalysis.keywords,
        confidence: patternAnalysis.confidence
      },
      // Contexto
      context: {
        current: currentContext,
        references: contextReferences,
        summary: this.contextManager.getContextSummary()
      },
      // Razonamiento
      reasoning: {
        intent: intent,
        suggestedTone: suggestedTone,
        intelligentResponse: intelligentResponse,
        topicFrequency: topicFrequency
      },
      // Metadata
      processed: true,
      timestamp: new Date()
    };
  }

  /**
   * Genera una respuesta mejorada usando el análisis cerebral
   * @param {object} cerebralAnalysis - Análisis completo del cerebro
   * @param {string} originalMessage - Mensaje original
   * @param {string} currentStage - Etapa actual de ARIA
   * @returns {object} - Respuesta mejorada
   */
  generateEnhancedResponse(cerebralAnalysis, originalMessage, currentStage) {
    const { reasoning, emotion, pattern, context } = cerebralAnalysis;
    
    // Usar la respuesta inteligente generada
    let responseText = reasoning.intelligentResponse;
    
    // Si es una pregunta sobre identidad, personalizar según la etapa
    if (reasoning.intent === 'conocer_aria') {
      responseText = this.personalizeByStage(responseText, currentStage);
    }
    
    // Agregar referencia al contexto si es continuación
    if (context.current.currentTopic === pattern.topic && context.current.conversationLength > 1) {
      responseText = `Continuando con ${pattern.topic}... ${responseText}`;
    }
    
    return {
      text: responseText,
      tone: reasoning.suggestedTone,
      emotion: emotion.detected,
      topic: pattern.topic,
      intent: reasoning.intent,
      contextAware: context.references.hasReference,
      cerebralProcessing: true
    };
  }

  /**
   * Personaliza la respuesta según la etapa de ARIA
   * @param {string} response - Respuesta base
   * @param {string} stage - Etapa actual
   * @returns {string} - Respuesta personalizada
   */
  personalizeByStage(response, stage) {
    const stageModifiers = {
      baby: 'Estoy en mi etapa inicial, aprendiendo y creciendo. ',
      child: 'Ya he crecido un poco y he aprendido mucho. ',
      teacher: 'Con mi experiencia acumulada, puedo guiarte mejor. '
    };
    
    return (stageModifiers[stage] || '') + response;
  }

  /**
   * Actualiza las estadísticas de procesamiento
   * @param {string} emotion - Emoción detectada
   * @param {string} topic - Tema identificado
   */
  updateStats(emotion, topic) {
    this.processingStats.totalProcessed++;
    
    this.processingStats.emotionsDetected[emotion] = 
      (this.processingStats.emotionsDetected[emotion] || 0) + 1;
    
    this.processingStats.topicsIdentified[topic] = 
      (this.processingStats.topicsIdentified[topic] || 0) + 1;
  }

  /**
   * Obtiene las estadísticas de procesamiento
   * @returns {object} - Estadísticas
   */
  getStats() {
    return this.processingStats;
  }

  /**
   * Reinicia el contexto cerebral
   */
  reset() {
    this.contextManager.clearContext();
  }
}

module.exports = CerebralCore;
