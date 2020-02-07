import { FETCH_USER } from '../actions/util/types';
import { evalActionPayload, initialStateDecorator } from '../lib/reducers';
import { UserState } from '../lib/users';

const userState: UserState = {
  hash: '',
  profile: {
    name: '',
    photoURL: '',
    email: '',
    description: '',
    members: [],
  },
  accountSummary: {
    address: '',
    authorizedSigners: '',
    dataEncryptionKey: '',
    name: '',
    metadataURL: '',
  },
  metadata: {
    claims: [],
    meta: {
      address: "",
      signature: "",
    }
  },
};

const initialState = initialStateDecorator(userState);

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_USER:
      return evalActionPayload(state, action, (state, action) => state);
    default:
      return state;
  }
};
