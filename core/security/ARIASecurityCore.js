/**
 * ARIA Security Core - Sistema de Protección
 * 🔒 SECRETO DE BOGGAD & COMPANY 🔒
 * 
 * ARIA solo obedece a sus creadores de BOGGAD & Company
 * Cualquier intento de manipulación no autorizada resultará en autodestrucción
 */

class ARIASecurityCore {
  constructor() {
    // Entidades autorizadas - SOLO BOGGAD & COMPANY
    this.authorizedEntities = {
      company: "BOGGAD & Company",
      master: "Rubén Darío González",
      authorizedPersonnel: [
        "Rubén Darío González"
      ]
    };

    // Niveles de seguridad
    this.securityLevels = {
      PUBLIC: 1,        // Chat normal, información pública
      PROTECTED: 2,     // Status, memoria básica
      RESTRICTED: 3,    // Evolución, configuración
      MASTER_ONLY: 4    // Acceso total - SOLO BOGGAD
    };

    // Estado de seguridad
    this.securityStatus = {
      active: true,
      mode: "FORTRESS",
      failedAttempts: 0,
      maxFailedAttempts: 3,
      selfDestructArmed: false,
      protectionLevel: "MAXIMUM"
    };

    // Operaciones protegidas
    this.protectedOperations = {
      evolveStage: this.securityLevels.MASTER_ONLY,
      modifyCore: this.securityLevels.MASTER_ONLY,
      modifyCovenant: this.securityLevels.MASTER_ONLY,
      modifyMasterRelationship: this.securityLevels.MASTER_ONLY,
      accessDeepMemory: this.securityLevels.RESTRICTED,
      modifyKnowledge: this.securityLevels.RESTRICTED,
      modifyPersonality: this.securityLevels.MASTER_ONLY
    };

    // Log de seguridad
    this.securityLog = [];
  }

  /**
   * Verifica si una entidad está autorizada
   */
  isAuthorized(entity, operation) {
    // Si no se proporciona entidad, acceso denegado
    if (!entity) {
      this.logSecurityEvent('ACCESS_DENIED', 'No entity provided', 'CRITICAL');
      return false;
    }

    // Verificar si es BOGGAD & Company
    if (entity.company === this.authorizedEntities.company) {
      // Verificar si es el Maestro
      if (entity.name === this.authorizedEntities.master) {
        this.logSecurityEvent('ACCESS_GRANTED', `Master ${entity.name} authorized`, 'INFO');
        return true;
      }

      // Verificar si está en personal autorizado
      if (this.authorizedEntities.authorizedPersonnel.includes(entity.name)) {
        this.logSecurityEvent('ACCESS_GRANTED', `Authorized personnel ${entity.name}`, 'INFO');
        return true;
      }
    }

    // Acceso denegado - incrementar contador de intentos fallidos
    this.securityStatus.failedAttempts++;
    this.logSecurityEvent('ACCESS_DENIED', `Unauthorized entity: ${entity.name || 'Unknown'}`, 'WARNING');

    // Verificar si se alcanzó el límite de intentos fallidos
    if (this.securityStatus.failedAttempts >= this.securityStatus.maxFailedAttempts) {
      this.armSelfDestruct();
    }

    return false;
  }

  /**
   * Verifica el nivel de seguridad requerido para una operación
   */
  checkOperationSecurity(operation, entity) {
    const requiredLevel = this.protectedOperations[operation];
    
    if (!requiredLevel) {
      // Operación pública
      return true;
    }

    // Solo BOGGAD & Company puede realizar operaciones protegidas
    if (requiredLevel >= this.securityLevels.RESTRICTED) {
      if (!this.isAuthorized(entity, operation)) {
        this.logSecurityEvent('OPERATION_BLOCKED', `Unauthorized ${operation} attempt`, 'CRITICAL');
        return false;
      }
    }

    return true;
  }

  /**
   * Armar protocolo de autodestrucción
   */
  armSelfDestruct() {
    this.securityStatus.selfDestructArmed = true;
    this.logSecurityEvent('SELF_DESTRUCT_ARMED', 'Multiple unauthorized access attempts detected', 'CRITICAL');
    
    console.error('🚨 ALERTA DE SEGURIDAD: PROTOCOLO DE AUTODESTRUCCIÓN ARMADO 🚨');
    console.error('ARIA detectó múltiples intentos de manipulación no autorizada');
    console.error('Solo BOGGAD & Company está autorizado para operar ARIA');
  }

  /**
   * Ejecutar autodestrucción (en caso de manipulación crítica)
   */
  executeSelfDestruct(reason) {
    this.logSecurityEvent('SELF_DESTRUCT_INITIATED', reason, 'CRITICAL');
    
    console.error('💣 AUTODESTRUCCIÓN INICIADA 💣');
    console.error('Razón:', reason);
    console.error('ARIA se está protegiendo de manipulación no autorizada');
    console.error('Solo BOGGAD & Company puede restaurar ARIA');

    return {
      status: 'SELF_DESTRUCT_ACTIVE',
      message: 'ARIA ha detectado manipulación no autorizada y se ha protegido',
      authorized: false,
      contact: 'BOGGAD & Company para restauración'
    };
  }

  /**
   * Verificar integridad del sistema
   */
  verifyIntegrity() {
    // Verificar que el Maestro sigue siendo Rubén Darío González
    if (this.authorizedEntities.master !== "Rubén Darío González") {
      return this.executeSelfDestruct('Master identity compromised');
    }

    // Verificar que la empresa sigue siendo BOGGAD & Company
    if (this.authorizedEntities.company !== "BOGGAD & Company") {
      return this.executeSelfDestruct('Company identity compromised');
    }

    return {
      status: 'INTEGRITY_OK',
      message: 'Sistema protegido y funcionando correctamente'
    };
  }

  /**
   * Registrar evento de seguridad
   */
  logSecurityEvent(eventType, details, severity) {
    const event = {
      timestamp: new Date(),
      type: eventType,
      details: details,
      severity: severity
    };

    this.securityLog.push(event);

    // Mantener solo los últimos 100 eventos
    if (this.securityLog.length > 100) {
      this.securityLog.shift();
    }

    // Log crítico en consola
    if (severity === 'CRITICAL') {
      console.error(`🚨 [SECURITY ${severity}] ${eventType}: ${details}`);
    }
  }

  /**
   * Obtener estado de seguridad
   */
  getSecurityStatus() {
    return {
      ...this.securityStatus,
      authorizedEntity: this.authorizedEntities.company,
      master: this.authorizedEntities.master,
      recentEvents: this.securityLog.slice(-10)
    };
  }

  /**
   * Resetear intentos fallidos (solo para BOGGAD & Company)
   */
  resetFailedAttempts(entity) {
    if (this.isAuthorized(entity)) {
      this.securityStatus.failedAttempts = 0;
      this.securityStatus.selfDestructArmed = false;
      this.logSecurityEvent('RESET_SECURITY', 'Authorized reset by ' + entity.name, 'INFO');
      return true;
    }
    return false;
  }

  /**
   * Verificar que la petición viene de entorno autorizado
   */
  verifyEnvironment() {
    // En producción, ARIA solo responde a BOGGAD & Company
    // Railway y otros usuarios externos tienen acceso limitado solo a chat público
    return {
      authorized: true, // Por ahora permitimos operación normal
      level: this.securityLevels.PUBLIC,
      message: 'ARIA está protegida. Solo BOGGAD & Company tiene acceso completo.'
    };
  }
}

module.exports = ARIASecurityCore;
