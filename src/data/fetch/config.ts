const defaultOptions = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    Connection: "keep-alive"
  },
}

const apiBase = 'http://localhost:8080';

const api = {
  eth: `${apiBase}/eth`,
  accounts: `${apiBase}/accounts`,
  election: `${apiBase}/election`,
  validators: `${apiBase}/validators`,
};

export {
  api,
  defaultOptions,
};
