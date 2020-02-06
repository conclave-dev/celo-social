import { FETCH_USER } from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';

const initialState = initialStateDecorator({

});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_USER:
      return evalActionPayload(state, action, (state, action) => state);
    default:
      return state;
  }
};
