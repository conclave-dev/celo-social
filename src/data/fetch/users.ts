import { backendFetch } from './util';

const getUser = userID => backendFetch(`/user/${userID}`);

export { getUser };
