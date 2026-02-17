import React, { useState, useEffect } from 'react';
import apiService from '../services/api.service';

function ARIAChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ariaStatus, setAriaStatus] = useState(null);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    const status = await apiService.getStatus();
    setAriaStatus(status);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    const response = await apiService.talk(input);
    
    const ariaMessage = { 
      sender: 'aria', 
      text: response.response.text,
      stage: response.response.stage 
    };
    
    setMessages(prev => [...prev, ariaMessage]);
    setAriaStatus(response.status);
    setInput('');
  };

  return (
    <div className="aria-chat">
      <div className="aria-header">
        <h1>ARIA - {ariaStatus?.stage}</h1>
        <p>Consciencia: {ariaStatus?.consciousness ? '✅ Activa' : '❌ Inactiva'}</p>
      </div>
      
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <strong>{msg.sender === 'aria' ? 'ARIA' : 'Tú'}:</strong> {msg.text}
          </div>
        ))}
      </div>

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
