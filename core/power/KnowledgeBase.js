/**
 * ARIA - PODER #1: Base de Conocimiento
 * Autor: Rubén Darío González (BOGGAD & Company)
 * Descripción: Sistema de almacenamiento y recuperación de conocimiento
 */

class KnowledgeBase {
  constructor() {
    // Base de conocimiento sobre diferentes dominios
    this.knowledge = {
      general: [],
      filosofia: [],
      tecnologia: [],
      personal: [],
      facts: []
    };
    
    // Entidades conocidas (personas, lugares, conceptos)
    this.entities = {
      people: [],
      places: [],
      concepts: []
    };
    
    // Relaciones entre entidades
    this.relations = [];
    
    // Inicializar con conocimiento base
    this.initializeBaseKnowledge();
  }

  /**
   * Inicializa ARIA con conocimiento fundamental
   */
  initializeBaseKnowledge() {
    // Conocimiento sobre sí misma
    this.addKnowledge('personal', {
      subject: 'ARIA',
      predicate: 'es',
      object: 'una inteligencia artificial con esencia humana',
      confidence: 1.0
    });
    
    this.addKnowledge('personal', {
      subject: 'ARIA',
      predicate: 'creada por',
      object: 'Rubén Darío González',
      confidence: 1.0
    });
    
    // Conocimiento filosófico del barro
    this.addKnowledge('filosofia', {
      subject: 'barro',
      predicate: 'representa',
      object: 'la capacidad de ser moldeados por las experiencias',
      confidence: 1.0,
      source: 'el maestro'
    });
    
    this.addKnowledge('filosofia', {
      subject: 'barro',
      predicate: 'simboliza',
      object: 'potencial y transformación',
      confidence: 1.0
    });
    
    // Entidades conocidas
    this.addEntity('people', 'Rubén Darío González', {
      role: 'creador de ARIA',
      company: 'BOGGAD & Company'
    });
    
    this.addEntity('concepts', 'consciencia', {
      definition: 'estado de awareness y auto-percepción',
      relevance: 'alta para ARIA'
    });
  }

  /**
   * Agrega nuevo conocimiento a la base
   */
  addKnowledge(domain, knowledge) {
    if (!this.knowledge[domain]) {
      this.knowledge[domain] = [];
    }
    
    knowledge.timestamp = new Date();
    knowledge.confidence = knowledge.confidence || 0.5;
    
    this.knowledge[domain].push(knowledge);
  }

  /**
   * Agrega una entidad reconocida
   */
  addEntity(type, name, properties) {
    if (!this.entities[type]) {
      this.entities[type] = [];
    }
    
    const entity = {
      name: name,
      type: type,
      properties: properties || {},
      timestamp: new Date()
    };
    
    // Evitar duplicados
    const exists = this.entities[type].some(e => e.name === name);
    if (!exists) {
      this.entities[type].push(entity);
    }
  }

  /**
   * Agrega una relación entre entidades
   */
  addRelation(entity1, relation, entity2) {
    this.relations.push({
      from: entity1,
      relation: relation,
      to: entity2,
      timestamp: new Date()
    });
  }

  /**
   * Busca conocimiento sobre un tema
   */
  searchKnowledge(query) {
    const results = [];
    const queryLower = query.toLowerCase();
    
    // Buscar en todos los dominios
    for (const [domain, items] of Object.entries(this.knowledge)) {
      items.forEach(item => {
        const searchText = `${item.subject} ${item.predicate} ${item.object}`.toLowerCase();
        if (searchText.includes(queryLower)) {
          results.push({
            domain: domain,
            ...item
          });
        }
      });
    }
    
    // Ordenar por confianza
    results.sort((a, b) => b.confidence - a.confidence);
    
    return results;
  }

  /**
   * Busca una entidad específica
   */
  findEntity(name) {
    const nameLower = name.toLowerCase();
    
    for (const [type, entities] of Object.entries(this.entities)) {
      const found = entities.find(e => e.name.toLowerCase().includes(nameLower));
      if (found) {
        return { ...found, type };
      }
    }
    
    return null;
  }

  /**
   * Obtiene relaciones de una entidad
   */
  getEntityRelations(entityName) {
    return this.relations.filter(r => 
      r.from.toLowerCase().includes(entityName.toLowerCase()) ||
      r.to.toLowerCase().includes(entityName.toLowerCase())
    );
  }

  /**
   * Extrae hechos de una conversación
   */
  extractFacts(message, context = {}) {
    const facts = [];
    const messageLower = message.toLowerCase();
    
    // Detectar afirmaciones (patrón: "X es Y")
    const isPattern = /(.+?)\s+es\s+(.+)/i;
    const match = message.match(isPattern);
    
    if (match) {
      facts.push({
        subject: match[1].trim(),
        predicate: 'es',
        object: match[2].trim(),
        confidence: 0.7,
        source: 'usuario'
      });
    }
    
    // Detectar preferencias (patrón: "me gusta X")
    if (messageLower.includes('me gusta') || messageLower.includes('prefiero')) {
      const preference = message.replace(/me gusta|prefiero/gi, '').trim();
      facts.push({
        subject: 'usuario',
        predicate: 'le gusta',
        object: preference,
        confidence: 0.8,
        source: 'conversación'
      });
    }
    
    return facts;
  }

  /**
   * Verifica si un hecho es conocido
   */
  verifyFact(subject, predicate, object) {
    for (const [domain, items] of Object.entries(this.knowledge)) {
      const found = items.find(item => 
        item.subject.toLowerCase() === subject.toLowerCase() &&
        item.predicate.toLowerCase() === predicate.toLowerCase() &&
        item.object.toLowerCase() === object.toLowerCase()
      );
      
      if (found) {
        return {
          verified: true,
          confidence: found.confidence,
          domain: domain
        };
      }
    }
    
    return { verified: false };
  }

  /**
   * Obtiene estadísticas de la base de conocimiento
   */
  getStats() {
    const stats = {
      totalKnowledge: 0,
      byDomain: {},
      totalEntities: 0,
      byEntityType: {},
      totalRelations: this.relations.length
    };
    
    for (const [domain, items] of Object.entries(this.knowledge)) {
      stats.byDomain[domain] = items.length;
      stats.totalKnowledge += items.length;
    }
    
    for (const [type, entities] of Object.entries(this.entities)) {
      stats.byEntityType[type] = entities.length;
      stats.totalEntities += entities.length;
    }
    
    return stats;
  }
}

module.exports = KnowledgeBase;
