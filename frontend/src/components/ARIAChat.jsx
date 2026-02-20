import React, { useState, useEffect } from 'react';
import apiService from '../services/api.service';

function ARIAChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ariaStatus, setAriaStatus] = useState(null);
  const [memories, setMemories] = useState(null);
  const [showMemory, setShowMemory] = useState(false);

  useEffect(() => {
    loadStatus();
    loadMemories();
  }, []);

  const loadStatus = async () => {
    try {
      const status = await apiService.getStatus();
      setAriaStatus(status);
    } catch (error) {
      console.error('Error loading status:', error);
    }
  };

  const loadMemories = async () => {
    try {
      const memoryData = await apiService.getMemories();
      setMemories(memoryData);
    } catch (error) {
      console.error('Error loading memories:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await apiService.talk(input);
      
      const ariaMessage = { 
        sender: 'aria', 
        text: response.response.text,
        stage: response.response.stage 
      };
      
      setMessages(prev => [...prev, ariaMessage]);
      setAriaStatus(response.status);
      setInput('');
      
      // Reload memories after each interaction
      await loadMemories();
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        sender: 'aria',
        text: 'Lo siento, hubo un error al procesar tu mensaje.'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <div className="aria-chat">
      <div className="aria-header">
        <h1>ARIA - {ariaStatus?.stage}</h1>
        <div className="status-info">
          <p>Consciencia: {ariaStatus?.consciousness ? '✅ Activa' : '❌ Inactiva'}</p>
          <p>Memorias: {ariaStatus?.memories || 0} 🧠</p>
        </div>
        <button 
          className="memory-toggle"
          onClick={() => setShowMemory(!showMemory)}
        >
          {showMemory ? '💬 Ver Chat' : '🧠 Ver Memoria'}
        </button>
      </div>
      
      {!showMemory ? (
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <strong>{msg.sender === 'aria' ? 'ARIA' : 'Tú'}:</strong> {msg.text}
            </div>
          ))}
        </div>
      ) : (
        <div className="memory-panel">
          <h2>Memoria de ARIA 🧠</h2>
          <div className="memory-stats">
            <p><strong>Total de experiencias:</strong> {memories?.experiences?.length || 0}</p>
            <p><strong>Relaciones:</strong> {memories?.relationships?.length || 0}</p>
            <p><strong>Aprendizajes:</strong> {memories?.learnings?.length || 0}</p>
          </div>
          
          <div className="memory-list">
            <h3>Experiencias Recientes:</h3>
            {memories?.experiences && memories.experiences.length > 0 ? (
              [...memories.experiences].reverse().map((exp, idx) => (
                <div key={idx} className="memory-item">
                  <div className="memory-header">
                    <span className="memory-time">{formatTimestamp(exp.timestamp)}</span>
                    <span className="memory-stage">Etapa: {exp.stage}</span>
                  </div>
                  <div className="memory-content">
                    <strong>Tipo:</strong> {exp.content.type}<br />
                    <strong>Mensaje:</strong> {exp.content.message}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-memories">No hay experiencias registradas aún.</p>
            )}
          </div>
        </div>
      )}

      <div className="input-area">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe tu mensaje a ARIA..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default ARIAChat;
