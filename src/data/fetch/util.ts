const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Connection: 'keep-alive',
  },
};

const apiBase = 'http://localhost:8080';

// Resolves the promise from calling `json` and returns the value of `data`
const unpackResponse = async (response: Response) =>
  (await response.json()).data;

const apiFetch = async (endpoint: string, data: object = {}) => {
  try {
    return unpackResponse(
      await fetch(`${apiBase}${endpoint}`, {
        ...defaultOptions,
        body: JSON.stringify(data),
      }),
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}
  

export { apiFetch, defaultOptions };
