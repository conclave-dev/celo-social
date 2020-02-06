const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Connection: 'Keep-Alive',
  },
};

const apiBase = 'http://localhost:8080';

// Resolves the promise from calling `json` and returns the value of `data`
const unpackResponse = async (response: Response) => {
  try {
    const { data } = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

const apiFetch = async (endpoint: string, data: object = {}) => {
  try {
    return unpackResponse(
      await fetch(`${apiBase}${endpoint}`, {
        ...defaultOptions,
        body: JSON.stringify(data),
      }),
    );
  } catch (err) {
    return err;
  }
}


export { apiFetch, defaultOptions };
