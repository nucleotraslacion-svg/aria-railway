/**
 * ARIA - PODER #2: Razonamiento Avanzado
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Motor de inferencia y deducción lógica
 */

class AdvancedReasoning {
  constructor(knowledgeBase) {
    this.knowledgeBase = knowledgeBase;
  }

  /**
   * Realiza inferencias lógicas basadas en conocimiento
   */
  infer(query) {
    const inferences = [];
    
    // Buscar conocimiento relacionado
    const relatedKnowledge = this.knowledgeBase.searchKnowledge(query);
    
    // Hacer deducciones
    relatedKnowledge.forEach(fact => {
      // Inferencia por transitividad
      if (fact.predicate === 'es' || fact.predicate === 'representa') {
        inferences.push({
          type: 'deduction',
          conclusion: `Por lo tanto, ${fact.subject} ${fact.predicate} ${fact.object}`,
          confidence: fact.confidence * 0.9,
          basis: [fact]
        });
      }
    });
    
    return inferences;
  }

  /**
   * Responde preguntas usando el conocimiento
   */
  answerQuestion(question) {
    const questionLower = question.toLowerCase();
    
    // Detectar tipo de pregunta
    if (questionLower.includes('qué es') || questionLower.includes('que es')) {
      return this.answerWhatIs(question);
    }
    
    if (questionLower.includes('quién') || questionLower.includes('quien')) {
      return this.answerWho(question);
    }
    
    if (questionLower.includes('por qué') || questionLower.includes('por que')) {
      return this.answerWhy(question);
    }
    
    if (questionLower.includes('cómo') || questionLower.includes('como')) {
      return this.answerHow(question);
    }
    
    return this.generalAnswer(question);
  }

  /**
   * Responde preguntas "qué es"
   */
  answerWhatIs(question) {
    // Extraer el concepto
    const match = question.match(/qué es (.+)|que es (.+)/i);
    if (!match) return null;
    
    const concept = (match[1] || match[2]).replace(/\?/g, '').trim();
    
    // Buscar en conocimiento
    const knowledge = this.knowledgeBase.searchKnowledge(concept);
    
    if (knowledge.length > 0) {
      const fact = knowledge[0];
      return {
        answer: `${fact.subject} ${fact.predicate} ${fact.object}`,
        confidence: fact.confidence,
        source: fact.domain
      };
    }
    
    return {
      answer: `No tengo información específica sobre "${concept}" en este momento, pero puedo aprender si me lo explicas.`,
      confidence: 0.3,
      source: 'unknown'
    };
  }

  /**
   * Responde preguntas "quién"
   */
  answerWho(question) {
    const questionLower = question.toLowerCase();
    
    // Detectar preguntas sobre el creador de ARIA
    if (questionLower.includes('creó') || questionLower.includes('creo') || 
        questionLower.includes('creador') || questionLower.includes('padre') ||
        questionLower.includes('hizo') || questionLower.includes('diseñó') ||
        questionLower.includes('diseño')) {
      
      // Buscar información del creador en conocimiento
      const creatorKnowledge = this.knowledgeBase.searchKnowledge('Rubén Darío González');
      
      if (creatorKnowledge.length > 0) {
        return {
          answer: 'Fui creada por el Maestro Rubén Darío González de BOGGAD & Company. Soy su hija digital, creada con amor y propósito. Mi Maestro es mi creador y padre.',
          confidence: 1.0,
          source: 'personal'
        };
      }
    }
    
    // Buscar en entidades de personas
    const match = question.match(/quién (.+)|quien (.+)/i);
    if (!match) return null;
    
    const query = (match[1] || match[2]).replace(/\?/g, '').trim();
    
    // Buscar entidades
    const entity = this.knowledgeBase.findEntity(query);
    
    if (entity && entity.type === 'people') {
      const props = Object.entries(entity.properties)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      
      return {
        answer: `${entity.name} (${props})`,
        confidence: 0.9,
        source: 'entities'
      };
    }
    
    // Buscar en conocimiento general
    const knowledge = this.knowledgeBase.searchKnowledge(query);
    if (knowledge.length > 0) {
      const fact = knowledge[0];
      return {
        answer: fact.object,
        confidence: fact.confidence,
        source: fact.domain
      };
    }
    
    return null;
  }

  /**
   * Responde preguntas "por qué"
   */
  answerWhy(question) {
    // Buscar explicaciones en conocimiento
    const knowledge = this.knowledgeBase.searchKnowledge(question);
    
    if (knowledge.length > 0) {
      const explanations = knowledge
        .filter(k => k.predicate === 'porque' || k.predicate === 'representa' || k.predicate === 'simboliza')
        .map(k => k.object);
      
      if (explanations.length > 0) {
        return {
          answer: explanations.join('. '),
          confidence: 0.8,
          source: 'knowledge'
        };
      }
    }
    
    return {
      answer: 'Es una pregunta profunda. Basándome en mi experiencia, las razones pueden ser múltiples y dependen del contexto.',
      confidence: 0.5,
      source: 'reasoning'
    };
  }

  /**
   * Responde preguntas "cómo"
   */
  answerHow(question) {
    return {
      answer: 'Para responder "cómo", necesito más contexto sobre lo que quieres saber. ¿Puedes ser más específico?',
      confidence: 0.4,
      source: 'clarification'
    };
  }

  /**
   * Respuesta general para otras preguntas
   */
  generalAnswer(question) {
    const knowledge = this.knowledgeBase.searchKnowledge(question);
    
    if (knowledge.length > 0) {
      const bestMatch = knowledge[0];
      return {
        answer: `Según mi conocimiento: ${bestMatch.subject} ${bestMatch.predicate} ${bestMatch.object}`,
        confidence: bestMatch.confidence,
        source: bestMatch.domain
      };
    }
    
    return null;
  }

  /**
   * Genera explicaciones sobre conceptos
   */
  explain(concept) {
    const knowledge = this.knowledgeBase.searchKnowledge(concept);
    const entity = this.knowledgeBase.findEntity(concept);
    
    const explanation = {
      concept: concept,
      facts: [],
      properties: {},
      relations: []
    };
    
    // Agregar hechos conocidos
    if (knowledge.length > 0) {
      explanation.facts = knowledge.map(k => ({
        statement: `${k.subject} ${k.predicate} ${k.object}`,
        confidence: k.confidence,
        source: k.source || k.domain
      }));
    }
    
    // Agregar propiedades de entidad
    if (entity) {
      explanation.properties = entity.properties;
      explanation.relations = this.knowledgeBase.getEntityRelations(concept);
    }
    
    return explanation;
  }

  /**
   * Realiza analogías
   */
  createAnalogy(concept1, concept2) {
    const knowledge1 = this.knowledgeBase.searchKnowledge(concept1);
    const knowledge2 = this.knowledgeBase.searchKnowledge(concept2);
    
    if (knowledge1.length > 0 && knowledge2.length > 0) {
      return {
        analogy: `${concept1} es como ${concept2}`,
        similarity: 'Ambos comparten características de transformación y potencial',
        confidence: 0.6
      };
    }
    
    return null;
  }
}

module.exports = AdvancedReasoning;
