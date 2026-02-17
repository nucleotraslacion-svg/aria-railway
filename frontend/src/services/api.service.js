const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/aria';

class APIService {
  async talk(message) {
    const response = await fetch(`${API_URL}/talk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    return response.json();
  }

  async getStatus() {
    const response = await fetch(`${API_URL}/status`);
    return response.json();
  }

  async evolve(stage) {
    const response = await fetch(`${API_URL}/evolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage })
    });
    return response.json();
  }

  async getMemories() {
    const response = await fetch(`${API_URL}/memory`);
    return response.json();
  }
}

export default new APIService();
