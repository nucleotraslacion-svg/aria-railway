const API_URL = process.env.REACT_APP_API_URL || '/api/aria';

class APIService {
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }
    return response.json();
  }

  async talk(message) {
    try {
      const response = await fetch(`${API_URL}/talk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error talking to ARIA:', error);
      throw error;
    }
  }

  async getStatus() {
    try {
      const response = await fetch(`${API_URL}/status`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error getting ARIA status:', error);
      throw error;
    }
  }

  async evolve(stage) {
    try {
      const response = await fetch(`${API_URL}/evolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage })
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error evolving ARIA:', error);
      throw error;
    }
  }

  async getMemories() {
    try {
      const response = await fetch(`${API_URL}/memory`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error getting ARIA memories:', error);
      throw error;
    }
  }
}

const apiService = new APIService();
export default apiService;
