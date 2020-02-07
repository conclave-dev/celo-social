import { isEmpty } from 'lodash';

const defaultOptions = (method = 'POST') => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiBase = 'http://localhost:8080';
const backendBase = 'http://localhost:8081';

// Resolves the promise from calling `json` and returns the value of `data`
const unpackResponse = async (response: Response) => {
  try {
    const { data } = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

const apiFetch = async (endpoint: string, data: object = {}) => {
  try {
    return unpackResponse(
      await fetch(`${apiBase}${endpoint}`, {
        ...defaultOptions(),
        body: JSON.stringify(data),
      }),
    );
  } catch (err) {
    throw err;
  }
};

const backendFetch = async (endpoint: string, data: object = {}) => {
  try {
    return unpackResponse(
      await fetch(`${backendBase}${endpoint}`, {
        ...defaultOptions('GET'),
        ...(isEmpty(data) ? {} : { body: JSON.stringify(data) }),
      }),
    );
  } catch (err) {
    throw err;
  }
};

export { apiFetch, backendFetch };
