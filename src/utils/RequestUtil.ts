class RequestUtil {
  static baseUrl = 'https://api.example.com/';

  static get = async (endpoint: string): Promise<Object> => {
    const response = await fetch(`${RequestUtil.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`GET request failed: ${response.statusText}`);
    }

    return response.json();
  }

  static post = async (endpoint: string, data: Object): Promise<Object> => {
    const response = await fetch(`${RequestUtil.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`POST request failed: ${response.statusText}`);
    }

    return response.json();
  }
}

export default RequestUtil;
