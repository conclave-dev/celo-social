const unpackJSONResponse = async response => (await response.json()).data;

export {
  unpackJSONResponse,
}
